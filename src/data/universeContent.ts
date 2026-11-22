/**
 * SINGLE SOURCE OF TRUTH FOR ARIES RAZAK'S PORTFOLIO
 * Grounded strictly in verified career facts and clearly separated
 * from illustrative educational walkthroughs (Beep to Receipt & Computing Lab).
 */

export type StratumType =
  | 'hardware'
  | 'kernel'
  | 'network'
  | 'application'
  | 'cloud'
  | 'operations';

export type EvidenceStatus = 'professional' | 'project' | 'learning';

export type NodeKind = 'role' | 'project' | 'technology' | 'concept';

export type ConstellationCategory =
  | 'Application Support'
  | 'Business Systems & SaaS'
  | 'IT Operations & Helpdesk'
  | 'Technical Foundations';

export const CONSTELLATION_CATEGORIES: ConstellationCategory[] = [
  'Application Support',
  'Business Systems & SaaS',
  'IT Operations & Helpdesk',
  'Technical Foundations',
];

export const EVIDENCE_META: Record<
  EvidenceStatus,
  { label: string; glyph: string; description: string }
> = {
  professional: {
    label: 'Work Experience',
    glyph: '◆',
    description: 'Capabilities applied directly in paid application support, SaaS administration, or IT operations roles.',
  },
  project: {
    label: 'Internship, Education & Credential',
    glyph: '■',
    description: 'Academic foundation, supervised diploma internship, or credential.',
  },
  learning: {
    label: 'Currently Learning',
    glyph: '○',
    description: 'Self-directed study rather than paid work experience.',
  },
};

