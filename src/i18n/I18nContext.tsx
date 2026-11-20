import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CASE_STUDIES,
  CERTIFICATIONS,
  CONSTELLATION_CATEGORIES,
  EDGES,
  EDUCATION,
  EVIDENCE_META,
  EXPERIENCES,
  LEARNING_ENTRIES,
  NODES,
  PROFILE,
  SKILL_GROUPS,
  STRATA,
  type CaseStudy,
  type CertificationEntry,
  type ConstellationCategory,
  type EducationEntry,
  type EvidenceStatus,
  type ExperienceEntry,
  type LearningEntry,
  type ProfileData,
  type SkillGroup,
  type StratumDef,
  type UniverseEdge,
  type UniverseNode,
} from '../data/universeContent';
import {
  buildUrlWithLocale,
  DEFAULT_LOCALE,
  formatTemplate,
  getLocaleMeta,
  resolveLocale,
  SUPPORTED_LOCALES,
  writeStoredLocale,
} from './config';
import { enMYBundle, enMYContent, enMYUi } from './translations/en-MY';
import { msMYBundle } from './translations/ms-MY';
import { taMYBundle } from './translations/ta-MY';
import { zhHansMYBundle } from './translations/zh-Hans-MY';
import type {
  LocaleBundle,
  LocaleMeta,
  PortfolioContentTranslations,
  SupportedLocale,
  UiTranslations,
} from './types';

const BUNDLES: Record<SupportedLocale, LocaleBundle> = {
  'en-MY': enMYBundle,
  'ms-MY': msMYBundle,
  'zh-Hans-MY': zhHansMYBundle,
  'ta-MY': taMYBundle,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(fallback: T, override: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(override) ? override : fallback) as unknown as T;
  }
  if (!isPlainObject(fallback)) {
    return (override !== undefined ? override : fallback) as T;
  }
  const overrideObj = isPlainObject(override) ? override : {};
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(fallback)) {
    result[key] = deepMerge(fallback[key], overrideObj[key]);
  }
  for (const key of Object.keys(overrideObj)) {
    if (!(key in result) && overrideObj[key] !== undefined) {
      result[key] = overrideObj[key];
    }
  }
  return result as T;
}

export interface MergedPortfolioContent {
  profile: ProfileData;
  skillGroups: SkillGroup[];
  experiences: ExperienceEntry[];
  caseStudies: CaseStudy[];
  education: EducationEntry;
  certifications: CertificationEntry[];
  learning: LearningEntry[];
  evidenceMeta: Record<EvidenceStatus, { label: string; glyph: string; description: string }>;
  constellationCategories: Record<ConstellationCategory, string>;
  strata: StratumDef[];
  nodes: UniverseNode[];
  edges: UniverseEdge[];
}

function mergeContent(translations: PortfolioContentTranslations): MergedPortfolioContent {
  const safe = deepMerge(enMYContent, translations);

  const profile: ProfileData = {
    fullName: PROFILE.fullName,
    displayName: PROFILE.displayName,
    currentCompany: PROFILE.currentCompany,
    email: PROFILE.email,
    linkedIn: PROFILE.linkedIn,
    title: safe.profile.title,
    currentRole: safe.profile.currentRole,
    location: safe.profile.location,
    intro: safe.profile.intro,
    resumeSummary: safe.profile.resumeSummary,
    availabilityNote: safe.profile.availabilityNote,
  };

  const skillGroups: SkillGroup[] = SKILL_GROUPS.map((group) => {
    const tr = safe.skillGroups[group.id];
    return {
      id: group.id,
      title: tr?.title ?? group.title,
      items: tr?.items ?? group.items,
    };
  });

  const experiences: ExperienceEntry[] = EXPERIENCES.map((exp) => {
    const tr = safe.experiences[exp.id];
    return {
      ...exp,
      role: tr?.role ?? exp.role,
      organization: tr?.organization ?? exp.organization,
      period: tr?.period ?? exp.period,
      compactPeriod: tr?.compactPeriod ?? exp.compactPeriod,
      location: tr?.location ?? exp.location,
      summary: tr?.summary ?? exp.summary,
      highlights: tr?.highlights ?? exp.highlights,
      technologies: tr?.technologies ?? exp.technologies,
    };
  });

  const caseStudies: CaseStudy[] = CASE_STUDIES.map((cs) => {
    const tr = safe.caseStudies[cs.id];
    return {
      ...cs,
      title: tr?.title ?? cs.title,
      organization: tr?.organization ?? cs.organization,
      roleScope: tr?.roleScope ?? cs.roleScope,
      summaryLine: tr?.summaryLine ?? cs.summaryLine,
      workflowSteps: tr?.workflowSteps ?? cs.workflowSteps,
      situation: tr?.situation ?? cs.situation,
      responsibility: tr?.responsibility ?? cs.responsibility,
      whatIDid: tr?.whatIDid ?? cs.whatIDid,
      triageBreakdown: tr?.triageBreakdown ?? cs.triageBreakdown,
      outcomeLabel: (tr?.outcomeLabel as CaseStudy['outcomeLabel']) ?? cs.outcomeLabel,
      outcome: tr?.outcome ?? cs.outcome,
      technologies: tr?.technologies ?? cs.technologies,
    };
  });

  const education: EducationEntry = {
    degree: safe.education.degree ?? EDUCATION.degree,
    institution: safe.education.institution ?? EDUCATION.institution,
    period: safe.education.period ?? EDUCATION.period,
    focus: safe.education.focus ?? EDUCATION.focus,
  };

  const certifications: CertificationEntry[] = CERTIFICATIONS.map((cert) => {
    const tr = safe.certifications[cert.id];
    return {
      ...cert,
      name: tr?.name ?? cert.name,
      issuer: tr?.issuer ?? cert.issuer,
      kindLabel: (tr?.kindLabel as CertificationEntry['kindLabel']) ?? cert.kindLabel,
      note: tr?.note ?? cert.note,
    };
  });

  const learning: LearningEntry[] = LEARNING_ENTRIES.map((entry) => {
    const tr = safe.learning[entry.id];
    return {
      ...entry,
      topic: tr?.topic ?? entry.topic,
      status: (tr?.status as LearningEntry['status']) ?? entry.status,
      note: tr?.note ?? entry.note,
    };
  });

  const evidenceMeta: Record<EvidenceStatus, { label: string; glyph: string; description: string }> = {
    professional: {
      glyph: EVIDENCE_META.professional.glyph,
      label: safe.evidenceMeta.professional.label,
      description: safe.evidenceMeta.professional.description,
    },
    project: {
      glyph: EVIDENCE_META.project.glyph,
      label: safe.evidenceMeta.project.label,
      description: safe.evidenceMeta.project.description,
    },
    learning: {
      glyph: EVIDENCE_META.learning.glyph,
      label: safe.evidenceMeta.learning.label,
      description: safe.evidenceMeta.learning.description,
    },
  };

  const constellationCategories = {} as Record<ConstellationCategory, string>;
  for (const cat of CONSTELLATION_CATEGORIES) {
    constellationCategories[cat] = safe.constellationCategories[cat] ?? cat;
  }

  const strata: StratumDef[] = STRATA.map((st) => {
    const tr = safe.strata[st.id];
    return {
      ...st,
      title: tr?.title ?? st.title,
      subtitle: tr?.subtitle ?? st.subtitle,
      description: tr?.description ?? st.description,
      exampleStage: tr?.exampleStage ?? st.exampleStage,
      examplePayload: tr?.examplePayload ?? st.examplePayload,
      whatHappensConceptually: tr?.whatHappensConceptually ?? st.whatHappensConceptually,
      exampleComponents: tr?.exampleComponents ?? st.exampleComponents,
    };
  });

  const nodes: UniverseNode[] = NODES.map((node) => {
    const tr = safe.nodes[node.id];
    return {
      ...node,
      label: tr?.label ?? node.label,
      summary: tr?.summary ?? node.summary,
      usage: tr?.usage ?? node.usage,
      year: tr?.year ?? node.year,
    };
  });

  const edges: UniverseEdge[] = EDGES.map((edge, idx) => ({
    from: edge.from,
    to: edge.to,
    reason: safe.edges[idx] ?? edge.reason,
  }));

  return {
    profile,
    skillGroups,
    experiences,
    caseStudies,
    education,
    certifications,
    learning,
    evidenceMeta,
    constellationCategories,
    strata,
    nodes,
    edges,
  };
}

