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
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Professional' | 'Working Knowledge' | 'Foundational / Certified';
  }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Application Support' | 'Retail Operations' | 'SaaS Migration' | 'Development & Data' | 'Infrastructure';
  role: string;
  organization: string;
  period: string;
  overview: string;
  context: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  technologies: string[];
  operationalTakeaway: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateOrStatus: string;
  status: 'Certified' | 'Completed' | 'In Progress';
  description: string;
  credentialNote?: string;
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
  displayName: "Aries Irhan",
  headline: "IT Support · Application Support · IT Operations",
  tagline: "I keep business-critical systems running.",
  shortBio: "IT support and application support professional with nearly three years of relevant experience across retail systems, multi-site support, end-user troubleshooting, IT operations, networking, SaaS administration, vendor coordination, system testing, and technical documentation.",
  extendedBio: "I work at the intersection of IT support, business applications, and day-to-day operations. In my current role at emart24 Malaysia, I support Xilnex POS and related systems across HQ and retail outlets, troubleshoot application, device, payment, and connectivity issues, coordinate with vendors, assist with new-site IT commissioning, and conduct UAT/system validation. Previously, I supported users and distributed sites through Lark Helpdesk, administered Lark, assisted with a Google Workspace-to-Lark migration, and worked with IT equipment and business data. Earlier, I gained onsite and remote technical support experience in managed print services and a software-development foundation using Laravel and MySQL.",
  location: "Negeri Sembilan & Greater Kuala Lumpur, Malaysia",
  email: "ariesirhan25@gmail.com",
  linkedIn: "https://www.linkedin.com/in/aries-razak-a36045256",
  currentRole: "System Application Specialist",
  currentCompany: "emart24 Malaysia",
};

