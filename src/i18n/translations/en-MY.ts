import {
  PROFILE,
  SKILL_GROUPS,
  EXPERIENCES,
  CASE_STUDIES,
  EDUCATION,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
  EVIDENCE_META,
  CONSTELLATION_CATEGORIES,
  STRATA,
  NODES,
  EDGES,
} from '../../data/universeContent';
import type { LocaleBundle, PortfolioContentTranslations, UiTranslations } from '../types';

const skillGroupsRecord: PortfolioContentTranslations['skillGroups'] = {};
for (const group of SKILL_GROUPS) {
  skillGroupsRecord[group.id] = {
    title: group.title,
    items: [...group.items],
  };
}

const experiencesRecord: PortfolioContentTranslations['experiences'] = {};
for (const exp of EXPERIENCES) {
  experiencesRecord[exp.id] = {
    role: exp.role,
    organization: exp.organization,
    period: exp.period,
    compactPeriod: exp.compactPeriod,
    location: exp.location,
    summary: exp.summary,
    highlights: [...exp.highlights],
    technologies: [...exp.technologies],
  };
}

const caseStudiesRecord: PortfolioContentTranslations['caseStudies'] = {};
for (const cs of CASE_STUDIES) {
  caseStudiesRecord[cs.id] = {
    title: cs.title,
    organization: cs.organization,
    roleScope: cs.roleScope,
    summaryLine: cs.summaryLine,
    workflowSteps: cs.workflowSteps ? [...cs.workflowSteps] : undefined,
    situation: cs.situation,
    responsibility: cs.responsibility,
    whatIDid: [...cs.whatIDid],
    triageBreakdown: cs.triageBreakdown
      ? {
          checksPerformed: [...cs.triageBreakdown.checksPerformed],
          providedToVendor: [...cs.triageBreakdown.providedToVendor],
          vendorInvestigation: [...cs.triageBreakdown.vendorInvestigation],
        }
      : undefined,
    outcomeLabel: cs.outcomeLabel,
    outcome: cs.outcome,
    technologies: [...cs.technologies],
  };
}

const certificationsRecord: PortfolioContentTranslations['certifications'] = {};
for (const cert of CERTIFICATIONS) {
  certificationsRecord[cert.id] = {
    name: cert.name,
    issuer: cert.issuer,
    kindLabel: cert.kindLabel,
    note: cert.note,
  };
}

const learningRecord: PortfolioContentTranslations['learning'] = {};
for (const entry of LEARNING_ENTRIES) {
  learningRecord[entry.id] = {
    topic: entry.topic,
    status: entry.status,
    note: entry.note,
  };
}

const strataRecord = {} as PortfolioContentTranslations['strata'];
for (const st of STRATA) {
  strataRecord[st.id] = {
    title: st.title,
    subtitle: st.subtitle,
    description: st.description,
    exampleStage: st.exampleStage,
    examplePayload: st.examplePayload,
    whatHappensConceptually: st.whatHappensConceptually,
    exampleComponents: [...st.exampleComponents],
  };
}

const nodesRecord: PortfolioContentTranslations['nodes'] = {};
for (const node of NODES) {
  nodesRecord[node.id] = {
    label: node.label,
    summary: node.summary,
    usage: node.usage,
    year: node.year,
  };
}

const categoryRecord = {} as PortfolioContentTranslations['constellationCategories'];
for (const cat of CONSTELLATION_CATEGORIES) {
  categoryRecord[cat] = cat;
}

