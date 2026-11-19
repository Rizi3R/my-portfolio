/**
 * UNIVERSE CONTENT VALIDATION SCRIPT (TRUTHFULNESS & COPY SANITY CHECKER)
 *
 * Enforces:
 * - Zero em dashes (U+2014) anywhere in universeContent.ts.
 * - Zero superseded dates or banned technical exaggerations.
 * - Valid evidence references (evidenceRef) and usage strings on work/project nodes.
 * - Max character limits: summary <= 200 chars, edge reason <= 120 chars.
 * - Strict isolation of UiPath & RPA as 'learning'.
 */

import {
  NODES,
  EDGES,
  EXPERIENCES,
  CASE_STUDIES,
  PROFILE,
  STRATA,
  LEARNING_ENTRIES,
  CERTIFICATIONS,
  CORE_CAPABILITIES,
  ABOUT_APPROACH,
  ABOUT_SUMMARY,
} from '../src/data/universeContent';

let errorCount = 0;
let warningCount = 0;

function logError(msg: string) {
  console.error(`❌ [ERROR] ${msg}`);
  errorCount++;
}

function logWarning(msg: string) {
  console.warn(`⚠️ [WARN]  ${msg}`);
  warningCount++;
}

function logSuccess(msg: string) {
  console.log(`✅ [PASS]  ${msg}`);
}

console.log('='.repeat(65));
console.log('ARIES RAZAK - PORTFOLIO CONTENT & TRUTHFULNESS VALIDATOR');
console.log('='.repeat(65));

// 1. Verify Profile Integrity & Confirmed HWC Dates
console.log('\n[1/7] Verifying Profile, Title & Confirmed Employment Dates...');
const forbiddenTitles = [
  'senior software engineer',
  'security specialist',
  'cloud engineer',
  'cloud architect',
  'lead architect',
  'principal engineer',
  'rpa developer',
];

forbiddenTitles.forEach((title) => {
  if (PROFILE.title.toLowerCase().includes(title)) {
    logError(`Profile title contains forbidden overclaimed title: "${title}"`);
  }
});

const hwcRole = EXPERIENCES.find((e) => e.id === 'exp-hwc');
if (!hwcRole || hwcRole.period !== 'March 2024 to September 2025') {
  logError('HWC Coffee employment period must equal "March 2024 to September 2025".');
}
if (!hwcRole || hwcRole.role !== 'IT Support | HWC Coffee Malaysia') {
  logError('HWC Coffee public role label must equal "IT Support | HWC Coffee Malaysia".');
}

logSuccess(`Profile descriptor: "${PROFILE.title}"`);
logSuccess(`Candidate: ${PROFILE.fullName} (${PROFILE.displayName})`);
logSuccess(`HWC Coffee dates verified: ${hwcRole?.period}`);

// 2. Zero Em-Dash & Unconfirmed Claims Scanner
console.log('\n[2/7] Scanning for Em Dashes & Unconfirmed Career Claims...');
const serializedContent = JSON.stringify({
  PROFILE,
  CORE_CAPABILITIES,
  ABOUT_SUMMARY,
  ABOUT_APPROACH,
  EXPERIENCES,
  CASE_STUDIES,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
  NODES,
  EDGES,
  STRATA,
});

if (serializedContent.includes('\u2014')) {
  logError('Em dash (U+2014) found in universeContent.ts! Remove all em dashes.');
} else {
  logSuccess('Zero em dashes (U+2014) detected in content model.');
}

const bannedCareerStrings = [
  '802.1q',
  'vlan',
  'dual-wan',
  'failover',
  'iso 8583',
  'mti 0100',
  'mti 0110',
  'sqlite',
  'baud rate',
  'rs-232',
  't-568b',
  'ingenico',
  'event viewer',
  'dhcp diagnostic',
  '3nf',
  'zero launch delay',
  'zero downtime',
  '100% operational readiness',
  'accelerated vendor resolution',
  'minimal ticket backlog',
  'reduced approval turnaround',
  'reduced repeat service calls',
  '100% verified',
  'evidence traceability',
  'enterprise transformation',
  'expert across industries',
  'april 2024 to august 2025',
  'apr 2024 to aug 2025',
  'plain spec',
  'l1-l3',
  'l1–l3',
  'tier 2',
  'tier 3',
  'itil 4',
  'linux internals',
];

const careerOnlyJson = JSON.stringify({
  PROFILE,
  CORE_CAPABILITIES,
  ABOUT_SUMMARY,
  ABOUT_APPROACH,
  EXPERIENCES,
  CASE_STUDIES,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
  NODES,
  EDGES,
}).toLowerCase();

bannedCareerStrings.forEach((phrase) => {
  if (careerOnlyJson.includes(phrase)) {
    logError(`Unconfirmed or superseded claim found in career content: "${phrase}"`);
  }
});
logSuccess('Zero unconfirmed claims, superseded dates, or banned strings found.');

// 3. Prohibited Rating Fields Audit
console.log('\n[3/7] Auditing Against Prohibited Rating & Progress Fields...');
const prohibitedFields = [
  'proficiency',
  'percentage',
  'rating',
  'progress',
  'score',
  'stars',
  'levelScore',
];

