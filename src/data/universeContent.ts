/**
 * UNIVERSE CONTENT MODEL & SINGLE SOURCE OF TRUTH
 * 
 * Strict Provenance Rules:
 * - Every node maps to verified employment, education, or hands-on simulations.
 * - Nodes with status 'professional' or 'project' MUST specify an evidenceRef.
 * - Every edge MUST have a descriptive 'reason' (max 120 chars).
 * - Summaries are factual, first person, and strictly <= 200 characters.
 */

export type StratumType = 
  | 'hardware' 
  | 'os' 
  | 'network' 
  | 'application' 
  | 'cloud-automation' 
  | 'people-process';

export type NodeKind = 'technology' | 'concept' | 'project' | 'role' | 'certification';

export type EvidenceStatus = 
  | 'professional' 
  | 'project' 
  | 'experiment' 
  | 'foundation' 
  | 'learning' 
  | 'exploring';

export interface UniverseNode {
  id: string;
  label: string;
  stratum: StratumType;
  kind: NodeKind;
  status: EvidenceStatus;
  summary: string; // Max 200 chars, factual, first person
  evidenceRef?: string; // Required when status is 'professional' or 'project'
  links?: Array<{ label: string; url: string }>;
  x: number; // Deterministic coordinate (0-100) for Atlas view
  y: number; // Deterministic coordinate (0-100) for Atlas view
}

export interface UniverseEdge {
  from: string;
  to: string;
  reason: string; // Required, max 120 chars, states real relationship
}

export interface UniverseExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  technologies: string[];
}

export interface UniverseCaseStudy {
  id: string;
  title: string;
  organization: string;
  stratum: StratumType;
  hook: string;
  challenge: string;
  investigation: string;
  actions: string[];
  outcome: string[];
  takeaway: string;
}

export interface UniverseCertification {
  name: string;
  issuer: string;
  status: 'Certified' | 'Completed' | 'In Progress';
  credentialNote: string;
}

/* =========================================================================
   1. CANDIDATE PROFILE & VERIFIED DOSSIER
   ========================================================================= */

export const PROFILE = {
  fullName: "Muhammad Aries Irhan bin Abd Razak",
  displayName: "Aries Razak",
  title: "System Application Specialist · IT Support · IT Operations",
  location: "Selangor / Kuala Lumpur, Malaysia",
  email: "ariesirhan25@gmail.com",
  linkedIn: "https://www.linkedin.com/in/aries-razak-a36045256",
  liveUrl: "https://aries-razak.vercel.app/",
  premise: "One scan. Six layers. Here is what happens between the beep and the receipt.",
  intro: "I keep business-critical systems running by day, and explore how computers, networks, and software work beneath the surface by night."
};

/* =========================================================================
   2. VERIFIED EXPERIENCES (SOURCE OF TRUTH)
   ========================================================================= */