export interface ProfileData {
  fullName: string;
  displayName: string;
  title: string;
  currentRole: string;
  currentCompany: string;
  location: string;
  email: string;
  linkedIn: string;
  intro: string;
  resumeSummary: string;
  availabilityNote: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export interface StratumDef {
  id: StratumType;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  exampleStage: string;
  examplePayload: string;
  whatHappensConceptually: string;
  exampleComponents: string[];
  accentColor: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  compactPeriod: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  isInternship?: boolean;
}

export interface TriageBreakdown {
  checksPerformed: string[];
  providedToVendor: string[];
  vendorInvestigation: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  roleScope: string;
  period?: string;
  featuredOnHome?: boolean;
  summaryLine: string;
  workflowSteps?: string[];
  situation: string;
  responsibility: string;
  whatIDid: string[];
  triageBreakdown?: TriageBreakdown;
  outcomeLabel: 'Outcome' | 'Work delivered';
  outcome: string;
  technologies: string[];
  stratumFocus: StratumType;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  focus: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  kindLabel: 'Certification' | 'Completed Program';
  status: 'credential' | 'completed';
  note: string;
}

export interface LearningEntry {
  id: string;
  topic: string;
  status: 'Currently learning';
  note: string;
}

export interface UniverseNode {
  id: string;
  label: string;
  category: ConstellationCategory;
  stratum: StratumType;
  status: EvidenceStatus;
  kind: NodeKind;
  x: number;
  y: number;
  summary: string;
  evidenceRef?: string;
  usage?: string;
  year?: string;
}

export interface UniverseEdge {
  from: string;
  to: string;
  reason: string;
}

export const PROFILE: ProfileData = {
  fullName: 'Muhammad Aries Irhan bin Abd Razak',
  displayName: 'Aries Razak',
  title: 'Application Support & Business Systems',
  currentRole: 'System Application Specialist',
  currentCompany: 'emart24 Malaysia',
  location: 'Selangor / Kuala Lumpur, Malaysia',
  email: 'ariesirhan25@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/aries-razak-a36045256',
  intro:
    'I troubleshoot business applications, manage user access, coordinate integrations, and help teams adopt the tools they use every day.',
  resumeSummary:
    'System Application Specialist with experience across application support, business systems administration, user onboarding and access cleanup, third-party delivery-platform configuration, and multi-site IT setup. Led the internal Google Workspace to Lark migration at HWC Coffee Malaysia with support from the Lark team and created an Excel template for recurring Xilnex promotion imports at emart24 Malaysia.',
  availabilityNote:
    'I’m open to opportunities in application support, business systems, SaaS support, integration support, and IT operations.',
};

/**
 * Concise 4-group skills model rendered on the main page without proficiency bars or scores.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'skill-application-support',
    title: 'Application Support',
    items: [
      'Xilnex troubleshooting',
      'Incident triage',
      'Vendor escalation',
      'UAT support',
    ],
  },
  {
    id: 'skill-business-systems',
    title: 'Business Systems & SaaS',
    items: [
      'Lark administration',
      'User onboarding and offboarding',
      'Approval workflows',
      'Microsoft 365 provisioning assistance',
    ],
  },
  {
    id: 'skill-integration-data',
    title: 'Integration & Data Preparation',
    items: [
      'Delivery-platform configuration in Xilnex',
      'Outlet mappings, price schemes, and menu profiles',
      'Excel promotion-import templates',
      'NetSuite import preparation',
    ],
  },
  {
    id: 'skill-it-operations',
    title: 'IT Operations',
    items: [
      'Remote and onsite support',
      'POS and peripheral setup',
      'LAN / Wi-Fi troubleshooting',
      'New-site readiness',
    ],
  },
];

/**
 * ILLUSTRATIVE EDUCATIONAL WALKTHROUGH ("BEEP TO RECEIPT")
 * Explicitly framed as an educational walkthrough using generic examples.
 * Not presented as verified proprietary employer production architecture.
 */
export const STRATA: StratumDef[] = [
  {
    id: 'hardware',
    index: '01',
    title: 'Hardware & Peripherals',
    subtitle: 'Illustrative Layer: Scanners, Terminals, Printers & Cabling',
    description:
      'At a checkout counter, physical devices capture an item barcode or card tap and print a paper slip once approved. Clean power, peripheral cables, and intact network drops keep counter gear reachable.',
    exampleStage: 'Example Step: Barcode scan & peripheral input',
    examplePayload: 'INPUT -> Sample SKU digits passed from handheld scanner to register host',
    whatHappensConceptually:
      'A barcode scanner reads reflected light, decodes bars into digits, and passes keystrokes or input events to the active checkout application.',
    exampleComponents: ['Barcode Scanner', 'Receipt Printer', 'Payment Terminal', 'Ethernet Drop'],
    accentColor: '#F2A77D',
  },
  {
    id: 'kernel',
    index: '02',
    title: 'Operating System & Drivers',
    subtitle: 'Illustrative Layer: Device Recognition & Print Spooling',
    description:
      'The operating system on a terminal exposes connected scanners, printers, and network adapters through standard drivers so business software can read input and send print jobs.',
    exampleStage: 'Example Step: OS device & spooler handoff',
    examplePayload: 'OS -> USB input event -> Print queue dispatch',
    whatHappensConceptually:
      'Input drivers route scan events to the active window, while the operating system print queue formats output for the connected thermal printer.',
    exampleComponents: ['USB Drivers', 'Print Spooler', 'Network Adapter', 'Local Cache'],
    accentColor: '#A8C5FF',
  },
  {
    id: 'network',
    index: '03',
    title: 'Local Network & Internet Link',
    subtitle: 'Illustrative Layer: LAN Switching, Wi-Fi & Upstream Routing',
    description:
      'Local terminals reach cloud application backends and payment hosts over site Ethernet or Wi-Fi through local switches and an upstream gateway.',
    exampleStage: 'Example Step: Local link to upstream gateway',
    examplePayload: 'Local Ethernet -> Switch -> Gateway Router -> Upstream ISP',
    whatHappensConceptually:
      'If a wall port, patch lead, or gateway link drops, local terminals cannot pull updated catalog pricing or sync completed sales.',
    exampleComponents: ['Ethernet Links', 'Site Wi-Fi', 'Local Switch', 'Gateway Router'],
    accentColor: '#A8C5FF',
  },
  {
    id: 'application',
    index: '04',
    title: 'Application & Transaction Flow',
    subtitle: 'Illustrative Layer: Item Lookup, Promotions & Receipts',
    description:
      'The business application matches scanned SKUs against the active price and promotion rules, calculates totals, requests tender confirmation, and logs the sale.',
    exampleStage: 'Example Step: Item lookup & promo calculation',
    examplePayload: 'Application -> Match catalog price & promo rule -> Record transaction',
    whatHappensConceptually:
      'When catalogs or promotions stall during sync, front-line users see outdated prices or missing discounts until a sync finishes.',
    exampleComponents: ['SKU Lookup', 'Promotion Rules', 'Tender Trigger', 'Sales Sync'],
    accentColor: '#F2A77D',
  },
  {
    id: 'cloud',
    index: '05',
    title: 'Back-Office, ERP & Collaboration Platforms',
    subtitle: 'Illustrative Layer: Central Reporting, ERP & Accounts',
    description:
      'Operational records feed into central back-office reporting, ERP data sheets, and workplace messaging or mail platforms used across departments.',
    exampleStage: 'Example Step: HQ sync & business tools handoff',
    examplePayload: 'Site Sync -> Central Reporting -> Collaboration & ERP Tools',
    whatHappensConceptually:
      'Shared platforms depend on accurate account provisioning, clean import templates, and steady connectivity across teams.',
    exampleComponents: ['Central Sync', 'Workplace Mail & Chat', 'ERP Data Prep', 'Access Control'],
    accentColor: '#A8C5FF',
  },
  {
    id: 'operations',
    index: '06',
    title: 'People, Triage & Vendor Coordination',
    subtitle: 'Illustrative Layer: End Users, Support & Escalation',
    description:
      'Systems stay dependable when support teams communicate clearly with users, run structured initial checks, and escalate confirmed findings cleanly.',
    exampleStage: 'Example Step: Issue triage & escalation',
    examplePayload: 'User Report -> Reproduce & Check -> Escalate with Observations',
    whatHappensConceptually:
      'Support specialists verify what a user sees, run safe initial checks first, and share focused context with vendors when platform fixes are needed.',
    exampleComponents: ['User Support', 'Remote Triage', 'Vendor Escalation', 'Site Readiness'],
    accentColor: '#F2A77D',
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'exp-emart24',
    role: 'System Application Specialist',
    organization: 'emart24 Malaysia',
    period: 'September 2025 to present',
    compactPeriod: 'Sep 2025 to present',
    location: 'Malaysia',
    summary:
      'Support Xilnex POS across HQ and outlets, manage store user access, configure delivery integrations, and prepare new-store IT setups.',
    highlights: [
      'Provision Xilnex POS accounts from HR onboarding requests after checking request status, user groups, and outlet assignments, and clean up departed employees’ access and staff-discount eligibility.',
      'Coordinate with Xilnex and delivery partners (GrabFood, foodpanda, and ShopeeFood) to configure and sync outlet settings in the Xilnex portal, including store links, price schemes, and menu profiles for foodpanda.',
      'Troubleshoot sync, promotion, and payment issues in Xilnex POS across HQ and outlets, confirming symptoms, guiding initial checks, and coordinating vendor escalation when deeper investigation is needed.',
      'Created an Excel template that structured recurring promotion requests for import into the Xilnex Promotion Portal and provided guidance on using the import function.',
      'Set up and check POS devices, payment terminals, scanners, printers, and LAN / Wi-Fi connectivity during new-store setups.',
      'Assist with Microsoft 365 provisioning and UAT within assigned scope.',
    ],
    technologies: [
      'Xilnex POS',
      'GrabFood / foodpanda / ShopeeFood',
      'Microsoft Excel',
      'Microsoft 365',
    ],
  },
  {
    id: 'exp-hwc',
    role: 'IT Support',
    organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
    period: 'March 2024 to September 2025',
    compactPeriod: 'Mar 2024 to Sep 2025',
    location: 'Malaysia',
    summary:
      'Led the Google Workspace to Lark migration internally with support from the Lark team, administered Lark, and supported retail POS, remote users, and NetSuite import preparation.',
    highlights: [
      'Led the Google Workspace to Lark migration internally with support from the Lark team and helped colleagues adopt messaging, mail, approvals, and helpdesk support.',
      'Administered Lark, managing user accounts, onboarding and offboarding, and approval workflows.',
      'Supported Xilnex POS, hardware, networking, and remote users through TeamViewer and Lark Helpdesk.',
      'Prepared and validated Excel spreadsheets for NetSuite imports.',
    ],
    technologies: [
      'Lark',
      'Google Workspace',
      'TeamViewer',
      'Lark Helpdesk',
      'Xilnex POS',
      'NetSuite',
    ],
  },
  {
    id: 'exp-mps',
    role: 'IT Technician',
    organization: 'Managed print services (onsite support)',
    period: 'October 2023 to March 2024',
    compactPeriod: 'Oct 2023 to Mar 2024',
    location: 'Malaysia',
    summary:
      'Delivered onsite technical support for commercial printers, multifunction copiers, and user workstations alongside Freshdesk ticket handling.',
    highlights: [
      'Provided onsite technical support for commercial printers, multifunction copiers, and user workstations.',
      'Troubleshot hardware, software, and local connectivity issues on customer sites.',
      'Handled and updated service requests in Freshdesk.',
    ],
    technologies: [
      'Printers & Multifunction Copiers',
      'Workstations',
      'Connectivity Troubleshooting',
      'Freshdesk',
    ],
  },
  {
    id: 'exp-agc',
    role: 'IT Intern (Application Development)',
    organization: 'Attorney General’s Chambers of Malaysia',
    period: 'September 2021 to February 2022',
    compactPeriod: 'Sep 2021 to Feb 2022',
    location: 'Putrajaya, Malaysia',
    summary:
      'Application development internship during my diploma contributing to the internal DKICT declaration web system.',
    highlights: [
      'Contributed to the internal DKICT declaration web system using PHP Laravel and MySQL during my diploma internship.',
      'Assisted with requirements documentation and entity-relationship diagrams.',
      'Supported development and functional verification tasks.',
    ],
    technologies: [
      'PHP (Laravel)',
      'MySQL',
      'Requirements Documentation',
      'ERDs',
    ],
    isInternship: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-lark-migration',
    title: 'Google Workspace to Lark Migration',
    organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
    roleScope: 'Internal Migration Lead & Workspace Administration',
    featuredOnHome: true,
    summaryLine:
      'Coordinating the move from Google Workspace to Lark, setting up the workspace, managing user access changes, and helping colleagues use Lark in their daily work.',
    situation:
      'The move from Google Workspace to Lark required internal coordination, account administration, approval setup, and guidance for colleagues adopting the platform.',
    responsibility:
      'I led the migration internally with support from the Lark team and handled workspace administration and colleague support.',
    whatIDid: [
      'Aligned rollout activities internally while working with the Lark team on migration support steps.',
      'Configured Lark user accounts, onboarding and offboarding access changes, and digital approval workflows.',
      'Helped colleagues adopt Lark messaging, mail, approvals, and Lark Helpdesk in day-to-day work.',
    ],
    outcomeLabel: 'Outcome',
    outcome:
      'Teams adopted Lark across messaging, mail, approvals, and helpdesk support with workspace accounts and approval workflows established.',
    technologies: [
      'Lark',
      'Google Workspace',
      'User Onboarding & Offboarding',
      'Approval Workflows',
      'Lark Helpdesk',
    ],
    stratumFocus: 'cloud',
  },
  {
    id: 'case-integrations',
    title: 'Third-Party Integration Configuration',
    organization: 'emart24 Malaysia',
    roleScope: 'Partner Coordination & Portal Configuration',
    featuredOnHome: true,
    summaryLine:
      'Coordinating prerequisites with delivery partners and configuring outlet settings in Xilnex across GrabFood, foodpanda, and ShopeeFood.',
    workflowSteps: [
      'Coordinate prerequisites',
      'Configure outlet settings',
      'Save and sync',
    ],
    situation:
      'Integrating store menus and pricing with delivery platforms depends on both Xilnex and the external partner finishing their setup prerequisites before outlet-side mapping can take place in the portal.',
    responsibility:
      'As System Application Specialist, I coordinated setup readiness with Xilnex and delivery partners and completed outlet-side application configuration in the Xilnex portal (without API development).',
    whatIDid: [
      'Coordinated prerequisite readiness with Xilnex and delivery partners across GrabFood, foodpanda, and ShopeeFood.',
      'Configured outlet-side integration settings inside the Xilnex portal once both sides confirmed prerequisites were ready.',
      'For foodpanda specifically, linked the partner outlet to the matching Xilnex store and configured its price scheme and menu profile.',
      'Saved and synced the outlet settings in Xilnex once configuration was complete.',
    ],
    outcomeLabel: 'Work delivered',
    outcome: 'Completed and synced the assigned outlet-side configurations in Xilnex.',
    technologies: [
      'Xilnex Portal',
      'GrabFood',
      'foodpanda',
      'ShopeeFood',
      'Price Schemes & Menu Profiles',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-pos-triage',
    title: 'Application Incident Triage & Vendor Escalation',
    organization: 'emart24 Malaysia',
    roleScope: 'Recurring Support Process · First-Line Triage',
    featuredOnHome: true,
    summaryLine:
      'Structured recurring triage for sync, promotion, and payment issues in Xilnex POS across HQ and outlets.',
    situation:
      'Across HQ and store operations, recurring Xilnex POS issues involving sync, promotions, or payments require structured first-line checks to distinguish local conditions from issues needing vendor investigation.',
    responsibility:
      'I handle first-line application triage across HQ and outlets, confirming user-reported symptoms, guiding appropriate initial troubleshooting, and escalating details to Xilnex or internal teams when needed.',
    whatIDid: [
      'Confirm user-reported issues with outlet or HQ staff to pinpoint affected screens, items, promotions, or payment steps.',
      'Check relevant Xilnex sync, promotion, payment, access, or local connectivity conditions based on the issue.',
      'Guide appropriate initial troubleshooting steps suited to the condition being checked before retesting.',
      'Coordinate vendor escalation with Xilnex or internal teams using observed details when deeper investigation is required.',
    ],
    triageBreakdown: {
      checksPerformed: [
        'Confirmed user-reported symptoms and affected register or user scope with staff.',
        'Checked relevant sync, promotion, payment, access, or local connectivity conditions.',
      ],
      providedToVendor: [
        'Observed symptoms, initial checks already completed, and current sync status.',
        'Focused context when escalating issues that require deeper vendor investigation.',
      ],
      vendorInvestigation: [
        'Underlying application behavior or platform-side conditions outside outlet configuration.',
        'Any platform investigation or vendor-side resolution handled externally.',
      ],
    },
    outcomeLabel: 'Work delivered',
    outcome:
      'Maintained a repeatable first-line triage process and clear escalation boundary between local support checks and vendor investigation.',
    technologies: [
      'Xilnex POS',
      'Incident Triage',
      'Sync & Promo Checks',
      'Vendor Coordination',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-store-launch',
    title: 'New-Site IT Deployment & Readiness',
    organization: 'emart24 Malaysia',
    roleScope: 'Site Equipment & Connectivity Setup',
    featuredOnHome: true,
    summaryLine:
      'Setting up and checking POS devices, payment terminals, scanners, printers, and LAN / Wi-Fi connectivity to prepare new outlets for opening.',
    situation:
      'Opening a new store relies on counter POS devices, payment terminals, scanners, printers, and local network links being set up and checked together beforehand.',
    responsibility:
      'I set up and check store counter hardware and LAN / Wi-Fi connectivity during new-store setups.',
    whatIDid: [
      'Set up and checked POS devices, payment terminals, barcode scanners, and receipt printers on counter stations.',
      'Checked local LAN links and store Wi-Fi connectivity across counter hardware.',
      'Used a cable tester during one setup to catch a line skipping pin 4 and reterminated the RJ45 connector onsite.',
    ],
    outcomeLabel: 'Work delivered',
    outcome:
      'Set up and physically checked store counter devices and connectivity links to get new outlets ready for opening.',
    technologies: [
      'POS Devices',
      'Payment Terminals',
      'Scanners & Printers',
      'LAN / Wi-Fi Setup',
      'RJ45 Retermination',
    ],
    stratumFocus: 'hardware',
  },
  {
    id: 'case-promotion-import',
    title: 'Xilnex Promotion Import Template',
    organization: 'emart24 Malaysia',
    roleScope: 'Template Design & Import Guidance',
    featuredOnHome: true,
    summaryLine:
      'Turning recurring promotion requests into structured Excel data for the Xilnex Promotion Portal.',
    situation:
      'Recurring promotion requests needed to be prepared in a structured format for import into the Xilnex Promotion Portal.',
    responsibility:
      'I created the Excel template and guided colleagues on using the portal’s import function.',
    whatIDid: [
      'Created an Excel template to organize recurring promotion requests for import.',
      'Showed colleagues how to use the import function in the Xilnex Promotion Portal.',
    ],
    outcomeLabel: 'Work delivered',
    outcome:
      'Delivered a reusable Excel template for promotion imports and showed colleagues how to use the portal’s import function.',
    technologies: ['Microsoft Excel', 'Xilnex Promotion Portal'],
    stratumFocus: 'application',
  },
];

export const EDUCATION: EducationEntry = {
  degree: 'Diploma in Computer Science and Mathematics',
  institution: 'Universiti Teknologi MARA (UiTM)',
  period: '2019 to 2022',
  focus:
    'Coursework in software fundamentals, relational databases, data structures, and computing mathematics.',
};

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'cert-aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    kindLabel: 'Certification',
    status: 'credential',
    note: 'Core AWS cloud concepts, services, security responsibilities, and billing fundamentals.',
  },
  {
    id: 'cert-ai-teach',
    name: 'Generative AI Copilot Digital Upskilling Program',
    issuer: 'AI Teach Malaysia',
    kindLabel: 'Completed Program',
    status: 'completed',
    note: 'Completed digital upskilling training covering workplace productivity tools and generative AI.',
  },
];

export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    id: 'learning-uipath-rpa',
    topic: 'UiPath & Robotic Process Automation (RPA)',
    status: 'Currently learning',
    note: 'Currently learning UiPath and exploring Robotic Process Automation (RPA), with an interest in workflow automation, application integration, and how repetitive processes can be automated.',
  },
];