export const enMYUi: UiTranslations = {
  metadata: {
    title: 'Aries Razak | Application Support & Business Systems',
    description:
      'Explore Aries Razak’s experience in application support, SaaS administration, integration configuration, and IT operations.',
  },
  accessibility: {
    skipToMain: 'Skip to main content',
    readingProgressLabel: 'Page reading progress',
    primaryNavLabel: 'Primary Navigation',
    mobileNavLabel: 'Mobile Navigation',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    languageSelectorLabel: 'Select language',
    languageChangedAnnouncement: 'Language switched to {language}.',
    backToOverview: 'Back to Overview',
    backToTop: 'Back to top',
    copyEmailLabel: 'Copy email address to clipboard',
    copyCaseLinkLabel: 'Copy shareable link to {title}',
    openInNewTabLabel: 'Open {label} in new tab',
  },
  common: {
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    urlUpdated: 'URL Updated',
    tools: 'Tools:',
    scope: 'Scope:',
    retry: 'Retry',
    loading: 'Loading...',
    loadingView: 'Loading {view}...',
    errorBoundaryTitle: 'Unable to load this section',
    errorBoundaryDescription:
      'An unexpected error interrupted loading this view. You can retry loading it or return to the main overview.',
  },
  navigation: {
    work: 'Work',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    resume: 'Résumé',
    languageHeading: 'Language',
  },
  hero: {
    viewCaseStudies: 'View Case Studies',
    viewResume: 'View Résumé',
    currentRoleTerm: 'Current Role',
    currentRoleFormat: '{role} at {company}',
    locationTerm: 'Location',
    certificationTerm: 'Certification',
    certificationName: 'AWS Certified Cloud Practitioner',
    workflowCaption: 'Illustrative support diagram',
    coreFocus: 'Core Focus',
    coreFocusTitle: 'Business Applications & SaaS',
    nodes: {
      users: { label: 'Users', detail: 'Support and adoption' },
      access: { label: 'Access', detail: 'Onboarding and offboarding' },
      integrations: { label: 'Integrations', detail: 'Configuration and sync' },
      vendors: { label: 'Vendors', detail: 'Incident coordination' },
    },
    replayAnimation: 'Replay animation',
    triageFlowLabel: 'Example triage flow',
    triageSteps: [
      'Confirm symptoms',
      'Check relevant settings',
      'Resolve or escalate',
      'Verify status',
    ],
    diagramDisclaimer:
      'Simplified conceptual illustration. Actual paths depend on the issue and whether vendor-side investigation is required.',
  },
  caseStudies: {
    eyebrow: 'Case Studies',
    heading: 'Selected Work',
    intro:
      'Case studies on SaaS migration, delivery-platform integrations, incident triage, new-site IT setup, and promotion imports.',
    illustrativeMigration: 'Illustration of the migration between platforms',
    caseLabelPrefix: 'Case {number}',
    contextLabel: 'Context',
    myRoleLabel: 'My role',
    actionsTakenLabel: 'Actions taken',
    checksPerformedLabel: 'Checks performed',
    providedToVendorLabel: 'Provided to vendor',
    vendorScopeLabel: 'Vendor investigation scope',
    toolsUsedLabel: 'Tools used',
    workflowLabel: 'Integration workflow',
    copyLink: 'Copy Link',
    copied: 'Copied',
    urlUpdated: 'URL Updated',
    viewCaseStudy: 'View Case Study',
    collapse: 'Collapse',
    copiedAnnouncement: 'Shareable link for {title} copied to clipboard.',
    copyFallbackAnnouncement: 'Could not copy automatically. Browser URL updated to #{id}.',
  },
  experience: {
    eyebrow: 'Work & Internship History',
    heading: 'Experience',
    intro:
      'My experience across application support, business systems, IT operations, and application development.',
    currentRoleBadge: 'Current Role',
    internshipBadge: 'Diploma Internship',
    workExperienceBadge: 'Work Experience',
    details: 'Details',
    hide: 'Hide',
  },
  skills: {
    eyebrow: 'Capabilities',
    heading: 'Skills',
    intro:
      'Core practical areas applied across application support, SaaS administration, integration configuration, and site operations.',
    atlasPrompt: 'Want to inspect how these tools connect across roles?',
    openAtlasCta: 'Open Skill Atlas in Interactive Lab',
  },
  credentials: {
    eyebrow: 'Foundations & Credentials',
    heading: 'Education & Credentials',
    educationBadge: 'Education',
    selfStudyBadge: 'Self-study',
  },
  interactiveLab: {
    eyebrow: 'Explorations',
    heading: 'Interactive Lab',
    intro:
      'Interactive tools and educational walkthroughs you can open anytime alongside my case studies and résumé.',
    items: {
      shell: {
        title: 'Portfolio Shell',
        description: 'Explore my profile through simple commands.',
        cta: 'Open Shell',
      },
      atlas: {
        title: 'Skill Atlas',
        description: 'Explore connections between my skills and experience.',
        cta: 'Open Skill Atlas',
      },
      lab: {
        title: 'Computing Lab',
        description: 'Try small educational simulations.',
        cta: 'Open Lab',
      },
      walkthrough: {
        title: 'Beep to Receipt',
        description: 'Explore an illustrative transaction workflow.',
        cta: 'Open Walkthrough',
      },
    },
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Let’s talk about how I can support your team.',
    sendEmail: 'Send Email',
    viewResume: 'View Résumé',
    directEmailLabel: 'Direct Email',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    copyErrorNotice: 'Copy failed automatically. Please select or click {email}.',
    copySuccessAnnouncement: 'Email copied to clipboard: {email}',
    copyErrorAnnouncement: 'Unable to copy automatically. Email address is {email}',
    linkedInLabel: 'LinkedIn',
    linkedInValue: 'Aries Razak Profile',
    open: 'Open',
  },
  footer: {
    email: 'Email',
    linkedIn: 'LinkedIn',
    resume: 'Résumé',
    printableSummary: 'Printable Summary',
    top: 'Top',
  },
  resume: {
    dialogTitleLabel: 'Résumé',
    headerLabel: 'Résumé',
    headerSubtitle: 'Selectable & Printable View',
    languageTagPrefix: 'Language: {language}',
    printSavePdf: 'Print / Save PDF',
    closeAriaLabel: 'Close résumé viewer',
    printableSummaryHeader: 'Printable Summary · {name}',
    linkedInProfile: 'LinkedIn Profile',
    summaryHeading: 'Summary',
    experienceHeading: 'Experience',
    coreSkillsHeading: 'Core Skills',
    educationHeading: 'Education',
    credentialsLearningHeading: 'Credentials & Learning',
  },
  commandPalette: {
    dialogLabel: 'Command navigation palette',
    searchPlaceholder:
      'Jump to Work, Experience, Skills, Credentials, Interactive Lab, Contact...',
    searchInputAriaLabel: 'Search sections, commands, or skills',
    clearSearch: 'Clear search',
    closeLabel: 'Close command palette',
    emptyState: 'No matching destination found for "{query}".',
    footerNavigate: 'Navigate',
    footerOpen: 'Open',
    footerClose: 'Close',
    footerSkillsCount: '{count} Skills · ⌘K / Ctrl+K',
    categories: {
      Navigation: 'Navigation',
      'Perspectives & Tools': 'Perspectives & Tools',
      Skills: 'Skills',
      Actions: 'Actions',
    },
    actions: {
      home: { label: 'Home', sublabel: 'Overview, intro, and hero' },
      work: {
        label: 'Work (Case Studies)',
        sublabel: 'Selected Work & {count} support case studies',
      },
      experience: {
        label: 'Experience',
        sublabel: 'Work & diploma internship timeline ({count} entries)',
      },
      skills: { label: 'Skills', sublabel: 'Core capabilities across 4 groups' },
      credentials: {
        label: 'Education & Credentials',
        sublabel: 'UiTM Diploma, AWS Certified Cloud Practitioner, and UiPath study',
      },
      workbenches: {
        label: 'Interactive Lab',
        sublabel: 'Portfolio Shell, Skill Atlas, Computing Lab & Beep to Receipt',
      },
      contact: {
        label: 'Contact',
        sublabel: 'Direct email, LinkedIn, and résumé access',
      },
      resume: { label: 'View Résumé', sublabel: 'Open printable résumé preview' },
      terminal: {
        label: 'Open Portfolio Shell',
        sublabel: 'Run commands: help, about, skills, experience, projects',
      },
      trace: {
        label: 'Beep to Receipt (Illustrative Walkthrough)',
        sublabel: 'Educational model of how a retail checkout works across 6 layers',
      },
      atlas: { label: 'Full Skill Atlas', sublabel: '{count} capabilities across 4 tracks' },
      plain: {
        label: 'Printable Summary',
        sublabel: 'Unified high-contrast printable résumé view',
      },
      receipt: {
        label: 'Summary Receipt',
        sublabel: 'Optional printable experience and education receipt view',
      },
      layerPrefix: 'Layer 0{index}: {title}',
      copyEmail: {
        label: 'Copy Email ({email})',
        copied: 'Email Copied!',
        failed: 'Copy failed automatically ({email})',
        sublabel: 'Copy contact email to clipboard',
      },
      toggleAudio: {
        enable: 'Enable Audio Cues',
        mute: 'Mute Audio Cues',
        sublabel: 'Subtle user-triggered sound cues in lab & shell',
      },
      linkedIn: { label: 'Open LinkedIn Profile', sublabel: 'External LinkedIn profile' },
    },
  },
  terminal: {
    dialogLabel: 'Interactive Portfolio Shell',
    headerTitle: 'Portfolio Shell · Read-Only Demo',
    resetAria: 'Reset shell output',
    closeAria: 'Close portfolio shell dialog',
    quickRun: 'Quick run:',
    placeholder: "type 'help' and press Enter...",
    run: 'Run',
    welcomeHeader: '{name} Portfolio Shell (Read-Only Demo)',
    welcomeBody:
      'Type "help" or click a command below to inspect roles, skills, case studies, or contact details.',
    helpTitle: 'Supported commands:',
    helpCommands: {
      about: 'Background and target roles',
      skills: 'Core capabilities across 4 groups',
      experience: 'Work and diploma internship history',
      projects: 'Featured case studies',
      education: 'UiTM diploma and credentials',
      learning: 'Current study (UiPath & RPA)',
      contact: 'Email, LinkedIn, and location',
      beep: 'Illustrative checkout beep step example',
      resume: 'Open résumé preview',
      clear: 'Reset output',
    },
    labels: {
      focus: 'Focus: {title}',
      current: 'Current: {role} at {company}',
      summary: 'Summary: {intro}',
      experienceHeader: 'Experience & Diploma Internship ({count} Entries):',
      skillsHeader: 'Core Skills Across 4 Groups:',
      projectsHeader: 'Case Studies ({count}):',
      educationHeader: 'Education & Credentials:',
      learningHeader: 'Current Learning:',
      contactHeader: 'Direct Contact:',
      email: 'Email',
      linkedIn: 'LinkedIn',
      location: 'Location',
      beepHeader: '[ILLUSTRATIVE EXAMPLE] Conceptual Checkout Flow',
      beepOutput: 'Scanner input -> Item lookup -> Promo check -> Sample receipt output.',
      openingResume: 'Opening résumé preview...',
      resumeHint: 'Use the Résumé button in the navigation bar.',
      unknownCommand: 'Unknown command: "{command}". Try one of: {commands}.',
      currentInOrg: '{role} at {company}',
    },
  },
  atlas: {
    eyebrow: 'Skills & Experience Map',
    title: 'The Skill Atlas',
    subtitle:
      'Browse all {count} documented capabilities, internship & credential items, and active learning areas in list or graph format.',
    listView: 'Structured List',
    listViewAria: 'Switch to Accessible List Tree View',
    graphView: 'Atlas Graph',
    graphViewAria: 'Switch to 2D Graph Canvas View',
    searchPlaceholder: 'Search skills...',
    clearSearch: 'Clear search query',
    searchAriaLabel: 'Search Atlas skills by title or summary',
    allLayers: 'All Layers (1 to 6)',
    layerFilterAria: 'Filter skills by layer',
    layerOption: 'Layer {index}: {title}',
    allLevels: 'All Levels',
    levelFilterAria: 'Filter skills by experience level',
    showing: 'Showing:',
    itemsCount: '{shown} of {total} Items',
    graphAriaLabel: 'Atlas topology graph canvas',
    treeAriaLabel: 'Atlas Skills Tree',
    inspectorAriaLabel: 'Skill Details Inspector',
    detailView: 'DETAIL VIEW',
    supportingContext: 'Supporting Context',
    whereApplied: 'Where Applied',
    viewLabel: 'View',
    viewWalkthroughLayer: 'View Related Walkthrough Layer',
    connectedSkills: 'Connected Skills ({count})',
    noConnections: 'No active connections in current filter.',
    emptySelection: 'Select any skill item to inspect details.',
    announcedSelect: 'Inspecting {label}. {summary}',
    announcedInitialSelect: 'Selected node: {label}, status: {status}',
  },
  trace: {
    eyebrow: '{name} · Educational Walkthrough',
    titleMain: 'Beep to Receipt:',
    titleSub: 'an educational walkthrough across 6 layers.',
    outputView: 'Output View',
    printable: 'PRINTABLE',
    receiptTitle: 'Summary Receipt',
    receiptDesc:
      'Full work history, education, credentials, and contact links formatted as a printable receipt view.',
    openSummaryReceipt: 'Open Summary Receipt',
    disclaimerTitle: 'Illustrative Walkthrough:',
    disclaimerBody:
      'The six layers below provide an educational model of how a retail barcode scan can travel across hardware, software, networks, and people. Not every transaction system uses this exact sequence, and simulated examples do not depict any employer’s production architecture.',
    layersEyebrow: '6 Illustrative Computing Layers',
    layersHeading: 'From Scan Input to Printed Receipt',
    layersHelp:
      'Select a layer below to inspect conceptual steps and related areas from my experience.',
    navAriaLabel: 'Checkout layer step navigation',
    layerPrefix: 'Layer {index}',
    illustrativeConcept: 'ILLUSTRATIVE CONCEPT',
    interactiveSimPrompt: 'Interactive Simulation: Inspect sample packet hops in the browser',
    openComputingLab: 'Open Computing Lab',
    relatedSkillsLabel: 'Related Skills in This Layer ({count})',
    selectToOpenAtlas: 'Select to open in Skill Atlas',
    whereApplied: 'Where Applied:',
    inspect: 'Inspect',
    relatedCaseStudy: 'Related Case Study',
    less: 'Less',
    details: 'Details',
    workflowLabel: 'Integration Workflow',
    myResponsibility: 'My Responsibility',
    whatIDid: 'What I Did',
    activeLearning: 'Active Learning',
    currentlyExploring: 'Currently Exploring',
    activeLearningDesc: 'Areas I am currently studying outside my work experience.',
    walkthroughComplete: 'Walkthrough Complete',
    receiptCtaDesc: 'Scroll down or jump directly to the printable experience summary receipt.',
    viewSummaryReceipt: 'View Summary Receipt',
    showTestReceipt: 'Print Test Receipt',
    hideTestReceipt: 'Hide Test Receipt',
    sampleReceiptHeader: 'Sample receipt',
    sampleReceiptPos: 'COUNTER POS · TEST #042',
    sampleReceiptSub: 'Illustrative Walkthrough Items',
    samplePromo: 'SAMPLE PROMO (-10%)',
    sampleSubtotal: 'SUBTOTAL',
    sampleTotal: 'TOTAL',
    sampleTender: 'TENDER: E-WALLET TEST · AUTH #0042',
    sampleFooter: 'Sample receipt · Fictional walkthrough output only',
  },
  receipt: {
    eyebrow: 'Printable Summary',
    heading: 'The Summary Receipt',
    intro:
      'Experience history, education, credentials, and direct contact info formatted as a printable receipt.',
    copyEmail: 'Copy Email',
    copied: 'Copied',
    copyEmailAria: 'Copy Aries Razak email address to clipboard',
    linkedIn: 'LinkedIn',
    linkedInAria: 'Open LinkedIn profile in new tab',
    printSavePdf: 'Print / Save PDF',
    printAria: 'Print or save summary receipt as PDF',
    copySuccess: 'Email copied to clipboard: {email}',
    copyFailed: 'Direct copy failed. Email is: {email}',
    subtitleBanner: 'SUMMARY RECEIPT · APPLICATION SUPPORT & IT OPERATIONS',
    workHistoryCol: 'WORK & INTERNSHIP HISTORY',
    periodCol: 'PERIOD',
    educationCol: 'EDUCATION & CREDENTIALS',
    statusCol: 'STATUS',
    diplomaBadge: 'Diploma',
    credentialStatusBadge: 'credential',
    completedStatusBadge: 'completed',
    totalRolesLabel: 'WORK & INTERNSHIP ENTRIES',
    rolesUnit: '0{count} ROLES',
    totalSkillsLabel: 'DOCUMENTED SKILLS',
    itemsUnit: '{count} ITEMS',
    activeLearningLabel: 'ACTIVE LEARNING',
    barcodeFooter: 'ARIES RAZAK · PORTFOLIO RECEIPT',
  },
  lab: {
    modalDialogLabel: 'Interactive Computing Lab Workbench',
    modalBadge: 'Educational Simulation',
    modalTitle: 'Interactive Computing Workbench',
    closeModal: 'Close interactive lab modal',
    loading: 'Loading Simulations...',
    badgeSimulation: '[SIMULATION]',
    eyebrowTitle: 'THE PERSONAL TECHNOLOGY LAB',
    eyebrowSub: 'BROWSER-NATIVE SANDBOX',
    heading: 'Interactive Computing Experiments & Simulations',
    intro:
      'Explore what happens beneath the interface. Step into this client-side workbench to inspect OSI Layer 2–7 packet hops, test cache eviction algorithms, and calculate UNIX permission bitmasks in real time.',
    modelsLabel: 'MODELS:',
    modelsText:
      'Deterministic OSI Layer 2–7 packet hops, RFC 793 TCP handshake flags, in-memory FIFO & LRU cache eviction cycles, and UNIX octal permission bitmasks.',
    doesNotModelLabel: 'DOES NOT MODEL:',
    doesNotModelText:
      'Live network sniffing, real server transactions, or real-time payment gateway clearance. All data is illustrative and generated locally.',
    tabs: {
      network: '01. Packet Flight',
      cache: '02. Cache (LRU / FIFO)',
      permissions: '03. UNIX Permissions',
    },
    network: {
      selectProtocol: 'SELECT PROTOCOL:',
      hopCounter: 'HOP {current} OF {total}',
      packetAt: 'PACKET AT:',
      elapsedMs: '+{ms}ms elapsed',
      dispatchPacket: 'Dispatch Packet',
      simulating: 'Simulating...',
      stepNext: 'Step Next',
      resetTooltip: 'Reset Simulation',
      speedLabel: 'SPEED:',
      inspectorHeader: 'HOP INSPECTOR TELEMETRY',
      currentNodeAction: 'CURRENT NODE ACTION:',
      payloadHeader: 'PAYLOAD HEADER',
      portLabel: 'Port: {port} · Hops traversed: {current}/{total}',
      simulationNoteTitle: 'Educational Simulation:',
      simulationNoteBody:
        'Demonstrates general packet routing, NAT translation, Ethernet switching, and protocol steps cleanly in the browser.',
      nodes: {
        client: { name: 'Terminal / Client', category: 'Endpoint Station' },
        switch: { name: 'Managed Switch', category: 'LAN / L2' },
        gateway: { name: 'Edge Gateway', category: 'NAT Router / L3' },
        dns: { name: 'DNS Resolver', category: 'Recursive 1.1.1.1' },
        proxy: { name: 'Edge WAF / Proxy', category: 'Cloud Ingress / L7' },
        backend: { name: 'App Cluster', category: 'API Server / L7' },
        database: { name: 'Database Engine', category: 'SQL Storage' },
      },
      presets: {
        'http-catalog': {
          name: 'HTTPS API Request (Store Catalog Sync)',
          description:
            'Simulates an encrypted web API request from a store checkout terminal to the central cloud catalog service.',
          hops: [
            {
              label: 'Client POS Terminal (192.168.10.42)',
              layer: 'Layer 7 (Application)',
              action: 'Formulates TLS ClientHello & serialized JSON payload',
              details:
                'Store terminal initiates connection via local TCP socket on ephemeral port 49152.',
            },
            {
              label: 'Store Local Switch',
              layer: 'Layer 2 (Data Link)',
              action: 'Ethernet Frame forwarding based on MAC address table',
              details:
                'Switch inspects destination MAC address and forwards the frame toward the router uplink port.',
            },
            {
              label: 'Store Edge Gateway & NAT Router (192.168.10.1)',
              layer: 'Layer 3 (Network)',
              action: 'Network Address Translation (PAT) & Routing',
              details:
                'Rewrites private source IP 192.168.10.42:49152 to documentation WAN IP 198.51.100.22:51022. Selects primary broadband route.',
            },
            {
              label: 'Cloud Edge WAF & Reverse Proxy (203.0.113.84)',
              layer: 'Layer 7 (Application)',
              action: 'TLS 1.3 Termination, Rate Limiting & SSL Decryption',
              details:
                'Terminates TLS session, inspects request headers, validates API token, forwards to internal microservice.',
            },
            {
              label: 'Application Server Cluster (10.0.4.15)',
              layer: 'Layer 7 (Application)',
              action: 'PHP Laravel Kernel & Route Dispatch',
              details:
                'Resolves CatalogController@getSKUs, verifies store branch authorization, queries database read-replica.',
            },
            {
              label: 'Relational Database Engine (MySQL 8.0)',
              layer: 'Layer 7 (Application)',
              action: 'InnoDB Index Scan & Prepared Query Execution',
              details:
                'SELECT * FROM tbl_products WHERE branch_id = 18 AND is_active = 1; Returns 124 record rows in 2.1ms.',
            },
            {
              label: 'Client POS Terminal (Received 200 OK)',
              layer: 'Layer 7 (Application)',
              action: 'Response Rendered on Checkout Register Screen',
              details:
                'HTTP/2 200 OK received with 14.8KB payload. Catalog cached locally in memory.',
            },
          ],
        },
        'dns-lookup': {
          name: 'DNS Query (Demo Domain Resolution)',
          description:
            'Simulates recursive DNS resolution translating a human-friendly domain into a destination IP address.',
          hops: [
            {
              label: 'Client Workstation (192.168.10.15)',
              layer: 'Layer 7 (Application)',
              action: 'Queries local resolver stub',
              details:
                'Checks OS /etc/hosts cache; misses. Dispatches UDP packet to configured primary DNS server.',
            },
            {
              label: 'Managed Store Switch',
              layer: 'Layer 2 (Data Link)',
              action: 'Layer 2 Frame Forwarding',
              details: 'Forwarding UDP datagram frame to default gateway uplink.',
            },
            {
              label: 'Gateway Local DNS Proxy',
              layer: 'Layer 3 (Network)',
              action: 'Forwarding to Public Recursive Resolver',
              details:
                'NAT translation applied. Outgoing packet routed to Cloudflare/Google DNS resolver (1.1.1.1).',
            },
            {
              label: 'Recursive DNS Resolver (1.1.1.1)',
              layer: 'Layer 7 (Application)',
              action: 'Root Nameserver & Authoritative Zone Lookup',
              details:
                'Authoritative zone hit: catalog.retail-demo.example resolves to A-record 203.0.113.84 with TTL 300s.',
            },
            {
              label: 'Client Workstation',
              layer: 'Layer 7 (Application)',
              action: 'IP Address Cached in OS Resolver Buffer',
              details: 'Client caches IP 203.0.113.84. Ready to initiate TCP handshake.',
            },
          ],
        },
        'tcp-handshake': {
          name: 'TCP 3-Way Handshake (Connection Establishment)',
          description:
            'Simulates the reliable 3-step TCP synchronization protocol required before any HTTP/TLS data can be exchanged.',
          hops: [
            {
              label: 'Client Station',
              layer: 'Layer 4 (Transport)',
              action: 'Step 1: Dispatches TCP SYN',
              details:
                'Client sets SYN flag, chooses Initial Sequence Number (ISN=1001), advertises Window Size 65535.',
            },
            {
              label: 'Branch Gateway NAT',
              layer: 'Layer 3 (Network)',
              action: 'Stateful Connection Tracking (conntrack)',
              details: 'Creates entry in firewall connection table: SYN_SENT state recorded.',
            },
            {
              label: 'Server Endpoint (Reverse Proxy)',
              layer: 'Layer 4 (Transport)',
              action: 'Step 2: Returns TCP SYN-ACK',
              details:
                'Server receives SYN, allocates socket buffers, sets ISN=5001, ACKs client Seq+1 (1002).',
            },
            {
              label: 'Client Station',
              layer: 'Layer 4 (Transport)',
              action: 'Step 3: Dispatches TCP ACK',
              details:
                'Client ACKs server sequence (5002). Connection state transitions to ESTABLISHED. Full-duplex stream ready.',
            },
          ],
        },
        'pos-payment': {
          name: 'Payment Request Flow (Illustrative Example)',
          description:
            'Illustrative simulation of how a retail payment terminal communicates with an acquirer gateway.',
          hops: [
            {
              label: 'Sample Card Pinpad (Store Counter)',
              layer: 'Layer 7 (Application)',
              action: 'EMV Chip Read & Request Message Preparation',
              details: 'Constructs an illustrative encrypted payment authorization request payload.',
            },
            {
              label: 'Store Local Switch',
              layer: 'Layer 2 (Data Link)',
              action: 'Local Network Transport',
              details: 'Forwards frame from the counter port toward the store gateway uplink.',
            },
            {
              label: 'Store Gateway Router',
              layer: 'Layer 3 (Network)',
              action: 'Encrypted WAN Egress',
              details:
                'Routes outbound payment request over the store internet uplink to the acquirer host.',
            },
            {
              label: 'Merchant Acquirer Payment Switch',
              layer: 'Layer 7 (Application)',
              action: 'Card Scheme & Issuer Verification',
              details: 'Routes request to card network / issuer simulation and validates funds.',
            },
            {
              label: 'Sample Card Pinpad (Approved)',
              layer: 'Layer 7 (Application)',
              action: 'Approval Response Returned',
              details: 'Sample authorization approved. Receipt printer outputs slip.',
            },
          ],
        },
      },
    },
    cache: {
      eyebrow: 'ALGORITHM BENCHMARK · CAPACITY: 4 SLOTS',
      heading: 'Cache Eviction Simulator (LRU vs. FIFO)',
      intro:
        'Watch how operating systems and proxies retain hot data and evict records when capacity fills.',
      policyLabel: 'POLICY:',
      dispatchLabel: 'DISPATCH REQUEST FOR KEY (CLICK TO TRIGGER CACHE LOOKUP):',
      getPrefix: '+ GET "{key}"',
      resetCache: 'Reset Cache',
      activeSlots: 'ACTIVE MEMORY SLOTS ({used}/{capacity})',
      hitRatio: 'HIT RATIO: {ratio}% ({hits} {hitsWord} / {misses} {missesWord})',
      hitsWord: 'Hits',
      missesWord: 'Misses',
      slotPrefix: 'SLOT #{number}',
      cyclePrefix: 'CYCLE {cycle}',
      hitsLabel: 'Hits: {count}',
      nextEvict: 'Next Evict',
      emptySlot: '[EMPTY SLOT]',
      logHeader: 'CACHE OPERATION LOG STREAM:',
      howItWorksTitle: 'HOW LRU WORKS UNDER THE HOOD:',
      howItWorksBody1:
        'To achieve O(1) lookup and O(1) eviction, production LRU caches pair a Hash Map with a Doubly Linked List.',
      howItWorksBody2:
        'Accessing an item promotes it to the head. When capacity fills, the tail node is unlinked and evicted in constant time.',
      initLog: 'Cache initialized with 3 items (Capacity: 4). Policy: LRU.',
      resetLog: 'Cache reset to fresh state. Capacity 4.',
      hitLog: '[CYCLE {cycle}] HIT: Key "{key}" found in cache. Updated access metadata.',
      missLog: '[CYCLE {cycle}] MISS: Key "{key}" not present in cache.',
      evictedLruSuffix: ' Evicted "{key}" (Least Recently Used: cycle {cycle}).',
      evictedFifoSuffix: ' Evicted "{key}" (First In First Out order).',
      customValuePrefix: 'Data payload for {key}',
      defaultValues: {
        SKU_1001: 'Milk 1L (Demo Store)',
        USER_882: 'Cashier Session #4',
        TOKEN_AUTH: 'JWT Bearer Key',
      },
    },
    permissions: {
      eyebrow: 'LINUX SECURITY & ACCESS CONTROL',
      heading: 'UNIX File Permission Bitmask Calculator',
      intro:
        'Toggle read, write, and execute bits to inspect octal modes, symbolic notations, and 9-bit binary representations.',
      presetsLabel: 'PRESETS:',
      ownerLabel: 'OWNER (u)',
      groupLabel: 'GROUP (g)',
      othersLabel: 'OTHERS (o)',
      octalLabel: 'Octal: {value}',
      readLabel: 'Read (r)',
      writeLabel: 'Write (w)',
      executeLabel: 'Execute (x)',
      octalHeader: 'OCTAL NOTATION (CHMOD)',
      symbolicHeader: 'SYMBOLIC STRING (LS -L)',
      binaryHeader: '9-BIT BINARY BITMASK',
      securityTitle: 'DEFENSIVE SECURITY & LEAST PRIVILEGE:',
      securityBody:
        'OpenSSH rejects private keys with chmod 777 because any local user or service account on a shared Linux host could read the key. Setting 600 or 400 restricts read access solely to the owner.',
    },
  },
};