export const EXPERIENCES: UniverseExperience[] = [
  {
    id: "exp-emart24",
    role: "System Application Specialist",
    organization: "emart24 Malaysia",
    location: "Subang Jaya, Selangor, Malaysia",
    period: "September 2025 – Present",
    isCurrent: true,
    bullets: [
      "Provide frontline and Tier-2 application troubleshooting for Xilnex POS, payment pinpads, and peripheral retail hardware across HQ and nationwide outlets.",
      "Triage operational incidents by assessing business impact, capturing reproducible logs, and systematically isolating application, network, or hardware faults.",
      "Coordinate directly with software vendors, payment acquirers, and technical partners, providing structured logs and error codes to validate hotfixes.",
      "Support new-site IT commissioning: hardware provisioning, LAN/Wi-Fi configuration, device setup, and pre-launch readiness sign-off.",
      "Conduct User Acceptance Testing (UAT) and system validation prior to production application updates and promotional campaigns.",
      "Troubleshoot outlet network connectivity, execute physical LAN cabling tasks including RJ45 crimping and cable tester continuity validation."
    ],
    technologies: ["Xilnex POS", "Payment Terminal APIs", "LAN / Wi-Fi Diagnostics", "RJ45 Continuity Testing", "UAT & System Validation", "Vendor Management"]
  },
  {
    id: "exp-palaterium",
    role: "IT Executive",
    organization: "Palaterium Sdn Bhd",
    location: "Kuala Lumpur, Malaysia",
    period: "April 2024 – August 2025",
    isCurrent: false,
    bullets: [
      "Managed user service requests and technical incidents via Lark Helpdesk adhering to defined SLA targets.",
      "Administered the Lark platform as Super Admin: configuring access permissions, role groups, directory structures, and user lifecycle workflows.",
      "Supported the company-wide migration from Google Workspace to Lark, assisting with user account preparation, data transition, and post-cutover support.",
      "Designed and deployed digital workflow automations in Lark, replacing manual paper memos and streamlining cross-departmental approvals.",
      "Assisted with NetSuite data imports and used Microsoft Excel formulas (VLOOKUP, duplicate auditing) to clean and validate business records.",
      "Provided remote desktop diagnostics using TeamViewer for distributed staff across multiple commercial sites."
    ],
    technologies: ["Lark Super Admin", "Google Workspace Migration", "NetSuite Data Import", "Microsoft Excel", "TeamViewer", "TCP/IP & LAN"]
  },
  {
    id: "exp-mps",
    role: "IT Technician",
    organization: "Managed Print Services",
    location: "Kajang, Selangor, Malaysia",
    period: "October 2023 – March 2024",
    isCurrent: false,
    bullets: [
      "Dispatched for onsite and remote technical support across corporate customer accounts.",
      "Diagnosed and repaired workstations, commercial multifunction printers, copiers, and network peripherals.",
      "Troubleshot hardware malfunctions, driver conflicts, firmware updates, and Windows operating system errors.",
      "Configured client network printing, static IP assignments, and subnet connectivity for multi-user office environments.",
      "Logged, updated, and resolved service tickets through Freshdesk within target turnaround SLAs."
    ],
    technologies: ["Freshdesk", "Hardware Diagnostics", "Printer Firmware", "Windows OS Support", "TCP/IP & Print Servers"]
  },
  {
    id: "exp-agc",
    role: "IT Intern – Full-Stack Developer",
    organization: "Attorney General’s Chambers of Malaysia",
    location: "Putrajaya, Malaysia",
    period: "September 2021 – February 2022",
    isCurrent: false,
    bullets: [
      "Contributed to full-stack web application development for the DKICT Declaration System using PHP Laravel and MySQL.",
      "Authored System Requirements Specification (SRS) documentation and designed Entity Relationship Diagrams (ERDs).",
      "Executed SQL queries to validate database schema constraints, data relationships, and record integrity.",
      "Investigated application logic errors and user-reported bugs during development and user acceptance testing."
    ],
    technologies: ["Laravel", "MySQL", "PHP", "Entity Relationship Diagrams (ERD)", "System Requirements Specification (SRS)", "UAT Testing"]
  }
];

export const CERTIFICATIONS: UniverseCertification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    status: "Certified",
    credentialNote: "Validates foundational knowledge of AWS cloud primitives, security models, VPC architecture, and IAM."
  },
  {
    name: "Diploma in Computer Science & Mathematics",
    issuer: "Universiti Teknologi MARA (UiTM)",
    status: "Certified",
    credentialNote: "Formal academic degree covering OOP, data structures, relational databases, discrete mathematics, and computer networks."
  },
  {
    name: "Generative AI Copilot Digital Upskilling Program",
    issuer: "AI Teach Malaysia",
    status: "Completed",
    credentialNote: "Practical workflow upskilling on AI documentation assistance and data synthesis."
  },
  {
    name: "ITIL 4 Foundation Curriculum",
    issuer: "Axelos / PeopleCert Curriculum",
    status: "In Progress",
    credentialNote: "Self-study into enterprise Service Value System (SVS), incident triage, and change enablement best practices."
  }
];

/* =========================================================================
   3. VERIFIED CASE STUDIES
   ========================================================================= */

