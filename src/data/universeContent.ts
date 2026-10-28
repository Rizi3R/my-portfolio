/**
 * UNIVERSE CONTENT MODEL & SINGLE SOURCE OF TRUTH
 * 
 * Strict Provenance Rules (Section 1 & 5):
 * - Every node maps to verified employment, education, or hands-on simulations.
 * - Nodes with status 'professional' or 'project' MUST specify evidenceRef AND usage.
 * - Every edge MUST have a descriptive 'reason' (max 120 chars).
 * - Summaries are factual, first person, and strictly <= 200 characters.
 * - Schema contains NO proficiency, percentage, rating, or progress fields.
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
  usage?: string; // REQUIRED for professional and project: one factual sentence on how I used it
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

export interface LearningEntry {
  id: string;
  topic: string;
  status: 'learning' | 'exploring';
  note: string; // Free text note that owner can edit
  stratum: StratumType;
  context: string;
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
   2. VERIFIED EXPERIENCES (VERBATIM FROM EXISTING SITE SOURCE)
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
      "Provide frontline and Tier 2 application troubleshooting for Xilnex POS, payment terminals, barcode scanners, and peripheral business devices across multi-site outlets.",
      "Triage operational incidents by assessing business impact, capturing reproducible logs, and systematically isolating application, network, or hardware faults.",
      "Coordinate with third-party software vendors, payment gateway partners, and technical service providers, supplying structured technical context to validate hotfixes.",
      "Support new-site IT commissioning: hardware provisioning, network connectivity (LAN/Wi-Fi), device configuration, POS/payment setup, and operational readiness checks.",
      "Conduct User Acceptance Testing (UAT) and system validation prior to production application updates, promotions, and third-party delivery service integrations.",
      "Support operational data workflows involving product catalogs, promotional engine triggers, CRM, and food categories, coordinating corrections across departments.",
      "Troubleshoot outlet network connectivity, execute physical LAN cabling tasks including RJ45 crimping and cable tester continuity validation.",
      "Assist with Microsoft 365 user account provisioning, business email configuration, and employee onboarding."
    ],
    technologies: [
      "Xilnex POS",
      "Payment Terminal APIs",
      "LAN / Wi-Fi Diagnostics",
      "RJ45 Continuity Testing",
      "UAT & System Validation",
      "Vendor Coordination",
      "Microsoft 365 Provisioning"
    ]
  },
  {
    id: "exp-palaterium",
    role: "IT Executive",
    organization: "Palaterium Sdn Bhd",
    location: "Kuala Lumpur, Malaysia",
    period: "April 2024 – August 2025",
    isCurrent: false,
    bullets: [
      "Managed user service requests and technical incidents via Lark Helpdesk adhering to defined SLA response targets.",
      "Administered the Lark platform as Super Admin: configuring access permissions, role groups, directory structures, and user lifecycle workflows.",
      "Supported the company-wide migration from Google Workspace to Lark, assisting with user account preparation, data/email transition, and post-migration support.",
      "Provided remote diagnostics and desktop assistance using TeamViewer for distributed staff across multiple sites.",
      "Designed and deployed digital workflow automation inside Lark to reduce manual paperwork and streamline cross-departmental approvals.",
      "Assisted with NetSuite data imports and utilized Microsoft Excel formulas (VLOOKUP, data auditing) to clean and validate business records.",
      "Managed IT procurement, hardware deployments, equipment lifecycle replacements, and vendor repair coordination.",
      "Diagnosed office network connectivity issues across LAN, Wi-Fi access points, and TCP/IP configurations."
    ],
    technologies: [
      "Lark Helpdesk & Super Admin",
      "Google Workspace Migration",
      "TeamViewer Remote Support",
      "NetSuite Data Import",
      "Microsoft Excel (Data Validation)",
      "TCP/IP & LAN Troubleshooting",
      "IT Asset Management"
    ]
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
      "Diagnosed and repaired laptops, desktop workstations, commercial multifunction printers, copiers, and network peripherals.",
      "Troubleshot hardware malfunctions, driver conflicts, firmware updates, and operating system errors.",
      "Logged, updated, and resolved service tickets through Freshdesk within target service turnaround times.",
      "Configured client network printing, static IP assignments, and subnet connectivity for multi-user office environments.",
      "Communicated findings and preventive operational advice directly to non-technical client personnel."
    ],
    technologies: [
      "Freshdesk",
      "Hardware Diagnostics",
      "Printer & Copier Firmware",
      "Windows OS Support",
      "TCP/IP & Print Servers",
      "Onsite Client Support"
    ]
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
      "Engaged in stakeholder discovery meetings to capture system requirements and translate them into technical specifications.",
      "Authored System Requirements Specification (SRS) documentation and designed Entity Relationship Diagrams (ERDs).",
      "Executed SQL queries to validate database schema constraints, data relationships, and record integrity.",
      "Investigated application logic errors and user-reported bugs during development and user acceptance testing phases."
    ],
    technologies: [
      "Laravel Framework",
      "MySQL",
      "PHP & SQL Queries",
      "Entity Relationship Diagrams (ERD)",
      "System Requirements Specification (SRS)",
      "User Acceptance Testing"
    ]
  }
];

/* =========================================================================
   3. CERTIFICATIONS & FOUNDATIONS (VERIFIED CREDENTIALS)
   ========================================================================= */