export const enMYContent: PortfolioContentTranslations = {
  profile: {
    title: PROFILE.title,
    currentRole: PROFILE.currentRole,
    location: PROFILE.location,
    intro: PROFILE.intro,
    resumeSummary: PROFILE.resumeSummary,
    availabilityNote: PROFILE.availabilityNote,
  },
  skillGroups: skillGroupsRecord,
  experiences: experiencesRecord,
  caseStudies: caseStudiesRecord,
  education: {
    degree: EDUCATION.degree,
    institution: EDUCATION.institution,
    period: EDUCATION.period,
    focus: EDUCATION.focus,
  },
  certifications: certificationsRecord,
  learning: learningRecord,
  evidenceMeta: {
    professional: {
      label: EVIDENCE_META.professional.label,
      description: EVIDENCE_META.professional.description,
    },
    project: {
      label: EVIDENCE_META.project.label,
      description: EVIDENCE_META.project.description,
    },
    learning: {
      label: EVIDENCE_META.learning.label,
      description: EVIDENCE_META.learning.description,
    },
  },
  constellationCategories: categoryRecord,
  strata: strataRecord,
  nodes: nodesRecord,
  edges: EDGES.map((e) => e.reason),
};

export const enMYBundle: LocaleBundle = {
  meta: {
    code: 'en-MY',
    nativeLabel: 'English',
    englishName: 'English',
    htmlLang: 'en-MY',
    dir: 'ltr',
  },
  ui: enMYUi,
  content: enMYContent,
};