export const CASE_STUDIES: UniverseCaseStudy[] = [
  {
    id: "case-app-troubleshooting",
    title: "POS Transaction Triage & Acquirer Gateway Isolation",
    organization: "emart24 Malaysia",
    stratum: "application",
    hook: "Isolating point-of-sale timeout 504 errors from bank issuer declines during peak retail lunch queues.",
    challenge: "Cashiers reported 'payment not working' under heavy customer volume. Unclear whether the issue was LAN drop, terminal hardware, bank host timeout, or sync lag.",
    investigation: "Tested LAN gateway latency, reviewed EDC ISO-8583 response codes, and verified Xilnex local SQLite transaction queues.",
    actions: [
      "Established triage protocol separating bank issuer declines (e.g. 'Do Not Honour') from network connectivity timeouts.",
      "Provided third-party payment vendor with timestamped transaction logs and terminal IDs for rapid server-side isolation.",
      "Guided store teams on immediate terminal restart and cache flush SOPs to recover cashier lanes."
    ],
    outcome: [
      "Cut incident turnaround by eliminating vague bug reports to software partners.",
      "Preserved retail checkout continuity with zero unscheduled store lane shutdowns."
    ],
    takeaway: "Fast application resolution requires translating user frustration into concrete, reproducible technical parameters."
  },
  {
    id: "case-infrastructure-deployment",
    title: "Physical Layer-1 Cabling & Store IT Commissioning",
    organization: "emart24 Malaysia",
    stratum: "hardware",
    hook: "Commissioning hardware, physical cabling, and endpoint connectivity for zero opening-day IT downtime.",
    challenge: "New retail outlet openings require POS registers, payment pinpads, receipt printers, CCTV cameras, and office PCs working reliably before grand opening.",
    investigation: "Used an 8-wire cable tester to inspect physical pinouts across wall jacks; identified broken copper pairs on pins 4 and 5.",
    actions: [
      "Re-crimped RJ45 connectors to the T-568B standard and confirmed 8-pin continuity with a ratcheting tester.",
      "Configured isolated 802.1Q VLANs on the managed switch to segregate POS payment traffic from customer Wi-Fi.",
      "Conducted end-to-end simulated transaction, receipt print, and EOD settlement tests."
    ],
    outcome: [
      "Delivered multiple new store IT handovers with zero opening-day IT downtime.",
      "Eliminated expensive third-party contractor dispatch costs by resolving physical terminations on site."
    ],
    takeaway: "High-level software configurations fail if Layer-1 physical connectivity is broken. Fluency from RJ45 to IP routing is essential."
  },
  {
    id: "case-saas-migration",
    title: "Enterprise SaaS Migration & Super Admin Governance",
    organization: "Palaterium Sdn Bhd",
    stratum: "cloud-automation",
    hook: "Transitioning 100+ business users from Google Workspace to Lark while automating paperless approvals.",
    challenge: "Migrating communication, files, and approval workflows across non-technical departments without operational downtime.",
    investigation: "Audited existing mailboxes, mapped department hierarchy into organizational units, and mapped manual paper bottlenecks.",
    actions: [
      "Configured Lark Super Admin directory, SAML access policies, and user lifecycle groups prior to cutover.",
      "Built automated paperless approval workflows within Lark Base, replacing physical purchase requisition memos.",
      "Delivered desk-side and remote TeamViewer migration support to onboard department teams smoothly."
    ],
    outcome: [
      "Transitioned company to Lark with zero communication loss and reduced administrative approval turnaround.",
      "Established structured onboarding and offboarding security policies for departing employees."
    ],
    takeaway: "SaaS platform success depends heavily on user change management, clear documentation, and empathetic desk-side support."
  },
  {
    id: "case-dkict-system",
    title: "Web MVC Application Development & Relational ERD",
    organization: "Attorney General’s Chambers of Malaysia",
    stratum: "application",
    hook: "Engineering an internal compliance declaration portal from requirements gathering to normalized MySQL schema.",
    challenge: "Translating public sector ICT guidelines into functional relational database tables and straightforward web submission forms.",
    investigation: "Engaged administrative stakeholders to document manual declaration processes and drafted formal System Requirements Specifications.",
    actions: [
      "Constructed Entity Relationship Diagrams (ERDs) with normalized 3NF relational schemas in MySQL.",
      "Implemented MVC controllers, form validation rules, and session handling in PHP Laravel.",
      "Conducted User Acceptance Testing (UAT) with departmental representatives to validate form validation logic."
    ],
    outcome: [
      "Delivered core functional modules of the DKICT declaration workflow in accordance with institutional guidelines.",
      "Gained foundational software engineering discipline that directly informs application root-cause analysis."
    ],
    takeaway: "Understanding how an MVC framework handles routing and database queries gives support engineers a sharp diagnostic edge."
  }
];

/* =========================================================================
   4. THE ATLAS KNOWLEDGE GRAPH (NODES & EDGES)
   ========================================================================= */