export const CERTIFICATIONS: UniverseCertification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    status: "Certified",
    credentialNote: "Validation of foundational cloud literacy: VPC subnetting, EC2, S3, IAM, and security principles."
  }
];

/* =========================================================================
   4. CURRENTLY LEARNING & FUTURE EXPLORATIONS (SECTION 1.3 & 1.6)
   ========================================================================= */

export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    id: "learning-uipath-rpa",
    topic: "UiPath & Robotic Process Automation (RPA)",
    status: "learning",
    note: "Currently learning UiPath and exploring Robotic Process Automation (RPA), with an interest in understanding workflow automation, application integration, and how repetitive processes can be automated.",
    stratum: "cloud-automation",
    context: "Self-paced study exploring workflow automation concepts and application integration."
  },
  {
    id: "learning-itil-4",
    topic: "ITIL 4 Service Management",
    status: "learning",
    note: "Studying ITIL 4 Service Value System, Incident Management, Problem Management, and Change Enablement.",
    stratum: "people-process",
    context: "Formalizing service desk ticket lifecycle and structured root-cause analysis postmortems."
  },
  {
    id: "learning-linux-internals",
    topic: "Operating System & Linux Internals",
    status: "learning",
    note: "Investigating Linux kernel architecture, systemd services, virtual memory management, and file system hierarchies.",
    stratum: "os",
    context: "Personal study to deepen low-level troubleshooting instincts for production servers."
  }
];

/* =========================================================================
   5. REAL OPERATIONAL CASE STUDIES (DERIVED FROM EXISTING SITE)
   ========================================================================= */

