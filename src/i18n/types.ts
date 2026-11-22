import type {
  ConstellationCategory,
  EvidenceStatus,
  StratumType,
} from '../data/universeContent';

export type SupportedLocale = 'en-MY' | 'ms-MY' | 'zh-Hans-MY' | 'ta-MY';

export interface LocaleMeta {
  code: SupportedLocale;
  nativeLabel: string;
  englishName: string;
  htmlLang: SupportedLocale;
  dir: 'ltr';
}

export interface UiTranslations {
  metadata: {
    title: string;
    description: string;
  };
  accessibility: {
    skipToMain: string;
    readingProgressLabel: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    openMenu: string;
    closeMenu: string;
    languageSelectorLabel: string;
    languageChangedAnnouncement: string;
    backToOverview: string;
    backToTop: string;
    copyEmailLabel: string;
    copyCaseLinkLabel: string;
    openInNewTabLabel: string;
  };
  common: {
    close: string;
    copy: string;
    copied: string;
    copyFailed: string;
    urlUpdated: string;
    tools: string;
    scope: string;
    retry: string;
    loading: string;
    loadingView: string;
    errorBoundaryTitle: string;
    errorBoundaryDescription: string;
  };
  navigation: {
    work: string;
    experience: string;
    skills: string;
    contact: string;
    resume: string;
    languageHeading: string;
  };
  hero: {
    viewCaseStudies: string;
    viewResume: string;
    currentRoleTerm: string;
    currentRoleFormat: string;
    locationTerm: string;
    certificationTerm: string;
    certificationName: string;
    workflowCaption: string;
    coreFocus: string;
    coreFocusTitle: string;
    nodes: {
      users: { label: string; detail: string };
      access: { label: string; detail: string };
      integrations: { label: string; detail: string };
      vendors: { label: string; detail: string };
    };
    replayAnimation: string;
    triageFlowLabel: string;
    triageSteps: [string, string, string, string];
    diagramDisclaimer: string;
  };
  caseStudies: {
    eyebrow: string;
    heading: string;
    intro: string;
    illustrativeMigration: string;
    caseLabelPrefix: string;
    contextLabel: string;
    myRoleLabel: string;
    actionsTakenLabel: string;
    checksPerformedLabel: string;
    providedToVendorLabel: string;
    vendorScopeLabel: string;
    toolsUsedLabel: string;
    workflowLabel: string;
    copyLink: string;
    copied: string;
    urlUpdated: string;
    viewCaseStudy: string;
    collapse: string;
    copiedAnnouncement: string;
    copyFallbackAnnouncement: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    intro: string;
    currentRoleBadge: string;
    internshipBadge: string;
    workExperienceBadge: string;
    details: string;
    hide: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    intro: string;
    atlasPrompt: string;
    openAtlasCta: string;
  };
  credentials: {
    eyebrow: string;
    heading: string;
    educationBadge: string;
    selfStudyBadge: string;
  };
  interactiveLab: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: {
      shell: { title: string; description: string; cta: string };
      atlas: { title: string; description: string; cta: string };
      lab: { title: string; description: string; cta: string };
      walkthrough: { title: string; description: string; cta: string };
    };
  };
  contact: {
    eyebrow: string;
    heading: string;
    sendEmail: string;
    viewResume: string;
    directEmailLabel: string;
    copy: string;
    copied: string;
    copyFailed: string;
    copyErrorNotice: string;
    copySuccessAnnouncement: string;
    copyErrorAnnouncement: string;
    linkedInLabel: string;
    linkedInValue: string;
    open: string;
  };
  footer: {
    email: string;
    linkedIn: string;
    resume: string;
    printableSummary: string;
    top: string;
  };
  resume: {
    dialogTitleLabel: string;
    headerLabel: string;
    headerSubtitle: string;
    languageTagPrefix: string;
    printSavePdf: string;
    closeAriaLabel: string;
    printableSummaryHeader: string;
    linkedInProfile: string;
    summaryHeading: string;
    experienceHeading: string;
    coreSkillsHeading: string;
    educationHeading: string;
    credentialsLearningHeading: string;
  };
  commandPalette: {
    dialogLabel: string;
    searchPlaceholder: string;
    searchInputAriaLabel: string;
    clearSearch: string;
    closeLabel: string;
    emptyState: string;
    footerNavigate: string;
    footerOpen: string;
    footerClose: string;
    footerSkillsCount: string;
    categories: {
      Navigation: string;
      'Perspectives & Tools': string;
      Skills: string;
      Actions: string;
    };
    actions: {
      home: { label: string; sublabel: string };
      work: { label: string; sublabel: string };
      experience: { label: string; sublabel: string };
      skills: { label: string; sublabel: string };
      credentials: { label: string; sublabel: string };
      workbenches: { label: string; sublabel: string };
      contact: { label: string; sublabel: string };
      resume: { label: string; sublabel: string };
      terminal: { label: string; sublabel: string };
      trace: { label: string; sublabel: string };
      atlas: { label: string; sublabel: string };
      plain: { label: string; sublabel: string };
      receipt: { label: string; sublabel: string };
      layerPrefix: string;
      copyEmail: { label: string; copied: string; failed: string; sublabel: string };
      toggleAudio: { enable: string; mute: string; sublabel: string };
      linkedIn: { label: string; sublabel: string };
    };
  };
  terminal: {
    dialogLabel: string;
    headerTitle: string;
    resetAria: string;
    closeAria: string;
    quickRun: string;
    placeholder: string;
    run: string;
    welcomeHeader: string;
    welcomeBody: string;
    helpTitle: string;
    helpCommands: Record<string, string>;
    labels: {
      focus: string;
      current: string;
      summary: string;
      experienceHeader: string;
      skillsHeader: string;
      projectsHeader: string;
      educationHeader: string;
      learningHeader: string;
      contactHeader: string;
      email: string;
      linkedIn: string;
      location: string;
      beepHeader: string;
      beepOutput: string;
      openingResume: string;
      resumeHint: string;
      unknownCommand: string;
      currentInOrg: string;
    };
  };
  atlas: {
    eyebrow: string;
    title: string;
    subtitle: string;
    listView: string;
    listViewAria: string;
    graphView: string;
    graphViewAria: string;
    searchPlaceholder: string;
    clearSearch: string;
    searchAriaLabel: string;
    allLayers: string;
    layerFilterAria: string;
    layerOption: string;
    allLevels: string;
    levelFilterAria: string;
    showing: string;
    itemsCount: string;
    graphAriaLabel: string;
    treeAriaLabel: string;
    inspectorAriaLabel: string;
    detailView: string;
    supportingContext: string;
    whereApplied: string;
    viewLabel: string;
    viewWalkthroughLayer: string;
    connectedSkills: string;
    noConnections: string;
    emptySelection: string;
    announcedSelect: string;
    announcedInitialSelect: string;
  };
  trace: {
    eyebrow: string;
    titleMain: string;
    titleSub: string;
    outputView: string;
    printable: string;
    receiptTitle: string;
    receiptDesc: string;
    openSummaryReceipt: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    layersEyebrow: string;
    layersHeading: string;
    layersHelp: string;
    navAriaLabel: string;
    layerPrefix: string;
    illustrativeConcept: string;
    interactiveSimPrompt: string;
    openComputingLab: string;
    relatedSkillsLabel: string;
    selectToOpenAtlas: string;
    whereApplied: string;
    inspect: string;
    relatedCaseStudy: string;
    less: string;
    details: string;
    workflowLabel: string;
    myResponsibility: string;
    whatIDid: string;
    activeLearning: string;
    currentlyExploring: string;
    activeLearningDesc: string;
    walkthroughComplete: string;
    receiptCtaDesc: string;
    viewSummaryReceipt: string;
    showTestReceipt: string;
    hideTestReceipt: string;
    sampleReceiptHeader: string;
    sampleReceiptPos: string;
    sampleReceiptSub: string;
    samplePromo: string;
    sampleSubtotal: string;
    sampleTotal: string;
    sampleTender: string;
    sampleFooter: string;
  };
  receipt: {
    eyebrow: string;
    heading: string;
    intro: string;
    copyEmail: string;
    copied: string;
    copyEmailAria: string;
    linkedIn: string;
    linkedInAria: string;
    printSavePdf: string;
    printAria: string;
    copySuccess: string;
    copyFailed: string;
    subtitleBanner: string;
    workHistoryCol: string;
    periodCol: string;
    educationCol: string;
    statusCol: string;
    diplomaBadge: string;
    credentialStatusBadge: string;
    completedStatusBadge: string;
    totalRolesLabel: string;
    rolesUnit: string;
    totalSkillsLabel: string;
    itemsUnit: string;
    activeLearningLabel: string;
    barcodeFooter: string;
  };
  lab: {
    modalDialogLabel: string;
    modalBadge: string;
    modalTitle: string;
    closeModal: string;
    loading: string;
    badgeSimulation: string;
    eyebrowTitle: string;
    eyebrowSub: string;
    heading: string;
    intro: string;
    modelsLabel: string;
    modelsText: string;
    doesNotModelLabel: string;
    doesNotModelText: string;
    tabs: {
      network: string;
      cache: string;
      permissions: string;
    };
    network: {
      selectProtocol: string;
      hopCounter: string;
      packetAt: string;
      elapsedMs: string;
      dispatchPacket: string;
      simulating: string;
      stepNext: string;
      resetTooltip: string;
      speedLabel: string;
      inspectorHeader: string;
      currentNodeAction: string;
      payloadHeader: string;
      portLabel: string;
      simulationNoteTitle: string;
      simulationNoteBody: string;
      nodes: Record<string, { name: string; category: string }>;
      presets: Record<
        string,
        {
          name: string;
          description: string;
          hops: Array<{ label: string; layer: string; action: string; details: string }>;
        }
      >;
    };
    cache: {
      eyebrow: string;
      heading: string;
      intro: string;
      policyLabel: string;
      dispatchLabel: string;
      getPrefix: string;
      resetCache: string;
      activeSlots: string;
      hitRatio: string;
      hitsWord: string;
      missesWord: string;
      slotPrefix: string;
      cyclePrefix: string;
      hitsLabel: string;
      nextEvict: string;
      emptySlot: string;
      logHeader: string;
      howItWorksTitle: string;
      howItWorksBody1: string;
      howItWorksBody2: string;
      initLog: string;
      resetLog: string;
      hitLog: string;
      missLog: string;
      evictedLruSuffix: string;
      evictedFifoSuffix: string;
      customValuePrefix: string;
      defaultValues: Record<string, string>;
    };
    permissions: {
      eyebrow: string;
      heading: string;
      intro: string;
      presetsLabel: string;
      ownerLabel: string;
      groupLabel: string;
      othersLabel: string;
      octalLabel: string;
      readLabel: string;
      writeLabel: string;
      executeLabel: string;
      octalHeader: string;
      symbolicHeader: string;
      binaryHeader: string;
      securityTitle: string;
      securityBody: string;
    };
  };
}