export const OPERATIONAL_METRICS = [
  {
    label: "Core Specialization",
    value: "Application & POS",
    description: "Multi-site retail systems, payment devices, and Xilnex POS troubleshooting",
  },
  {
    label: "Enterprise Operations",
    value: "SaaS & Helpdesk",
    description: "Lark Super Admin, M365 provisioning, and Freshdesk incident triage",
  },
  {
    label: "System Validation",
    value: "UAT & Deployment",
    description: "Rigorous testing for promotion setups, new outlets, and data integrity",
  },
  {
    label: "Technical Grounding",
    value: "Cloud & Dev Core",
    description: "AWS Certified Cloud Practitioner with Laravel/MySQL development foundation",
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
    overview: "Act as the primary technical point of contact for retail application incidents affecting corporate HQ and nationwide convenience retail outlets, ensuring continuous point-of-sale uptime and operational readiness.",
    responsibilities: [
      "Provide frontline and second-level technical troubleshooting for Xilnex POS, payment terminals, and peripheral devices across retail outlets.",
      "Triage and investigate operational incidents based on business impact, following structured diagnosis routines through resolution.",
      "Liaise with external software vendors, technical contractors, and payment gateway providers, supplying detailed logs and technical context.",
      "Support new-store IT commissioning: hardware provisioning, network connectivity (LAN/Wi-Fi), payment terminal deployment, and operational readiness checks.",
      "Conduct User Acceptance Testing (UAT) and system validation before production releases, catalog changes, and promotional campaigns.",
      "Support operational data workflows involving product data, promotion logic, CRM, and food service categories, coordinating necessary corrections.",
      "Troubleshoot outlet network connectivity, execute physical LAN cabling tasks including RJ45 crimping and cable tester continuity validation.",
      "Assist with Microsoft 365 user account provisioning, business email configuration, and employee onboarding."
    ],
    keyContributions: [
      "Standardized triage process for payment terminal decline investigations, distinguishing card issuer declines from device sync faults.",
      "Commissioned and validated IT readiness across multiple store opening deployments, ensuring zero launch delays.",
      "Validated promotional logic and retail catalog integrity to eliminate discount discrepancies at cash registers."
    ],
    technologies: [
      "Xilnex POS",
      "Retail Payment Terminals",
      "LAN / Wi-Fi Troubleshooting",
      "RJ45 Continuity Testing",
      "UAT & System Validation",
      "Vendor Management",
      "Microsoft 365 Provisioning"
    ]
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
      "Managed user service requests and technical incidents via Lark Helpdesk adhering to defined response targets.",
      "Served as Super Admin for Lark platform, configuring access permissions, role groups, and user lifecycle workflows.",
      "Supported the company-wide transition and migration from Google Workspace to Lark, helping with user accounts, data, and post-migration support.",
      "Provided remote diagnostics and desktop assistance using TeamViewer for distributed staff across multiple sites.",
      "Designed and deployed digital workflow automation inside Lark to reduce manual paperwork and repetitive administrative handoffs.",
      "Assisted with NetSuite data imports and utilized Microsoft Excel functions to audit, clean, and validate business records.",
      "Handled IT procurement, hardware deployments, device inventory tracking, and repair coordination with equipment vendors.",
      "Diagnosed office network connectivity issues across LAN, Wi-Fi access points, and TCP/IP configurations."
    ],
    keyContributions: [
      "Successfully facilitated user transition from Google Workspace to Lark with minimal operational friction and continuous user support.",
      "Automated internal administrative request workflows in Lark, accelerating departmental approval cycles.",
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
    ]
  },
  {
    id: "mps",
    role: "IT Technician",
    company: "Managed Print Services",
    location: "Kajang, Selangor, Malaysia",
    period: "October 2023 – March 2024",
    isCurrent: false,
    overview: "Delivered onsite and remote hardware, software, and peripheral technical support for enterprise client fleets, diagnosing printing infrastructure and endpoint devices.",
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
    ]
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
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Application & POS Support",
    description: "Hands-on operational support for business-critical software and retail point-of-sale systems.",
    skills: [
      { name: "Xilnex POS Support & Configuration", level: "Professional" },
      { name: "Retail Payment Device Triage", level: "Professional" },
      { name: "Incident Triage & Root Cause Analysis", level: "Professional" },
      { name: "User Acceptance Testing (UAT)", level: "Professional" },
      { name: "Product & Promotion Data Validation", level: "Professional" },
      { name: "Vendor Escalation & Follow-up", level: "Professional" },
      { name: "Third-Party Delivery Integration Monitoring", level: "Working Knowledge" }
    ]
  },
  {
    title: "IT Operations & Service Desk",
    description: "Structured service delivery, SaaS administration, and end-user enablement across distributed sites.",
    skills: [
      { name: "Lark Super Admin & Permissions", level: "Professional" },
      { name: "Freshdesk & Lark Helpdesk SLA Management", level: "Professional" },
      { name: "Microsoft 365 User Provisioning & Onboarding", level: "Professional" },
      { name: "TeamViewer & AnyDesk Remote Diagnostics", level: "Professional" },
      { name: "IT Equipment Deployment & Inventory", level: "Professional" },
      { name: "Digital Workflow Automation", level: "Working Knowledge" },
      { name: "Standard Operating Procedures (SOP)", level: "Professional" }
    ]
  },
  {
    title: "Networking & Physical Infrastructure",
    description: "Practical troubleshooting of local network connectivity, endpoints, and physical cabling.",
    skills: [
      { name: "TCP/IP, Subnets & IP Configuration", level: "Working Knowledge" },
      { name: "LAN & Wi-Fi Incident Troubleshooting", level: "Professional" },
      { name: "DNS & DHCP Fundamentals", level: "Working Knowledge" },
      { name: "RJ45 Termination & Cable Tester Continuity", level: "Professional" },
      { name: "Network Switches & Access Points", level: "Working Knowledge" },
      { name: "NVR / CCTV Connectivity Verification", level: "Working Knowledge" }
    ]
  },
  {
    title: "Business Applications & Data",
    description: "Data integrity verification, spreadsheet auditing, and enterprise system support.",
    skills: [
      { name: "Microsoft Excel (VLOOKUP, Data Cleansing)", level: "Professional" },
      { name: "NetSuite Data Import & Validation", level: "Working Knowledge" },
      { name: "SQL Data Queries & Integrity Checks", level: "Working Knowledge" },
      { name: "Entity Relationship Diagrams (ERDs)", level: "Working Knowledge" },
      { name: "System Requirements Specifications (SRS)", level: "Working Knowledge" }
    ]
  },
  {
    title: "Development & Cloud Foundations",
    description: "Technical foundations in web development, version control, and cloud architecture principles.",
    skills: [
      { name: "AWS Cloud Fundamentals", level: "Foundational / Certified" },
      { name: "Laravel Framework", level: "Foundational / Certified" },
      { name: "MySQL Relational Databases", level: "Working Knowledge" },
      { name: "HTML5 & CSS3", level: "Working Knowledge" },
      { name: "JavaScript Fundamentals", level: "Foundational / Certified" },
      { name: "Git Version Control Basics", level: "Foundational / Certified" },
      { name: "Kubuntu / Linux Basic Exposure", level: "Foundational / Certified" }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-pos-support",
    title: "Multi-Site Retail POS & Payment Application Support",
    category: "Application Support",
    role: "System Application Specialist",
    organization: "emart24 Malaysia",
    period: "September 2025 – Present",
    overview: "Managing and investigating critical point-of-sale incidents, transaction errors, and system synchronisation across nationwide convenience retail outlets.",
    context: "In high-transaction retail convenience stores, any POS freeze, barcode lookup fault, or payment terminal timeout immediately halts cashier lines and disrupts store revenue.",
    challenge: "Outlet teams frequently report vague symptoms like 'payment not working' or 'promo not appearing'. The challenge is swiftly isolating whether the root cause is local network degradation, terminal hardware failure, bank host decline, sync queue delay, or catalog pricing configuration.",
    approach: [
      "Established systematic triage protocol: check local terminal connectivity, evaluate payment response codes (e.g. distinguishing bank card 'Do Not Honour' from wallet authentication failures), and inspect Xilnex POS synchronization status.",
      "Coordinated directly with payment terminal partners and POS vendor support, providing exact timestamped logs, terminal IDs, and error codes rather than generic reports.",
      "Conducted outlet team guidance on prompt POS restarts, sync routines, and cache clearing to restore immediate cashier functionality.",
      "Audited promotional trigger rules alongside Marketing and Category teams to eliminate price mismatch tickets before high-volume sales windows."
    ],
    outcomes: [
      "Accelerated incident turnaround by eliminating back-and-forth ambiguity with third-party vendors.",
      "Protected store transaction continuity by teaching outlet personnel immediate first-response checks.",
      "Maintained high operational reliability across busy retail shifts without disclosing proprietary vendor secrets."
    ],
    technologies: ["Xilnex POS", "Payment Terminals", "Network Diagnostics", "Vendor Coordination", "Retail Operations"],
    operationalTakeaway: "Fast incident resolution depends on translating vague cashier distress into concrete, actionable technical parameters for vendors."
  },
  {
    id: "case-store-commissioning",
    title: "New Retail Outlet IT Commissioning & Operational Readiness",
    category: "Retail Operations",
    role: "System Application Specialist",
    organization: "emart24 Malaysia",
    period: "September 2025 – Present",
    overview: "Orchestrating hardware deployment, network setup, POS configuration, and pre-launch IT validation for new retail outlet openings.",
    context: "Store opening schedules are strict. Every retail outlet requires operational POS registers, electronic payment terminals, receipt printers, barcode scanners, office PCs, and CCTV network connections ready before opening day.",
    challenge: "New commercial spaces often present unpredictable on-site cabling issues, unverified telco lines, unorganized network racks, and equipment delivery staggered across multiple vendors.",
    approach: [
      "Executed a comprehensive pre-launch checklist covering endpoint provisioning, IP configuration, POS terminal initialization, and receipt printer testing.",
      "Troubleshot physical network cabling on site: re-crimped faulty RJ45 connectors and verified pinout sequencing with an 8-wire cable tester when link signals failed.",
      "Validated local Wi-Fi SSID visibility, DHCP scope assignment, and switch port links to ensure NVR/CCTV cameras and POS terminals had isolated, steady connectivity.",
      "Conducted end-to-end simulated sales, credit/debit card tests, and end-of-day settlement tests before signing off for official store launch."
    ],
    outcomes: [
      "Delivered multiple new store IT handovers with zero opening-day IT downtime.",
      "Identified and repaired damaged physical cabling on site, avoiding expensive third-party contractor callouts.",
      "Created repeatable commissioning documentation that streamlined readiness validation for subsequent store setups."
    ],
    technologies: ["Hardware Provisioning", "RJ45 Crimping & Testing", "LAN & Wi-Fi", "POS Setup", "Operational Readiness"],
    operationalTakeaway: "On-site readiness requires both software configuration knowledge and physical infrastructure problem-solving."
  },
  {
    id: "case-lark-migration",
    title: "Google Workspace to Lark Enterprise Migration & Administration",
    category: "SaaS Migration",
    role: "IT Executive",
    organization: "Palaterium Sdn Bhd",
    period: "April 2024 – August 2025",
    overview: "Supported company-wide collaboration platform migration, user account lifecycle management, access controls, and administrative workflow automation.",
    context: "The organization decided to consolidate internal communications, document management, approvals, and employee directory from Google Workspace into the unified Lark ecosystem.",
    challenge: "Transitioning non-technical business users to a new collaboration platform without losing access to historical emails, departmental communications, or interrupting daily approvals.",
    approach: [
      "Supported user account provisioning, role definitions, and access permissions in Lark Super Admin prior to cutover.",
      "Assisted with user transition steps, data and email migration activities, and post-cutover troubleshooting for individual department heads.",
      "Designed and configured automated approval workflows within Lark, replacing manual paper memos and unstructured chat requests.",
      "Provided post-migration desk-side and remote support via TeamViewer, walking users through Lark Docs, Chat, and Calendar setup."
    ],
    outcomes: [
      "Achieved smooth departmental transition to Lark with minimal ticket backlog post-migration.",
      "Eliminated repetitive manual email follow-ups by deploying digital approval flows.",
      "Established structured Super Admin security policies for new user onboarding and departing employee offboarding."
    ],
    technologies: ["Lark Super Admin", "Google Workspace", "Workflow Automation", "TeamViewer", "SaaS Administration"],
    operationalTakeaway: "SaaS migrations succeed or fail based on proactive user guidance and empathetic post-cutover support."
  },
  {
    id: "case-dkict-system",
    title: "DKICT Declaration Web System (Internship)",
    category: "Development & Data",
    role: "IT Intern – Full-Stack Developer",
    organization: "Attorney General’s Chambers of Malaysia",
    period: "September 2021 – February 2022",
    overview: "Designed and developed an internal compliance declaration system utilizing PHP Laravel and MySQL during an academic internship.",
    context: "The public agency needed an organized digital portal for personnel to complete mandatory ICT security declarations (DKICT) and maintain verifiable audit records.",
    challenge: "Translating governmental compliance guidelines into functional database schemas and straightforward web forms that non-technical civil servants could submit effortlessly.",
    approach: [
      "Participated in requirement-gathering sessions to draft the formal System Requirements Specification (SRS).",
      "Modeled relational database architecture and constructed Entity Relationship Diagrams (ERD) with normalized tables in MySQL.",
      "Implemented MVC application logic, form validation, and user session handling within the Laravel framework.",
      "Conducted user testing with department representatives, identifying usability bottlenecks and patching validation bugs."
    ],
    outcomes: [
      "Successfully built and demonstrated the DKICT declaration modules meeting agency specifications.",
      "Delivered complete system documentation and database schema diagrams for future institutional maintenance.",
      "Formed an enduring technical foundation in relational data querying and web MVC architecture."
    ],
    technologies: ["Laravel", "MySQL", "PHP", "Entity Relationship Diagrams (ERD)", "System Requirements Specification (SRS)"],
    operationalTakeaway: "Experiencing application development firsthand provides invaluable analytical intuition when diagnosing software bugs as a support engineer."
  },
  {
    id: "case-hardware-network",
    title: "Structured ICT Hardware & Network Diagnostics",
    category: "Infrastructure",
    role: "IT Technician",
    organization: "Managed Print Services",
    period: "October 2023 – March 2024",
    overview: "Resolving complex peripheral, print-server, and corporate LAN connectivity faults across commercial client offices.",
    context: "Corporate office clients rely on shared multifunction printers, scanners, and networked endpoints for daily business operations, where driver corruption or IP address collisions halt business paperwork.",
    challenge: "Diagnosing persistent connectivity failures across diverse client networks with varying router configurations, static IP policies, and legacy printer drivers.",
    approach: [
      "Applied methodical Layer 1 through Layer 4 network troubleshooting: checking physical cable continuity, verifying link LEDs, inspecting DHCP lease tables, and performing ping/traceroute tests.",
      "Resolved IP conflicts by reconfiguring network card parameters and binding reserved static addresses to critical peripherals.",
      "Managed incident records systematically in Freshdesk, detailing firmware versions, diagnostic steps taken, and resolution verifications."
    ],
    outcomes: [
      "Maintained high customer satisfaction and consistently hit service turnaround SLAs.",
      "Reduced repeat service calls by verifying network driver stability before closing client tickets.",
      "Honed disciplined documentation habits essential for enterprise IT service delivery."
    ],
    technologies: ["Freshdesk", "TCP/IP & Subnets", "Hardware Diagnostics", "Print Servers", "Windows OS Troubleshooting"],
    operationalTakeaway: "Disciplined step-by-step diagnostics always beat random trial-and-error when resolving network and hardware faults."
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
    credentialNote: "Demonstrates core cloud computing principles applicable to hybrid enterprise IT environments."
  },
  {
    name: "Generative AI Copilot Digital Upskilling Program",
    issuer: "AI Teach Malaysia",
    dateOrStatus: "Completed",
    status: "Completed",
    description: "Focused on leveraging AI productivity tools, prompt engineering, and intelligent workplace automation to enhance operational workflows.",
    credentialNote: "Upskilling training completed to streamline technical documentation and data analysis."
  },
  {
    name: "ITIL 4 Foundation",
    issuer: "Axelos / PeopleCert Curriculum",
    dateOrStatus: "In Progress",
    status: "In Progress",
    description: "Studying the ITIL service management framework: Service Value System (SVS), Incident Management, Problem Management, Change Enablement, and Continual Improvement.",
    credentialNote: "Active professional study to formalize enterprise IT service desk and operations best practices."
  }
];

export const LEARNING_JOURNEY = [
  {
    area: "Application Troubleshooting & Integration",
    status: "Active Professional Practice",
    focus: "POS synchronization, payment terminal API behaviours, third-party delivery service data sync, and log analysis."
  },
  {
    area: "SQL Scripting & Relational Data Validation",
    status: "Continuing Skills Deepening",
    focus: "Writing structured queries for data integrity checks, report extraction, and discrepancy auditing beyond basic CRUD."
  },
  {
    area: "Cloud Fundamentals & AWS Architecture",
    status: "Certified Foundation (Building Next)",
    focus: "Expanding AWS Certified Cloud Practitioner knowledge into practical cloud administration, monitoring, and automated backups."
  },
  {
    area: "ITIL & Service Management Practices",
    status: "In Progress (Curriculum Study)",
    focus: "Deepening incident categorization, root cause analysis (RCA), change management, and service request SLAs."
  },
  {
    area: "Infrastructure & Network Fundamentals",
    status: "Ongoing Hands-on Reinforcement",
    focus: "Network segmentation, VLAN basics, router/switch diagnostics, and operational runbook documentation."
  }
];