export const NODES: UniverseNode[] = [
  // STRATUM 1: HARDWARE & PERIPHERALS
  {
    id: "node-scanner",
    label: "Laser & 2D Barcode Scanner",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I configure handheld and fixed barcode scanners, mapping baud rates, symbologies, and USB HID/serial emulations.",
    evidenceRef: "exp-emart24",
    x: 15,
    y: 12
  },
  {
    id: "node-pos-terminal",
    label: "POS Checkout Terminal",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I provision, configure, and maintain point-of-sale workstation terminals and touchscreens across retail stores.",
    evidenceRef: "exp-emart24",
    x: 28,
    y: 15
  },
  {
    id: "node-edc-pinpad",
    label: "Ingenico EDC Payment Pinpad",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I deploy and triage merchant payment terminals, diagnosing chip reader drops, power delivery, and comm timeouts.",
    evidenceRef: "exp-emart24",
    x: 42,
    y: 12
  },
  {
    id: "node-receipt-printer",
    label: "ESC/POS Thermal Receipt Printer",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I resolve thermal print head jams, configure baud rates, and diagnose serial/network print spooler queues.",
    evidenceRef: "exp-emart24",
    x: 58,
    y: 15
  },
  {
    id: "node-rj45-cabling",
    label: "RJ45 T-568B Structured Cabling",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I terminate Cat6 cabling to the T-568B standard and verify 8-wire continuity with ratcheting diagnostic testers.",
    evidenceRef: "exp-emart24",
    x: 72,
    y: 12
  },
  {
    id: "node-copier-firmware",
    label: "Multifunction Copier Hardware",
    stratum: "hardware",
    kind: "technology",
    status: "professional",
    summary: "I diagnosed motherboards, paper-feed roller assemblies, and firmware update conflicts in managed print fleets.",
    evidenceRef: "exp-mps",
    x: 85,
    y: 15
  },

  // STRATUM 2: OPERATING SYSTEM & DEVICE
  {
    id: "node-device-nodes",
    label: "Device Nodes (/dev/tty, COM)",
    stratum: "os",
    kind: "concept",
    status: "professional",
    summary: "I map peripheral communication ports (RS-232, USB serial) to OS device handles for pinpads and barcode scanners.",
    evidenceRef: "exp-emart24",
    x: 20,
    y: 28
  },
  {
    id: "node-pos-daemon",
    label: "POS Agent Background Daemon",
    stratum: "os",
    kind: "technology",
    status: "professional",
    summary: "I troubleshoot local background services, process hangs, memory consumption, and SQLite cache lockouts.",
    evidenceRef: "exp-emart24",
    x: 35,
    y: 32
  },
  {
    id: "node-unix-permissions",
    label: "UNIX File Permissions & Bitmasks",
    stratum: "os",
    kind: "concept",
    status: "experiment",
    summary: "I built an interactive bitmask explorer demonstrating octal chmod modes (755, 600, 400) and principle of least privilege.",
    x: 52,
    y: 28
  },
  {
    id: "node-windows-support",
    label: "Windows OS & Event Viewer",
    stratum: "os",
    kind: "technology",
    status: "professional",
    summary: "I analyze Windows Event Logs (System/Application) to isolate DLL crashes, driver collisions, and print spooler stalls.",
    evidenceRef: "exp-mps",
    x: 68,
    y: 32
  },
  {
    id: "node-linux-internals",
    label: "Linux Kernel & Syscall Concepts",
    stratum: "os",
    kind: "concept",
    status: "learning",
    summary: "I am actively investigating virtual memory mapping, file descriptors, and strace diagnostic profiling.",
    x: 82,
    y: 28
  },

  // STRATUM 3: NETWORK
  {
    id: "node-vlan-8021q",
    label: "802.1Q VLAN Network Segmentation",
    stratum: "network",
    kind: "technology",
    status: "professional",
    summary: "I configure managed switch ports to segregate PCI-sensitive POS transaction traffic from public guest Wi-Fi.",
    evidenceRef: "exp-emart24",
    x: 18,
    y: 48
  },
  {
    id: "node-dual-wan",
    label: "Dual-WAN Gateway & 4G Failover",
    stratum: "network",
    kind: "technology",
    status: "professional",
    summary: "I test branch router policy-based routing to ensure automated failover from fibre broadband to backup 4G LTE.",
    evidenceRef: "exp-emart24",
    x: 32,
    y: 45
  },
  {
    id: "node-packet-flight",
    label: "Packet Flight Simulator",
    stratum: "network",
    kind: "project",
    status: "experiment",
    summary: "I built an interactive packet tracer illustrating hop-by-hop encapsulation across OSI Layers 2 through 7.",
    x: 48,
    y: 48
  },
  {
    id: "node-dns-resolution",
    label: "DNS & UDP 53 Resolution",
    stratum: "network",
    kind: "concept",
    status: "professional",
    summary: "I troubleshoot domain name lookup failures, static DNS overrides, and caching delays during gateway transitions.",
    evidenceRef: "exp-emart24",
    x: 65,
    y: 45
  },
  {
    id: "node-tcp-handshake",
    label: "TCP/IP Transport & Handshake",
    stratum: "network",
    kind: "concept",
    status: "foundation",
    summary: "Studied 3-way synchronization (SYN/ACK), MTU fragmentation, and port binding in my UiTM computer networks coursework.",
    x: 80,
    y: 48
  },

  // STRATUM 4: APPLICATION
  {
    id: "node-xilnex-pos",
    label: "Xilnex Retail POS Engine",
    stratum: "application",
    kind: "technology",
    status: "professional",
    summary: "I provide daily frontline support for register transactions, promotional rule engines, and offline queue sync.",
    evidenceRef: "exp-emart24",
    x: 22,
    y: 65
  },
  {
    id: "node-iso-8583",
    label: "ISO 8583 Payment Protocol",
    stratum: "application",
    kind: "concept",
    status: "professional",
    summary: "I triage financial transaction message types (MTI 0100/0110), isolating bank issuer declines from comm timeouts.",
    evidenceRef: "exp-emart24",
    x: 38,
    y: 62
  },
  {
    id: "node-cache-eviction",
    label: "Cache Eviction Workbench (LRU / FIFO)",
    stratum: "application",
    kind: "project",
    status: "experiment",
    summary: "I engineered a browser-run cache simulator demonstrating hit/miss tallies and O(1) eviction pointer mechanics.",
    x: 54,
    y: 65
  },
  {
    id: "node-laravel-mvc",
    label: "PHP Laravel 8 MVC Framework",
    stratum: "application",
    kind: "technology",
    status: "project",
    summary: "I developed government compliance declaration modules, form validation, and routing during my AGC internship.",
    evidenceRef: "exp-agc",
    x: 70,
    y: 62
  },
  {
    id: "node-mysql-schema",
    label: "Relational MySQL & ERD Modeling",
    stratum: "application",
    kind: "technology",
    status: "project",
    summary: "I designed normalized 3NF database schemas, foreign key constraints, and SQL data integrity queries at AGC.",
    evidenceRef: "exp-agc",
    x: 84,
    y: 65
  },

  // STRATUM 5: CLOUD & AUTOMATION
  {
    id: "node-lark-admin",
    label: "Lark Super Admin Governance",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I administered enterprise collaboration for 100+ users: managing organizational units, roles, and SAML access.",
    evidenceRef: "exp-palaterium",
    x: 24,
    y: 80
  },
  {
    id: "node-google-workspace",
    label: "Google Workspace to Lark Cutover",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I supported email/data cutover steps, user account transitions, and post-migration desk-side troubleshooting.",
    evidenceRef: "exp-palaterium",
    x: 40,
    y: 82
  },
  {
    id: "node-approval-bots",
    label: "Lark Base Automated Approval Bots",
    stratum: "cloud-automation",
    kind: "project",
    status: "professional",
    summary: "I built automated approval chains replacing paper purchase requisition memos, cutting departmental turnaround.",
    evidenceRef: "exp-palaterium",
    x: 56,
    y: 80
  },
  {
    id: "node-netsuite-audit",
    label: "NetSuite ERP Data Auditing",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I validated and reconciled multi-department batch imports using advanced Microsoft Excel formulas and VLOOKUP.",
    evidenceRef: "exp-palaterium",
    x: 72,
    y: 82
  },
  {
    id: "node-aws-ccp",
    label: "AWS Cloud Practitioner Primitives",
    stratum: "cloud-automation",
    kind: "certification",
    status: "foundation",
    summary: "Formally certified in core AWS architectural concepts: VPC subnetting, EC2 instances, S3 storage tiers, and IAM roles.",
    x: 86,
    y: 80
  },

  // STRATUM 6: PEOPLE & PROCESS
  {
    id: "node-vendor-management",
    label: "Third-Party Vendor Escalation",
    stratum: "people-process",
    kind: "concept",
    status: "professional",
    summary: "I translate non-technical user distress into structured, timestamped logs for software and payment vendors.",
    evidenceRef: "exp-emart24",
    x: 25,
    y: 94
  },
  {
    id: "node-commissioning-sop",
    label: "New-Site IT Commissioning Runbooks",
    stratum: "people-process",
    kind: "project",
    status: "professional",
    summary: "I authored reproducible launch readiness SOPs, ensuring zero launch delays across multiple store openings.",
    evidenceRef: "exp-emart24",
    x: 45,
    y: 94
  },
  {
    id: "node-sla-tracking",
    label: "Freshdesk & Helpdesk SLA Triage",
    stratum: "people-process",
    kind: "technology",
    status: "professional",
    summary: "I logged, categorized, and hit service resolution turnaround targets across corporate customer accounts.",
    evidenceRef: "exp-mps",
    x: 65,
    y: 94
  },
  {
    id: "node-itil-framework",
    label: "ITIL 4 Service Management",
    stratum: "people-process",
    kind: "concept",
    status: "learning",
    summary: "Currently studying ITIL 4 Service Value System, Incident Management, Problem Management, and Change Enablement.",
    x: 82,
    y: 94
  }
];