export interface PortfolioContentTranslations {
  profile: {
    title: string;
    currentRole: string;
    location: string;
    intro: string;
    resumeSummary: string;
    availabilityNote: string;
  };
  skillGroups: Record<string, { title: string; items: string[] }>;
  experiences: Record<
    string,
    {
      role: string;
      organization: string;
      period: string;
      compactPeriod: string;
      location: string;
      summary: string;
      highlights: string[];
      technologies: string[];
    }
  >;
  caseStudies: Record<
    string,
    {
      title: string;
      organization: string;
      roleScope: string;
      summaryLine: string;
      workflowSteps?: string[];
      situation: string;
      responsibility: string;
      whatIDid: string[];
      triageBreakdown?: {
        checksPerformed: string[];
        providedToVendor: string[];
        vendorInvestigation: string[];
      };
      outcomeLabel: string;
      outcome: string;
      technologies: string[];
    }
  >;
  education: {
    degree: string;
    institution: string;
    period: string;
    focus: string;
  };
  certifications: Record<
    string,
    {
      name: string;
      issuer: string;
      kindLabel: string;
      note: string;
    }
  >;
  learning: Record<
    string,
    {
      topic: string;
      status: string;
      note: string;
    }
  >;
  evidenceMeta: Record<EvidenceStatus, { label: string; description: string }>;
  constellationCategories: Record<ConstellationCategory, string>;
  strata: Record<
    StratumType,
    {
      title: string;
      subtitle: string;
      description: string;
      exampleStage: string;
      examplePayload: string;
      whatHappensConceptually: string;
      exampleComponents: string[];
    }
  >;
  nodes: Record<
    string,
    {
      label: string;
      summary: string;
      usage?: string;
      year?: string;
    }
  >;
  edges: string[];
}

export interface LocaleBundle {
  meta: LocaleMeta;
  ui: UiTranslations;
  content: PortfolioContentTranslations;
}
