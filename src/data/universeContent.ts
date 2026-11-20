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
    description: 'Academic foundation, supervised internship development, or completed credential.',
  },
  learning: {
    label: 'Currently Learning',
    glyph: '○',
    description: 'Self-directed study kept distinct from professional delivery.',
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
  supportingLine: string;
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

export interface SupportingArtifact {
  label: string;
  title: string;
  format: string;
  summary: string;
  items: Array<{ key: string; value: string }>;
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
  outcome?: string;
  supportingMaterial?: SupportingArtifact;
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
  supportingLine:
    'Experience across application support, SaaS administration, and multi-site IT operations.',
  resumeSummary:
    'System Application Specialist supporting business applications, user access administration, third-party portal integrations, and multi-site IT readiness. Experienced in Xilnex POS support, HR-driven account provisioning, Excel promotion-import templates, vendor escalation, and leading an internal Google Workspace to Lark migration with support from the Lark team.',
  availabilityNote:
    'I’m open to application support, business systems, SaaS support, integration support, and IT operations opportunities.',
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
      'Provide application support for Xilnex POS across HQ and outlets, administer store user access, configure delivery integrations, and prepare new-store IT setups.',
    highlights: [
      'Provision Xilnex POS user accounts from HR onboarding requests after verifying request status, user groups, and outlet assignments, and clean up access and staff-discount eligibility for departed employees.',
      'Coordinate with Xilnex and delivery partners (GrabFood, foodpanda, and ShopeeFood) to configure store links, price schemes, and menu profiles, then save and sync outlet settings.',
      'Troubleshoot sync, promotion, and payment symptoms in Xilnex POS across HQ and outlets, guiding initial checks and escalating verified issues to external vendors or internal teams.',
      'Created an Excel template that structured recurring promotion requests for import into the Xilnex Promotion Portal and provided guidance on the import function.',
      'Set up and check POS devices, payment terminals, scanners, printers, and LAN/Wi-Fi connectivity for new-store openings, and assist with Microsoft 365 provisioning and UAT support within assigned scope.',
    ],
    technologies: [
      'Xilnex POS',
      'User Access Provisioning',
      'GrabFood / foodpanda / ShopeeFood Config',
      'Excel Import Templates',
      'Vendor Escalation',
      'Microsoft 365 Provisioning',
      'UAT Support',
    ],
  },
  {
    id: 'exp-hwc',
    role: 'IT Support | HWC Coffee Malaysia',
    organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
    period: 'March 2024 to September 2025',
    compactPeriod: 'Mar 2024 to Sep 2025',
    location: 'Malaysia',
    summary:
      'Led the internal Google Workspace to Lark migration with support from the Lark team, administered Lark workflows and user access, and handled helpdesk and ERP data preparation.',
    highlights: [
      'Led the Google Workspace to Lark migration internally with support from the Lark team.',
      'Administered the Lark workspace, handling user accounts, onboarding and offboarding, and approval workflows.',
      'Supported colleagues adopting Lark messaging, mail, approvals, and helpdesk, alongside Xilnex POS, hardware, networking, and remote support via TeamViewer and Lark Helpdesk.',
      'Prepared and validated Excel spreadsheets for NetSuite imports.',
    ],
    technologies: [
      'Google Workspace to Lark Migration',
      'Lark Administration',
      'Onboarding & Offboarding',
      'Approval Workflows',
      'TeamViewer & Lark Helpdesk',
      'Xilnex POS',
      'Excel & NetSuite Prep',
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
      'Delivered onsite hardware, printer/copier, and workstation support alongside ticket handling in Freshdesk.',
    highlights: [
      'Provided onsite technical support for office printers, multi-function copiers, and user workstations.',
      'Troubleshot hardware, software, and local connectivity issues on customer sites.',
      'Tracked and updated support requests through Freshdesk.',
    ],
    technologies: [
      'Onsite IT Support',
      'Printers & Copiers',
      'Connectivity Checks',
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
      'Undergraduate internship contributing to the internal DKICT declaration web application using PHP Laravel, MySQL, requirements documentation, and ERDs.',
    highlights: [
      'Contributed to feature development for the internal DKICT declaration web system using PHP Laravel and MySQL under team supervision.',
      'Prepared requirements documentation and entity-relationship diagrams (ERDs).',
      'Supported functional verification tasks during the internship period.',
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
    roleScope: 'Internal Migration Lead & Workspace Admin',
    featuredOnHome: true,
    summaryLine:
      'Internal migration coordination, account lifecycle administration, approval setup, and team adoption from Google Workspace to Lark.',
    situation:
      'Colleagues moving daily communication and operations out of Google Workspace needed structured internal coordination so accounts, approvals, and everyday support stayed uninterrupted during the switch.',
    responsibility:
      'I led the migration internally at HWC Coffee Malaysia with support from the Lark team, administered the workspace, and guided colleagues through adopting the new tools.',
    whatIDid: [
      'Coordinated migration rollout steps internally alongside the Lark team to keep workplace transition tasks aligned.',
      'Administered the Lark environment, including user account setup, onboarding and offboarding access changes, and approval workflows.',
      'Supported colleagues across Lark messaging, mail, approvals, and Lark Helpdesk requests as teams moved onto daily workflows.',
    ],
    outcome:
      'Teams adopted Lark across messaging, mail, approvals, and helpdesk channels with structured workspace administration and onboarding/offboarding processes in place.',
    technologies: [
      'Lark Administration',
      'Google Workspace Migration Coordination',
      'User Onboarding & Offboarding',
      'Approval Workflows',
      'Lark Messaging, Mail & Helpdesk',
    ],
    stratumFocus: 'cloud',
  },
  {
    id: 'case-integrations',
    title: 'Third-Party Integration Configuration',
    organization: 'emart24 Malaysia',
    roleScope: 'Integration Coordination & Outlet Portal Configuration',
    period: 'September 2025 to present',
    featuredOnHome: true,
    summaryLine:
      'Coordinated vendor and delivery-partner setup for GrabFood, foodpanda, and ShopeeFood, then configured and synced outlet settings inside Xilnex.',
    workflowSteps: [
      'Coordinate prerequisites',
      'Configure outlet settings',
      'Save and sync',
    ],
    situation:
      'Connecting multi-outlet store menus and pricing to third-party delivery platforms requires both Xilnex and the external delivery partner to finish their setup before store mappings can be applied cleanly in the portal.',
    responsibility:
      'As System Application Specialist, I handled partner coordination and outlet-side application configuration in the Xilnex portal across GrabFood, foodpanda, and ShopeeFood.',
    whatIDid: [
      'Coordinated setup readiness between Xilnex and delivery partners (GrabFood, foodpanda, and ShopeeFood) to confirm both sides completed prerequisites.',
      'Configured outlet integrations inside the Xilnex portal once external prerequisites were confirmed ready.',
      'For foodpanda, linked the partner outlet to the matching Xilnex store and configured its assigned price scheme and menu profile.',
      'Saved and synced the outlet settings in Xilnex as the completed outlet-side configuration step.',
    ],
    outcome:
      'Completed and synced outlet-side configuration in the Xilnex portal across assigned outlets for GrabFood, foodpanda, and ShopeeFood integrations.',
    technologies: [
      'Xilnex Portal Configuration',
      'GrabFood',
      'foodpanda',
      'ShopeeFood',
      'Price Schemes & Menu Profiles',
      'Vendor & Partner Coordination',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-pos-triage',
    title: 'Application Incident Triage & Vendor Escalation',
    organization: 'emart24 Malaysia · Recurring Support Process',
    roleScope: 'First-Line Application Triage & Escalation',
    period: 'September 2025 to present',
    featuredOnHome: true,
    summaryLine:
      'Structured recurring triage workflow for Xilnex sync, promotion, and payment symptoms across HQ and outlets before escalating verified cases to vendors.',
    situation:
      'Across multi-site store operations, frontline staff encounter recurring POS symptoms involving catalog or promo syncs and payment flows. Escalating directly without separating local state from platform faults slows resolution, so consistent first-line triage is required.',
    responsibility:
      'I serve as first-line application support for Xilnex POS across HQ and outlets, running structured local checks before escalating confirmed incidents.',
    whatIDid: [
      'Confirm symptoms with store teams to pinpoint affected screens, items, promotions, or payment steps.',
      'Inspect Xilnex application and sync progress, asking teams to let sync reach 100% before retesting.',
      'Guide controlled POS restarts when sync checks alone do not clear a symptom.',
      'Escalate recurring application and payment issues to Xilnex or internal teams with verified observations, including raising a recurring payment issue with Xilnex for investigation.',
    ],
    triageBreakdown: {
      checksPerformed: [
        'Verified exact on-screen symptom and affected register scope with outlet staff.',
        'Checked Xilnex sync progress to 100% and guided an appropriate register restart.',
      ],
      providedToVendor: [
        'Confirmed symptoms, steps already tried, and current sync status.',
        'Consolidated details when escalating a recurring payment issue to Xilnex.',
      ],
      vendorInvestigation: [
        'Underlying application behavior or platform-side findings outside outlet configuration.',
        'Any platform patch, code-level investigation, or vendor root-cause verification.',
      ],
    },
    outcome:
      'Provides a repeatable boundary between local first-line checks and vendor engineering investigation without guessing causes or overstating unverified fixes.',
    supportingMaterial: {
      label: 'Illustrative sample',
      title: 'Sample vendor handoff note',
      format: 'Recreated example with fictional fields',
      summary:
        'Illustrative structure showing how verified symptoms and checks are packaged for vendor investigation without exposing workplace identifiers.',
      items: [
        {
          key: 'Issue reported',
          value: 'Payment prompt stalls after card tap on Sample Outlet A (Register 02).',
        },
        {
          key: 'Checks completed',
          value: 'Confirmed screen behavior with cashier, waited for Xilnex sync to reach 100%, verified local LAN and power, and ran one guided restart.',
        },
        {
          key: 'Evidence available',
          value: 'Fictional timestamp (14:20 MYT), sample terminal label (REG-02-TEST), and confirmation that earlier sample sales synced.',
        },
        {
          key: 'Action requested',
          value: 'Investigate recurring application-side payment prompt stall and advise on vendor follow-up.',
        },
      ],
    },
    technologies: [
      'Xilnex POS',
      'Incident Triage',
      'Sync Verification',
      'Payment Issue Escalation',
      'Vendor Coordination',
    ],
    stratumFocus: 'application',
  },
  {
    id: 'case-store-launch',
    title: 'New-Site IT Deployment & Readiness',
    organization: 'emart24 Malaysia',
    roleScope: 'Site Equipment & Connectivity Readiness',
    period: 'September 2025 to present',
    featuredOnHome: true,
    summaryLine:
      'Setting up and verifying POS terminals, payment devices, peripherals, and LAN/Wi-Fi links so new outlets are checked ready to operate.',
    situation:
      'New outlet launches rely on counter POS terminals, payment devices, scanners, printers, and local network cabling working together before opening.',
    responsibility:
      'I help deploy and check store counter equipment and site LAN/Wi-Fi connectivity during new-store setup.',
    whatIDid: [
      'Set up and verified POS terminals, payment devices, barcode scanners, and receipt printers on counter stations.',
      'Checked local LAN drops and store Wi-Fi connectivity across counter hardware.',
      'Used a cable tester during one site setup to catch a line skipping pin 4 and reterminated the RJ45 connector onsite.',
    ],
    outcome:
      'Ensures counter hardware and local network links are physically verified prior to store trading.',
    technologies: [
      'POS Terminals',
      'Payment Devices',
      'Scanners & Printers',
      'LAN / Wi-Fi Checks',
      'RJ45 Retermination',
    ],
    stratumFocus: 'hardware',
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
    note: 'Foundational certification covering core AWS services, cloud concepts, shared responsibility, and billing.',
  },
  {
    id: 'cert-ai-teach',
    name: 'Generative AI Copilot Digital Upskilling Program',
    issuer: 'AI Teach Malaysia',
    kindLabel: 'Completed Program',
    status: 'completed',
    note: 'Completed digital upskilling program on workplace productivity workflows and generative AI tools.',
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
    usage: 'Coordinated unresolved POS and payment incidents between front-line users and external application vendors.',
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
  {
    id: 'node-delivery-integrations',
    label: 'Third-Party POS Integrations',
    category: 'Application Support',
    stratum: 'application',
    status: 'professional',
    kind: 'project',
    x: 91,
    y: 46,
    summary: 'Coordinating and configuring outlet-side delivery integrations in Xilnex for GrabFood, foodpanda, and ShopeeFood.',
    evidenceRef: 'case-integrations',
    usage: 'Linked stores and configured price schemes and menu profiles in the Xilnex portal, then saved and synced.',
    year: '2025 to Present',
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
    label: 'Excel Templates & Import Prep',
    category: 'Business Systems & SaaS',
    stratum: 'application',
    status: 'professional',
    kind: 'technology',
    x: 54,
    y: 56,
    summary: 'Structuring Excel templates for Xilnex Promotion Portal imports and preparing validated sheets for NetSuite.',
    evidenceRef: 'exp-emart24',
    usage: 'Built a recurring promotion import template for Xilnex (with import guidance) and prepared NetSuite data at HWC.',
    year: '2024 to Present',
  },
  {
    id: 'node-xilnex-access',
    label: 'Xilnex User Access Admin',
    category: 'Business Systems & SaaS',
    stratum: 'cloud',
    status: 'professional',
    kind: 'technology',
    x: 65,
    y: 82,
    summary: 'Provisioning Xilnex POS accounts from HR requests, checking roles and outlets, and cleaning up leaver access.',
    evidenceRef: 'exp-emart24',
    usage: 'Verified onboarding status, assigned approved roles/stores, and removed departed staff access and discount eligibility.',
    year: '2025 to Present',
  },
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
    usage: 'Assembled and verified store counter equipment readiness across new-store setups.',
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
    usage: 'Checked new-site connectivity and reterminated an RJ45 plug during one site setup.',
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
    to: 'node-xilnex-access',
    reason: 'Account provisioning practices align across Microsoft 365 and Xilnex POS.',
  },
  {
    from: 'node-xilnex-pos',
    to: 'node-delivery-integrations',
    reason: 'Outlet POS stability supports synced third-party delivery configurations.',
  },
  {
    from: 'node-delivery-integrations',
    to: 'node-uat-support',
    reason: 'Configured outlet profiles align with structured UAT and readiness checks.',
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
