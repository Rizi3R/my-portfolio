export type ExplorationRoute = 'all' | 'app-support' | 'it-ops' | 'business-systems' | 'infrastructure' | 'cloud';

export interface RouteDefinition {
  id: ExplorationRoute;
  label: string;
  shortLabel: string;
  description: string;
  targetRole: string;
  badge: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  overview: string;
  responsibilities: string[];
  keyContributions: string[];
  technologies: string[];
  relevantRoutes: ExplorationRoute[];
}

export interface SkillItem {
  name: string;
  level: 'Professional Experience' | 'Working Knowledge' | 'Foundational Knowledge' | 'Currently Learning';
  practicalExample?: string;
  relevantRoutes: ExplorationRoute[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  practicalContext: string;
  skills: SkillItem[];
  relevantRoutes: ExplorationRoute[];
}

export interface CaseStudy {
  id: string;
  missionNumber: string;
  title: string;
  category: 'Application Support' | 'IT Operations' | 'SaaS & Systems' | 'Development & Data' | 'Infrastructure';
  role: string;
  organization: string;
  period: string;
  hook: string;
  overview: string;
  context?: string;
  challenge: string;
  investigation: string;
  approach: string[];
  outcome: string[];
  whatILearned: string;
  technologies: string[];
  operationalTakeaway: string;
  relevantRoutes: ExplorationRoute[];
}

export interface CareerInterest {
  category: string;
  title: string;
  description: string;
  transferableFoundation: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  tagline: string;
  type: 'Professional Experience' | 'Academic Internship' | 'Personal Project' | 'Cloud Foundation';
  organization: string;
  period: string;
  description: string;
  role: string;
  keyHighlights: string[];
  technologies: string[];
  relevantRoutes: ExplorationRoute[];
  link?: {
    label: string;
    url: string;
    isExternal: boolean;
  };
}

export interface Certification {
  name: string;
  issuer: string;
  dateOrStatus: string;
  status: 'Certified' | 'Completed' | 'In Progress';
  description: string;
  credentialNote?: string;
  relevantRoutes: ExplorationRoute[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  fullName: "Muhammad Aries Irhan bin Abd Razak",
  displayName: "Aries Razak",
  headline: "Systems Support · IT Operations · Computing Explorer",
  tagline: "I keep business systems running. And I explore what happens beneath the interface.",
  positioningStatement: "Hands-on application specialist and systems operator with a deep curiosity for computing, networking, and software engineering.",
  shortBio: "I work across applications, business systems, and infrastructure to keep technology working for the people who depend on it. Beyond day-to-day operations, I explore how software, networks, operating systems, and cloud primitives work under the hood.",
  extendedBio: "I sit at the intersection between frontline users, business applications, and infrastructure. In my day-to-day role at emart24 Malaysia, I support enterprise retail applications and Xilnex POS across HQ and nationwide outlets, troubleshoot payment and connectivity bottlenecks, and coordinate vendor fixes. At the same time, my diploma in Computer Science & Mathematics and AWS Cloud Practitioner certification fuel an ongoing drive to understand computing from the ground up: writing code, dissecting network packet hops, experimenting with system algorithms, and building interactive tools to see how digital systems tick.",
  location: "Selangor / Kuala Lumpur, Malaysia",
  phone: "Available upon request",
  email: "ariesirhan25@gmail.com",
  linkedIn: "https://www.linkedin.com/in/aries-razak-a36045256",
  liveUrl: "https://aries-razak.vercel.app/",
  currentRole: "System Application Specialist",
  currentCompany: "emart24 Malaysia",
};

export const EXPLORATION_ROUTES: RouteDefinition[] = [
  {
    id: 'all',
    label: 'All Horizons',
    shortLabel: 'Complete Space',
    description: 'Explore verified career history, the interactive technology lab, system architectures, and learning frontiers.',
    targetRole: 'Holistic Exploration',
    badge: 'Everything'
  },
  {
    id: 'app-support',
    label: 'Application & Systems',
    shortLabel: 'App Systems',
    description: 'Explore application triage, POS transaction flows, payment gateway responses, and UAT validation.',
    targetRole: 'Application Support Specialist / Systems Analyst',
    badge: 'Core Experience'
  },
  {
    id: 'it-ops',
    label: 'IT Operations & Service',
    shortLabel: 'Operations',
    description: 'Explore multi-site support delivery, SLA management, vendor coordination, and store IT commissioning.',
    targetRole: 'IT Operations Executive / Service Desk Lead',
    badge: 'Operational Track'
  },
  {
    id: 'business-systems',
    label: 'SaaS & Enterprise Systems',
    shortLabel: 'SaaS Governance',
    description: 'Explore Lark Super Admin, Google Workspace migration, approval automation, and NetSuite data auditing.',
    targetRole: 'Business Systems / SaaS Administrator',
    badge: 'Enterprise Platform'
  },
  {
    id: 'infrastructure',
    label: 'Networking & Physical Layers',
    shortLabel: 'Network & Hardware',
    description: 'Explore Layer 1-4 diagnostics, TCP/IP routing, RJ45 termination, VLANs, and endpoint hardware triage.',
    targetRole: 'IT Infrastructure / Network Support Specialist',
    badge: 'Hands-on Technical'
  },
  {
    id: 'cloud',
    label: 'Software, Cloud & Algorithms',
    shortLabel: 'Software & Cloud',
    description: 'Explore AWS Cloud Practitioner concepts, full-stack Laravel/MySQL development, and algorithm experiments.',
    targetRole: 'Junior Cloud Operations / Technical Associate',
    badge: 'Engineering Core'
  }
];

export const CHAPTERS = [
  { id: 'chapter-lab', number: 'SPACE 01', title: 'THE LAB', subtitle: 'Interactive Computing Experiments', href: '#lab' },
  { id: 'chapter-systems', number: 'SPACE 02', title: 'SYSTEMS', subtitle: 'How Technology Connects', href: '#systems' },
  { id: 'chapter-journey', number: 'SPACE 03', title: 'FIELD NOTES', subtitle: 'Career Timeline & Experience', href: '#experience' },
  { id: 'chapter-cases', number: 'SPACE 04', title: 'CASE STUDIES', subtitle: 'Technical Investigations', href: '#projects' },
  { id: 'chapter-toolkit', number: 'SPACE 05', title: 'THE TOOLKIT', subtitle: 'Capabilities & Daily Drivers', href: '#skills' },
  { id: 'chapter-frontier', number: 'SPACE 06', title: 'THE FRONTIER', subtitle: 'Active Learning & Horizons', href: '#frontier' },
  { id: 'chapter-contact', number: 'SPACE 07', title: 'DISPATCH', subtitle: 'Connect & Inquire', href: '#contact' },
];

export const CORE_PILLARS = [
  {
    theme: "01 · Systems Grounding",
    title: "Application & Operational Support",
    description: "Hands-on troubleshooting of multi-site business applications, retail POS, payment gateways, and vendor escalation.",
    relevantRoutes: ['app-support', 'it-ops'] as ExplorationRoute[]
  },
  {
    theme: "02 · Architecture & SaaS",
    title: "Enterprise Systems & Governance",
    description: "Super Admin administration of Lark and Google Workspace, automated approval bots, and ERP data auditing.",
    relevantRoutes: ['business-systems', 'infrastructure'] as ExplorationRoute[]
  },
  {
    theme: "03 · Physical & Network",
    title: "Layer 1–4 Network & Hardware",
    description: "Hands-on RJ45 T-568B cabling, managed switch VLANs, Wi-Fi AP commissioning, and hardware diagnostics.",
    relevantRoutes: ['infrastructure', 'app-support'] as ExplorationRoute[]
  },
  {
    theme: "04 · Engineering & Curiosity",
    title: "Software, Cloud & Exploration",
    description: "Diploma in CS & Mathematics, AWS Cloud Practitioner certification, MVC web development, and digital experiments.",
    relevantRoutes: ['cloud', 'all'] as ExplorationRoute[]
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "emart24",
    role: "System Application Specialist",
    company: "emart24 Malaysia",
    location: "Subang Jaya, Selangor, Malaysia",
    period: "September 2025 – Present",
    isCurrent: true,
    overview: "Serve as the primary technical specialist for business application and POS incidents affecting HQ and nationwide retail outlets, ensuring uninterrupted operational uptime, vendor accountability, and new-site IT readiness.",
    responsibilities: [
      "Provide frontline and Tier 2 application troubleshooting for Xilnex POS, payment terminals, barcode scanners, and peripheral business devices across multi-site outlets.",
      "Triage operational incidents by assessing business impact, capturing reproducible logs, and systematically isolating application, network, or hardware faults.",
      "Coordinate with third-party software vendors, payment gateway partners, and technical service providers, supplying structured technical context to validate hotfixes.",
      "Support new-site IT commissioning: hardware provisioning, network connectivity (LAN/Wi-Fi), device configuration, POS/payment setup, and operational readiness checks.",
      "Conduct User Acceptance Testing (UAT) and system validation prior to production application updates, promotions, and third-party delivery service integrations.",
      "Support operational data workflows involving product catalogs, promotional engine triggers, CRM, and food categories, coordinating corrections across departments.",
      "Troubleshoot outlet network connectivity, execute physical LAN cabling tasks including RJ45 crimping and cable tester continuity validation.",
      "Assist with Microsoft 365 user account provisioning, business email configuration, and employee onboarding."
    ],
    keyContributions: [
      "Standardized incident triage protocol for payment terminal errors, distinguishing issuer declines (e.g. 'Do Not Honour') from device connectivity timeouts.",
      "Successfully commissioned and validated IT readiness across multiple store opening deployments, ensuring zero launch delays.",
      "Audited promotional trigger rules and catalog data alongside Marketing and Merchandising teams to eliminate register pricing discrepancies."
    ],
    technologies: [
      "Xilnex POS",
      "Payment Terminal APIs",
      "LAN / Wi-Fi Diagnostics",
      "RJ45 Continuity Testing",
      "UAT & System Validation",
      "Vendor Coordination",
      "Microsoft 365 Provisioning"
    ],
    relevantRoutes: ['app-support', 'it-ops', 'infrastructure']
  },
  {
    id: "palaterium",
    role: "IT Executive",
    company: "Palaterium Sdn Bhd",
    location: "Kuala Lumpur, Malaysia",
    period: "April 2024 – August 2025",
    isCurrent: false,
    overview: "Delivered first- and second-line IT support, oversaw enterprise SaaS administration, facilitated a cloud collaboration platform migration, and streamlined operational workflows for corporate and remote staff.",
    responsibilities: [
      "Managed user service requests and technical incidents via Lark Helpdesk adhering to defined SLA response targets.",
      "Administered the Lark platform as Super Admin: configuring access permissions, role groups, directory structures, and user lifecycle workflows.",
      "Supported the company-wide migration from Google Workspace to Lark, assisting with user account preparation, data/email transition, and post-migration support.",
      "Provided remote diagnostics and desktop assistance using TeamViewer for distributed staff across multiple sites.",
      "Designed and deployed digital workflow automation inside Lark to reduce manual paperwork and streamline cross-departmental approvals.",
      "Assisted with NetSuite data imports and utilized Microsoft Excel formulas (VLOOKUP, data auditing) to clean and validate business records.",
      "Managed IT procurement, hardware deployments, equipment lifecycle replacements, and vendor repair coordination.",
      "Diagnosed office network connectivity issues across LAN, Wi-Fi access points, and TCP/IP configurations."
    ],
    keyContributions: [
      "Successfully supported user transition from Google Workspace to Lark with minimal operational friction and continuous user support.",
      "Automated internal administrative request workflows in Lark, accelerating departmental approval turnaround.",
      "Maintained data integrity during NetSuite imports through systematic Excel validation and discrepancy auditing."
    ],
    technologies: [
      "Lark Helpdesk & Super Admin",
      "Google Workspace Migration",
      "TeamViewer Remote Support",
      "NetSuite Data Import",
      "Microsoft Excel (Data Validation)",
      "TCP/IP & LAN Troubleshooting",
      "IT Asset Management"
    ],
    relevantRoutes: ['it-ops', 'business-systems']
  },
  {
    id: "mps",
    role: "IT Technician",
    company: "Managed Print Services",
    location: "Kajang, Selangor, Malaysia",
    period: "October 2023 – March 2024",
    isCurrent: false,
    overview: "Delivered onsite and remote hardware, software, and peripheral technical support for corporate client accounts, diagnosing printing infrastructure, workstations, and endpoint connectivity.",
    responsibilities: [
      "Dispatched for onsite and remote technical support across corporate customer accounts.",
      "Diagnosed and repaired laptops, desktop workstations, commercial multifunction printers, copiers, and network peripherals.",
      "Troubleshot hardware malfunctions, driver conflicts, firmware updates, and operating system errors.",
      "Logged, updated, and resolved service tickets through Freshdesk within target service turnaround times.",
      "Configured client network printing, static IP assignments, and subnet connectivity for multi-user office environments.",
      "Communicated findings and preventive operational advice directly to non-technical client personnel."
    ],
    keyContributions: [
      "Consistently met Freshdesk service targets by applying disciplined diagnostic methodology to isolate root causes.",
      "Restored network printer connectivity for corporate clients experiencing driver incompatibility and IP conflicts.",
      "Maintained detailed ticket documentation that accelerated repeat problem resolution."
    ],
    technologies: [
      "Freshdesk",
      "Hardware Diagnostics",
      "Printer & Copier Firmware",
      "Windows OS Support",
      "TCP/IP & Print Servers",
      "Onsite Client Support"
    ],
    relevantRoutes: ['it-ops', 'infrastructure']
  },
  {
    id: "agc",
    role: "IT Intern – Full-Stack Developer",
    company: "Attorney General’s Chambers of Malaysia",
    location: "Putrajaya, Malaysia",
    period: "September 2021 – February 2022",
    isCurrent: false,
    overview: "Contributed to the development, database design, and testing of the internal DKICT Declaration System using Laravel and MySQL during an academic internship.",
    responsibilities: [
      "Contributed to full-stack web application development for the DKICT Declaration System using PHP Laravel and MySQL.",
      "Engaged in stakeholder discovery meetings to capture system requirements and translate them into technical specifications.",
      "Authored System Requirements Specification (SRS) documentation and designed Entity Relationship Diagrams (ERDs).",
      "Executed SQL queries to validate database schema constraints, data relationships, and record integrity.",
      "Investigated application logic errors and user-reported bugs during development and user acceptance testing phases."
    ],
    keyContributions: [
      "Delivered core functional modules of the DKICT declaration workflow in accordance with agency requirements.",
      "Constructed clear ERD documentation that mapped complex relational tables and entity dependencies.",
      "Gained foundational software engineering discipline that now directly informs root-cause application support troubleshooting."
    ],
    technologies: [
      "Laravel Framework",
      "MySQL",
      "PHP & SQL Queries",
      "Entity Relationship Diagrams (ERD)",
      "System Requirements Specification (SRS)",
      "User Acceptance Testing"
    ],
    relevantRoutes: ['app-support', 'cloud']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-app-troubleshooting",
    missionNumber: "MISSION 01",
    title: "Business Application Troubleshooting & Vendor Escalation",
    category: "Application Support",
    role: "System Application Specialist",
    organization: "emart24 Malaysia",
    period: "September 2025 – Present",
    hook: "Isolating complex multi-site application faults, payment terminal declines, and database sync queues under live operational pressure.",
    overview: "Managing and investigating critical point-of-sale incidents, transaction errors, and system synchronisation across nationwide convenience retail outlets.",
    challenge: "Outlet teams frequently report vague symptoms like 'payment not working' or 'promo not appearing'. The challenge is swiftly isolating whether the root cause is local network degradation, terminal hardware failure, bank host decline, sync queue delay, or catalog pricing configuration.",
    investigation: "Checked local terminal network connectivity, evaluated payment gateway response codes (distinguishing bank card 'Do Not Honour' from wallet authentication failures), and inspected Xilnex POS synchronization tables for stalled transactions.",
    approach: [
      "Established systematic triage protocol: check local terminal connectivity, evaluate payment response codes, and inspect Xilnex POS synchronization status.",
      "Coordinated directly with payment terminal partners and POS vendor support, providing exact timestamped logs, terminal IDs, and error codes rather than generic reports.",
      "Conducted outlet team guidance on prompt POS restarts, sync routines, and cache clearing to restore immediate cashier functionality.",
      "Audited promotional trigger rules alongside Marketing and Category teams to eliminate price mismatch tickets before high-volume sales windows."
    ],
    outcome: [
      "Accelerated incident turnaround by eliminating back-and-forth ambiguity with third-party vendors.",
      "Protected store transaction continuity by teaching outlet personnel immediate first-response checks.",
      "Maintained high operational reliability across busy retail shifts without disclosing proprietary vendor secrets."
    ],
    whatILearned: "Fast incident resolution in application support depends on translating non-technical user distress into structured, actionable parameters that software vendors can diagnose without delay.",
    technologies: ["Xilnex POS", "Payment Gateways", "Network Diagnostics", "Vendor Management", "UAT Testing"],
    operationalTakeaway: "Fast application resolution requires translating user frustration into concrete, reproducible technical parameters that developers and vendors can act upon immediately.",
    relevantRoutes: ['app-support', 'it-ops']
  },
  {
    id: "case-infrastructure-deployment",
    missionNumber: "MISSION 02",
    title: "IT Infrastructure Setup & Multi-Site Deployment Readiness",
    category: "Infrastructure",
    role: "System Application Specialist / IT Support",
    organization: "emart24 Malaysia",
    period: "September 2025 – Present",
    hook: "Commissioning hardware, physical cabling, and endpoint connectivity to guarantee zero opening-day IT downtime for new operational sites.",
    overview: "Orchestrating hardware deployment, network setup, POS configuration, and pre-launch IT validation for new retail outlet openings.",
    context: "Store opening schedules are strict. Every retail outlet requires operational POS registers, electronic payment terminals, receipt printers, barcode scanners, office PCs, and CCTV network connections ready before opening day.",
    challenge: "New commercial spaces often present unpredictable on-site cabling issues, unverified telco lines, unorganized network racks, and equipment delivery staggered across multiple vendors.",
    investigation: "Tested physical cable continuity using an 8-wire cable tester, evaluated switch port link statuses, verified DHCP scope assignments, and inspected NVR camera visibility.",
    approach: [
      "Executed a comprehensive pre-launch checklist covering endpoint provisioning, IP configuration, POS terminal initialization, and receipt printer testing.",
      "Troubleshot physical network cabling on site: re-crimped faulty RJ45 connectors and verified pinout sequencing with an 8-wire cable tester when link signals failed.",
      "Validated local Wi-Fi SSID visibility, DHCP scope assignment, and switch port links to ensure NVR/CCTV cameras and POS terminals had isolated, steady connectivity.",
      "Conducted end-to-end simulated sales, credit/debit card tests, and end-of-day settlement tests before signing off for official store launch."
    ],
    outcome: [
      "Delivered multiple new store IT handovers with zero opening-day IT downtime.",
      "Identified and repaired damaged physical cabling on site, avoiding expensive third-party contractor callouts.",
      "Created repeatable commissioning documentation that streamlined readiness validation for subsequent store setups."
    ],
    whatILearned: "High-level software configurations are useless if Layer 1 physical connectivity is broken. Successful deployments require fluency from RJ45 crimping to IP routing.",
    technologies: ["Hardware Provisioning", "RJ45 Termination & Testing", "LAN & Wi-Fi Setup", "Endpoint Configuration", "Commissioning Runbooks"],
    operationalTakeaway: "On-site readiness requires both software configuration knowledge and physical infrastructure problem-solving.",
    relevantRoutes: ['infrastructure', 'it-ops']
  },
  {
    id: "case-saas-migration",
    missionNumber: "MISSION 03",
    title: "SaaS Platform Migration, Administration & Workflow Automation",
    category: "SaaS & Systems",
    role: "IT Executive",
    organization: "Palaterium Sdn Bhd",
    period: "April 2024 – August 2025",
    hook: "Transitioning enterprise users from Google Workspace to Lark while establishing Super Admin governance and automating paperless approvals.",
    overview: "Supported company-wide collaboration platform migration, user account lifecycle management, access controls, and administrative workflow automation.",
    context: "The organization decided to consolidate internal communications, document management, approvals, and employee directory from Google Workspace into the unified Lark ecosystem.",
    challenge: "Transitioning non-technical business users across departments to a new collaboration platform without losing communication continuity or interrupting daily operational approvals.",
    investigation: "Audited existing user mailbox accounts, mapped departmental organizational structures into Lark Base, and identified manual approval bottlenecks that could be digitized.",
    approach: [
      "Supported user account provisioning, role definitions, and access permissions in Lark Super Admin prior to cutover.",
      "Assisted with user transition steps, data and email migration activities, and post-cutover troubleshooting for individual department heads.",
      "Designed and configured automated approval workflows within Lark, replacing manual paper memos and unstructured chat requests.",
      "Provided post-migration desk-side and remote support via TeamViewer, walking users through Lark Docs, Chat, and Calendar setup."
    ],
    outcome: [
      "Achieved smooth departmental transition to Lark with minimal ticket backlog post-migration.",
      "Eliminated repetitive manual email follow-ups by deploying digital approval flows.",
      "Established structured Super Admin security policies for new user onboarding and departing employee offboarding."
    ],
    whatILearned: "The hardest part of a SaaS migration is rarely the data transfer—it is user change management. Clear communication and desk-side support eliminate anxiety.",
    technologies: ["Lark Super Admin", "Google Workspace", "Workflow Automation", "TeamViewer", "SaaS Administration", "User Lifecycle"],
    operationalTakeaway: "SaaS migrations succeed or fail based on proactive user guidance and empathetic post-cutover support.",
    relevantRoutes: ['business-systems', 'it-ops']
  },
  {
    id: "case-dkict-system",
    missionNumber: "MISSION 04",
    title: "Web Application Development & Database Design (Internship)",
    category: "Development & Data",
    role: "IT Intern – Full-Stack Developer",
    organization: "Attorney General’s Chambers of Malaysia",
    period: "September 2021 – February 2022",
    hook: "Engineering an internal compliance declaration system from requirements gathering to relational schema design in Laravel and MySQL.",
    overview: "Designed and developed an internal compliance declaration system utilizing PHP Laravel and MySQL during an academic internship.",
    context: "The public agency needed an organized digital portal for personnel to complete mandatory ICT security declarations (DKICT) and maintain verifiable audit records.",
    challenge: "Translating governmental compliance guidelines into functional database schemas and straightforward web forms that non-technical civil servants could submit effortlessly.",
    investigation: "Engaged directly with administrative stakeholders to map manual declaration flows, identified data dependencies, and created Entity Relationship Diagrams (ERDs).",
    approach: [
      "Participated in requirement-gathering sessions to draft the formal System Requirements Specification (SRS).",
      "Modeled relational database architecture and constructed Entity Relationship Diagrams (ERD) with normalized tables in MySQL.",
      "Implemented MVC application logic, form validation, and user session handling within the Laravel framework.",
      "Conducted user testing with department representatives, identifying usability bottlenecks and patching validation bugs."
    ],
    outcome: [
      "Successfully built and demonstrated the DKICT declaration modules meeting agency specifications.",
      "Delivered complete system documentation and database schema diagrams for future institutional maintenance.",
      "Formed an enduring technical foundation in relational data querying and web MVC architecture."
    ],
    whatILearned: "Understanding how an MVC framework handles state, routing, and database queries gives support engineers an unfair diagnostic advantage when troubleshooting application errors.",
    technologies: ["Laravel", "MySQL", "PHP", "Entity Relationship Diagrams (ERD)", "System Requirements Specification (SRS)", "User Acceptance Testing"],
    operationalTakeaway: "Experiencing software development firsthand provides invaluable analytical intuition when diagnosing software bugs as a support specialist.",
    relevantRoutes: ['app-support', 'cloud']
  },
  {
    id: "case-hardware-network",
    missionNumber: "MISSION 05",
    title: "Layer 1–4 Network & Endpoint Hardware Diagnostics",
    category: "IT Operations",
    role: "IT Technician",
    organization: "Managed Print Services",
    period: "October 2023 – March 2024",
    hook: "Methodically resolving hardware, print-server, and corporate LAN connectivity faults across multi-client commercial offices.",
    overview: "Resolving complex peripheral, print-server, and corporate LAN connectivity faults across commercial client offices.",
    context: "Corporate office clients rely on shared multifunction printers, scanners, and networked endpoints for daily business operations, where driver corruption or IP address collisions halt business paperwork.",
    challenge: "Diagnosing persistent connectivity failures across diverse client networks with varying router configurations, static IP policies, and legacy printer drivers.",
    investigation: "Inspected physical link LEDs, pinged gateway addresses, reviewed Windows Event Logs, and examined subnet masks to isolate IP collisions.",
    approach: [
      "Applied methodical Layer 1 through Layer 4 network troubleshooting: checking physical cable continuity, verifying link LEDs, inspecting DHCP lease tables, and performing ping/traceroute tests.",
      "Resolved IP conflicts by reconfiguring network card parameters and binding reserved static addresses to critical peripherals.",
      "Managed incident records systematically in Freshdesk, detailing firmware versions, diagnostic steps taken, and resolution verifications."
    ],
    outcome: [
      "Maintained high customer satisfaction and consistently hit service turnaround SLAs.",
      "Reduced repeat service calls by verifying network driver stability before closing client tickets.",
      "Honed disciplined documentation habits essential for enterprise IT service delivery."
    ],
    whatILearned: "Methodical OSI Layer isolation prevents wasted hours. Always test physical continuity before suspecting software or routing tables.",
    technologies: ["Freshdesk", "TCP/IP & Subnets", "Hardware Diagnostics", "Print Servers", "Windows OS Troubleshooting"],
    operationalTakeaway: "Disciplined step-by-step diagnostics always beat random trial-and-error when resolving network and hardware faults.",
    relevantRoutes: ['infrastructure', 'it-ops']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "skills-app-support",
    title: "Application & Systems Support",
    description: "Investigating application faults, testing system behaviours, and driving vendor resolution for business software.",
    practicalContext: "Used daily at emart24 for Xilnex POS, payment gateway triage, and promotion engine validation.",
    relevantRoutes: ['app-support'],
    skills: [
      { name: "Application Troubleshooting & Root Cause Analysis", level: "Professional Experience", practicalExample: "Isolating POS transaction sync delays vs bank gateway decline codes", relevantRoutes: ['app-support'] },
      { name: "Business Application Support & Configuration", level: "Professional Experience", practicalExample: "Configuring outlet register parameters and scanner mappings", relevantRoutes: ['app-support'] },
      { name: "Incident Investigation & Log Review", level: "Professional Experience", practicalExample: "Reviewing terminal error logs and timestamped API payloads", relevantRoutes: ['app-support'] },
      { name: "User-Reported Issue Analysis & Triage", level: "Professional Experience", practicalExample: "Translating vague cashier reports into reproducible technical symptoms", relevantRoutes: ['app-support', 'it-ops'] },
      { name: "System Testing & User Acceptance Testing (UAT)", level: "Professional Experience", practicalExample: "Conducting pre-launch test sales and promotion verification", relevantRoutes: ['app-support'] },
      { name: "Third-Party Vendor Escalation & Management", level: "Professional Experience", practicalExample: "Packaging technical tickets for software and terminal providers", relevantRoutes: ['app-support', 'it-ops'] },
      { name: "Retail & POS Application Support (Xilnex)", level: "Professional Experience", practicalExample: "HQ and multi-site store application uptime support", relevantRoutes: ['app-support'] },
      { name: "Operational Documentation & Knowledge Base", level: "Professional Experience", practicalExample: "Writing step-by-step SOPs for outlet cashiers and support staff", relevantRoutes: ['app-support', 'it-ops'] }
    ]
  },
  {
    id: "skills-it-ops",
    title: "IT Operations & End-User Support",
    description: "Structured service desk workflows, user enablement, endpoint lifecycle, and remote diagnostic operations.",
    practicalContext: "Honed across Palaterium (Lark Helpdesk) and Managed Print Services (Freshdesk).",
    relevantRoutes: ['it-ops'],
    skills: [
      { name: "L1 / L2 Technical Support & Ticket Resolution", level: "Professional Experience", practicalExample: "Managing incidents against strict turnaround targets", relevantRoutes: ['it-ops'] },
      { name: "Hardware & Software Endpoint Troubleshooting", level: "Professional Experience", practicalExample: "Diagnosing PC hardware, OS errors, and peripheral drivers", relevantRoutes: ['it-ops', 'infrastructure'] },
      { name: "Remote Support (TeamViewer & AnyDesk)", level: "Professional Experience", practicalExample: "Diagnosing remote staff workstations across multiple locations", relevantRoutes: ['it-ops'] },
      { name: "Helpdesk Workflows & SLA Tracking (Freshdesk, Lark)", level: "Professional Experience", practicalExample: "Tracking ticket queues, categorizing severity, and following up", relevantRoutes: ['it-ops'] },
      { name: "User Onboarding & Offboarding Lifecycle", level: "Professional Experience", practicalExample: "Provisioning hardware, accounts, and directory access", relevantRoutes: ['it-ops', 'business-systems'] },
      { name: "User Account Provisioning (Lark, Microsoft 365)", level: "Professional Experience", practicalExample: "Creating business emails, assigning licenses, and setting permissions", relevantRoutes: ['it-ops', 'business-systems'] },
      { name: "IT Equipment Deployment & Site Readiness", level: "Professional Experience", practicalExample: "Staging workstations, barcode scanners, and payment devices", relevantRoutes: ['it-ops', 'infrastructure'] },
      { name: "IT Inventory & Procurement Support", level: "Professional Experience", practicalExample: "Tracking asset lifecycles and vendor replacement coordination", relevantRoutes: ['it-ops'] },
      { name: "Standard Operating Procedures (SOP) Development", level: "Professional Experience", practicalExample: "Standardizing hardware staging and troubleshooting checklists", relevantRoutes: ['it-ops'] }
    ]
  },
  {
    id: "skills-infra",
    title: "Networking & Infrastructure",
    description: "Practical diagnostics for local networking, endpoint connectivity, physical cabling, and peripheral integration.",
    practicalContext: "Demonstrated during new-store IT setups and corporate office network troubleshooting.",
    relevantRoutes: ['infrastructure'],
    skills: [
      { name: "TCP/IP Fundamentals & IP Addressing", level: "Working Knowledge", practicalExample: "Setting static IPs, subnet masks, and default gateways for peripherals", relevantRoutes: ['infrastructure'] },
      { name: "LAN & Wi-Fi Incident Troubleshooting", level: "Professional Experience", practicalExample: "Diagnosing outlet switch links, Wi-Fi SSID drops, and router reboots", relevantRoutes: ['infrastructure', 'it-ops'] },
      { name: "DNS & DHCP Fundamentals", level: "Working Knowledge", practicalExample: "Resolving IP lease collisions and host resolution failures", relevantRoutes: ['infrastructure'] },
      { name: "Network Connectivity Diagnostics (Ping, Traceroute)", level: "Working Knowledge", practicalExample: "Isolating local switch disconnects from ISP telco outages", relevantRoutes: ['infrastructure'] },
      { name: "Basic Router, Switch & Access Point Concepts", level: "Working Knowledge", practicalExample: "Validating port VLAN connectivity and AP signal coverage", relevantRoutes: ['infrastructure'] },
      { name: "RJ45 Termination & Cable Tester Continuity", level: "Professional Experience", practicalExample: "Re-crimping damaged 8-pin Ethernet heads and testing sequence", relevantRoutes: ['infrastructure'] },
      { name: "Infrastructure Deployment & Equipment Mounting", level: "Professional Experience", practicalExample: "Mounting registers, network gear, and POS peripherals in store racks", relevantRoutes: ['infrastructure'] }
    ]
  },
  {
    id: "skills-business-systems",
    title: "Business Systems & Data",
    description: "SaaS administration, digital workflow automation, spreadsheet auditing, and relational database validation.",
    practicalContext: "Gained through Lark Super Admin at Palaterium and catalog validation at emart24.",
    relevantRoutes: ['business-systems'],
    skills: [
      { name: "Lark Super Admin & Permission Governance", level: "Professional Experience", practicalExample: "Administering user directories, roles, and security groups", relevantRoutes: ['business-systems'] },
      { name: "Digital Workflow Automation (Approval Flows)", level: "Working Knowledge", practicalExample: "Building multi-tier approval flows for administrative requests", relevantRoutes: ['business-systems'] },
      { name: "NetSuite Exposure & Data Import Support", level: "Working Knowledge", practicalExample: "Formatting and preparing bulk transactional records for ERP import", relevantRoutes: ['business-systems'] },
      { name: "Microsoft Excel (VLOOKUP, Data Cleansing, Audit)", level: "Professional Experience", practicalExample: "Auditing product pricing lists and identifying data discrepancies", relevantRoutes: ['business-systems'] },
      { name: "SQL & MySQL Queries for Data Validation", level: "Working Knowledge", practicalExample: "Executing SELECT, JOIN, and WHERE queries to verify data integrity", relevantRoutes: ['business-systems', 'app-support'] },
      { name: "Entity Relationship Diagrams (ERDs)", level: "Working Knowledge", practicalExample: "Designing relational database schemas during AGC internship", relevantRoutes: ['business-systems', 'cloud'] },
      { name: "System Requirements Specifications (SRS)", level: "Working Knowledge", practicalExample: "Documenting functional specifications from non-technical feedback", relevantRoutes: ['business-systems', 'app-support'] }
    ]
  },
  {
    id: "skills-development-cloud",
    title: "Development & Cloud Foundations",
    description: "Transferable software engineering principles, version control, and cloud architecture fundamentals.",
    practicalContext: "Formed through UiTM Computer Science degree, AGC internship, and AWS certification.",
    relevantRoutes: ['cloud'],
    skills: [
      { name: "AWS Cloud Fundamentals", level: "Foundational Knowledge", practicalExample: "Understanding core cloud architecture, EC2, S3, RDS, IAM, and VPCs", relevantRoutes: ['cloud'] },
      { name: "AWS Certified Cloud Practitioner", level: "Foundational Knowledge", practicalExample: "Formally certified in AWS Cloud Practitioner concepts and security", relevantRoutes: ['cloud'] },
      { name: "Laravel Framework (MVC Architecture)", level: "Foundational Knowledge", practicalExample: "Building models, controllers, and views for the DKICT declaration portal", relevantRoutes: ['cloud', 'app-support'] },
      { name: "MySQL Relational Database Operations", level: "Working Knowledge", practicalExample: "Table normalization, foreign keys, and query formulation", relevantRoutes: ['cloud', 'business-systems'] },
      { name: "HTML5 & CSS3 Standards", level: "Working Knowledge", practicalExample: "Structuring responsive interfaces and semantic markups", relevantRoutes: ['cloud'] },
      { name: "JavaScript Fundamentals", level: "Foundational Knowledge", practicalExample: "DOM manipulation, asynchronous fetching, and event listeners", relevantRoutes: ['cloud'] },
      { name: "Git Fundamentals & Version Control", level: "Foundational Knowledge", practicalExample: "Branching, committing, pulling, and merging code in Git", relevantRoutes: ['cloud'] },
      { name: "JSON Data Structures & API Fundamentals", level: "Foundational Knowledge", practicalExample: "Inspecting API payload responses and key-value formats", relevantRoutes: ['cloud', 'app-support'] },
      { name: "Kubuntu / Linux Basic Exposure", level: "Currently Learning", practicalExample: "Command-line navigation, file permissions, and package management", relevantRoutes: ['cloud'] }
    ]
  }
];

export const PROJECTS_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: "project-dkict",
    title: "DKICT Declaration System",
    tagline: "Internal governmental compliance web application built with PHP Laravel and MySQL.",
    type: "Academic Internship",
    organization: "Attorney General’s Chambers of Malaysia",
    period: "Sep 2021 – Feb 2022",
    description: "Contributed to developing the internal ICT declaration system for agency personnel. Engaged with stakeholders, drafted System Requirements Specifications (SRS), designed Entity Relationship Diagrams (ERDs), and conducted user testing.",
    role: "IT Intern – Full-Stack Developer",
    keyHighlights: [
      "Authored formal System Requirements Specification (SRS) documents.",
      "Designed normalized relational database schemas with MySQL ERDs.",
      "Implemented MVC controllers, form validation, and user sessions in Laravel.",
      "Investigated and resolved application edge-case bugs during user acceptance testing."
    ],
    technologies: ["Laravel", "MySQL", "PHP", "ERD Modeling", "SRS Documentation", "UAT Testing"],
    relevantRoutes: ['app-support', 'cloud']
  },
  {
    id: "project-lark-migration",
    title: "Google Workspace to Lark Enterprise Migration",
    tagline: "Transitioning corporate users and administrative processes into a unified collaboration platform.",
    type: "Professional Experience",
    organization: "Palaterium Sdn Bhd",
    period: "Apr 2024 – Aug 2025",
    description: "Assisted in migrating company-wide operations from Google Workspace to Lark. Handled Lark Super Admin provisioning, user account transition, digital approval automation, and post-cutover desk-side support.",
    role: "IT Executive",
    keyHighlights: [
      "Configured user directories, security groups, and role permissions in Lark Super Admin.",
      "Assisted staff with mailbox and file transition activities, providing responsive support.",
      "Replaced manual paper approval memos with automated digital approval flows.",
      "Maintained data integrity during NetSuite ERP imports using Excel audit formulas."
    ],
    technologies: ["Lark Super Admin", "Google Workspace", "Workflow Automation", "TeamViewer", "Microsoft Excel"],
    relevantRoutes: ['business-systems', 'it-ops']
  },
  {
    id: "project-retail-support",
    title: "Multi-Site Retail POS & Payment Triage Framework",
    tagline: "Standardized incident triage and vendor escalation protocols for high-volume retail systems.",
    type: "Professional Experience",
    organization: "emart24 Malaysia",
    period: "Sep 2025 – Present",
    description: "Developed structured triage routines for Xilnex POS incidents, payment terminal declines, and promotional pricing mismatches. Bridges communication between retail outlet cashiers and third-party software developers.",
    role: "System Application Specialist",
    keyHighlights: [
      "Formulated diagnostic checks distinguishing bank issuer declines from local connection timeouts.",
      "Delivered structured, timestamped error logs to vendors to expedite hotfix deployments.",
      "Conducted pre-launch promotional engine validation alongside marketing and merchandising.",
      "Guided store teams through graceful restarts and sync routines to restore immediate service."
    ],
    technologies: ["Xilnex POS", "Payment Terminal APIs", "Log Diagnostics", "Vendor Management", "UAT Testing"],
    relevantRoutes: ['app-support', 'it-ops']
  },
  {
    id: "project-site-commissioning",
    title: "New-Site IT Infrastructure Commissioning Runbook",
    tagline: "Comprehensive deployment checklist for hardware provisioning and network readiness.",
    type: "Professional Experience",
    organization: "emart24 Malaysia",
    period: "Sep 2025 – Present",
    description: "Authored and executed end-to-end IT commissioning checklists for new operational locations. Covers physical cabling verification, router/switch connectivity, POS setup, and simulated end-of-day reconciliation.",
    role: "System Application Specialist",
    keyHighlights: [
      "Ensured zero launch-day IT downtime across multiple site opening deployments.",
      "Re-terminated damaged RJ45 cabling on-site and verified pinout continuity.",
      "Validated switch port VLANs and DHCP scope assignments for workstations and CCTV.",
      "Conducted simulated credit/debit card transactions prior to official store handovers."
    ],
    technologies: ["RJ45 Termination", "Cable Testing", "LAN / Wi-Fi", "Hardware Staging", "Deployment Runbooks"],
    relevantRoutes: ['infrastructure', 'it-ops']
  },
  {
    id: "project-aws-foundations",
    title: "AWS Cloud Fundamentals & Architectural Concepts",
    tagline: "Foundational cloud computing principles verified through AWS Certified Cloud Practitioner.",
    type: "Cloud Foundation",
    organization: "Amazon Web Services (AWS)",
    period: "Certified",
    description: "Mastered fundamental AWS architecture concepts including IAM security, compute (EC2), storage (S3), relational databases (RDS), virtual networks (VPC), and shared responsibility security models.",
    role: "Certified Practitioner",
    keyHighlights: [
      "Earned official AWS Certified Cloud Practitioner credential.",
      "Understands cloud security, IAM access least privilege, and compliance models.",
      "Grounded in hybrid cloud infrastructure, automated backup concepts, and cloud billing.",
      "Actively expanding practical Linux and cloud administration competencies."
    ],
    technologies: ["AWS Cloud", "IAM", "EC2", "S3", "RDS", "VPC Concepts", "Cloud Security"],
    relevantRoutes: ['cloud']
  },
  {
    id: "project-portfolio",
    title: "Interactive IT Operations & Systems Portfolio",
    tagline: "Engineered single-page portfolio with interactive diagnostic console and recruiter route filters.",
    type: "Personal Project",
    organization: "Independent Development",
    period: "2026",
    description: "Designed and built this responsive portfolio in React, TypeScript, and Tailwind CSS. Features an interactive terminal status console, route-based perspective filtering for recruiters, an ATS-compliant resume modal, and zero external trackers.",
    role: "Front-End Developer & UX Designer",
    keyHighlights: [
      "Engineered 'Choose Your Route' dynamic perspective selector for IT hiring managers.",
      "Built compact interactive terminal panel with simulated command prompt.",
      "Implemented ATS-formatted printable technical resume with native window.print() CSS rules.",
      "Ensured 100% WCAG accessibility, keyboard navigation, and reduced-motion compliance."
    ],
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Responsive Design", "Accessibility"],
    relevantRoutes: ['all'],
    link: {
      label: "View Live Deployment",
      url: "https://aries-razak.vercel.app/",
      isExternal: true
    }
  }
];

