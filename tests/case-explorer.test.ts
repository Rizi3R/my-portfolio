import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_METADATA, EMPTY_CASE_FILTERS, findCases } from '../src/data/caseExplorer';
import { CASE_STUDIES } from '../src/data/universeContent';

const labels = (metadata: (typeof CASE_METADATA)[string]) =>
  metadata.roles.includes('saasSupport') ? ['SaaS Support'] : [];

test('the explorer preserves all case URLs and features the two completed technical incidents first', () => {
  const results = findCases(CASE_STUDIES, EMPTY_CASE_FILTERS, labels);
  assert.deepEqual(results.slice(0, 2).map((study) => study.id), [
    'case-voucher-configuration', 'case-transaction-recovery',
  ]);
  assert.deepEqual(new Set(results.map((study) => study.id)), new Set(CASE_STUDIES.map((study) => study.id)));
});

test('search combines normalised technology and skill terms with domain and type filters', () => {
  const results = findCases(CASE_STUDIES, {
    query: ' ＳａａＳ   OneDrive ',
    domain: 'workplace',
    type: 'incident',
  }, labels);
  assert.deepEqual(results.map((study) => study.id), ['case-m365-access-sync']);
});

test('filters exclude incompatible evidence and return an empty collection for unmatched input', () => {
  const filters = { query: 'Xilnex', domain: 'infrastructure', type: 'assessment' };
  assert.deepEqual(findCases(CASE_STUDIES, filters, labels), []);
  const cases = findCases(CASE_STUDIES, { ...EMPTY_CASE_FILTERS, type: 'assessment' }, labels);
  assert.ok(cases.length > 0);
  assert.ok(cases.every((study) => CASE_METADATA[study.id].evidence === 'assessment'));
});
