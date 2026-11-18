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
    label: 'Work-Backed Experience',
    glyph: '◆',
    description: 'Capabilities applied directly in paid application support, SaaS administration, or IT operations roles.',
  },
  project: {
    label: 'Internship, Academic & Credential',
    glyph: '■',
    description: 'Verified academic grounding, supervised internship development, or earned credential.',
  },
  learning: {
    label: 'Currently Learning',
    glyph: '○',
    description: 'Active self-directed study kept separate from production experience claims.',
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

export interface CoreCapability {
  id: string;
  title: string;
  exampleTag: string;
  description: string;
}

export interface AboutApproachItem {
  id: string;
  title: string;
  detail: string;
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

export interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  period?: string;
  featuredOnHome?: boolean;
  summaryLine: string;
  situation: string;
  responsibility: string;
  whatIDid: string[];
  outcome?: string;
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
  title: 'Application Support, IT Operations & Business Systems',
  currentRole: 'System Application Specialist',
  currentCompany: 'emart24 Malaysia',
  location: 'Selangor / Kuala Lumpur, Malaysia',
  email: 'ariesirhan25@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/aries-razak-a36045256',
  intro:
    'I troubleshoot business applications, support users across multiple sites, and help teams adopt new tools. At HWC Coffee Malaysia, I led the Google Workspace to Lark migration internally with support from the Lark team.',
  resumeSummary:
    'I troubleshoot business applications, support users across multiple sites, and coordinate with vendors when an issue needs further investigation. At emart24 Malaysia, I support Xilnex POS, payments, and new-site IT setups. At HWC Coffee Malaysia, I led the Google Workspace to Lark migration internally with support from the Lark team and administered Lark.',
  availabilityNote:
    'Open to Application Support, IT Operations, Business Systems, and SaaS Support roles.',
};

export const CORE_CAPABILITIES: CoreCapability[] = [
  {
    id: 'cap-app-troubleshooting',
    title: 'Application Troubleshooting',
    exampleTag: 'Xilnex POS · Sync, Promos & Payments',
    description:
      'Confirm symptoms directly with staff, inspect application and sync status in Xilnex, guide first-line steps, and pass verified details to vendors or internal teams.',
  },
  {
    id: 'cap-saas-migration',
    title: 'SaaS Administration & Migration',
    exampleTag: 'Lark · Google Workspace · Microsoft 365',
    description:
      'Led the Google Workspace to Lark migration internally with Lark team support, administered Lark accounts and approval workflows, and assisted with Microsoft 365 provisioning.',
  },
  {
    id: 'cap-it-operations',
    title: 'IT Operations & User Support',
    exampleTag: 'Multi-Site Readiness · Helpdesk · Hardware',
    description:
      'Remote and onsite support across TeamViewer, Lark Helpdesk, and Freshdesk, Excel spreadsheets for NetSuite imports, and counter hardware plus LAN/Wi-Fi readiness.',
  },
];

export const ABOUT_SUMMARY =
  'Good support starts with listening carefully to the person facing the problem. Before escalating or restarting anything, I confirm what happened on screen, narrow down whether the issue sits in the user setup, hardware, connectivity, or application, and pass clean notes if a vendor needs to step in.';

export const ABOUT_APPROACH: AboutApproachItem[] = [
  {
    id: 'approach-users',
    title: 'Clear communication with non-technical teams',
    detail:
      'Whether coaching colleagues transitioning onto Lark or walking counter staff through a register check, I explain next steps in plain language.',
  },
  {
    id: 'approach-triage',
    title: 'Structured first-line troubleshooting',
    detail:
      'Isolate whether a problem stems from local cabling, peripheral connection, user permissions, or application sync before changing settings.',
  },
  {
    id: 'approach-vendors',
    title: 'Prepared handoffs to vendors and internal teams',
    detail:
      'When an application or platform issue requires vendor engineering, I summarize confirmed symptoms and checks already completed to avoid repeat troubleshooting.',
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
    subtitle: 'Educational Walkthrough: Scanners, Terminals, Printers & Cabling',
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
    subtitle: 'Educational Walkthrough: Device Recognition & Print Spooling',
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
    subtitle: 'Educational Walkthrough: LAN Switching, Wi-Fi & Upstream Routing',
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
    subtitle: 'Educational Walkthrough: Item Lookup, Promotions & Receipts',
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
    subtitle: 'Educational Walkthrough: Central Reporting, ERP & Accounts',
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
    subtitle: 'Educational Walkthrough: End Users, Support & Escalation',
    description:
      'Systems stay dependable when support teams communicate clearly with users, run structured initial checks, and escalate confirmed findings cleanly.',
    exampleStage: 'Example Step: Issue triage & escalation',
    examplePayload: 'User Report -> Reproduce & Check -> Escalate with Observations',
    whatHappensConceptually:
      'Support specialists verify what a user sees, run safe initial checks first, and share focused context with vendors when code or platform fixes are needed.',
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
      'Supporting Xilnex POS across HQ and outlets, troubleshooting sync, promotion, and payment issues, coordinating with vendors and internal teams, and helping set up IT for multiple new-store openings.',
    highlights: [
      'Support Xilnex POS across HQ and outlets, troubleshooting sync, promotion, and payment issues.',
      'Handle application troubleshooting and coordinate escalation with external vendors and internal teams when deeper investigation is needed.',
      'Help set up and check POS devices, payment terminals, peripherals, and LAN/Wi-Fi connectivity for multiple new-store openings.',
      'Assist with Microsoft 365 provisioning and UAT support within assigned project scope.',
    ],
    technologies: [
      'Xilnex POS',
      'Application Troubleshooting',
      'Vendor Coordination',
      'POS Peripherals',
      'LAN / Wi-Fi Checks',
      'Microsoft 365 Provisioning',
      'UAT Support',
    ],
  },
  {
    id: 'exp-hwc',
    role: 'IT Support | HWC Coffee Malaysia',
    organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
    period: '27 March 2024 to 27 September 2025',
    compactPeriod: 'Mar 2024 to Sep 2025',
    location: 'Malaysia',
    summary:
      'Led the Google Workspace to Lark migration internally at HWC Coffee Malaysia, with support from the Lark team. Administered Lark, managed user accounts and approval workflows, and helped colleagues adopt the platform.',
    highlights: [
      'Led the Google Workspace to Lark migration internally at HWC Coffee Malaysia, with support from the Lark team.',
      'Administered Lark, managed user accounts, onboarding and offboarding, and approval workflows, and helped colleagues adopt the platform.',
      'Supported Xilnex POS, hardware, networking, and remote users via TeamViewer and Lark Helpdesk.',
      'Prepared and validated Excel spreadsheets for NetSuite imports.',
    ],
    technologies: [
      'Google Workspace to Lark Migration',
      'Lark Administration',
      'Approvals & Workflows',
      'Onboarding & Offboarding',
      'Xilnex POS',
      'TeamViewer & Lark Helpdesk',
      'Excel & NetSuite Data Prep',
    ],
  },
  {
    id: 'exp-mps',
    role: 'IT Technician',
    organization: 'Managed Print Services',
    period: 'Oct 2023 to Mar 2024',
    compactPeriod: 'Oct 2023 to Mar 2024',
    location: 'Malaysia',
    summary:
      'Onsite technical support focused on office printers, multi-function copiers, user hardware/software checks, connectivity troubleshooting, and Freshdesk ticket handling.',
    highlights: [
      'Provided onsite technical support for office printers, multi-function copiers, and user workstations.',
      'Troubleshot hardware, software, and local connectivity issues on customer sites.',
      'Tracked, updated, and handled support requests through Freshdesk ticket handling.',
    ],
    technologies: [
      'Onsite Technical Support',
      'Printers & Copiers',
      'Hardware & Software Checks',
      'Connectivity Troubleshooting',
      'Freshdesk',
    ],
  },
  {
    id: 'exp-agc',
    role: 'IT Intern (Application Development)',
    organization: 'Attorney General’s Chambers of Malaysia',
    period: 'Sep 2021 to Feb 2022',
    compactPeriod: 'Sep 2021 to Feb 2022',
    location: 'Putrajaya, Malaysia',
    summary:
      'Internship experience contributing to the internal DKICT declaration web system using PHP Laravel and MySQL, alongside requirements documentation and entity-relationship diagrams.',
    highlights: [
      'Internship contribution to the internal DKICT declaration web system using PHP Laravel and MySQL.',
      'Assisted in preparing requirements documentation and entity-relationship diagrams (ERDs).',
      'Supported development and functional verification tasks under team supervision.',
    ],
    technologies: [
      'PHP (Laravel)',
      'MySQL',
      'Requirements Documentation',
      'ERDs',
      'Internship Experience',
    ],
    isInternship: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-lark-migration',
    title: 'Leading a Google Workspace to Lark migration',
    organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
    period: '27 March 2024 to 27 September 2025',
    featuredOnHome: true,
    summaryLine:
      'Internal migration lead with Lark team support, workspace administration, onboarding/offboarding, approvals, and colleague adoption.',
    situation:
      'Colleagues moving from Google Workspace to Lark needed internal coordination for user accounts, approval workflows, and daily guidance on using Lark.',
    responsibility:
      'I led the migration internally with support from the Lark team, administered the platform, and helped colleagues transition to Lark.',
    whatIDid: [
      'Led the Google Workspace to Lark migration internally at HWC Coffee Malaysia with support from the Lark team.',
      'Administered the Lark platform, managing user accounts, onboarding and offboarding, and approval workflows.',
      'Helped colleagues adopt Lark across daily messaging, mail, approvals, and helpdesk support.',
    ],
    outcome:
      'Transitioned colleagues onto Lark for messaging, mail, and approvals with internal workspace administration and ongoing colleague support in place.',
    technologies: [
      'Google Workspace to Lark Migration',
      'Lark Administration',
      'User Onboarding & Offboarding',
      'Approval Workflows',
      'Lark Messaging & Mail Support',
    ],
    stratumFocus: 'cloud',
  },
  {
    id: 'case-pos-triage',
    title: 'Application incident triage and vendor escalation',
    organization: 'emart24 Malaysia · Example of Recurring Support Work',
    period: 'September 2025 to present',
    featuredOnHome: true,
    summaryLine:
      'Example of recurring Xilnex POS triage across outlets: confirming symptoms, checking sync progress to 100%, guiding a safe POS restart, and escalating with observations.',
    situation:
      'In day-to-day retail support across multiple outlets, store teams report recurring Xilnex POS issues affecting sync, promotions, or payment flows. Because each issue can stem from an incomplete sync, local register state, or an application defect, first-line triage needs consistent checks before deciding whether to restart locally or escalate.',
    responsibility:
      'As System Application Specialist, I serve as the first-line application support point for Xilnex POS across HQ and outlets, guiding outlet staff through initial checks and coordinating with external vendors or internal teams when deeper investigation is needed.',
    whatIDid: [
      'Confirm symptoms with the outlet team first to clarify what staff see on screen and which register functions are affected.',
      'Check Xilnex application and sync status with outlet teams, and ask them to let the sync reach 100% before rechecking the affected item, promotion, or register behavior when appropriate.',
      'Guide outlet staff through a controlled POS restart as a next first-line step when sync checks alone do not clear the symptom.',
      'Escalate to the Xilnex vendor or internal teams with documented observations, sync status, and first-line steps already completed when the issue requires deeper investigation.',
    ],
    technologies: [
      'Xilnex POS',
      'Symptom Confirmation',
      'Sync Status Checks',
      'Guided First-Line Steps',
      'Vendor Escalation',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-store-launch',
    title: 'New-site IT readiness and an RJ45 cabling fix',
    organization: 'emart24 Malaysia',
    period: 'September 2025 to present',
    featuredOnHome: false,
    summaryLine:
      'Set up and checked POS devices, payment terminals, scanners, printers, and LAN/Wi-Fi links; reterminated an RJ45 plug when a cable tester skipped pin 4 during one setup.',
    situation:
      'Before new outlets open, counter hardware and store connectivity need to be set up and checked ready for trading.',
    responsibility:
      'Helped set up and check site equipment and local LAN/Wi-Fi connectivity during new-store openings.',
    whatIDid: [
      'Set up and checked POS devices, payment terminals, barcode scanners, receipt printers, and LAN/Wi-Fi connectivity.',
      'During one new-store setup, tested a network line where the cable tester skipped pin 4 and reterminated the RJ45 connector on site.',
    ],
    technologies: [
      'POS Devices',
      'Payment Terminals',
      'Scanners & Receipt Printers',
      'LAN / Wi-Fi Connectivity',
      'RJ45 Connector Retermination',
    ],
    stratumFocus: 'hardware',
  },
];

export const EDUCATION: EducationEntry = {
  degree: 'Diploma in Computer Science and Mathematics',
  institution: 'Universiti Teknologi MARA (UiTM)',
  period: '2019 to 2022',
  focus:
    'Academic foundation in software fundamentals, relational databases, data structures, and computing mathematics.',
};

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'cert-aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    status: 'credential',
    note: 'Foundational cloud credential covering core AWS services, cloud architecture concepts, security, and billing.',
  },
  {
    id: 'cert-ai-teach',
    name: 'Generative AI Copilot Digital Upskilling Program',
    issuer: 'AI Teach Malaysia',
    status: 'completed',
    note: 'Completed digital upskilling program covering generative AI productivity workflows and workplace tools.',
  },
];