export const CAREER_INTERESTS: CareerInterest[] = [
  {
    category: "Application Support & Systems",
    title: "Application Support Specialist / Systems Analyst",
    description: "Investigating complex application faults, analyzing database query logs, conducting UAT testing, and bridging communication between users and software engineering teams.",
    transferableFoundation: "Backed by daily Xilnex POS troubleshooting, vendor escalation routines, and Laravel/MySQL web development experience."
  },
  {
    category: "IT Operations & Service Desk",
    title: "IT Operations Executive / Service Desk Lead",
    description: "Delivering structured L1/L2 incident resolution, managing helpdesk SLAs, establishing operational SOPs, and optimizing endpoint provisioning lifecycles.",
    transferableFoundation: "Backed by multi-site incident management at emart24, Lark/Freshdesk SLA tracking, and IT asset procurement experience."
  },
  {
    category: "Business Systems & Integrations",
    title: "Business Systems / SaaS Administrator",
    description: "Overseeing enterprise SaaS ecosystems, user directory provisioning, access control governance, workflow automation, and data validation between enterprise tools.",
    transferableFoundation: "Backed by Lark Super Admin administration, Google Workspace migration experience, and NetSuite data auditing with Excel."
  },
  {
    category: "Cloud Support & Operations",
    title: "Junior Cloud Operations / Cloud Support Associate",
    description: "Supporting cloud infrastructure monitoring, automated backups, IAM access permissions, and basic cloud service provisioning.",
    transferableFoundation: "Backed by verified AWS Certified Cloud Practitioner accreditation and ongoing study in Linux and cloud architecture."
  },
  {
    category: "Infrastructure & Network Support",
    title: "IT Infrastructure Support / Network Specialist",
    description: "Deploying and maintaining on-premise network gear, diagnosing LAN/Wi-Fi outages, resolving DHCP/DNS issues, and commissioning physical site IT infrastructure.",
    transferableFoundation: "Backed by hands-on RJ45 termination, switch/AP configuration, and multi-site store commissioning experience."
  }
];