export const CASE_STUDIES: UniverseCaseStudy[] = [
  {
    id: "case-app-troubleshooting",
    title: "Multi-Store Retail POS Incident Triage & Vendor Escalation",
    organization: "emart24 Malaysia",
    stratum: "application",
    hook: "Isolating complex multi-site application faults, payment terminal declines, and database sync queues under live operational pressure.",
    challenge: "Outlet teams frequently report vague symptoms like 'payment not working' or 'promo not appearing'. The challenge is swiftly isolating whether the root cause is local network degradation, terminal hardware failure, bank host decline, sync queue delay, or catalog pricing configuration.",
    investigation: "Checked local terminal network connectivity, evaluated payment gateway response codes (distinguishing bank card 'Do Not Honour' from wallet authentication failures), and inspected Xilnex POS synchronization tables for stalled transactions.",
    actions: [
      "Established systematic triage protocol: check local terminal connectivity, evaluate payment response codes, and inspect Xilnex POS synchronization status.",
      "Coordinated directly with payment terminal partners and POS vendor support, providing exact timestamped logs, terminal IDs, and error codes rather than generic reports.",
      "Conducted outlet team guidance on prompt POS restarts, sync routines, and cache clearing to restore immediate cashier functionality."
    ],
    outcome: [
      "Standardized incident triage protocol for payment terminal errors, distinguishing issuer declines from device connectivity timeouts.",
      "Accelerated vendor resolution times by providing structured diagnostic evidence on initial ticket logging."
    ],
    takeaway: "Technical support is forensic: structured logging and disciplined isolation prevent finger-pointing between vendors."
  },
  {
    id: "case-store-commissioning",
    title: "Retail Store IT Commissioning & Network Readiness",
    organization: "emart24 Malaysia",
    stratum: "hardware",
    hook: "Delivering end-to-end hardware provisioning, peripheral testing, and network connectivity validation for new store openings.",
    challenge: "Opening new retail sites requires coordinating physical cabling, peripheral hardware testing, payment terminal registration, and POS software setup under strict launch deadlines.",
    investigation: "Performed site surveys of network drop locations, tested RJ45 patch lead continuity with ratcheting wire testers, and audited terminal COM port assignments.",
    actions: [
      "Executed physical LAN cabling, RJ45 termination to T-568B standard, and verified switch port VLAN bindings.",
      "Provisioned primary and backup checkout registers: configured receipt printers, 2D barcode scanners, customer-facing displays, and EDC pinpads.",
      "Conducted full simulated transaction walk-throughs covering cash, card, and e-wallet tenders prior to launch day."
    ],
    outcome: [
      "Successfully commissioned and validated IT readiness across multiple store opening deployments, ensuring zero launch delays.",
      "Established standard operating procedures for branch network verification and peripheral deployment."
    ],
    takeaway: "Hardware reliability is won in the details: proper cable termination and driver testing prevent launch-day outages."
  },
  {
    id: "case-saas-migration",
    title: "Google Workspace to Lark Enterprise Migration & Super Admin Governance",
    organization: "Palaterium Sdn Bhd",
    stratum: "cloud-automation",
    hook: "Transitioning 100+ business users from Google Workspace to Lark while establishing Super Admin governance and automating paperless approvals.",
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
    hook: "Engineering an internal compliance declaration portal from requirements gathering to normalized MySQL schema during internship.",
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
   6. THE ATLAS KNOWLEDGE GRAPH (NODES & EDGES)
   Every professional/project node includes mandatory usage and evidenceRef.
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
    usage: "Configured serial baud rates and USB HID emulations on checkout scanners at emart24 retail stores.",
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
    usage: "Provisioned and deployed touchscreen POS hardware and peripherals for nationwide retail store launches.",
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
    usage: "Connected and tested merchant payment terminals, diagnosing communication timeouts and chip drops.",
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
    usage: "Configured 80mm ESC/POS printer drivers, resolved serial communication errors, and fixed paper jams.",
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
    usage: "Terminated Cat6 RJ45 patch cables to T-568B standard and validated 8-pin continuity with cable testers.",
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
    usage: "Diagnosed printer hardware failures, paper feed assemblies, and firmware compatibility issues for corporate clients.",
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
    usage: "Mapped COM port and serial device parameters for peripheral hardware connectivity under Windows.",
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
    usage: "Troubleshot background POS service hangs and local database sync queues during live store support.",
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
    usage: "Analyzed Windows Event Viewer logs to diagnose print spooler crashes and workstation driver conflicts.",
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
    usage: "Configured managed switch port VLANs to segment retail POS transaction traffic from guest networks.",
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
    usage: "Tested branch router automatic failover between primary fibre broadband and backup 4G LTE connections.",
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
    usage: "Troubleshot DNS server settings and name resolution errors affecting store payment endpoints.",
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
    usage: "Supported daily register transactions, promotional rule engines, and offline queue synchronization across stores.",
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
    usage: "Triaged payment authorization response codes to distinguish bank host declines from network timeouts.",
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
    usage: "Developed web forms, routing, and controller logic for the internal DKICT compliance system at AGC.",
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
    usage: "Designed normalized relational database tables and executed SQL queries for the DKICT portal at AGC.",
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
    usage: "Administered user accounts, role permissions, and organizational units in Lark Super Admin for 100+ staff.",
    evidenceRef: "exp-palaterium",
    x: 20,
    y: 80
  },
  {
    id: "node-google-workspace",
    label: "Google Workspace to Lark Cutover",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I supported email/data cutover steps, user account transitions, and post-migration desk-side troubleshooting.",
    usage: "Assisted user account preparation and data transition during company-wide migration from Google Workspace to Lark.",
    evidenceRef: "exp-palaterium",
    x: 35,
    y: 82
  },
  {
    id: "node-approval-workflows",
    label: "Lark Digital Approval Workflows",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I designed and deployed digital approval workflows inside Lark to reduce manual paperwork and streamline approvals.",
    usage: "Built multi-tier administrative approval workflows in Lark to replace physical paper requisition memos.",
    evidenceRef: "exp-palaterium",
    x: 50,
    y: 80
  },
  {
    id: "node-uipath-rpa",
    label: "UiPath & RPA (Learning)",
    stratum: "cloud-automation",
    kind: "concept",
    status: "learning",
    summary: "Currently learning UiPath and exploring Robotic Process Automation (RPA), with an interest in understanding workflow automation.",
    x: 64,
    y: 78
  },
  {
    id: "node-netsuite-audit",
    label: "NetSuite ERP Data Auditing",
    stratum: "cloud-automation",
    kind: "technology",
    status: "professional",
    summary: "I validated and reconciled multi-department batch imports using Microsoft Excel formulas (VLOOKUP, data auditing).",
    usage: "Cleaned and validated multi-department inventory and financial data in Excel prior to NetSuite ERP import.",
    evidenceRef: "exp-palaterium",
    x: 78,
    y: 82
  },
  {
    id: "node-aws-ccp",
    label: "AWS Cloud Practitioner Primitives",
    stratum: "cloud-automation",
    kind: "certification",
    status: "foundation",
    summary: "Formally certified in core AWS architectural concepts: VPC subnetting, EC2 instances, S3 storage tiers, and IAM roles.",
    x: 90,
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
    usage: "Escalated application defects and payment terminal incidents to vendors with timestamped logs and error codes.",
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
    usage: "Authored IT commissioning checklists covering network testing, hardware setup, and POS validation for store openings.",
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
    usage: "Logged and resolved customer technical support tickets in Freshdesk adhering to agreed service turnaround times.",
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
  { from: "node-lark-admin", to: "node-approval-workflows", reason: "Admin directory hierarchy powers departmental approval workflow routing." },
  { from: "node-netsuite-audit", to: "node-approval-workflows", reason: "Audited financial records originate from approved Lark Base workflow entries." },
  { from: "node-approval-workflows", to: "node-uipath-rpa", reason: "Foundational interest in digital workflows inspired ongoing exploration of RPA concepts." },
  { from: "node-aws-ccp", to: "node-linux-internals", reason: "Cloud instances require grounded understanding of virtual memory and Linux systemd." },

  // People & Process Bindings
  { from: "node-vendor-management", to: "node-sla-tracking", reason: "Structured vendor communication ensures incidents meet customer SLA expectations." },
  { from: "node-commissioning-sop", to: "node-rj45-cabling", reason: "Commissioning runbooks require hands-on physical cable testing before launch sign-off." },
  { from: "node-itil-framework", to: "node-sla-tracking", reason: "ITIL service value principles formalize ticket lifecycle and root-cause postmortems." }
];

/* =========================================================================
   7. STRATA DEFINITIONS FOR "BEEP TO RECEIPT" (ILLUSTRATIVE DIAGRAMS)
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
    stepDescription: "The generic transaction synchronizes to central servers while inventory threshold checks and batch reconciliations occur.",
    visualType: "cloudflow",
    annotationNodeIds: ["node-lark-admin", "node-approval-workflows", "node-uipath-rpa", "node-netsuite-audit", "node-aws-ccp"]
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