export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    id: 'learning-uipath-rpa',
    topic: 'UiPath & Robotic Process Automation (RPA)',
    status: 'Currently learning',
    note: 'Currently learning UiPath and exploring Robotic Process Automation (RPA), with an interest in understanding workflow automation, application integration, and how repetitive processes can be automated.',
  },
];

/**
 * CORE SKILLS GROUPED ACROSS 4 CROSS-INDUSTRY TRACKS
 * Ordered: Work-Backed Experience -> Credentials & Internship -> Active Learning
 */
export const NODES: UniverseNode[] = [
  // --- 01. Application Support ---
  {
    id: 'node-xilnex-pos',
    label: 'Xilnex POS & App Triage',
    category: 'Application Support',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 68,
    y: 40,
    summary: 'Supporting Xilnex POS across HQ and outlets, checking sync, promotion, and payment issues.',
    evidenceRef: 'exp-emart24',
    usage: 'Confirm symptoms with store staff, inspect app/sync status, and guide manual sync or restart steps.',
    year: '2024 to Present',
  },
  {
    id: 'node-vendor-escalation',
    label: 'Vendor & Internal Escalation',
    category: 'Application Support',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 84,
    y: 34,
    summary: 'Packaging confirmed symptoms and initial checks cleanly for external vendors and internal teams.',
    evidenceRef: 'case-pos-triage',
    usage: 'Coordinated unresolved POS and platform incidents between front-line users and external application vendors.',
    year: '2025 to Present',
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
    summary: 'Supporting user acceptance testing tasks within assigned project scope before rollout.',
    evidenceRef: 'exp-emart24',
    usage: 'Assisted with UAT checks and feature verification tasks at emart24 Malaysia.',
    year: '2025 to Present',
  },

  // --- 02. Business Systems & SaaS ---
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
    usage: 'Managed internal migration coordination, user onboarding, and day-to-day colleague adoption at HWC Coffee Malaysia.',
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
    summary: 'Administering Lark accounts, onboarding and offboarding, approval workflows, and mail/messaging support.',
    evidenceRef: 'case-lark-migration',
    usage: 'Administered Lark workspace accounts, approval workflows, and Lark Helpdesk support.',
    year: '2024 to 2025',
  },
  {
    id: 'node-m365-provisioning',
    label: 'Microsoft 365 Provisioning',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 86,
    y: 58,
    summary: 'Assisting with Microsoft 365 user account provisioning and access tasks for operational teams.',
    evidenceRef: 'exp-emart24',
    usage: 'Supported Microsoft 365 account provisioning tasks within assigned scope at emart24 Malaysia.',
    year: '2025 to Present',
  },
  {
    id: 'node-excel-netsuite',
    label: 'Excel & NetSuite Data Prep',
    category: 'Business Systems & SaaS',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 54,
    y: 56,
    summary: 'Preparing and validating Excel spreadsheets to support clean data imports into NetSuite.',
    evidenceRef: 'exp-hwc',
    usage: 'Prepared and validated operational Excel files for NetSuite ERP imports at HWC Coffee Malaysia.',
    year: '2024 to 2025',
  },

  // --- 03. IT Operations & Helpdesk ---
  {
    id: 'node-remote-helpdesk',
    label: 'Multi-Site & Remote Helpdesk',
    category: 'IT Operations & Helpdesk',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 82,
    y: 78,
    summary: 'Supporting remote users and multi-site teams using TeamViewer, Lark Helpdesk, and Freshdesk.',
    evidenceRef: 'exp-hwc',
    usage: 'Handled remote troubleshooting, ticket updates, and end-user guidance across retail and office sites.',
    year: '2023 to 2025',
  },
  {
    id: 'node-pos-peripherals',
    label: 'POS Devices & Counter Hardware',
    category: 'IT Operations & Helpdesk',
    stratum: 'hardware',
    status: 'professional',
    kind: 'technology',
    x: 18,
    y: 42,
    summary: 'Setting up and checking POS devices, payment terminals, barcode scanners, and receipt printers.',
    evidenceRef: 'case-store-launch',
    usage: 'Assembled and verified store counter equipment readiness across multiple new-store openings.',
    year: '2024 to Present',
  },
  {
    id: 'node-lan-cabling',
    label: 'LAN / Wi-Fi & RJ45 Termination',
    category: 'IT Operations & Helpdesk',
    stratum: 'network',
    status: 'professional',
    kind: 'technology',
    x: 42,
    y: 44,
    summary: 'Checking LAN/Wi-Fi connectivity during setups and reterminating an RJ45 connector when pin 4 skipped.',
    evidenceRef: 'case-store-launch',
    usage: 'Checked new-site connectivity and reterminated an RJ45 plug during one store launch setup.',
    year: '2024 to Present',
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
    summary: 'Onsite support for office printers, multi-function copiers, workstation checks, and connectivity issues.',
    evidenceRef: 'exp-mps',
    usage: 'Delivered field hardware/software troubleshooting and printer/copier servicing via Freshdesk.',
    year: '2023 to 2024',
  },

  // --- 04. Technical Foundations (Credential, Internship, Diploma & Active Learning) ---
  {
    id: 'node-aws-ccp',
    label: 'AWS Certified Cloud Practitioner',
    category: 'Technical Foundations',
    stratum: 'cloud',
    status: 'project',
    kind: 'project',
    x: 68,
    y: 22,
    summary: 'Foundational AWS credential covering core cloud services, shared responsibility, security, and billing.',
    evidenceRef: 'cert-aws',
    usage: 'Verified foundational cloud credential.',
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
    summary: 'IT internship contributing to the DKICT declaration web system with Laravel, MySQL, docs, and ERDs.',
    evidenceRef: 'exp-agc',
    usage: 'Built features and database schemas under supervision during IT internship at Attorney General’s Chambers.',
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
    summary: 'Diploma in Computer Science and Mathematics covering databases, programming, and structured logic.',
    evidenceRef: 'exp-uitm',
    usage: 'Academic grounding from Universiti Teknologi MARA (UiTM), 2019 to 2022.',
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
    summary: 'Currently learning UiPath and Robotic Process Automation (RPA) concepts for workflow automation.',
    usage: 'Current self-directed study kept separate from work experience.',
    year: 'Currently learning',
  },
];