export const EDUCATION_DATA: Education = {
  degree: "Diploma in Computer Science and Mathematics",
  institution: "Universiti Teknologi MARA (UiTM), Melaka Jasin",
  location: "Melaka, Malaysia",
  period: "2019 – 2022",
  highlights: [
    "Core coursework in Object-Oriented Programming, Database Systems, Discrete Mathematics, and Computer Networks.",
    "Formed strong analytical problem-solving foundations through advanced mathematics and algorithm design.",
    "Completed practical software engineering capstone and technical internship."
  ]
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    dateOrStatus: "Issued / Verified",
    status: "Certified",
    description: "Validates foundational knowledge of AWS cloud concepts, security architecture, core services (EC2, S3, RDS, IAM), billing, and operational models.",
    credentialNote: "Demonstrates core cloud computing principles applicable to hybrid enterprise IT environments.",
    relevantRoutes: ['cloud']
  },
  {
    name: "Generative AI Copilot Digital Upskilling Program",
    issuer: "AI Teach Malaysia",
    dateOrStatus: "Completed",
    status: "Completed",
    description: "Focused on leveraging AI productivity tools, prompt engineering, and intelligent workplace automation to enhance operational workflows.",
    credentialNote: "Upskilling training completed to streamline technical documentation and data analysis.",
    relevantRoutes: ['it-ops', 'business-systems']
  },
  {
    name: "ITIL 4 Foundation",
    issuer: "Axelos / PeopleCert Curriculum",
    dateOrStatus: "In Progress",
    status: "In Progress",
    description: "Studying the ITIL service management framework: Service Value System (SVS), Incident Management, Problem Management, Change Enablement, and Continual Improvement.",
    credentialNote: "Active professional study to formalize enterprise IT service desk and operations best practices.",
    relevantRoutes: ['it-ops', 'app-support']
  }
];

