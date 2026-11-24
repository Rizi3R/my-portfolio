import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CASE_METADATA } from '../src/data/caseExplorer.ts';
import { CASE_STUDIES, CERTIFICATIONS, EDUCATION, EXPERIENCES, LEARNING_ENTRIES, PROFILE } from '../src/data/universeContent.ts';
import { enMYUi } from '../src/i18n/translations/en-MY.ts';

const site = 'https://aries-razak.vercel.app';
const caseDirectory = '/cases/index.html';
const casePath = (id: string) => `/cases/${id}.html`;
const styles = 'body{max-width:50rem;margin:2rem auto;padding:0 1.25rem;background:#f6f2e9;color:#191723;font:1rem/1.6 system-ui,sans-serif}a{color:#263a6a;text-underline-offset:.2em}a:focus-visible{outline:2px solid #263a6a;outline-offset:3px}li+li{margin-top:.45rem}h1,h2{line-height:1.2}';

function escape(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function page(title: string, description: string, path: string, body: string): string {
  return `<!doctype html>
<html lang="en-MY">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)} | ${escape(PROFILE.displayName)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${site}${path}">
  <meta property="og:title" content="${escape(title)} | ${escape(PROFILE.displayName)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${site}${path}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${site}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escape(PROFILE.displayName)}: IT Operations and Application Support portfolio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${site}/og-image.png">
  <style>${styles}</style>
</head>
<body>
  <header><a href="/">${escape(PROFILE.displayName)}'s portfolio</a></header>
  <main>
    <h1>${escape(title)}</h1>
    ${body}
  </main>
</body>
</html>
`;
}

export async function generateStaticContent(outputDir: string) {
  const caseSummaries = `<ol>${CASE_STUDIES.map((study) =>
    `<li id="${escape(study.id)}"><a href="${casePath(study.id)}">${escape(study.title)}</a><p>${escape(study.summaryLine)}</p></li>`,
  ).join('\n')}</ol>`;

  const homepagePath = join(outputDir, 'index.html');
  const homepage = await readFile(homepagePath, 'utf8');
  const fallback = `<noscript>
    <style>${styles}</style>
    <main>
      <h1>${escape(PROFILE.displayName)}</h1>
      <p><strong>${escape(enMYUi.hero.positioningTitle)}</strong></p>
      <p>${escape(PROFILE.intro)}</p>
      <p><a href="mailto:${escape(PROFILE.email)}">${escape(PROFILE.email)}</a> · <a href="${escape(PROFILE.linkedIn)}">LinkedIn</a></p>
      <h2>Selected Work</h2>
      ${caseSummaries}
      <h2>Experience</h2>
      <ul>${EXPERIENCES.map((role) => `<li><strong>${escape(role.role)} · ${escape(role.organization)}</strong> (${escape(role.period)})<br>${escape(role.summary)}</li>`).join('\n')}</ul>
      <h2>Education, Credentials &amp; Learning</h2>
      <ul>
        <li>${escape(EDUCATION.degree)} · ${escape(EDUCATION.institution)}</li>
        ${CERTIFICATIONS.map((entry) => `<li>${escape(entry.name)} · ${escape(entry.kindLabel)}</li>`).join('\n')}
        ${LEARNING_ENTRIES.map((entry) => `<li>${escape(entry.status)} · ${escape(entry.topic)}</li>`).join('\n')}
      </ul>
    </main>
  </noscript>`;

  if (!/<noscript>.*?<\/noscript>/s.test(homepage)) throw new Error('Missing homepage no-script fallback');
  await writeFile(homepagePath, homepage.replace(/<noscript>.*?<\/noscript>/s, () => fallback));

  const casesDir = join(outputDir, 'cases');
  await mkdir(casesDir, { recursive: true });
  await writeFile(join(casesDir, 'index.html'), page('Technical case studies', PROFILE.intro, caseDirectory, `<p>${escape(PROFILE.intro)}</p>${caseSummaries}`));

  await Promise.all(CASE_STUDIES.map(async (study) => {
    const evidence = CASE_METADATA[study.id].evidence;
    const finding = evidence === 'investigation' || evidence === 'assessment';
    const body = `
      <p>${escape(study.organization)} · ${escape(enMYUi.caseExplorer.evidence[evidence])}</p>
      <p>${escape(study.summaryLine)}</p>
      <h2>Technical challenge</h2><p>${escape(study.situation)}</p>
      <h2>My contribution</h2><p>${escape(study.responsibility)}</p>
      <h2>${finding ? 'Findings' : escape(study.outcomeLabel)}</h2><p>${escape(study.outcome)}</p>
      <p><a href="/#${escape(study.id)}">Open the interactive case study</a> · <a href="${caseDirectory}">All technical cases</a></p>`;
    await writeFile(join(casesDir, `${study.id}.html`), page(study.title, study.summaryLine, casePath(study.id), body));
  }));

  const pages = ['/', caseDirectory, ...CASE_STUDIES.map((study) => casePath(study.id))];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${site}${path}</loc></url>`).join('\n')}
</urlset>
`;
  const commit = process.env.VERCEL_GIT_COMMIT_SHA;
  await Promise.all([
    writeFile(join(outputDir, 'sitemap.xml'), sitemap),
    writeFile(join(outputDir, 'build-info.json'), JSON.stringify({
      commit: commit && /^[a-f0-9]{40}$/i.test(commit) ? commit : null,
      caseCount: CASE_STUDIES.length,
    }) + '\n'),
  ]);
}
