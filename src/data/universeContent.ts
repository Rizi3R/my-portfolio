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
  | 'POS & Retail Support'
  | 'Business Systems & Admin'
  | 'Hardware & Connectivity'
  | 'Helpdesk & User Support'
  | 'Credentials & Internship'
  | 'Active Learning';

export const CONSTELLATION_CATEGORIES: ConstellationCategory[] = [
  'POS & Retail Support',
  'Business Systems & Admin',
  'Hardware & Connectivity',
  'Helpdesk & User Support',
  'Credentials & Internship',
  'Active Learning',
];

export const EVIDENCE_META: Record<
  EvidenceStatus,
  { label: string; glyph: string; description: string }
> = {
  professional: {
    label: 'Work-Backed Experience',
    glyph: '◆',
    description: 'Capabilities used directly in paid IT operations or application support roles.',
  },
  project: {
    label: 'Internship, Academic & Credential',
    glyph: '■',
    description: 'Verified academic grounding, completed internship work, or earned certification.',
  },
  learning: {
    label: 'Currently Learning',
    glyph: '○',
    description: 'Active self-directed exploration kept clearly separate from workplace claims.',
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
  availabilityNote: string;
}

export interface CoreIdentity {
  id: string;
  label: string;
  headline: string;
  description: string;
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
  featuredOnHome?: boolean;
  issue: string;
  whatIDid: string[];
  outcomeOrStatus: string;
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
  category: string;
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
    'I’m Aries Razak, a System Application Specialist at emart24 Malaysia. I troubleshoot Xilnex POS and payment issues, coordinate with vendors and outlet teams, and help get new stores ready to open. My experience also includes a Google Workspace to Lark migration and day-to-day IT support.',
  availabilityNote:
    'Open to roles in Application Support, IT Operations, and Business Systems Administration.',
};

export const CORE_IDENTITIES: CoreIdentity[] = [
  {
    id: 'pos-ops',
    label: '01. Application & POS Operations',
    headline: 'Keeping store checkout and back-office systems running',
    description:
      'Day-to-day troubleshooting of Xilnex POS sync, promotion, and payment issues across HQ and outlets, combined with vendor escalation and new-store setup checks.',
  },
  {
    id: 'business-systems',
    label: '02. Business Systems & Migration',
    headline: 'Supporting tools teams rely on every day',
    description:
      'Hands-on help with a Google Workspace to Lark migration, Lark administration, approvals and workflow support, user onboarding and offboarding, and NetSuite Excel data checks.',
  },
  {
    id: 'tech-curiosity',
    label: '03. Systems & Technology Curiosity',
    headline: 'Exploring how hardware, networks, and software fit together',
    description:
      'Beyond day-to-day support, I explore workflow automation with UiPath and build small interactive walkthroughs to understand networking, caching, and checkout flows.',
  },
];

/**
 * ILLUSTRATIVE EDUCATIONAL WALKTHROUGH ("BEEP TO RECEIPT")
 * Explicitly framed as a general educational model of how a retail checkout can work.
 * Not presented as verified proprietary production architecture or first-person employer claims.
 */
export const STRATA: StratumDef[] = [
  {
    id: 'hardware',
    index: '01',
    title: 'Hardware & Peripherals',
    subtitle: 'Illustrative Layer: Scanners, Terminals, Printers & Cabling',
    description:
      'At the counter, physical devices capture an item barcode or card tap and print a paper slip once approved. Clean USB/power connections and intact Ethernet drops keep peripherals reachable.',
    exampleStage: 'Example Step: Barcode scan & peripheral input',
    examplePayload: 'INPUT -> UPC/EAN string from handheld scanner to register host',
    whatHappensConceptually:
      'A barcode scanner reads reflected light, decodes bars into digits, and passes keystrokes or serial input to the checkout terminal.',
    exampleComponents: ['Barcode Scanner', 'Receipt Printer', 'Payment Terminal', 'RJ45 Cabling'],
    accentColor: '#DC343B',
  },
  {
    id: 'kernel',
    index: '02',
    title: 'Operating System & Drivers',
    subtitle: 'Illustrative Layer: Device Recognition & Print Spooling',
    description:
      'The operating system on the terminal exposes connected scanners, printers, and network adapters through standard device drivers so the POS software can read input and send print jobs.',
    exampleStage: 'Example Step: OS device & spooler handoff',
    examplePayload: 'OS -> USB HID input event -> Print Spooler queue dispatch',
    whatHappensConceptually:
      'Input drivers route scan events to the active checkout window, while the OS print queue formats receipt output for the attached thermal printer.',
    exampleComponents: ['USB Drivers', 'Print Spooler', 'Network Interface', 'Local Storage'],
    accentColor: '#B0E0E6',
  },
  {
    id: 'network',
    index: '03',
    title: 'Local Network & Internet Link',
    subtitle: 'Illustrative Layer: LAN Switching, Wi-Fi & Upstream Routing',
    description:
      'Store devices communicate over local Ethernet or Wi-Fi through switches and a gateway router to reach cloud POS backends, payment processors, and central inventory services.',
    exampleStage: 'Example Step: Local LAN hop to WAN gateway',
    examplePayload: 'LAN Ethernet -> Store Switch -> Edge Router -> ISP Uplink',
    whatHappensConceptually:
      'If a wall port, patch lead, or gateway link drops, local registers cannot sync catalog pricing updates or reach external payment hosts.',
    exampleComponents: ['Ethernet Links', 'Store Wi-Fi', 'Local Switch', 'Gateway Router'],
    accentColor: '#B0E0E6',
  },
  {
    id: 'application',
    index: '04',
    title: 'POS Application & Transaction Flow',
    subtitle: 'Illustrative Layer: Basket Lookup, Promotions & Receipts',
    description:
      'The POS application matches scanned SKUs against the active price and promotion catalog, tallies taxes and totals, requests tender confirmation, and records the completed sale.',
    exampleStage: 'Example Step: SKU lookup & tender state update',
    examplePayload: 'POS App -> Match SKU price & promo rules -> Record basket total',
    whatHappensConceptually:
      'When catalogs or promotions fail to sync between HQ and a branch register, cashiers see stale prices or missing promo discounts until a sync completes.',
    exampleComponents: ['SKU Lookup', 'Promotion Rules', 'Payment Trigger', 'Sales Sync'],
    accentColor: '#DC343B',
  },
  {
    id: 'cloud',
    index: '05',
    title: 'Back-Office, ERP & Collaboration Platforms',
    subtitle: 'Illustrative Layer: Central Reporting, Inventory & Accounts',
    description:
      'Completed store transactions and operational requests feed into central retail reporting, ERP spreadsheets, and workplace collaboration tools used by HQ and store managers.',
    exampleStage: 'Example Step: HQ sync & business systems handoff',
    examplePayload: 'POS Sync -> HQ Catalog & Reporting -> Collaboration / ERP Tools',
    whatHappensConceptually:
      'Central platforms rely on clean user accounts, structured import data, and steady branch connectivity to keep store records consistent.',
    exampleComponents: ['HQ Catalog Sync', 'Business Email & Chat', 'ERP Data Imports', 'User Access'],
    accentColor: '#B0E0E6',
  },
  {
    id: 'operations',
    index: '06',
    title: 'People, Triage & Vendor Coordination',
    subtitle: 'Illustrative Layer: Store Staff, IT Support & Escalation',
    description:
      'Technology works when teams know what to check first and where to escalate. Practical troubleshooting combines clear user communication, repeatable checks, and timely vendor follow-up.',
    exampleStage: 'Example Step: Issue triage & escalation coordination',
    examplePayload: 'Outlet Report -> Initial Check & Sync -> Escalate if unresolved',
    whatHappensConceptually:
      'Support staff reproduce or verify symptoms with cashiers on the phone, try safe first-line checks, and pass clear context to external vendors when deeper fixes are required.',
    exampleComponents: ['Outlet Support', 'Remote Triage', 'Vendor Escalation', 'New-Store Readiness'],
    accentColor: '#DC343B',
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'exp-emart24',
    role: 'System Application Specialist',
    organization: 'emart24 Malaysia',
    period: 'September 2025 to present',
    location: 'Malaysia',
    summary:
      'Supporting Xilnex POS across HQ and outlets, troubleshooting sync, promotion, and payment issues, coordinating with vendors and internal teams, and helping prepare IT setups for multiple new-store openings.',
    highlights: [
      'Support Xilnex POS across HQ and store outlets, troubleshooting sync, promotion, and payment issues.',
      'Handle application troubleshooting and coordinate escalation with external vendors and internal teams when issues need deeper investigation.',
      'Help set up and check POS devices, payment terminals, peripherals, and store LAN/Wi-Fi connectivity for multiple new-store openings.',
      'Assist with Microsoft 365 account provisioning and UAT support within assigned project scope.',
    ],
    technologies: [
      'Xilnex POS',
      'Application Troubleshooting',
      'Vendor Escalation',
      'POS Peripherals',
      'LAN / Wi-Fi Setup',
      'Microsoft 365 Support',
      'UAT Support',
    ],
  },
  {
    id: 'exp-palaterium',
    role: 'IT Support at Palaterium Sdn Bhd',
    organization: 'Palaterium Sdn Bhd (HWC Coffee)',
    period: 'April 2024 to August 2025',
    location: 'Malaysia',
    summary:
      'Day-to-day IT support for Xilnex, hardware, networking, and remote users alongside Google Workspace to Lark migration tasks, Lark administration, and NetSuite data preparation.',
    highlights: [
      'Supported Xilnex POS, workstation and store hardware, basic networking, and remote users using TeamViewer and Lark Helpdesk.',
      'Helped with the Google Workspace to Lark migration and supported colleagues as they learned Lark day to day.',
      'Managed Lark administration tasks, approvals and workflow support, and user onboarding and offboarding.',
      'Prepared and validated Excel spreadsheets to support clean data imports into NetSuite.',
    ],
    technologies: [
      'Lark Administration',
      'Google Workspace Migration',
      'Xilnex POS',
      'TeamViewer',
      'Lark Helpdesk',
      'Approvals & Workflows',
      'Excel / NetSuite Data Prep',
    ],
  },
  {
    id: 'exp-mps',
    role: 'IT Technician',
    organization: 'Managed Print Services',
    period: 'Oct 2023 to Mar 2024',
    location: 'Malaysia',
    summary:
      'Field and onsite technical support focused on printers, copiers, workstations, connectivity troubleshooting, and Freshdesk ticket handling.',
    highlights: [
      'Delivered onsite technical support for office printers, multi-function copiers, and user workstations.',
      'Troubleshot hardware, software, and local connectivity issues across customer sites.',
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
    location: 'Putrajaya, Malaysia',
    summary:
      'Internship experience contributing to the internal DKICT declaration web system using Laravel and MySQL, alongside requirements documentation and entity-relationship diagrams.',
    highlights: [
      'IT internship contribution to the internal DKICT declaration system built with PHP Laravel and MySQL.',
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
    id: 'case-pos-triage',
    title: 'Xilnex POS incident triage & escalation',
    organization: 'emart24 Malaysia',
    featuredOnHome: true,
    issue:
      'Store outlets report Xilnex POS sync delays, missing or mismatched promotions, and payment-related issues during active store hours.',
    whatIDid: [
      'Verified reported symptoms directly with outlet staff and checked POS application and sync status.',
      'Guided staff through initial safe checks such as triggering a manual sync or restarting the affected terminal when appropriate.',
      'Collected clear context on what was checked and observed, then coordinated escalation with vendors and internal teams when deeper fixes were needed.',
    ],
    outcomeOrStatus:
      'Kept initial application checks and vendor or internal escalation steps organized around confirmed observations rather than guesswork.',
    technologies: [
      'Xilnex POS',
      'Sync Troubleshooting',
      'Promotion Checks',
      'Payment Issue Triage',
      'Vendor Coordination',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-lark-migration',
    title: 'Google Workspace to Lark migration support',
    organization: 'Palaterium Sdn Bhd',
    featuredOnHome: true,
    issue:
      'Staff moving from Google Workspace to Lark needed hands-on assistance learning daily tools while keeping onboarding, approvals, and helpdesk requests moving.',
    whatIDid: [
      'Helped carry out operational tasks for the Google Workspace to Lark transition.',
      'Supported colleagues directly as they learned how to use Lark messaging, mail, approvals, and helpdesk channels.',
      'Maintained Lark administration duties, onboarding and offboarding accounts, approval workflow support, and Excel spreadsheet preparation for NetSuite imports.',
    ],
    outcomeOrStatus:
      'Supported team adoption of Lark workflows alongside day-to-day helpdesk, account lifecycle, and NetSuite import preparation.',
    technologies: [
      'Google Workspace',
      'Lark Administration',
      'Approvals & Workflows',
      'Onboarding & Offboarding',
      'Excel / NetSuite',
    ],
    stratumFocus: 'cloud',
  },
  {
    id: 'case-store-launch',
    title: 'New-store IT readiness & cabling fix',
    organization: 'emart24 Malaysia',
    featuredOnHome: false,
    issue:
      'Before new outlets open, POS devices, payment terminals, peripherals, and store LAN/Wi-Fi links must be assembled and checked ready for trading.',
    whatIDid: [
      'Helped set up and check POS terminals, payment terminals, receipt printers, scanners, and LAN/Wi-Fi connectivity across multiple new-store openings.',
      'During one new-store setup, tested a network run where the cable tester skipped pin 4 and reterminated the RJ45 connector on site.',
    ],
    outcomeOrStatus:
      'Delivered hands-on counter equipment readiness and connector retermination across assigned store openings.',
    technologies: [
      'POS Device Setup',
      'Payment Terminals',
      'POS Peripherals',
      'LAN / Wi-Fi Checks',
      'RJ45 Termination',
    ],
    stratumFocus: 'hardware',
  },
];

export const EDUCATION: EducationEntry = {
  degree: 'Diploma in Computer Science and Mathematics',
  institution: 'Universiti Teknologi MARA (UiTM)',
  period: '2019 to 2022',
  focus:
    'Academic foundation in software engineering fundamentals, relational databases, data structures, and computing mathematics.',
};

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'cert-aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    status: 'credential',
    note: 'Recognized foundational cloud credential covering core AWS services, cloud architecture concepts, security, and billing.',
  },
  {
    id: 'cert-ai-teach',
    name: 'Generative AI Copilot Digital Upskilling Program',
    issuer: 'AI Teach Malaysia',
    status: 'completed',
    note: 'Completed upskilling program exploring generative AI productivity workflows and practical workplace tools.',
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
 * WORK-BACKED & PROJECT SKILLS FIRST, FOLLOWED BY ACTIVE LEARNING
 * Zero unsupported technical claims (no 802.1Q VLANs, no ISO 8583 packet claim,
 * no Dual-WAN/DNS config claim, no SQLite locking claim, no Event Viewer/DHCP claim,
 * no ITIL 4 or Linux study claims).
 */
export const NODES: UniverseNode[] = [
  // --- Work-Backed Skills (emart24 & Palaterium) ---
  {
    id: 'node-xilnex-pos',
    label: 'Xilnex POS Support',
    category: 'POS & Retail Support',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 68,
    y: 42,
    summary: 'Application support for Xilnex POS across HQ and retail outlets, checking sync, promotions, and payment issues.',
    evidenceRef: 'exp-emart24',
    usage: 'Daily troubleshooting of Xilnex POS sync, promotion, and payment issues plus escalation coordination.',
    year: '2024 to Present',
  },
  {
    id: 'node-triage-escalation',
    label: 'App Triage & Vendor Escalation',
    category: 'POS & Retail Support',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 84,
    y: 34,
    summary: 'Checking symptoms with outlet teams, guiding first-line sync or restart steps, and coordinating vendor escalation.',
    evidenceRef: 'case-pos-triage',
    usage: 'Coordinating store incident follow-up between cashiers, internal colleagues, and external application vendors.',
    year: '2025 to Present',
  },
  {
    id: 'node-pos-peripherals',
    label: 'POS Devices & Peripherals',
    category: 'Hardware & Connectivity',
    stratum: 'hardware',
    status: 'professional',
    kind: 'technology',
    x: 16,
    y: 42,
    summary: 'Hands-on setup and functional checks for POS terminals, payment terminals, barcode scanners, and receipt printers.',
    evidenceRef: 'case-store-launch',
    usage: 'Helping set up and test store counter equipment across multiple new-store openings.',
    year: '2024 to Present',
  },
  {
    id: 'node-lan-cabling',
    label: 'LAN / Wi-Fi & RJ45 Cabling',
    category: 'Hardware & Connectivity',
    stratum: 'network',
    status: 'professional',
    kind: 'technology',
    x: 44,
    y: 44,
    summary: 'Checking store LAN and Wi-Fi links during setups and reterminating faulty RJ45 connectors identified on cable testers.',
    evidenceRef: 'case-store-launch',
    usage: 'Checked new-store connectivity and reterminated an RJ45 connector after a cable tester skipped pin 4.',
    year: '2024 to Present',
  },
  {
    id: 'node-lark-admin',
    label: 'Lark Admin & Approvals',
    category: 'Business Systems & Admin',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 78,
    y: 66,
    summary: 'Lark administration, helpdesk queues, approval workflows, user onboarding and offboarding, and helping colleagues learn Lark.',
    evidenceRef: 'case-lark-migration',
    usage: 'Administered Lark accounts, approval workflows, and onboarding/offboarding at Palaterium Sdn Bhd.',
    year: '2024 to 2025',
  },
  {
    id: 'node-gws-migration',
    label: 'Google Workspace Migration',
    category: 'Business Systems & Admin',
    stratum: 'cloud',
    status: 'professional',
    kind: 'project',
    x: 64,
    y: 72,
    summary: 'Operational support helping transition users and daily workflows from Google Workspace to Lark.',
    evidenceRef: 'case-lark-migration',
    usage: 'Helped carry out migration tasks and coached colleagues moving from Google Workspace to Lark.',
    year: '2024 to 2025',
  },
  {
    id: 'node-excel-netsuite',
    label: 'Excel & NetSuite Data Prep',
    category: 'Business Systems & Admin',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 56,
    y: 60,
    summary: 'Preparing and checking Excel datasets before import into NetSuite ERP workflows.',
    evidenceRef: 'exp-palaterium',
    usage: 'Prepared and validated operational Excel spreadsheets for NetSuite imports at Palaterium Sdn Bhd.',
    year: '2024 to 2025',
  },
  {
    id: 'node-m365-uat',
    label: 'Microsoft 365 & UAT Support',
    category: 'Helpdesk & User Support',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 86,
    y: 54,
    summary: 'Assisting with Microsoft 365 account provisioning tasks and supporting user acceptance testing when assigned.',
    evidenceRef: 'exp-emart24',
    usage: 'Assisted HQ teams with Microsoft 365 account provisioning and UAT support at emart24 Malaysia.',
    year: '2025 to Present',
  },
  {
    id: 'node-teamviewer-helpdesk',
    label: 'Remote Support & Helpdesk',
    category: 'Helpdesk & User Support',
    stratum: 'operations',
    status: 'professional',
    kind: 'technology',
    x: 82,
    y: 78,
    summary: 'Supporting remote users and troubleshooting workstation and software issues via TeamViewer, Lark Helpdesk, and Freshdesk.',
    evidenceRef: 'exp-palaterium',
    usage: 'Handled remote troubleshooting and ticket workflows across TeamViewer, Lark Helpdesk, and Freshdesk.',
    year: '2023 to 2025',
  },
  {
    id: 'node-printers-onsite',
    label: 'Printers, Copiers & Onsite IT',
    category: 'Hardware & Connectivity',
    stratum: 'hardware',
    status: 'professional',
    kind: 'technology',
    x: 22,
    y: 66,
    summary: 'Onsite support for office printers, multi-function copiers, and end-user hardware, software, and connectivity checks.',
    evidenceRef: 'exp-mps',
    usage: 'Provided onsite printer, copier, and workstation support during IT Technician role.',
    year: '2023 to 2024',
  },

  // --- Internship & Academic Foundations ---
  {
    id: 'node-laravel-mysql',
    label: 'Laravel & MySQL (Internship)',
    category: 'Credentials & Internship',
    stratum: 'application',
    status: 'project',
    kind: 'project',
    x: 52,
    y: 24,
    summary: 'Internship work contributing to the DKICT declaration web system with Laravel, MySQL, requirements docs, and ERDs.',
    evidenceRef: 'exp-agc',
    usage: 'Contributed to the internal DKICT declaration system during IT internship at Attorney General’s Chambers.',
    year: '2021 to 2022',
  },
  {
    id: 'node-uitm-cs',
    label: 'CS & Math Fundamentals (UiTM)',
    category: 'Credentials & Internship',
    stratum: 'kernel',
    status: 'project',
    kind: 'project',
    x: 30,
    y: 24,
    summary: 'Diploma in Computer Science & Mathematics providing software, database, and structured problem-solving foundations.',
    evidenceRef: 'exp-uitm',
    usage: 'Completed UiTM Diploma in Computer Science and Mathematics (2019 to 2022).',
    year: '2019 to 2022',
  },
  {
    id: 'node-aws-ccp',
    label: 'AWS Cloud Practitioner',
    category: 'Credentials & Internship',
    stratum: 'cloud',
    status: 'project',
    kind: 'project',
    x: 68,
    y: 22,
    summary: 'AWS Certified Cloud Practitioner credential covering foundational cloud concepts, shared responsibility, and billing.',
    evidenceRef: 'cert-aws',
    usage: 'Earned AWS Certified Cloud Practitioner credential.',
    year: 'Credential',
  },

  // --- Active Learning (Strictly Isolated) ---
  {
    id: 'node-uipath-rpa',
    label: 'UiPath & RPA',
    category: 'Active Learning',
    stratum: 'cloud',
    status: 'learning',
    kind: 'technology',
    x: 42,
    y: 78,
    summary: 'Currently learning UiPath and exploring Robotic Process Automation (RPA) for workflow automation concepts.',
    usage: 'Self-paced study exploring how repetitive processes can be automated safely.',
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
    to: 'node-triage-escalation',
    reason: 'POS sync or payment alerts move from initial checks to vendor escalation.',
  },
  {
    from: 'node-gws-migration',
    to: 'node-lark-admin',
    reason: 'Migration handover leads into daily Lark admin, approvals, and onboarding.',
  },
  {
    from: 'node-lark-admin',
    to: 'node-teamviewer-helpdesk',
    reason: 'Lark Helpdesk connects internal users with remote troubleshooting.',
  },
  {
    from: 'node-excel-netsuite',
    to: 'node-lark-admin',
    reason: 'Business workflow support links validated Excel prep with internal ops.',
  },
  {
    from: 'node-m365-uat',
    to: 'node-triage-escalation',
    reason: 'User provisioning and UAT support sit alongside application operations.',
  },
  {
    from: 'node-printers-onsite',
    to: 'node-teamviewer-helpdesk',
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
    reason: 'Cloud concepts complement current exploration of workflow automation.',
  },
];