export interface FrontierTopic {
  id: string;
  domain: string;
  title: string;
  tagline: string;
  status: 'Active Investigation' | 'Hands-on Experiments' | 'Conceptual Study';
  whyItMatters: string;
  questionsInvestigated: string[];
  keyConcepts: string[];
  sampleCommandOrCode?: string;
  practicalConnection: string;
}

export const FRONTIER_TOPICS: FrontierTopic[] = [
  {
    id: 'linux-internals',
    domain: 'Operating Systems',
    title: 'Linux Kernel & System Internals',
    tagline: 'Moving beyond surface commands to understand processes, memory, and syscalls.',
    status: 'Active Investigation',
    whyItMatters: 'Every web server, POS backend daemon, and cloud container runs on an OS kernel. Understanding file descriptors, signals, and virtual memory demystifies cryptic crash dumps and zombie processes.',
    questionsInvestigated: [
      'How does the virtual filesystem (VFS) map device nodes like /dev/tty to physical serial ports and pinpads?',
      'What happens during fork() and execve() when a daemon spawns a worker process?',
      'How do kernel cgroups and namespaces enforce process isolation for containers?'
    ],
    keyConcepts: ['File Descriptors', 'Process Scheduling', 'Virtual Memory', 'strace & lsof', 'Systemd Units'],
    sampleCommandOrCode: 'strace -e trace=network,openat,read,write -p $PID',
    practicalConnection: 'Directly helps troubleshoot POS backend service hangs, socket leaks, and permission bitmasks in production.'
  },
  {
    id: 'networking-deep-dive',
    domain: 'Computer Networks',
    title: 'Packet Routing & Transport Architecture',
    tagline: 'Dissecting TCP handshakes, congestion windows, and packet encapsulation.',
    status: 'Hands-on Experiments',
    whyItMatters: 'Understanding OSI Layer 1 through 7 transforms network troubleshooting from "the internet is down" into precise root cause isolation.',
    questionsInvestigated: [
      'Why do payment EDC pinpads fail with 504 Host Timeout when upstream MTU fragmentation occurs?',
      'How does BGP and Anycast DNS route packets across global CDNs?',
      'What causes TCP SYN retransmissions during branch dual-WAN failover?'
    ],
    keyConcepts: ['TCP 3-Way Handshake', 'MTU / MSS Sizing', 'VLAN 802.1Q Tagging', 'NAT Overload (PAT)', 'TLS 1.3 Key Exchange'],
    sampleCommandOrCode: 'tcpdump -i eth0 -nn -vvv "tcp[tcpflags] & (tcp-syn) != 0"',
    practicalConnection: 'Builds upon my hands-on experience terminating T-568B cabling and configuring store gateway WAN routing.'
  },
  {
    id: 'defensive-security',
    domain: 'Cybersecurity Concepts',
    title: 'Defensive Security & Identity Governance',
    tagline: 'Protecting systems from the inside out: zero trust, principle of least privilege, and audit telemetry.',
    status: 'Conceptual Study',
    whyItMatters: 'Real security is not hacking screens—it is disciplined access control, identity lifecycle governance, and audit visibility.',
    questionsInvestigated: [
      'How do SAML 2.0 and OIDC identity assertions prevent token replay attacks in enterprise SaaS?',
      'Why are default permissions (e.g. 777) a severe attack vector in Linux multi-user environments?',
      'How can automated approval workflows prevent unauthorized ERP data mutation?'
    ],
    keyConcepts: ['SAML / SSO Handshakes', 'Least Privilege (PoLP)', 'Unix Permission Bitmasks', 'Audit Logging & SIEM', 'Endpoint Isolation'],
    sampleCommandOrCode: 'find / -perm -4000 -type f 2>/dev/null # Audit SUID binaries',
    practicalConnection: 'Directly informed by administering Lark as Super Admin and enforcing strict data auditing on NetSuite imports.'
  },
  {
    id: 'cloud-architecture',
    domain: 'Cloud & Infrastructure',
    title: 'Cloud Systems & Infrastructure as Code',
    tagline: 'Designing resilient, decoupled architectures across AWS primitives.',
    status: 'Active Investigation',
    whyItMatters: 'Building beyond single on-premise servers into fault-tolerant, auto-scaling distributed services.',
    questionsInvestigated: [
      'How does an Application Load Balancer distribute traffic across multi-AZ private subnets?',
      'What are the latency and cost trade-offs between S3 Standard, Glacier, and EBS block storage?',
      'How do VPC Security Groups (stateful) differ from Network ACLs (stateless)?'
    ],
    keyConcepts: ['AWS VPC Subnetting', 'IAM Role Delegation', 'Stateless vs Stateful Gateways', 'Infrastructure as Code', 'Automated Health Checks'],
    sampleCommandOrCode: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"',
    practicalConnection: 'Reinforces my AWS Certified Cloud Practitioner credential toward hands-on cloud operations.'
  }
];