export const EDGES: UniverseEdge[] = [
  {
    from: 'node-pos-peripherals',
    to: 'node-lan-cabling',
    reason: 'Counter devices depend on tested local cabling and Wi-Fi links.',
  },
  {
    from: 'node-lan-cabling',
    to: 'node-xilnex-pos',
    reason: 'Outlet connectivity enables Xilnex catalog, promo, and sales sync.',
  },
  {
    from: 'node-xilnex-pos',
    to: 'node-vendor-escalation',
    reason: 'Recurring POS triage connects initial checks with vendor escalation.',
  },
  {
    from: 'node-gws-migration',
    to: 'node-lark-admin',
    reason: 'Internal migration leadership flows into ongoing Lark administration.',
  },
  {
    from: 'node-lark-admin',
    to: 'node-remote-helpdesk',
    reason: 'Lark Helpdesk connects internal staff requests with remote support.',
  },
  {
    from: 'node-excel-netsuite',
    to: 'node-lark-admin',
    reason: 'Business workflow support links validated Excel prep with internal ops.',
  },
  {
    from: 'node-m365-provisioning',
    to: 'node-uat-support',
    reason: 'User provisioning and UAT support sit alongside application operations.',
  },
  {
    from: 'node-printers-onsite',
    to: 'node-remote-helpdesk',
    reason: 'Field hardware support pairs with ticket handling in Freshdesk.',
  },
  {
    from: 'node-uitm-cs',
    to: 'node-laravel-mysql',
    reason: 'CS diploma fundamentals supported internship Laravel & MySQL work.',
  },
  {
    from: 'node-aws-ccp',
    to: 'node-uipath-rpa',
    reason: 'Cloud foundations pair with current UiPath & RPA automation learning.',
  },
];
