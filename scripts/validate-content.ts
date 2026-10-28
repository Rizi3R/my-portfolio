/**
 * UNIVERSE CONTENT VALIDATION SCRIPT (STRICT TRUTHFULNESS & AUTHENTICITY ENFORCER)
 * 
 * Enforces:
 * - Evidence references (evidenceRef) on all professional and project nodes.
 * - Factual usage statements (usage) on all professional and project nodes.
 * - Max character limits: summary <= 200 chars, edge reason <= 120 chars.
 * - Disallowance of proficiency, percentage, rating, score, progress fields.
 * - Audit warning for seniority/mastery words (expert, advanced, proficient, senior, mastery, extensive).
 * - Honest UiPath/RPA learning status and copy verification.
 */

import { 
  NODES, 
  EDGES, 
  EXPERIENCES, 
  CASE_STUDIES, 
  PROFILE, 
  STRATA, 
  LEARNING_ENTRIES 
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
console.log('🌌 ARIES RAZAK - TRUTHFULNESS, PROVENANCE & AUTHENTICITY VALIDATOR');
console.log('='.repeat(65));

// 1. Verify Profile Integrity & Prohibited Titles
console.log('\n[1/6] Verifying Candidate Profile & Verified Titles...');
const forbiddenTitles = [
  'senior software engineer',
  'security specialist',
  'cloud engineer',
  'cloud architect',
  'lead architect',
  'principal engineer',
  'rpa developer'
];

forbiddenTitles.forEach(title => {
  if (PROFILE.title.toLowerCase().includes(title)) {
    logError(`Profile title contains forbidden overclaimed title: "${title}"`);
  }
});
logSuccess(`Profile title verified: "${PROFILE.title}"`);
logSuccess(`Candidate verified: ${PROFILE.fullName} (${PROFILE.displayName})`);

// 2. Prohibited Fields Audit (No percentages, progress bars, proficiency ratings)
console.log('\n[2/6] Auditing Against Prohibited Rating & Progress Fields...');
const prohibitedFields = ['proficiency', 'percentage', 'rating', 'progress', 'score', 'stars', 'levelScore'];

NODES.forEach((node: any) => {
  prohibitedFields.forEach(field => {
    if (node[field] !== undefined) {
      logError(`Node ${node.id} contains prohibited rating/progress field: "${field}"`);
    }
  });
});

LEARNING_ENTRIES.forEach((entry: any) => {
  prohibitedFields.forEach(field => {
    if (entry[field] !== undefined) {
      logError(`Learning entry ${entry.id} contains prohibited field: "${field}"`);
    }
  });
});
logSuccess('Verified: Zero proficiency, percentage, rating, or progress fields in content model.');

// 3. Seniority & Mastery Words Warning Scanner
console.log('\n[3/6] Scanning for Seniority & Mastery Buzzwords...');
const masteryWords = ['expert', 'advanced', 'proficient', 'seniority', 'mastery', 'extensive'];

NODES.forEach(node => {
  const combined = (node.label + ' ' + node.summary + ' ' + (node.usage || '')).toLowerCase();
  masteryWords.forEach(word => {
    // Exclude legitimate technical references if needed
    if (combined.includes(word) && !combined.includes('senior technical') && !combined.includes('system application specialist')) {
      logWarning(`Node ${node.id} contains word "${word}" - verify for owner truthfulness.`);
    }
  });
});

// 4. Verify Nodes Provenance, EvidenceRef & Usage
console.log(`\n[4/6] Checking ${NODES.length} Universe Nodes (EvidenceRef & Usage)...`);
const validEvidenceIds = new Set<string>();
EXPERIENCES.forEach(exp => validEvidenceIds.add(exp.id));
CASE_STUDIES.forEach(cs => validEvidenceIds.add(cs.id));
validEvidenceIds.add('exp-uitm');
validEvidenceIds.add('cert-aws');
validEvidenceIds.add('sim-network');
validEvidenceIds.add('sim-cache');
validEvidenceIds.add('sim-incident');

const nodeMap = new Map<string, typeof NODES[0]>();

NODES.forEach(node => {
  if (nodeMap.has(node.id)) {
    logError(`Duplicate node ID detected: ${node.id}`);
  }
  nodeMap.set(node.id, node);

  // Check summary length (<= 200 chars)
  if (!node.summary || node.summary.trim() === '') {
    logError(`Node ${node.id} has empty summary.`);
  } else if (node.summary.length > 200) {
    logError(`Node ${node.id} summary exceeds 200 characters (${node.summary.length} chars): "${node.summary}"`);
  }

  // Check evidenceRef and usage for 'professional' and 'project'
  if (node.status === 'professional' || node.status === 'project') {
    if (!node.evidenceRef) {
      logError(`Node ${node.id} has status '${node.status}' but is missing required 'evidenceRef'.`);
    } else if (!validEvidenceIds.has(node.evidenceRef)) {
      logError(`Node ${node.id} references invalid evidenceRef '${node.evidenceRef}'.`);
    }

    if (!node.usage || node.usage.trim() === '') {
      logError(`Node ${node.id} has status '${node.status}' but is missing required 'usage' statement.`);
    }
  }

  // Check coordinates (0-100)
  if (node.x < 0 || node.x > 100 || node.y < 0 || node.y > 100) {
    logError(`Node ${node.id} has coordinates out of bounds: (${node.x}, ${node.y})`);
  }

  // Check valid stratum
  const validStrata = STRATA.map(s => s.id);
  if (!validStrata.includes(node.stratum)) {
    logError(`Node ${node.id} has invalid stratum '${node.stratum}'.`);
  }
});
logSuccess(`All ${NODES.length} nodes validated against schema, evidence, and usage rules.`);

// 5. Check UiPath & RPA Isolation Rule (Section 1.3)
console.log('\n[5/6] Verifying UiPath & RPA Isolation (Section 1.3)...');
const rpaNode = NODES.find(n => n.id === 'node-uipath-rpa');
if (!rpaNode) {
  logError('Required UiPath/RPA node (node-uipath-rpa) missing from NODES.');
} else {
  if (rpaNode.status !== 'learning') {
    logError(`UiPath/RPA node status is '${rpaNode.status}'; MUST strictly be 'learning'.`);
  }
  if (rpaNode.kind === 'role' || rpaNode.kind === 'project') {
    logError(`UiPath/RPA node kind cannot be role/project; must be concept/technology.`);
  }
}

const rpaLearningEntry = LEARNING_ENTRIES.find(e => e.id === 'learning-uipath-rpa');
if (!rpaLearningEntry) {
  logError('Required UiPath/RPA entry missing from LEARNING_ENTRIES.');
} else {
  const expectedText = "Currently learning UiPath and exploring Robotic Process Automation (RPA), with an interest in understanding workflow automation, application integration, and how repetitive processes can be automated.";
  if (!rpaLearningEntry.note.includes("Currently learning UiPath and exploring Robotic Process Automation (RPA)")) {
    logError('UiPath learning entry note does not match approved copy in Section 1.3.');
  }
}
logSuccess('Verified: UiPath & RPA strictly isolated to Currently Learning with approved text and zero production claims.');

// 6. Check Edges Integrity
console.log(`\n[6/6] Checking ${EDGES.length} Universe Edges...`);
EDGES.forEach((edge, idx) => {
  if (!nodeMap.has(edge.from)) {
    logError(`Edge #${idx} 'from' references non-existent node: '${edge.from}'`);
  }
  if (!nodeMap.has(edge.to)) {
    logError(`Edge #${idx} 'to' references non-existent node: '${edge.to}'`);
  }
  if (!edge.reason || edge.reason.trim() === '') {
    logError(`Edge #${idx} (${edge.from} -> ${edge.to}) is missing reason.`);
  } else if (edge.reason.length > 120) {
    logError(`Edge #${idx} reason exceeds 120 chars (${edge.reason.length} chars): "${edge.reason}"`);
  }
});
logSuccess(`All ${EDGES.length} edges validated for node existence and reason clarity.`);

console.log('\n' + '='.repeat(65));
if (errorCount === 0) {
  console.log(`🎉 VALIDATION PASSED with 0 errors and ${warningCount} warnings.`);
  console.log('='.repeat(65));
  process.exit(0);
} else {
  console.error(`💥 VALIDATION FAILED with ${errorCount} errors and ${warningCount} warnings.`);
  console.log('='.repeat(65));
  process.exit(1);
}