export const EDGES: UniverseEdge[] = [
  // Hardware to OS
  { from: "node-scanner", to: "node-device-nodes", reason: "Scanner transmits raw ASCII barcode scans over serial or USB HID device handles." },
  { from: "node-pos-terminal", to: "node-pos-daemon", reason: "Terminal workstation executes the background POS software agent daemon." },
  { from: "node-edc-pinpad", to: "node-device-nodes", reason: "Pinpad negotiates hardware handshakes via dedicated serial COM ports." },
  { from: "node-receipt-printer", to: "node-device-nodes", reason: "Thermal printer listens for ESC/POS control bytes dispatched through printer drivers." },
  { from: "node-rj45-cabling", to: "node-vlan-8021q", reason: "Terminated Cat6 copper pairs carry Ethernet frames directly into managed switch ports." },
  { from: "node-copier-firmware", to: "node-windows-support", reason: "Firmware incompatibilities are diagnosed through Windows print spooler and event logs." },

  // OS to Network
  { from: "node-device-nodes", to: "node-pos-daemon", reason: "Kernel passes buffered character bytes from device nodes to POS application memory." },
  { from: "node-pos-daemon", to: "node-vlan-8021q", reason: "POS daemon binds socket and broadcasts frames tagged with store VLAN 10." },
  { from: "node-unix-permissions", to: "node-pos-daemon", reason: "Proper 600/755 bitmasks ensure daemon config files are protected from unauthorized tampering." },
  { from: "node-windows-support", to: "node-tcp-handshake", reason: "Windows network stack manages socket buffers and handles initial TCP SYN handshakes." },

  // Network to Application
  { from: "node-vlan-8021q", to: "node-dual-wan", reason: "Switch forwards isolated VLAN frames to the dual-WAN gateway for egress." },
  { from: "node-dual-wan", to: "node-xilnex-pos", reason: "Gateway routes encrypted transaction payloads to central cloud POS servers." },
  { from: "node-packet-flight", to: "node-tcp-handshake", reason: "Packet simulation models the exact 3-step SYN/ACK transport sequence." },
  { from: "node-dns-resolution", to: "node-dual-wan", reason: "DNS queries resolve remote payment endpoints before router opens WAN socket." },
  { from: "node-xilnex-pos", to: "node-iso-8583", reason: "POS register formats checkout amount into ISO 8583 payment authorization message." },

  // Application to Cloud & Storage
  { from: "node-xilnex-pos", to: "node-cache-eviction", reason: "Local POS uses in-memory cache eviction to retain frequently scanned SKU prices." },
  { from: "node-laravel-mvc", to: "node-mysql-schema", reason: "Laravel Eloquent ORM queries relational MySQL tables with foreign key constraints." },
  { from: "node-iso-8583", to: "node-vendor-management", reason: "Payment timeout responses trigger structured diagnostic escalation to acquirer partner." },

  // Cloud & Automation to People/Process
  { from: "node-lark-admin", to: "node-google-workspace", reason: "Super Admin mapped user accounts during Google Workspace cutover to Lark." },
  { from: "node-lark-admin", to: "node-approval-bots", reason: "Admin directory hierarchy powers automated departmental approval bot routing." },
  { from: "node-netsuite-audit", to: "node-approval-bots", reason: "Audited financial batches originate from approved Lark Base workflow records." },
  { from: "node-aws-ccp", to: "node-linux-internals", reason: "Cloud instances require grounded understanding of virtual memory and Linux systemd." },

  // People & Process Bindings
  { from: "node-vendor-management", to: "node-sla-tracking", reason: "Structured vendor communication ensures incidents meet customer SLA expectations." },
  { from: "node-commissioning-sop", to: "node-rj45-cabling", reason: "Commissioning runbooks require hands-on physical cable testing before launch sign-off." },
  { from: "node-itil-framework", to: "node-sla-tracking", reason: "ITIL service value principles formalize ticket lifecycle and root-cause postmortems." }
];