/**
 * OPTIONAL SKILL ATLAS GRAPH (Opened from Interactive Lab)
 * Uses the same verified factual scope as the main portfolio.
 */
export const NODES: UniverseNode[] = [
  {
    id: 'node-xilnex-pos',
    label: 'Xilnex POS & App Triage',
    category: 'Application Support',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 68,
    y: 40,
    summary: 'Troubleshooting Xilnex POS across HQ and outlets across sync, promotion, and payment issues.',
    evidenceRef: 'exp-emart24',
    usage: 'Confirm symptoms with users, check relevant sync/promo/payment conditions, and guide initial steps.',
    year: '2024 to present',
  },
  {
    id: 'node-vendor-escalation',
    label: 'Vendor Escalation',
    category: 'Application Support',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 84,
    y: 34,
    summary: 'Coordinating vendor escalation with observed symptoms and initial checks cleanly packaged.',
    evidenceRef: 'case-pos-triage',
    usage: 'Escalate unresolved Xilnex POS or payment issues to external vendors or internal teams.',
    year: '2025 to present',
  },
  {
    id: 'node-uat-support',
    label: 'UAT Support',
    category: 'Application Support',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 78,
    y: 48,
    summary: 'Assisting with UAT support within assigned scope.',
    evidenceRef: 'exp-emart24',
    usage: 'Supported assigned UAT checks at emart24 Malaysia.',
    year: '2025 to present',
  },
  {
    id: 'node-delivery-integrations',
    label: 'Delivery Portal Config (Xilnex)',
    category: 'Application Support',
    stratum: 'application',
    status: 'professional',
    kind: 'project',
    x: 91,
    y: 46,
    summary: 'Configuring outlet-side delivery integrations in Xilnex across GrabFood, foodpanda, and ShopeeFood.',
    evidenceRef: 'case-integrations',
    usage: 'Coordinated prerequisites; for foodpanda, linked store, price scheme, and menu profile before saving and syncing.',
    year: '2025 to present',
  },
  {
    id: 'node-gws-migration',
    label: 'Google Workspace to Lark Migration',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'project',
    x: 62,
    y: 66,
    summary: 'Led the Google Workspace to Lark migration internally with support from the Lark team.',
    evidenceRef: 'case-lark-migration',
    usage: 'Internal migration coordination, account administration, and helping colleagues use Lark at HWC Coffee Malaysia.',
    year: '2024 to 2025',
  },
  {
    id: 'node-lark-admin',
    label: 'Lark Administration & Approvals',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 76,
    y: 68,
    summary: 'Administering Lark accounts, onboarding and offboarding, approval workflows, and helpdesk support.',
    evidenceRef: 'case-lark-migration',
    usage: 'Managed user accounts, approvals, and colleague support across messaging, mail, and Lark Helpdesk.',
    year: '2024 to 2025',
  },
  {
    id: 'node-m365-provisioning',
    label: 'M365 Provisioning Assistance',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 86,
    y: 58,
    summary: 'Assisting with Microsoft 365 provisioning within assigned scope.',
    evidenceRef: 'exp-emart24',
    usage: 'Assisted with assigned Microsoft 365 provisioning tasks at emart24 Malaysia.',
    year: '2025 to present',
  },
  {
    id: 'node-excel-netsuite',
    label: 'Excel Templates & Import Prep',
    category: 'Business Systems & SaaS',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 54,
    y: 56,
    summary: 'Created Excel promotion-import template for Xilnex and prepared NetSuite import sheets.',
    evidenceRef: 'exp-emart24',
    usage: 'Created recurring promotion import template for Xilnex with import guidance, and prepared Excel sheets for NetSuite at HWC.',
    year: '2024 to present',
  },
  {
    id: 'node-xilnex-access',
    label: 'Xilnex Access & Leaver Cleanup',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 65,
    y: 82,
    summary: 'Provisioning Xilnex POS accounts from HR onboarding requests and cleaning up leaver access.',
    evidenceRef: 'exp-emart24',
    usage: 'Checked request status, user groups, and outlets; cleaned up departed access and discount eligibility.',
    year: '2025 to present',
  },
  {
    id: 'node-remote-helpdesk',
    label: 'Remote & Helpdesk Support',
    category: 'IT Operations & Helpdesk',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 82,
    y: 78,
    summary: 'Supporting remote users and service tickets using TeamViewer, Lark Helpdesk, and Freshdesk.',
    evidenceRef: 'exp-hwc',
    usage: 'Handled remote troubleshooting and ticket updates across retail, office, and customer sites.',
    year: '2023 to 2025',
  },
  {
    id: 'node-pos-peripherals',
    label: 'POS Devices & Peripherals',
    category: 'IT Operations & Helpdesk',
    stratum: 'hardware',
    status: 'professional',
    kind: 'technology',
    x: 18,
    y: 42,
    summary: 'Setting up and checking POS devices, payment terminals, scanners, and receipt printers.',
    evidenceRef: 'case-store-launch',
    usage: 'Prepared and checked counter equipment during new-store setups to prepare outlets for opening.',
    year: '2024 to present',
  },
  {
    id: 'node-lan-cabling',
    label: 'LAN / Wi-Fi & RJ45 Check',
    category: 'IT Operations & Helpdesk',
    stratum: 'network',
    status: 'professional',
    kind: 'technology',
    x: 42,
    y: 44,
    summary: 'Checking LAN / Wi-Fi connectivity during setups and reterminating an RJ45 plug skipping pin 4.',
    evidenceRef: 'case-store-launch',
    usage: 'Checked new-site connectivity and fixed an RJ45 pin-4 wiring fault during one site setup.',
    year: '2024 to present',
  },
  {
    id: 'node-printers-onsite',
    label: 'Printers, Copiers & Onsite IT',
    category: 'IT Operations & Helpdesk',
    stratum: 'hardware',
    status: 'professional',
    kind: 'technology',
    x: 22,
    y: 68,
    summary: 'Onsite support for commercial printers, multifunction copiers, workstations, and Freshdesk tickets.',
    evidenceRef: 'exp-mps',
    usage: 'Delivered hardware, software, and connectivity troubleshooting in a managed print services role.',
    year: 'Oct 2023 to Mar 2024',
  },
  {
    id: 'node-aws-ccp',
    label: 'AWS Certified Cloud Practitioner',
    category: 'Technical Foundations',
    stratum: 'cloud',
    status: 'project',
    kind: 'project',
    x: 68,
    y: 22,
    summary: 'Foundational AWS certification covering core cloud concepts, services, security responsibilities, and billing.',
    evidenceRef: 'cert-aws',
    usage: 'Foundational cloud certification (AWS).',
    year: 'Credential',
  },
  {
    id: 'node-laravel-mysql',
    label: 'Laravel & MySQL (Internship)',
    category: 'Technical Foundations',
    stratum: 'application',
    status: 'project',
    kind: 'project',
    x: 50,
    y: 24,
    summary: 'Diploma internship contributing to the internal DKICT web system with PHP Laravel, MySQL, docs, and ERDs.',
    evidenceRef: 'exp-agc',
    usage: 'Contributed to Laravel/MySQL features, assisted with requirements docs/ERDs, and verification tasks.',
    year: 'Sep 2021 to Feb 2022',
  },
  {
    id: 'node-uitm-cs',
    label: 'CS & Math Diploma (UiTM)',
    category: 'Technical Foundations',
    stratum: 'kernel',
    status: 'project',
    kind: 'project',
    x: 30,
    y: 24,
    summary: 'Diploma in Computer Science and Mathematics at Universiti Teknologi MARA (UiTM).',
    evidenceRef: 'exp-uitm',
    usage: 'Academic grounding in software fundamentals, relational databases, and mathematics.',
    year: '2019 to 2022',
  },
  {
    id: 'node-uipath-rpa',
    label: 'UiPath & RPA',
    category: 'Technical Foundations',
    stratum: 'cloud',
    status: 'learning',
    kind: 'technology',
    x: 42,
    y: 78,
    summary: 'Currently learning UiPath and Robotic Process Automation (RPA) concepts.',
    usage: 'Self-study only; not listed as paid work experience.',
    year: 'Currently learning',
  },
];

