/**
 * UNIVERSE CONTENT VALIDATION SCRIPT
 * Enforces provenance, evidence references, character limits, and graph integrity.
 */

import { NODES, EDGES, EXPERIENCES, CASE_STUDIES, PROFILE, STRATA } from '../src/data/universeContent';

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

console.log('='.repeat(60));
console.log('🌌 ARIES RAZAK - PERSONAL TECHNOLOGY UNIVERSE VALIDATION');
console.log('='.repeat(60));

// 1. Verify Profile Integrity
console.log('\n[1/5] Verifying Profile & Source of Truth...');
const forbiddenTitles = [
  'senior software engineer',
  'security specialist',
  'cloud engineer',
  'cloud architect',
  'lead architect',
  'principal engineer'
];

forbiddenTitles.forEach(title => {
  if (PROFILE.title.toLowerCase().includes(title)) {
    logError(`Profile title contains forbidden overclaimed title: "${title}"`);
  }
});
logSuccess(`Profile title verified: "${PROFILE.title}"`);
logSuccess(`Candidate verified: ${PROFILE.fullName} (${PROFILE.displayName})`);

// 2. Collect Valid Evidence IDs
const validEvidenceIds = new Set<string>();
EXPERIENCES.forEach(exp => validEvidenceIds.add(exp.id));
CASE_STUDIES.forEach(cs => validEvidenceIds.add(cs.id));
validEvidenceIds.add('exp-uitm');
validEvidenceIds.add('cert-aws');
validEvidenceIds.add('sim-network');
validEvidenceIds.add('sim-cache');
validEvidenceIds.add('sim-incident');

console.log(`\n[2/5] Checking ${NODES.length} Universe Nodes...`);
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

  // Check evidenceRef for 'professional' and 'project'
  if (node.status === 'professional' || node.status === 'project') {
    if (!node.evidenceRef) {
      logError(`Node ${node.id} has status '${node.status}' but is missing required 'evidenceRef'.`);
    } else if (!validEvidenceIds.has(node.evidenceRef)) {
      logError(`Node ${node.id} references invalid evidenceRef '${node.evidenceRef}'.`);
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
logSuccess(`All ${NODES.length} nodes validated against schema and evidence rules.`);

// 3. Check Edges Integrity
console.log(`\n[3/5] Checking ${EDGES.length} Universe Edges...`);
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

// 4. Check Strata Annotations
console.log('\n[4/5] Checking 6 Vertical Strata...');
STRATA.forEach(st => {
  st.annotationNodeIds.forEach(nId => {
    if (!nodeMap.has(nId)) {
      logError(`Stratum ${st.id} references non-existent annotation node '${nId}'`);
    }
  });
});
logSuccess(`All ${STRATA.length} strata have valid node annotations.`);

// 5. Statistics & Evidence Status Distribution
console.log('\n[5/5] Content Breakdown:');
const statusCounts: Record<string, number> = {};
NODES.forEach(n => {
  statusCounts[n.status] = (statusCounts[n.status] || 0) + 1;
});

Object.entries(statusCounts).forEach(([st, cnt]) => {
  console.log(`  • Status '${st}': ${cnt} nodes`);
});
console.log(`  • Total Experiences: ${EXPERIENCES.length}`);
console.log(`  • Total Case Studies: ${CASE_STUDIES.length}`);
console.log(`  • Total Nodes: ${NODES.length}`);
console.log(`  • Total Edges: ${EDGES.length}`);

console.log('\n' + '='.repeat(60));
if (errorCount === 0) {
  console.log(`🎉 VALIDATION PASSED with 0 errors and ${warningCount} warnings.`);
  console.log('='.repeat(60));
  process.exit(0);
} else {
  console.error(`💥 VALIDATION FAILED with ${errorCount} errors and ${warningCount} warnings.`);
  console.log('='.repeat(60));
  process.exit(1);
}