/* =========================================================================
   5. STRATA DEFINITIONS FOR "BEEP TO RECEIPT"
   ========================================================================= */

export interface StratumMeta {
  id: StratumType;
  number: string;
  title: string;
  tagline: string;
  stepDescription: string;
  visualType: 'schematic' | 'processtree' | 'packetgraph' | 'logview' | 'cloudflow' | 'lifecycle';
  annotationNodeIds: string[];
}

export const STRATA: StratumMeta[] = [
  {
    id: "hardware",
    number: "STRATUM 01",
    title: "Hardware & Physical Peripherals",
    tagline: "The Laser, The Copper, The Contact",
    stepDescription: "The optical scanner decodes EAN-13 barcode reflectance into raw ASCII characters over an RS-232 serial interface.",
    visualType: "schematic",
    annotationNodeIds: ["node-scanner", "node-pos-terminal", "node-edc-pinpad", "node-rj45-cabling"]
  },
  {
    id: "os",
    number: "STRATUM 02",
    title: "Operating System & Device Kernel",
    tagline: "Interrupts, Device Nodes, Memory",
    stepDescription: "The OS kernel catches hardware interrupt, buffers bytes into /dev/ttyS0, and wakes the background POS daemon.",
    visualType: "processtree",
    annotationNodeIds: ["node-device-nodes", "node-pos-daemon", "node-unix-permissions", "node-windows-support"]
  },
  {
    id: "network",
    number: "STRATUM 03",
    title: "Network & Transport Layer",
    tagline: "VLANs, Frames, Egress Routes",
    stepDescription: "Ethernet frames tagged with VLAN 10 traverse Cat6 cabling to the managed switch and dual-WAN gateway router.",
    visualType: "packetgraph",
    annotationNodeIds: ["node-vlan-8021q", "node-dual-wan", "node-packet-flight", "node-dns-resolution"]
  },
  {
    id: "application",
    number: "STRATUM 04",
    title: "Application & Transaction Logic",
    tagline: "Price Calculation, State, Queues",
    stepDescription: "The Xilnex POS engine looks up the SKU in the local cache, computes promotional discounts, and generates payment MTI 0100.",
    visualType: "logview",
    annotationNodeIds: ["node-xilnex-pos", "node-iso-8583", "node-cache-eviction", "node-laravel-mvc"]
  },
  {
    id: "cloud-automation",
    number: "STRATUM 05",
    title: "Cloud Services & Platform Automation",
    tagline: "Identity, Multi-Site Sync, Audit",
    stepDescription: "The transaction record synchronizes to central cloud databases while automated Lark bots verify store inventory thresholds.",
    visualType: "cloudflow",
    annotationNodeIds: ["node-lark-admin", "node-approval-bots", "node-netsuite-audit", "node-aws-ccp"]
  },
  {
    id: "people-process",
    number: "STRATUM 06",
    title: "People, Process & Operational Delivery",
    tagline: "Vendor Escalation, Handover, SLAs",
    stepDescription: "Store launch commissioning, third-party vendor coordination, and strict ticket SLAs ensure the transaction settles reliably.",
    visualType: "lifecycle",
    annotationNodeIds: ["node-vendor-management", "node-commissioning-sop", "node-sla-tracking", "node-itil-framework"]
  }
];