NODES.forEach((node) => {
  const record = node as unknown as Record<string, unknown>;
  prohibitedFields.forEach((field) => {
    if (record[field] !== undefined) {
      logError(`Node ${node.id} contains prohibited field: "${field}"`);
    }
  });
});
logSuccess('Zero proficiency percentages or rating fields in nodes.');

// 4. Mastery Words & Case Ordering Check
console.log('\n[4/7] Checking Case Study Ordering & Tone...');
if (CASE_STUDIES[0]?.id !== 'case-lark-migration') {
  logError('First case study must be Google Workspace to Lark migration (case-lark-migration).');
}
if (CASE_STUDIES[1]?.id !== 'case-integrations') {
  logError('Second case study must be Third-Party Integrations & Application Configuration (case-integrations).');
}
if (CASE_STUDIES[2]?.id !== 'case-pos-triage') {
  logError('Third case study must be Application incident triage (case-pos-triage).');
}
if (CASE_STUDIES[3]?.id !== 'case-store-launch') {
  logError('Fourth case study must be New-site IT readiness (case-store-launch).');
}
const larkCaseJson = JSON.stringify(CASE_STUDIES[0] || {}).toLowerCase();
if (larkCaseJson.includes('netsuite') || larkCaseJson.includes('excel')) {
  logError('Case 1 (Lark migration) should not mention Excel/NetSuite unless migration-related.');
}

const masteryWords = ['expert', 'advanced', 'proficient', 'mastery', 'extensive'];
NODES.forEach((node) => {
  const combined = `${node.label} ${node.summary} ${node.usage || ''}`.toLowerCase();
  masteryWords.forEach((word) => {
    if (combined.includes(word)) {
      logWarning(`Node ${node.id} contains "${word}" - verify tone.`);
    }
  });
});
logSuccess('Case study priority order and tone verified.');

// 5. Verify Nodes EvidenceRef & Usage
console.log(`\n[5/7] Checking ${NODES.length} Skill Nodes (EvidenceRef & Usage)...`);
const validEvidenceIds = new Set<string>();
EXPERIENCES.forEach((exp) => validEvidenceIds.add(exp.id));
CASE_STUDIES.forEach((cs) => validEvidenceIds.add(cs.id));
validEvidenceIds.add('exp-uitm');
validEvidenceIds.add('cert-aws');
validEvidenceIds.add('cert-ai-teach');

const nodeMap = new Map<string, (typeof NODES)[0]>();

NODES.forEach((node) => {
  if (nodeMap.has(node.id)) {
    logError(`Duplicate node ID detected: ${node.id}`);
  }
  nodeMap.set(node.id, node);

  if (!node.summary || node.summary.trim() === '') {
    logError(`Node ${node.id} has empty summary.`);
  } else if (node.summary.length > 200) {
    logError(`Node ${node.id} summary exceeds 200 characters (${node.summary.length}).`);
  }

  if (node.status === 'professional' || node.status === 'project') {
    if (!node.evidenceRef || !validEvidenceIds.has(node.evidenceRef)) {
      logError(`Node ${node.id} has invalid/missing evidenceRef: '${node.evidenceRef}'.`);
    }
    if (!node.usage || node.usage.trim() === '') {
      logError(`Node ${node.id} missing required usage statement.`);
    }
  }

  if (node.x < 0 || node.x > 100 || node.y < 0 || node.y > 100) {
    logError(`Node ${node.id} coordinates out of bounds: (${node.x}, ${node.y})`);
  }

  const validStrata = STRATA.map((s) => s.id);
  if (!validStrata.includes(node.stratum)) {
    logError(`Node ${node.id} has invalid stratum '${node.stratum}'.`);
  }
});
logSuccess(`All ${NODES.length} nodes validated.`);

// 6. Verify UiPath & RPA Isolation Rule
console.log('\n[6/7] Verifying UiPath & RPA Isolation...');
const rpaNode = NODES.find((n) => n.id === 'node-uipath-rpa');
if (!rpaNode || rpaNode.status !== 'learning' || rpaNode.kind === 'role' || rpaNode.kind === 'project') {
  logError('UiPath/RPA node must exist with status "learning" and non-role/non-project kind.');
}
const rpaLearningEntry = LEARNING_ENTRIES.find((e) => e.id === 'learning-uipath-rpa');
if (
  !rpaLearningEntry ||
  !rpaLearningEntry.note.includes('Currently learning UiPath and exploring Robotic Process Automation (RPA)')
) {
  logError('UiPath learning entry missing or unapproved copy.');
}
logSuccess('UiPath & RPA strictly isolated to Currently Learning.');

// 7. Verify Edges Integrity
console.log(`\n[7/7] Checking ${EDGES.length} Constellation Edges...`);
EDGES.forEach((edge, idx) => {
  if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) {
    logError(`Edge #${idx} references missing node (${edge.from} -> ${edge.to}).`);
  }
  if (!edge.reason || edge.reason.trim() === '' || edge.reason.length > 120) {
    logError(`Edge #${idx} reason invalid or >120 chars.`);
  }
});
logSuccess(`All ${EDGES.length} edges validated.`);

console.log('\n' + '='.repeat(65));
if (errorCount === 0) {
  console.log(`VALIDATION PASSED with 0 errors and ${warningCount} warnings.`);
  console.log('='.repeat(65));
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED with ${errorCount} errors and ${warningCount} warnings.`);
  console.log('='.repeat(65));
  process.exit(1);
}