export interface I18nContextValue {
  locale: SupportedLocale;
  localeMeta: LocaleMeta;
  supportedLocales: readonly LocaleMeta[];
  setLocale: (nextLocale: SupportedLocale) => void;
  t: UiTranslations;
  content: MergedPortfolioContent;
  format: (template: string, values: Record<string, string | number>) => string;
}

const DEFAULT_MERGED_CONTENT = mergeContent(enMYContent);

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  localeMeta: getLocaleMeta(DEFAULT_LOCALE),
  supportedLocales: SUPPORTED_LOCALES,
  setLocale: () => {},
  t: enMYUi,
  content: DEFAULT_MERGED_CONTENT,
  format: formatTemplate,
});

function updateDocumentMetadata(meta: LocaleMeta, metadataUi: UiTranslations['metadata']) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  document.title = metadataUi.title;

  const setMetaContent = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', metadataUi.description);
  setMetaContent('meta[property="og:title"]', metadataUi.title);
  setMetaContent('meta[property="og:description"]', metadataUi.description);
  setMetaContent('meta[name="twitter:title"]', metadataUi.title);
  setMetaContent('meta[name="twitter:description"]', metadataUi.description);
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => resolveLocale());
  const [announcement, setAnnouncement] = useState('');

  const bundle = BUNDLES[locale] || enMYBundle;
  const localeMeta = getLocaleMeta(locale);

  const t = useMemo(() => deepMerge(enMYUi, bundle.ui), [bundle.ui]);
  const content = useMemo(() => mergeContent(bundle.content), [bundle.content]);

  useEffect(() => {
    updateDocumentMetadata(localeMeta, t.metadata);
  }, [localeMeta, t.metadata]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const next = resolveLocale({ search: window.location.search });
      setLocaleState(next);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLocale = useCallback((nextLocale: SupportedLocale) => {
    const targetBundle = BUNDLES[nextLocale] || enMYBundle;
    const targetMeta = getLocaleMeta(nextLocale);
    const targetUi = deepMerge(enMYUi, targetBundle.ui);

    writeStoredLocale(nextLocale);
    setLocaleState(nextLocale);

    if (typeof window !== 'undefined') {
      try {
        const nextUrl = buildUrlWithLocale(window.location.href, nextLocale);
        window.history.replaceState({}, '', nextUrl);
      } catch {
        // Ignore history errors in restricted frames
      }
    }

    setAnnouncement(
      formatTemplate(targetUi.accessibility.languageChangedAnnouncement, {
        language: targetMeta.nativeLabel,
      })
    );
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      localeMeta,
      supportedLocales: SUPPORTED_LOCALES,
      setLocale,
      t,
      content,
      format: formatTemplate,
    }),
    [locale, localeMeta, setLocale, t, content]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
