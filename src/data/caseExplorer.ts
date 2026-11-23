import type { CaseStudy } from './universeContent';

export const CASE_DOMAINS = ['applications', 'integration', 'workplace', 'infrastructure', 'operations', 'reporting', 'evaluation'] as const;
export const CASE_TYPES = ['incident', 'project', 'assessment'] as const;
export const CASE_EVIDENCE = ['resolved', 'vendorRecovery', 'delivered', 'investigation', 'assessment'] as const;
export const CASE_ROLES = ['applicationSupport', 'integrationSupport', 'saasSupport', 'itOperations', 'infrastructureSupport', 'serviceDesk', 'businessSystems'] as const;
export const CASE_STAGES = ['diagnose', 'correct', 'verify', 'escalate', 'coordinate'] as const;

type Domain = (typeof CASE_DOMAINS)[number];
type CaseType = (typeof CASE_TYPES)[number];
type Evidence = (typeof CASE_EVIDENCE)[number];
type Role = (typeof CASE_ROLES)[number];
type Stage = (typeof CASE_STAGES)[number];

interface CaseMetadata {
  domain: Domain;
  type: CaseType;
  evidence: Evidence;
  skills: readonly string[];
  roles: readonly Role[];
  timeline?: readonly Stage[];
  compact?: boolean;
}

// In presentation order. Canonical case ordering remains available to other views.
export const CASE_METADATA: Record<string, CaseMetadata> = {
  'case-voucher-configuration': { domain: 'applications', type: 'incident', evidence: 'resolved', skills: ['node-xilnex-pos'], roles: ['applicationSupport', 'businessSystems'], timeline: ['diagnose', 'correct', 'verify'] },
  'case-transaction-recovery': { domain: 'integration', type: 'incident', evidence: 'vendorRecovery', skills: ['node-xilnex-pos', 'node-vendor-escalation'], roles: ['integrationSupport', 'applicationSupport'], timeline: ['escalate', 'coordinate', 'verify'] },
  'case-lark-migration': { domain: 'workplace', type: 'project', evidence: 'delivered', skills: ['node-gws-migration', 'node-lark-admin'], roles: ['saasSupport', 'businessSystems'] },
  'case-integrations': { domain: 'integration', type: 'project', evidence: 'delivered', skills: ['node-delivery-integrations'], roles: ['integrationSupport', 'businessSystems'] },
  'case-pos-triage': { domain: 'applications', type: 'incident', evidence: 'investigation', skills: ['node-xilnex-pos', 'node-vendor-escalation'], roles: ['applicationSupport', 'serviceDesk'] },
  'case-promotion-import': { domain: 'operations', type: 'project', evidence: 'delivered', skills: ['node-excel-netsuite'], roles: ['businessSystems', 'itOperations'] },
  'case-store-launch': { domain: 'infrastructure', type: 'project', evidence: 'delivered', skills: ['node-pos-peripherals', 'node-lan-cabling'], roles: ['infrastructureSupport', 'itOperations'] },
  'case-api-error-traces': { domain: 'integration', type: 'incident', evidence: 'investigation', skills: ['node-xilnex-pos', 'node-vendor-escalation'], roles: ['integrationSupport', 'applicationSupport'], compact: true },
  'case-payment-settlement': { domain: 'applications', type: 'incident', evidence: 'investigation', skills: ['node-xilnex-pos'], roles: ['applicationSupport', 'itOperations'], compact: true },
  'case-m365-access-sync': { domain: 'workplace', type: 'incident', evidence: 'investigation', skills: ['node-m365-provisioning'], roles: ['saasSupport', 'serviceDesk'], compact: true },
  'case-network-connectivity': { domain: 'infrastructure', type: 'incident', evidence: 'investigation', skills: ['node-lan-cabling', 'node-remote-helpdesk'], roles: ['infrastructureSupport', 'itOperations'], compact: true },
  'case-service-reporting': { domain: 'reporting', type: 'assessment', evidence: 'assessment', skills: ['node-excel-netsuite'], roles: ['itOperations', 'businessSystems'], compact: true },
  'case-architecture-evaluation': { domain: 'evaluation', type: 'assessment', evidence: 'assessment', skills: ['node-delivery-integrations'], roles: ['integrationSupport', 'businessSystems'], compact: true },
};

export interface CaseFilters {
  query: string;
  domain: string;
  type: string;
}

export const EMPTY_CASE_FILTERS: CaseFilters = { query: '', domain: '', type: '' };

export function findCases(
  cases: readonly CaseStudy[],
  filters: CaseFilters,
  searchableLabels: (metadata: CaseMetadata) => readonly string[],
): CaseStudy[] {
  const terms = filters.query.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);
  const byId = new Map(cases.map((study) => [study.id, study]));

  return Object.entries(CASE_METADATA).flatMap(([id, metadata]) => {
    const study = byId.get(id);
    if (!study || (filters.domain && metadata.domain !== filters.domain) ||
      (filters.type && metadata.type !== filters.type)) return [];

    const searchable = [
      study.title, study.summaryLine, study.roleScope, ...study.technologies, ...searchableLabels(metadata),
    ].join(' ').normalize('NFKC').toLowerCase();

    return terms.every((term) => searchable.includes(term)) ? [study] : [];
  });
}