export const EDGES: UniverseEdge[] = [
  {
    from: 'node-pos-peripherals',
    to: 'node-lan-cabling',
    reason: 'Counter devices depend on checked local cabling and Wi-Fi links.',
  },
  {
    from: 'node-lan-cabling',
    to: 'node-xilnex-pos',
    reason: 'Outlet connectivity supports Xilnex sync and checkout checks.',
  },
  {
    from: 'node-xilnex-pos',
    to: 'node-vendor-escalation',
    reason: 'First-line POS triage connects initial checks with vendor escalation.',
  },
  {
    from: 'node-gws-migration',
    to: 'node-lark-admin',
    reason: 'Internal migration coordination flows into Lark administration.',
  },
  {
    from: 'node-lark-admin',
    to: 'node-remote-helpdesk',
    reason: 'Lark Helpdesk connects internal staff requests with remote support.',
  },
  {
    from: 'node-excel-netsuite',
    to: 'node-lark-admin',
    reason: 'Business workflow support links validated sheets with workplace ops.',
  },
  {
    from: 'node-m365-provisioning',
    to: 'node-xilnex-access',
    reason: 'User provisioning assistance pairs with HR-driven Xilnex access cleanup.',
  },
  {
    from: 'node-xilnex-pos',
    to: 'node-delivery-integrations',
    reason: 'Outlet Xilnex support pairs with delivery-portal configuration.',
  },
  {
    from: 'node-delivery-integrations',
    to: 'node-uat-support',
    reason: 'Outlet settings coordination aligns with assigned UAT checks.',
  },
  {
    from: 'node-printers-onsite',
    to: 'node-remote-helpdesk',
    reason: 'Onsite hardware troubleshooting pairs with Freshdesk ticket handling.',
  },
  {
    from: 'node-uitm-cs',
    to: 'node-laravel-mysql',
    reason: 'Diploma fundamentals supported internship Laravel & MySQL work.',
  },
  {
    from: 'node-aws-ccp',
    to: 'node-uipath-rpa',
    reason: 'Foundational cloud study pairs with ongoing UiPath & RPA learning.',
  },
];
