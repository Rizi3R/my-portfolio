import type { LocaleBundle, PortfolioContentTranslations, UiTranslations } from '../types';

export const msMYUi: UiTranslations = {
  metadata: {
    title: 'Aries Razak | Sokongan Aplikasi & Sistem Perniagaan',
    description:
      'Terokai pengalaman Aries Razak dalam sokongan aplikasi, pentadbiran SaaS, konfigurasi integrasi, dan operasi IT.',
  },
  accessibility: {
    skipToMain: 'Terus ke kandungan utama',
    readingProgressLabel: 'Kemajuan bacaan halaman',
    primaryNavLabel: 'Navigasi Utama',
    mobileNavLabel: 'Navigasi Mudah Alih',
    openMenu: 'Buka menu navigasi',
    closeMenu: 'Tutup menu navigasi',
    languageSelectorLabel: 'Pilih bahasa',
    languageChangedAnnouncement: 'Bahasa ditukar ke {language}.',
    backToOverview: 'Kembali ke Gambaran Keseluruhan',
    backToTop: 'Kembali ke atas',
    copyEmailLabel: 'Salin alamat e-mel ke papan klip',
    copyCaseLinkLabel: 'Salin pautan boleh kongsi untuk {title}',
    openInNewTabLabel: 'Buka {label} dalam tab baharu',
  },
  common: {
    close: 'Tutup',
    copy: 'Salin',
    copied: 'Disalin',
    copyFailed: 'Gagal disalin',
    urlUpdated: 'URL Dikemas Kini',
    tools: 'Alatan:',
    scope: 'Skop:',
    retry: 'Cuba Semula',
    loading: 'Memuatkan...',
    loadingView: 'Memuatkan {view}...',
    errorBoundaryTitle: 'Tidak dapat memuatkan bahagian ini',
    errorBoundaryDescription:
      'Ralat tidak dijangka telah mengganggu pemuatan paparan ini. Anda boleh cuba semula atau kembali ke gambaran keseluruhan.',
  },
  navigation: {
    work: 'Hasil Kerja',
    experience: 'Pengalaman',
    skills: 'Kemahiran',
    contact: 'Hubungi',
    resume: 'Resume',
    languageHeading: 'Bahasa',
  },
  hero: {
    viewCaseStudies: 'Lihat Kajian Kes',
    viewResume: 'Lihat Resume',
    currentRoleTerm: 'Jawatan Semasa',
    currentRoleFormat: '{role} di {company}',
    locationTerm: 'Lokasi',
    certificationTerm: 'Pensijilan',
    certificationName: 'AWS Certified Cloud Practitioner',
    workflowCaption: 'Rajah ilustrasi sokongan',
    coreFocus: 'Tumpuan Utama',
    coreFocusTitle: 'Aplikasi Perniagaan & SaaS',
    nodes: {
      users: { label: 'Pengguna', detail: 'Sokongan dan penggunaan' },
      access: { label: 'Akses', detail: 'Penyediaan dan penamatan akses' },
      integrations: { label: 'Integrasi', detail: 'Konfigurasi dan penyegerakan' },
      vendors: { label: 'Vendor', detail: 'Penyelarasan insiden' },
    },
    replayAnimation: 'Main semula animasi',
    triageFlowLabel: 'Contoh aliran saringan isu',
    triageSteps: [
      'Sahkan simptom',
      'Semak tetapan berkaitan',
      'Selesaikan atau eskalasi',
      'Sahkan status',
    ],
    diagramDisclaimer:
      'Ilustrasi konsep ringkas. Laluan sebenar bergantung pada jenis isu dan sama ada siasatan pihak vendor diperlukan.',
  },
  caseStudies: {
    eyebrow: 'Kajian Kes',
    heading: 'Hasil Kerja Terpilih',
    intro:
      'Kajian kes tentang migrasi SaaS, integrasi platform penghantaran, saringan insiden, penyediaan IT cawangan baharu dan import promosi.',
    illustrativeMigration: 'Ilustrasi migrasi antara platform',
    caseLabelPrefix: 'Kes {number}',
    contextLabel: 'Konteks',
    myRoleLabel: 'Peranan saya',
    actionsTakenLabel: 'Tindakan yang diambil',
    checksPerformedLabel: 'Semakan yang dijalankan',
    providedToVendorLabel: 'Maklumat diberi kepada vendor',
    vendorScopeLabel: 'Skop siasatan vendor',
    toolsUsedLabel: 'Alatan digunakan',
    workflowLabel: 'Aliran kerja integrasi',
    copyLink: 'Salin Pautan',
    copied: 'Disalin',
    urlUpdated: 'URL Dikemas Kini',
    viewCaseStudy: 'Lihat Kajian Kes',
    collapse: 'Tutup',
    copiedAnnouncement: 'Pautan boleh kongsi untuk {title} telah disalin ke papan klip.',
    copyFallbackAnnouncement:
      'Tidak dapat disalin secara automatik. URL pelayar dikemas kini ke #{id}.',
  },
  experience: {
    eyebrow: 'Sejarah Kerja & Latihan Industri',
    heading: 'Pengalaman',
    intro:
      'Pengalaman saya merangkumi sokongan aplikasi, sistem perniagaan, operasi IT, dan pembangunan aplikasi.',
    currentRoleBadge: 'Jawatan Semasa',
    internshipBadge: 'Latihan Industri Diploma',
    workExperienceBadge: 'Pengalaman Kerja',
    details: 'Butiran',
    hide: 'Sembunyikan',
  },
  skills: {
    eyebrow: 'Keupayaan',
    heading: 'Kemahiran',
    intro:
      'Bidang praktikal utama yang diamalkan dalam sokongan aplikasi, pentadbiran SaaS, konfigurasi integrasi, dan operasi cawangan.',
    atlasPrompt: 'Ingin lihat bagaimana alatan ini berhubung merentasi peranan?',
    openAtlasCta: 'Buka Atlas Kemahiran di Makmal Interaktif',
  },
  credentials: {
    eyebrow: 'Asas & Kelayakan',
    heading: 'Pendidikan & Kelayakan',
    educationBadge: 'Pendidikan',
    selfStudyBadge: 'Pembelajaran kendiri',
  },
  interactiveLab: {
    eyebrow: 'Penerokaan',
    heading: 'Makmal Interaktif',
    intro:
      'Alat interaktif dan panduan pembelajaran yang boleh dibuka pada bila-bila masa di samping kajian kes dan resume saya.',
    items: {
      shell: {
        title: 'Portfolio Shell',
        description: 'Terokai profil saya melalui arahan teks ringkas.',
        cta: 'Buka Shell',
      },
      atlas: {
        title: 'Atlas Kemahiran',
        description: 'Terokai kaitan antara kemahiran dan pengalaman saya.',
        cta: 'Buka Atlas Kemahiran',
      },
      lab: {
        title: 'Makmal Pengkomputeran',
        description: 'Cuba simulasi pendidikan berskala kecil.',
        cta: 'Buka Makmal',
      },
      walkthrough: {
        title: 'Beep to Receipt',
        description: 'Terokai aliran kerja transaksi ilustrasi.',
        cta: 'Buka Panduan',
      },
    },
  },
  contact: {
    eyebrow: 'Hubungi',
    heading: 'Mari berbincang bagaimana saya boleh menyokong pasukan anda.',
    sendEmail: 'Hantar E-mel',
    viewResume: 'Lihat Resume',
    directEmailLabel: 'E-mel Terus',
    copy: 'Salin',
    copied: 'Disalin',
    copyFailed: 'Gagal disalin',
    copyErrorNotice: 'Salinan automatik gagal. Sila pilih atau klik {email}.',
    copySuccessAnnouncement: 'E-mel disalin ke papan klip: {email}',
    copyErrorAnnouncement: 'Tidak dapat disalin secara automatik. Alamat e-mel ialah {email}',
    linkedInLabel: 'LinkedIn',
    linkedInValue: 'Profil Aries Razak',
    open: 'Buka',
  },
  footer: {
    email: 'E-mel',
    linkedIn: 'LinkedIn',
    resume: 'Resume',
    printableSummary: 'Ringkasan Boleh Cetak',
    top: 'Atas',
  },
  resume: {
    dialogTitleLabel: 'Resume',
    headerLabel: 'Resume',
    headerSubtitle: 'Paparan Boleh Pilih & Cetak',
    languageTagPrefix: 'Bahasa: {language}',
    printSavePdf: 'Cetak / Simpan PDF',
    closeAriaLabel: 'Tutup pemapar resume',
    printableSummaryHeader: 'Ringkasan Boleh Cetak · {name}',
    linkedInProfile: 'Profil LinkedIn',
    summaryHeading: 'Ringkasan',
    experienceHeading: 'Pengalaman',
    coreSkillsHeading: 'Kemahiran Teras',
    educationHeading: 'Pendidikan',
    credentialsLearningHeading: 'Kelayakan & Pembelajaran',
  },
  commandPalette: {
    dialogLabel: 'Palet navigasi arahan',
    searchPlaceholder:
      'Lompat ke Hasil Kerja, Pengalaman, Kemahiran, Kelayakan, Makmal Interaktif, Hubungi...',
    searchInputAriaLabel: 'Cari bahagian, arahan, atau kemahiran',
    clearSearch: 'Kosongkan carian',
    closeLabel: 'Tutup palet arahan',
    emptyState: 'Tiada destinasi sepadan ditemui untuk "{query}".',
    footerNavigate: 'Navigasi',
    footerOpen: 'Buka',
    footerClose: 'Tutup',
    footerSkillsCount: '{count} Kemahiran · ⌘K / Ctrl+K',
    categories: {
      Navigation: 'Navigasi',
      'Perspectives & Tools': 'Perspektif & Alatan',
      Skills: 'Kemahiran',
      Actions: 'Tindakan',
    },
    actions: {
      home: { label: 'Utama', sublabel: 'Gambaran keseluruhan, pengenalan, dan bahagian utama' },
      work: {
        label: 'Hasil Kerja (Kajian Kes)',
        sublabel: 'Hasil Kerja Terpilih & {count} kajian kes sokongan',
      },
      experience: {
        label: 'Pengalaman',
        sublabel: 'Garis masa kerja & latihan industri diploma ({count} entri)',
      },
      skills: { label: 'Kemahiran', sublabel: 'Keupayaan teras merentasi 4 kumpulan' },
      credentials: {
        label: 'Pendidikan & Kelayakan',
        sublabel: 'Diploma UiTM, AWS Certified Cloud Practitioner, dan pembelajaran UiPath',
      },
      workbenches: {
        label: 'Makmal Interaktif',
        sublabel: 'Portfolio Shell, Atlas Kemahiran, Makmal Pengkomputeran & Beep to Receipt',
      },
      contact: {
        label: 'Hubungi',
        sublabel: 'E-mel terus, LinkedIn, dan akses resume',
      },
      resume: { label: 'Lihat Resume', sublabel: 'Buka pratonton resume boleh cetak' },
      terminal: {
        label: 'Buka Portfolio Shell',
        sublabel: 'Jalankan arahan: help, about, skills, experience, projects',
      },
      trace: {
        label: 'Beep to Receipt (Panduan Ilustrasi)',
        sublabel: 'Model pendidikan aliran kaunter runcit merentasi 6 lapisan',
      },
      atlas: { label: 'Atlas Kemahiran Penuh', sublabel: '{count} keupayaan merentasi 4 bidang' },
      plain: {
        label: 'Ringkasan Boleh Cetak',
        sublabel: 'Paparan resume boleh cetak kontras tinggi',
      },
      receipt: {
        label: 'Resit Ringkasan',
        sublabel: 'Paparan pilihan ringkasan pengalaman & pendidikan gaya resit',
      },
      layerPrefix: 'Lapisan 0{index}: {title}',
      copyEmail: {
        label: 'Salin E-mel ({email})',
        copied: 'E-mel Disalin!',
        failed: 'Salinan automatik gagal ({email})',
        sublabel: 'Salin e-mel hubungan ke papan klip',
      },
      toggleAudio: {
        enable: 'Aktifkan Isyarat Audio',
        mute: 'Bisukan Isyarat Audio',
        sublabel: 'Isyarat bunyi ringkas cetusan pengguna di makmal & shell',
      },
      linkedIn: { label: 'Buka Profil LinkedIn', sublabel: 'Profil LinkedIn luaran' },
    },
  },
  terminal: {
    dialogLabel: 'Portfolio Shell Interaktif',
    headerTitle: 'Portfolio Shell · Demo Baca Sahaja',
    resetAria: 'Tetapkan semula output shell',
    closeAria: 'Tutup dialog portfolio shell',
    quickRun: 'Jalan pantas:',
    placeholder: "taip 'help' dan tekan Enter...",
    run: 'Jalankan',
    welcomeHeader: 'Portfolio Shell {name} (Demo Baca Sahaja)',
    welcomeBody:
      'Taip "help" atau klik arahan di bawah untuk menyemak peranan, kemahiran, kajian kes, atau maklumat hubungan.',
    helpTitle: 'Arahan yang disokong:',
    helpCommands: {
      about: 'Latar belakang dan peranan sasaran',
      skills: 'Keupayaan teras merentasi 4 kumpulan',
      experience: 'Sejarah kerja dan latihan industri diploma',
      projects: 'Kajian kes pilihan',
      education: 'Diploma UiTM dan kelayakan',
      learning: 'Pembelajaran semasa (UiPath & RPA)',
      contact: 'E-mel, LinkedIn, dan lokasi',
      beep: 'Contoh langkah imbasan kaunter ilustrasi',
      resume: 'Buka pratonton resume',
      clear: 'Tetapkan semula paparan',
    },
    labels: {
      focus: 'Tumpuan: {title}',
      current: 'Semasa: {role} di {company}',
      summary: 'Ringkasan: {intro}',
      experienceHeader: 'Pengalaman & Latihan Industri Diploma ({count} Entri):',
      skillsHeader: 'Kemahiran Teras Merentasi 4 Kumpulan:',
      projectsHeader: 'Kajian Kes ({count}):',
      educationHeader: 'Pendidikan & Kelayakan:',
      learningHeader: 'Pembelajaran Semasa:',
      contactHeader: 'Hubungan Terus:',
      email: 'E-mel',
      linkedIn: 'LinkedIn',
      location: 'Lokasi',
      beepHeader: '[CONTOH ILUSTRASI] Aliran Konsep Daftar Keluar',
      beepOutput: 'Input pengimbas -> Carian item -> Semakan promosi -> Output contoh resit.',
      openingResume: 'Membuka pratonton resume...',
      resumeHint: 'Gunakan butang Resume di bar navigasi.',
      unknownCommand: 'Arahan tidak dikenali: "{command}". Cuba salah satu: {commands}.',
      currentInOrg: '{role} di {company}',
    },
  },
  atlas: {
    eyebrow: 'Peta Kemahiran & Pengalaman',
    title: 'Atlas Kemahiran',
    subtitle:
      'Semak kesemua {count} keupayaan terdokumentasi, latihan industri & kelayakan, serta bidang pembelajaran semasa dalam format senarai atau graf.',
    listView: 'Senarai Berstruktur',
    listViewAria: 'Tukar ke Paparan Pokok Senarai Boleh Akses',
    graphView: 'Graf Atlas',
    graphViewAria: 'Tukar ke Paparan Kanvas Graf 2D',
    searchPlaceholder: 'Cari kemahiran...',
    clearSearch: 'Kosongkan carian',
    searchAriaLabel: 'Cari kemahiran Atlas mengikut tajuk atau ringkasan',
    allLayers: 'Semua Lapisan (1 hingga 6)',
    layerFilterAria: 'Tapis kemahiran mengikut lapisan',
    layerOption: 'Lapisan {index}: {title}',
    allLevels: 'Semua Tahap',
    levelFilterAria: 'Tapis kemahiran mengikut tahap pengalaman',
    showing: 'Dipaparkan:',
    itemsCount: '{shown} daripada {total} Item',
    graphAriaLabel: 'Kanvas graf topologi Atlas',
    treeAriaLabel: 'Pokok Kemahiran Atlas',
    inspectorAriaLabel: 'Pemeriksa Butiran Kemahiran',
    detailView: 'PAPARAN BUTIRAN',
    supportingContext: 'Konteks Sokongan',
    whereApplied: 'Di Mana Digunakan',
    viewLabel: 'Lihat',
    viewWalkthroughLayer: 'Lihat Lapisan Panduan Berkaitan',
    connectedSkills: 'Kemahiran Berhubung ({count})',
    noConnections: 'Tiada sambungan aktif dalam penapis semasa.',
    emptySelection: 'Pilih mana-mana item kemahiran untuk melihat butiran.',
    announcedSelect: 'Memeriksa {label}. {summary}',
    announcedInitialSelect: 'Nod dipilih: {label}, status: {status}',
  },
  trace: {
    eyebrow: '{name} · Panduan Pendidikan',
    titleMain: 'Beep to Receipt:',
    titleSub: 'panduan pendidikan merentasi 6 lapisan.',
    outputView: 'Paparan Output',
    printable: 'BOLEH CETAK',
    receiptTitle: 'Resit Ringkasan',
    receiptDesc:
      'Sejarah kerja lengkap, pendidikan, kelayakan, dan pautan hubungan dalam format resit boleh cetak.',
    openSummaryReceipt: 'Buka Resit Ringkasan',
    disclaimerTitle: 'Panduan Ilustrasi:',
    disclaimerBody:
      'Enam lapisan di bawah menyediakan model pendidikan tentang bagaimana imbasan kod bar runcit bergerak merentasi perkakasan, perisian, rangkaian, dan pengguna. Tidak semua sistem transaksi menggunakan urutan tepat ini, dan contoh simulasi tidak menggambarkan seni bina produksi mana-mana majikan.',
    layersEyebrow: '6 Lapisan Pengkomputeran Ilustrasi',
    layersHeading: 'Daripada Imbasan Input hingga Resit Bercetak',
    layersHelp:
      'Pilih lapisan di bawah untuk melihat langkah konsep dan bidang berkaitan daripada pengalaman saya.',
    navAriaLabel: 'Navigasi langkah lapisan kaunter',
    layerPrefix: 'Lapisan {index}',
    illustrativeConcept: 'KONSEP ILUSTRASI',
    interactiveSimPrompt: 'Simulasi Interaktif: Semak contoh laluan paket dalam pelayar',
    openComputingLab: 'Buka Makmal Pengkomputeran',
    relatedSkillsLabel: 'Kemahiran Berkaitan di Lapisan Ini ({count})',
    selectToOpenAtlas: 'Pilih untuk buka dalam Atlas Kemahiran',
    whereApplied: 'Di Mana Digunakan:',
    inspect: 'Periksa',
    relatedCaseStudy: 'Kajian Kes Berkaitan',
    less: 'Kurang',
    details: 'Butiran',
    workflowLabel: 'Aliran Kerja Integrasi',
    myResponsibility: 'Tanggungjawab Saya',
    whatIDid: 'Apa yang Saya Lakukan',
    activeLearning: 'Pembelajaran Aktif',
    currentlyExploring: 'Sedang Diterokai',
    activeLearningDesc: 'Bidang yang sedang saya pelajari di luar pengalaman kerja semasa saya.',
    walkthroughComplete: 'Panduan Selesai',
    receiptCtaDesc: 'Tatal ke bawah atau terus ke resit ringkasan pengalaman boleh cetak.',
    viewSummaryReceipt: 'Lihat Resit Ringkasan',
    showTestReceipt: 'Cetak Resit Ujian',
    hideTestReceipt: 'Sembunyikan Resit Ujian',
    sampleReceiptHeader: 'Contoh resit',
    sampleReceiptPos: 'KAUNTER POS · UJIAN #042',
    sampleReceiptSub: 'Item Panduan Ilustrasi',
    samplePromo: 'CONTOH PROMOSI (-10%)',
    sampleSubtotal: 'SUBJUMLAH',
    sampleTotal: 'JUMLAH',
    sampleTender: 'BAYARAN: UJIAN E-DOMPET · AUTH #0042',
    sampleFooter: 'Contoh resit · Output panduan rekaan semata-mata',
  },
  receipt: {
    eyebrow: 'Ringkasan Boleh Cetak',
    heading: 'Resit Ringkasan',
    intro:
      'Sejarah pengalaman, pendidikan, kelayakan, dan maklumat hubungan terus diformatkan sebagai resit boleh cetak.',
    copyEmail: 'Salin E-mel',
    copied: 'Disalin',
    copyEmailAria: 'Salin alamat e-mel Aries Razak ke papan klip',
    linkedIn: 'LinkedIn',
    linkedInAria: 'Buka profil LinkedIn dalam tab baharu',
    printSavePdf: 'Cetak / Simpan PDF',
    printAria: 'Cetak atau simpan resit ringkasan sebagai PDF',
    copySuccess: 'E-mel disalin ke papan klip: {email}',
    copyFailed: 'Salinan terus gagal. E-mel ialah: {email}',
    subtitleBanner: 'RESIT RINGKASAN · SOKONGAN APLIKASI & OPERASI IT',
    workHistoryCol: 'SEJARAH KERJA & LATIHAN INDUSTRI',
    periodCol: 'TEMPOH',
    educationCol: 'PENDIDIKAN & KELAYAKAN',
    statusCol: 'STATUS',
    diplomaBadge: 'Diploma',
    credentialStatusBadge: 'kelayakan',
    completedStatusBadge: 'selesai',
    totalRolesLabel: 'ENTRI KERJA & LATIHAN INDUSTRI',
    rolesUnit: '0{count} PERANAN',
    totalSkillsLabel: 'KEMAHIRAN TERDOKUMENTASI',
    itemsUnit: '{count} ITEM',
    activeLearningLabel: 'PEMBELAJARAN AKTIF',
    barcodeFooter: 'ARIES RAZAK · RESIT PORTFOLIO',
  },
  lab: {
    modalDialogLabel: 'Meja Kerja Makmal Pengkomputeran Interaktif',
    modalBadge: 'Simulasi Pendidikan',
    modalTitle: 'Meja Kerja Pengkomputeran Interaktif',
    closeModal: 'Tutup modal makmal interaktif',
    loading: 'Memuatkan Simulasi...',
    badgeSimulation: '[SIMULASI]',
    eyebrowTitle: 'MAKMAL TEKNOLOGI PERIBADI',
    eyebrowSub: 'KOTAK PASIR PELAYAR',
    heading: 'Eksperimen & Simulasi Pengkomputeran Interaktif',
    intro:
      'Terokai apa yang berlaku di sebalik antara muka. Gunakan meja kerja sebelah klien ini untuk meneliti lompatan paket OSI Lapisan 2 hingga 7, menguji algoritma pengosongan cache, dan mengira bitmask kebenaran UNIX secara masa nyata.',
    modelsLabel: 'MEMODELKAN:',
    modelsText:
      'Lompatan paket OSI Lapisan 2 hingga 7 secara deterministik, bendera jabat tangan TCP RFC 793, kitaran cache FIFO & LRU dalam memori, dan bitmask kebenaran oktal UNIX.',
    doesNotModelLabel: 'TIDAK MEMODELKAN:',
    doesNotModelText:
      'Penghiduan rangkaian langsung, transaksi pelayan sebenar, atau pelepasan gerbang pembayaran masa nyata. Semua data adalah ilustrasi dan dijana secara setempat.',
    tabs: {
      network: '01. Laluan Paket',
      cache: '02. Cache (LRU / FIFO)',
      permissions: '03. Kebenaran UNIX',
    },
    network: {
      selectProtocol: 'PILIH PROTOKOL:',
      hopCounter: 'LOMPATAN {current} DARIPADA {total}',
      packetAt: 'PAKET DI:',
      elapsedMs: '+{ms}ms berlalu',
      dispatchPacket: 'Hantar Paket',
      simulating: 'Mensimulasi...',
      stepNext: 'Langkah Seterusnya',
      resetTooltip: 'Tetapkan Semula Simulasi',
      speedLabel: 'KELAJUAN:',
      inspectorHeader: 'TELEMETRI PEMERIKSA LOMPATAN',
      currentNodeAction: 'TINDAKAN NOD SEMASA:',
      payloadHeader: 'PENGEPALA BEBAN (PAYLOAD)',
      portLabel: 'Port: {port} · Lompatan dilalui: {current}/{total}',
      simulationNoteTitle: 'Simulasi Pendidikan:',
      simulationNoteBody:
        'Menunjukkan penghalaan paket umum, terjemahan NAT, pensuisan Ethernet, dan langkah protokol dengan jelas dalam pelayar.',
      nodes: {
        client: { name: 'Terminal / Klien', category: 'Stesen Titik Akhir' },
        switch: { name: 'Suis Terurus', category: 'LAN / L2' },
        gateway: { name: 'Gerbang Tepi', category: 'Penghala NAT / L3' },
        dns: { name: 'Penyelesai DNS', category: 'Rekursif 1.1.1.1' },
        proxy: { name: 'WAF Tepi / Proksi', category: 'Masuk Awan / L7' },
        backend: { name: 'Kluster Aplikasi', category: 'Pelayan API / L7' },
        database: { name: 'Enjin Pangkalan Data', category: 'Storan SQL' },
      },
      presets: {
        'http-catalog': {
          name: 'Permintaan API HTTPS (Segerak Katalog Kedai)',
          description:
            'Mensimulasikan permintaan API web tersulit daripada terminal kaunter kedai ke perkhidmatan katalog awan pusat.',
          hops: [
            {
              label: 'Terminal POS Klien (192.168.10.42)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Membentuk TLS ClientHello & beban JSON bersiri',
              details:
                'Terminal kedai memulakan sambungan melalui soket TCP setempat pada port sementara 49152.',
            },
            {
              label: 'Suis Setempat Kedai',
              layer: 'Lapisan 2 (Pautan Data)',
              action: 'Pemajuan bingkai Ethernet berdasarkan jadual alamat MAC',
              details:
                'Suis menyemak alamat MAC destinasi dan memajukan bingkai ke port uplink penghala.',
            },
            {
              label: 'Gerbang Tepi Kedai & Penghala NAT (192.168.10.1)',
              layer: 'Lapisan 3 (Rangkaian)',
              action: 'Terjemahan Alamat Rangkaian (PAT) & Penghalaan',
              details:
                'Menulis semula IP sumber peribadi 192.168.10.42:49152 ke IP WAN dokumentasi 198.51.100.22:51022 melalui laluan utama.',
            },
            {
              label: 'WAF Tepi Awan & Proksi Balik (203.0.113.84)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Penamatan TLS 1.3, Had Kadar & Penyahsulitan SSL',
              details:
                'Menamatkan sesi TLS, menyemak pengepala permintaan, mengesahkan token API, dan memajukan ke perkhidmatan mikro dalaman.',
            },
            {
              label: 'Kluster Pelayan Aplikasi (10.0.4.15)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Kernel PHP Laravel & Pengagihan Laluan',
              details:
                'Menyelesaikan CatalogController@getSKUs, mengesahkan kebenaran cawangan kedai, dan menanyakan replika baca pangkalan data.',
            },
            {
              label: 'Enjin Pangkalan Data Hubungan (MySQL 8.0)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Imbasan Indeks InnoDB & Pelaksanaan Kueri Tersedia',
              details:
                'SELECT * FROM tbl_products WHERE branch_id = 18 AND is_active = 1; Mengembalikan 124 baris rekod dalam 2.1ms.',
            },
            {
              label: 'Terminal POS Klien (Menerima 200 OK)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Respons Dipaparkan pada Skrin Daftar Keluar',
              details:
                'HTTP/2 200 OK diterima dengan beban 14.8KB. Katalog dicache secara setempat dalam memori.',
            },
          ],
        },
        'dns-lookup': {
          name: 'Kueri DNS (Resolusi Domain Demo)',
          description:
            'Mensimulasikan resolusi DNS rekursif yang menterjemahkan nama domain kepada alamat IP destinasi.',
          hops: [
            {
              label: 'Stesen Kerja Klien (192.168.10.15)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Menanya penyelesai stub setempat',
              details:
                'Menyemak cache /etc/hosts OS; tiada padanan. Menghantar paket UDP ke pelayan DNS utama.',
            },
            {
              label: 'Suis Kedai Terurus',
              layer: 'Lapisan 2 (Pautan Data)',
              action: 'Pemajuan Bingkai Lapisan 2',
              details: 'Memajukan bingkai datagram UDP ke uplink gerbang lalai.',
            },
            {
              label: 'Proksi DNS Setempat Gerbang',
              layer: 'Lapisan 3 (Rangkaian)',
              action: 'Memajukan ke Penyelesai Rekursif Awam',
              details:
                'Terjemahan NAT digunakan. Paket keluar dihalakan ke penyelesai DNS awam (1.1.1.1).',
            },
            {
              label: 'Penyelesai DNS Rekursif (1.1.1.1)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Carian Pelayan Nama Akar & Zon Berkuasa',
              details:
                'Rekod zon ditemui: catalog.retail-demo.example dipetakan ke rekod-A 203.0.113.84 dengan TTL 300s.',
            },
            {
              label: 'Stesen Kerja Klien',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Alamat IP Disimpan dalam Penimbal OS',
              details: 'Klien menyimpan IP 203.0.113.84. Bersedia untuk memulakan jabat tangan TCP.',
            },
          ],
        },
        'tcp-handshake': {
          name: 'Jabat Tangan 3 Hala TCP (Pembinaan Sambungan)',
          description:
            'Mensimulasikan protokol penyegerakan 3 langkah TCP yang diperlukan sebelum pertukaran data HTTP/TLS.',
          hops: [
            {
              label: 'Stesen Klien',
              layer: 'Lapisan 4 (Pengangkutan)',
              action: 'Langkah 1: Menghantar TCP SYN',
              details:
                'Klien menetapkan bendera SYN, memilih Nombor Urutan Awal (ISN=1001), dan mengiklankan saiz tetingkap 65535.',
            },
            {
              label: 'NAT Gerbang Cawangan',
              layer: 'Lapisan 3 (Rangkaian)',
              action: 'Penjejakan Sambungan Berkeadaan (conntrack)',
              details: 'Mencipta entri dalam jadual sambungan tembok api: status SYN_SENT direkod.',
            },
            {
              label: 'Titik Akhir Pelayan (Proksi Balik)',
              layer: 'Lapisan 4 (Pengangkutan)',
              action: 'Langkah 2: Memulangkan TCP SYN-ACK',
              details:
                'Pelayan menerima SYN, memperuntukkan penimbal soket, menetapkan ISN=5001, dan mengesahkan Seq+1 klien (1002).',
            },
            {
              label: 'Stesen Klien',
              layer: 'Lapisan 4 (Pengangkutan)',
              action: 'Langkah 3: Menghantar TCP ACK',
              details:
                'Klien mengesahkan urutan pelayan (5002). Status sambungan menjadi ESTABLISHED.',
            },
          ],
        },
        'pos-payment': {
          name: 'Aliran Permintaan Pembayaran (Contoh Ilustrasi)',
          description:
            'Simulasi ilustrasi bagaimana terminal pembayaran runcit berkomunikasi dengan gerbang pemeroleh.',
          hops: [
            {
              label: 'Contoh Pad Pin Kad (Kaunter Kedai)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Bacaan Cip EMV & Penyediaan Mesej Permintaan',
              details: 'Membina beban permintaan kebenaran pembayaran tersulit berbentuk ilustrasi.',
            },
            {
              label: 'Suis Setempat Kedai',
              layer: 'Lapisan 2 (Pautan Data)',
              action: 'Pengangkutan Rangkaian Setempat',
              details: 'Memajukan bingkai dari port kaunter ke arah uplink gerbang kedai.',
            },
            {
              label: 'Penghala Gerbang Kedai',
              layer: 'Lapisan 3 (Rangkaian)',
              action: 'Aliran Keluar WAN Tersulit',
              details:
                'Menghalakan permintaan pembayaran keluar melalui pautan internet kedai ke hos pemeroleh.',
            },
            {
              label: 'Suis Pembayaran Pemeroleh Pedagang',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Pengesahan Skim Kad & Pengeluar',
              details: 'Menghalakan permintaan ke simulasi rangkaian kad / pengeluar dan mengesahkan baki.',
            },
            {
              label: 'Contoh Pad Pin Kad (Diluluskan)',
              layer: 'Lapisan 7 (Aplikasi)',
              action: 'Respons Kelulusan Dipulangkan',
              details: 'Contoh kebenaran diluluskan. Pencetak resit mengeluarkan slip.',
            },
          ],
        },
      },
    },
    cache: {
      eyebrow: 'PENANDA ARAS ALGORITMA · KAPASITI: 4 SLOT',
      heading: 'Simulator Pengosongan Cache (LRU lwn. FIFO)',
      intro:
        'Lihat bagaimana sistem pengendalian dan proksi mengekalkan data kerap diakses serta mengosongkan rekod apabila kapasiti penuh.',
      policyLabel: 'POLISI:',
      dispatchLabel: 'HANTAR PERMINTAAN KUNCI (KLIK UNTUK CARIAN CACHE):',
      getPrefix: '+ GET "{key}"',
      resetCache: 'Tetapkan Semula Cache',
      activeSlots: 'SLOT MEMORI AKTIF ({used}/{capacity})',
      hitRatio: 'NISBAH HIT: {ratio}% ({hits} {hitsWord} / {misses} {missesWord})',
      hitsWord: 'Hit',
      missesWord: 'Miss',
      slotPrefix: 'SLOT #{number}',
      cyclePrefix: 'KITARAN {cycle}',
      hitsLabel: 'Hit: {count}',
      nextEvict: 'Dikeluarkan Seterusnya',
      emptySlot: '[SLOT KOSONG]',
      logHeader: 'ALIRAN LOG OPERASI CACHE:',
      howItWorksTitle: 'BAGAIMANA LRU BERFUNGSI DI SEBALIK TABIR:',
      howItWorksBody1:
        'Untuk mencapai carian O(1) dan pengosongan O(1), cache LRU produksi menggabungkan Hash Map dengan Doubly Linked List.',
      howItWorksBody2:
        'Mengakses sesuatu item menaikkan kedudukannya ke hadapan. Apabila kapasiti penuh, nod paling hujung diputuskan serta-merta.',
      initLog: 'Cache dimulakan dengan 3 item (Kapasiti: 4). Polisi: LRU.',
      resetLog: 'Cache ditetapkan semula ke keadaan asal. Kapasiti 4.',
      hitLog: '[KITARAN {cycle}] HIT: Kunci "{key}" ditemui dalam cache. Metadata akses dikemas kini.',
      missLog: '[KITARAN {cycle}] MISS: Kunci "{key}" tiada dalam cache.',
      evictedLruSuffix: ' Mengeluarkan "{key}" (Paling Lama Tidak Digunakan: kitaran {cycle}).',
      evictedFifoSuffix: ' Mengeluarkan "{key}" (Susunan Masuk Dahulu Keluar Dahulu).',
      customValuePrefix: 'Beban data untuk {key}',
      defaultValues: {
        SKU_1001: 'Susu 1L (Kedai Demo)',
        USER_882: 'Sesi Juruwang #4',
        TOKEN_AUTH: 'Kunci Bearer JWT',
      },
    },
    permissions: {
      eyebrow: 'KESELAMATAN LINUX & KAWALAN AKSES',
      heading: 'Kalkulator Bitmask Kebenaran Fail UNIX',
      intro:
        'Togol bit baca, tulis, dan laksana untuk melihat mod oktal, notasi simbolik, dan perwakilan binari 9-bit.',
      presetsLabel: 'PRATETAP:',
      ownerLabel: 'PEMILIK (u)',
      groupLabel: 'KUMPULAN (g)',
      othersLabel: 'LAIN-LAIN (o)',
      octalLabel: 'Oktal: {value}',
      readLabel: 'Baca (r)',
      writeLabel: 'Tulis (w)',
      executeLabel: 'Laksana (x)',
      octalHeader: 'NOTASI OKTAL (CHMOD)',
      symbolicHeader: 'RENTETAN SIMBOLIK (LS -L)',
      binaryHeader: 'BITMASK BINARI 9-BIT',
      securityTitle: 'KESELAMATAN DEFENSIF & KEISTIMEWAAN MINIMUM:',
      securityBody:
        'OpenSSH menolak kunci peribadi dengan chmod 777 kerana mana-mana pengguna atau akaun perkhidmatan setempat pada hos Linux kongsi boleh membaca kunci tersebut. Tetapan 600 atau 400 mengehadkan akses baca kepada pemilik sahaja.',
    },
  },
};

export const msMYContent: PortfolioContentTranslations = {
  profile: {
    title: 'Sokongan Aplikasi & Sistem Perniagaan',
    currentRole: 'System Application Specialist',
    location: 'Selangor / Kuala Lumpur, Malaysia',
    intro:
      'Saya menyelesaikan isu aplikasi perniagaan, mengurus akses pengguna, menyelaras integrasi, serta membantu pasukan menggunakan alat kerja harian mereka.',
    resumeSummary:
      'System Application Specialist berpengalaman dalam sokongan aplikasi, pentadbiran sistem perniagaan, penyediaan akaun dan penamatan akses pengguna, konfigurasi integrasi platform penghantaran pihak ketiga, dan penyediaan IT cawangan baharu. Mengetuai migrasi Google Workspace ke Lark secara dalaman di HWC Coffee Malaysia dengan sokongan daripada pasukan Lark serta menghasilkan templat Excel untuk pengimportan promosi berkala Xilnex di emart24 Malaysia.',
    availabilityNote:
      'Saya terbuka kepada peluang dalam sokongan aplikasi, sistem perniagaan, sokongan SaaS, sokongan integrasi, dan operasi IT.',
  },
  skillGroups: {
    'skill-application-support': {
      title: 'Sokongan Aplikasi',
      items: [
        'Penyelesaian masalah Xilnex',
        'Saringan insiden',
        'Eskalasi vendor',
        'Sokongan UAT',
      ],
    },
    'skill-business-systems': {
      title: 'Sistem Perniagaan & SaaS',
      items: [
        'Pentadbiran Lark',
        'Penyediaan akaun dan penamatan akses pengguna',
        'Aliran kerja kelulusan',
        'Bantuan penyediaan akaun Microsoft 365',
      ],
    },
    'skill-integration-data': {
      title: 'Integrasi & Penyediaan Data',
      items: [
        'Konfigurasi platform penghantaran dalam Xilnex',
        'Pemetaan cawangan, skim harga, dan profil menu',
        'Templat Excel import promosi',
        'Penyediaan data import NetSuite',
      ],
    },
    'skill-it-operations': {
      title: 'Operasi IT',
      items: [
        'Sokongan jarak jauh dan di lokasi',
        'Penyediaan POS dan peranti pinggiran',
        'Penyelesaian masalah LAN / Wi-Fi',
        'Kesediaan cawangan baharu',
      ],
    },
  },
  experiences: {
    'exp-emart24': {
      role: 'System Application Specialist',
      organization: 'emart24 Malaysia',
      period: 'September 2025 hingga kini',
      compactPeriod: 'Sep 2025 hingga kini',
      location: 'Malaysia',
      summary:
        'Menyokong Xilnex POS di pejabat induk dan cawangan, mengurus akses pengguna kedai, mengkonfigurasi integrasi penghantaran, serta menyediakan kelengkapan IT cawangan baharu.',
      highlights: [
        'Menyediakan akaun Xilnex POS daripada permohonan kakitangan baharu daripada HR selepas menyemak status permohonan, kumpulan pengguna, dan penempatan cawangan, serta mengemas kini dan menamatkan akses serta kelayakan diskaun staf yang telah berhenti.',
        'Menyelaras dengan Xilnex dan rakan penghantaran (GrabFood, foodpanda, dan ShopeeFood) untuk mengkonfigurasi dan menyegerakkan tetapan cawangan di portal Xilnex, termasuk pautan kedai, skim harga, dan profil menu bagi foodpanda.',
        'Menyelesaikan isu penyegerakan, promosi, dan pembayaran dalam Xilnex POS di pejabat induk dan cawangan dengan mengesahkan simptom, membimbing semakan awal, dan menyelaras eskalasi vendor apabila siasatan lanjut diperlukan.',
        'Menghasilkan templat Excel yang menyusun permohonan promosi berkala untuk diimport ke Xilnex Promotion Portal serta memberikan panduan tentang penggunaan fungsi import tersebut.',
        'Memasang dan memeriksa peranti POS, terminal pembayaran, pengimbas, pencetak, serta sambungan LAN / Wi-Fi semasa penyediaan cawangan baharu.',
        'Membantu penyediaan akaun Microsoft 365 dan ujian penerimaan pengguna (UAT) mengikut skop yang ditetapkan.',
      ],
      technologies: [
        'Xilnex POS',
        'GrabFood / foodpanda / ShopeeFood',
        'Microsoft Excel',
        'Microsoft 365',
      ],
    },
    'exp-hwc': {
      role: 'IT Support',
      organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
      period: 'Mac 2024 hingga September 2025',
      compactPeriod: 'Mac 2024 hingga Sep 2025',
      location: 'Malaysia',
      summary:
        'Mengetuai migrasi Google Workspace ke Lark secara dalaman dengan sokongan daripada pasukan Lark, mentadbir Lark, serta menyokong POS runcit, pengguna jarak jauh, dan penyediaan data import NetSuite.',
      highlights: [
        'Mengetuai migrasi Google Workspace ke Lark secara dalaman dengan sokongan daripada pasukan Lark serta membantu rakan sekerja menggunakan pemesejan, e-mel, kelulusan digital, dan sokongan meja bantuan.',
        'Mentadbir Lark dengan mengurus akaun pengguna, penyediaan akaun dan penamatan akses kakitangan, serta aliran kerja kelulusan.',
        'Menyokong Xilnex POS, perkakasan, rangkaian, dan pengguna jarak jauh melalui TeamViewer dan Lark Helpdesk.',
        'Menyediakan dan menyemak helaian kerja Excel untuk tujuan import ke dalam NetSuite.',
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
    'exp-mps': {
      role: 'IT Technician',
      organization: 'Perkhidmatan percetakan terurus (sokongan di lokasi)',
      period: 'Oktober 2023 hingga Mac 2024',
      compactPeriod: 'Okt 2023 hingga Mac 2024',
      location: 'Malaysia',
      summary:
        'Memberikan sokongan teknikal di lokasi untuk pencetak komersial, mesin penyalin pelbagai fungsi, dan stesen kerja pengguna di samping pengendalian tiket Freshdesk.',
      highlights: [
        'Menyediakan sokongan teknikal di lokasi bagi pencetak komersial, mesin penyalin pelbagai fungsi, dan stesen kerja pengguna.',
        'Menyelesaikan isu perkakasan, perisian, dan kesambungan setempat di lokasi pelanggan.',
        'Mengendalikan dan mengemas kini permohonan perkhidmatan dalam Freshdesk.',
      ],
      technologies: [
        'Pencetak & Mesin Penyalin Pelbagai Fungsi',
        'Stesen Kerja',
        'Penyelesaian Masalah Kesambungan',
        'Freshdesk',
      ],
    },
    'exp-agc': {
      role: 'IT Intern (Application Development)',
      organization: 'Jabatan Peguam Negara Malaysia (Attorney General’s Chambers of Malaysia)',
      period: 'September 2021 hingga Februari 2022',
      compactPeriod: 'Sep 2021 hingga Feb 2022',
      location: 'Putrajaya, Malaysia',
      summary:
        'Latihan industri peringkat diploma dalam pembangunan aplikasi dengan menyumbang kepada sistem web perisytiharan DKICT dalaman.',
      highlights: [
        'Menyumbang kepada sistem web perisytiharan DKICT dalaman menggunakan PHP Laravel dan MySQL semasa latihan industri diploma.',
        'Membantu penyediaan dokumentasi keperluan sistem dan rajah perhubungan entiti (ERD).',
        'Menyokong tugasan pembangunan dan pengesahan fungsi.',
      ],
      technologies: ['PHP (Laravel)', 'MySQL', 'Dokumentasi Keperluan', 'ERD'],
    },
  },
  caseStudies: {
    'case-lark-migration': {
      title: 'Migrasi Google Workspace ke Lark',
      organization: 'HWC Coffee Malaysia (Palaterium Sdn Bhd)',
      roleScope: 'Ketua Migrasi Dalaman & Pentadbiran Ruang Kerja',
      summaryLine:
        'Menyelaras peralihan daripada Google Workspace ke Lark, menyediakan ruang kerja, mengurus perubahan akses pengguna, serta membantu rakan sekerja menggunakan Lark dalam tugasan harian mereka.',
      situation:
        'Peralihan daripada Google Workspace ke Lark memerlukan penyelarasan dalaman, pentadbiran akaun, penyediaan aliran kelulusan, dan bimbingan kepada kakitangan yang mula menggunakan platform tersebut.',
      responsibility:
        'Saya mengetuai migrasi ini secara dalaman dengan sokongan daripada pasukan Lark serta mengendalikan pentadbiran ruang kerja dan sokongan pengguna.',
      whatIDid: [
        'Menyelaraskan aktiviti pelaksanaan dalaman sambil bekerjasama dengan pasukan Lark bagi langkah sokongan migrasi.',
        'Menyediakan akaun pengguna Lark, mengurus perubahan dan penamatan akses kakitangan, serta mengkonfigurasi aliran kerja kelulusan digital.',
        'Membantu rakan sekerja menggunakan pemesejan, e-mel, kelulusan, dan Lark Helpdesk dalam tugasan harian.',
      ],
      outcomeLabel: 'Hasil',
      outcome:
        'Pasukan mula menggunakan Lark merentasi pemesejan, e-mel, kelulusan, dan meja bantuan dengan akaun ruang kerja serta aliran kelulusan disediakan.',
      technologies: [
        'Lark',
        'Google Workspace',
        'Penyediaan Akaun & Penamatan Akses',
        'Aliran Kerja Kelulusan',
        'Lark Helpdesk',
      ],
    },
    'case-integrations': {
      title: 'Konfigurasi Integrasi Pihak Ketiga',
      organization: 'emart24 Malaysia',
      roleScope: 'Penyelarasan Rakan Kongsi & Konfigurasi Portal',
      summaryLine:
        'Menyelaras prasyarat bersama rakan penghantaran serta mengkonfigurasi tetapan cawangan dalam Xilnex untuk GrabFood, foodpanda, dan ShopeeFood.',
      workflowSteps: ['Selaras prasyarat', 'Konfigurasi tetapan cawangan', 'Simpan dan segerakkan'],
      situation:
        'Integrasi menu dan harga kedai dengan platform penghantaran bergantung pada kelengkapan prasyarat oleh kedua-dua pihak Xilnex dan rakan luaran sebelum pemetaan cawangan dapat dibuat dalam portal.',
      responsibility:
        'Sebagai System Application Specialist, saya menyelaras kesediaan tetapan bersama Xilnex serta rakan penghantaran dan melengkapkan konfigurasi aplikasi di pihak cawangan melalui portal Xilnex (tanpa pembangunan API).',
      whatIDid: [
        'Menyelaras kesediaan prasyarat bersama Xilnex dan rakan penghantaran merangkumi GrabFood, foodpanda, dan ShopeeFood.',
        'Mengkonfigurasi tetapan integrasi pihak cawangan di dalam portal Xilnex setelah kedua-dua pihak mengesahkan prasyarat sedia.',
        'Khusus bagi foodpanda, memautkan cawangan rakan kongsi ke kedai Xilnex yang sepadan serta menetapkan skim harga dan profil menunya.',
        'Menyimpan dan menyegerakkan tetapan cawangan dalam Xilnex setelah konfigurasi selesai.',
      ],
      outcomeLabel: 'Kerja yang disempurnakan',
      outcome: 'Menyelesaikan dan menyegerakkan konfigurasi pihak cawangan yang ditetapkan dalam Xilnex.',
      technologies: [
        'Portal Xilnex',
        'GrabFood',
        'foodpanda',
        'ShopeeFood',
        'Skim Harga & Profil Menu',
      ],
    },
    'case-pos-triage': {
      title: 'Saringan Insiden Aplikasi & Eskalasi Vendor',
      organization: 'emart24 Malaysia',
      roleScope: 'Proses Sokongan Berulang · Saringan Barisan Pertama',
      summaryLine:
        'Saringan berstruktur secara berulang bagi isu penyegerakan, promosi, dan pembayaran dalam Xilnex POS di pejabat induk dan cawangan.',
      situation:
        'Di seluruh operasi pejabat induk dan cawangan, isu Xilnex POS yang berulang melibatkan penyegerakan, promosi, atau pembayaran memerlukan semakan barisan pertama yang tersusun untuk membezakan keadaan setempat daripada isu yang memerlukan siasatan vendor.',
      responsibility:
        'Saya mengendalikan saringan aplikasi barisan pertama di pejabat induk dan cawangan, mengesahkan simptom yang dilaporkan pengguna, membimbing semakan awal yang bersesuaian, dan menyalurkan butiran kepada Xilnex atau pasukan dalaman apabila perlu.',
      whatIDid: [
        'Mengesahkan isu yang dilaporkan staf cawangan atau pejabat induk bagi mengenal pasti skrin, item, promosi, atau langkah pembayaran yang terjejas.',
        'Menyemak keadaan penyegerakan Xilnex, promosi, pembayaran, akses, atau sambungan setempat yang berkaitan berdasarkan isu tersebut.',
        'Membimbing langkah penyelesaian awal yang sesuai dengan keadaan yang sedang diperiksa sebelum pengujian semula.',
        'Menyelaras eskalasi vendor bersama Xilnex atau pasukan dalaman dengan menyertakan pemerhatian yang dikumpul apabila siasatan lanjut diperlukan.',
      ],
      triageBreakdown: {
        checksPerformed: [
          'Mengesahkan simptom laporan pengguna serta skop daftar atau akaun pengguna yang terjejas bersama staf.',
          'Menyemak keadaan penyegerakan, promosi, pembayaran, akses, atau kesambungan setempat yang berkaitan.',
        ],
        providedToVendor: [
          'Simptom yang diperhatikan, semakan awal yang telah dijalankan, dan status penyegerakan semasa.',
          'Konteks yang jelas apabila melakukan eskalasi isu yang memerlukan siasatan lanjut pihak vendor.',
        ],
        vendorInvestigation: [
          'Kelakuan aplikasi di peringkat asas atau keadaan sistem platform di luar konfigurasi cawangan.',
          'Sebarang siasatan platform atau penyelesaian pihak vendor yang dikendalikan secara luaran.',
        ],
      },
      outcomeLabel: 'Kerja yang disempurnakan',
      outcome:
        'Mengekalkan proses saringan barisan pertama yang konsisten serta sempadan eskalasi yang jelas antara semakan sokongan setempat dan siasatan vendor.',
      technologies: [
        'Xilnex POS',
        'Saringan Insiden',
        'Semakan Segerak & Promosi',
        'Penyelarasan Vendor',
      ],
    },
    'case-store-launch': {
      title: 'Pemasangan & Kesediaan IT Cawangan Baharu',
      organization: 'emart24 Malaysia',
      roleScope: 'Penyediaan Peralatan & Kesambungan Tapak',
      summaryLine:
        'Memasang dan memeriksa peranti POS, terminal pembayaran, pengimbas, pencetak, serta sambungan LAN / Wi-Fi untuk menyediakan cawangan baharu sebelum dibuka.',
      situation:
        'Pembukaan cawangan baharu bergantung pada penyediaan dan pemeriksaan bersepadu bagi peranti POS kaunter, terminal pembayaran, pengimbas, pencetak, serta sambungan rangkaian setempat terlebih dahulu.',
      responsibility:
        'Saya memasang dan memeriksa perkakasan kaunter kedai serta sambungan LAN / Wi-Fi semasa penyediaan cawangan baharu.',
      whatIDid: [
        'Memasang dan memeriksa peranti POS, terminal pembayaran, pengimbas kod bar, dan pencetak resit di kaunter.',
        'Memeriksa pautan LAN setempat dan sambungan Wi-Fi kedai merentasi perkakasan kaunter.',
        'Menggunakan penguji kabel semasa satu penyediaan tapak untuk mengesan kabel yang melangkau pin 4 dan menyambung semula kepala RJ45 di lokasi.',
      ],
      outcomeLabel: 'Kerja yang disempurnakan',
      outcome:
        'Memasang dan memeriksa secara fizikal peranti kaunter kedai serta pautan sambungan bagi menyiapkan cawangan baharu untuk pembukaan.',
      technologies: [
        'Peranti POS',
        'Terminal Pembayaran',
        'Pengimbas & Pencetak',
        'Penyediaan LAN / Wi-Fi',
        'Penamatan Semula RJ45',
      ],
    },
    'case-promotion-import': {
      title: 'Templat Import Promosi Xilnex',
      organization: 'emart24 Malaysia',
      roleScope: 'Reka Bentuk Templat dan Panduan Import',
      summaryLine:
        'Menyusun permintaan promosi berkala dalam Excel untuk diimport ke Portal Promosi Xilnex.',
      situation:
        'Permintaan promosi berkala perlu disediakan dalam format berstruktur untuk diimport ke Portal Promosi Xilnex.',
      responsibility:
        'Saya menyediakan templat Excel dan membimbing rakan sekerja menggunakan fungsi import portal.',
      whatIDid: [
        'Membina templat Excel untuk menyusun permintaan promosi berkala bagi tujuan import.',
        'Menunjukkan kepada rakan sekerja cara menggunakan fungsi import dalam Portal Promosi Xilnex.',
      ],
      outcomeLabel: 'Kerja yang disempurnakan',
      outcome:
        'Menyediakan templat Excel yang boleh digunakan semula untuk import promosi dan menunjukkan kepada rakan sekerja cara menggunakan fungsi import portal.',
      technologies: ['Microsoft Excel', 'Portal Promosi Xilnex'],
    },
  },
  education: {
    degree: 'Diploma in Computer Science and Mathematics',
    institution: 'Universiti Teknologi MARA (UiTM)',
    period: '2019 hingga 2022',
    focus:
      'Pengajian asas perisian, pangkalan data hubungan, struktur data, dan matematik pengkomputeran.',
  },
  certifications: {
    'cert-aws': {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      kindLabel: 'Pensijilan',
      note: 'Konsep teras awan AWS, perkhidmatan utama, tanggungjawab keselamatan, dan asas pengebilan.',
    },
    'cert-ai-teach': {
      name: 'Generative AI Copilot Digital Upskilling Program',
      issuer: 'AI Teach Malaysia',
      kindLabel: 'Program yang Diselesaikan',
      note: 'Menyelesaikan latihan peningkatan kemahiran digital merangkumi alat produktiviti tempat kerja dan AI generatif.',
    },
  },
  learning: {
    'learning-uipath-rpa': {
      topic: 'UiPath & Robotic Process Automation (RPA)',
      status: 'Sedang dipelajari',
      note: 'Sedang mempelajari UiPath serta meneroka Robotic Process Automation (RPA), dengan minat terhadap automasi aliran kerja, integrasi aplikasi, dan cara proses berulang boleh diautomasikan.',
    },
  },
  evidenceMeta: {
    professional: {
      label: 'Pengalaman Kerja',
      description:
        'Keupayaan yang diamalkan secara langsung dalam peranan berbayar bagi sokongan aplikasi, pentadbiran SaaS, atau operasi IT.',
    },
    project: {
      label: 'Latihan Industri, Pendidikan & Kelayakan',
      description: 'Asas akademik, latihan industri diploma berselia, atau kelayakan rasmi.',
    },
    learning: {
      label: 'Sedang Dipelajari',
      description: 'Pembelajaran kendiri dan bukan pengalaman kerja berbayar.',
    },
  },
  constellationCategories: {
    'Application Support': 'Sokongan Aplikasi',
    'Business Systems & SaaS': 'Sistem Perniagaan & SaaS',
    'IT Operations & Helpdesk': 'Operasi IT & Meja Bantuan',
    'Technical Foundations': 'Asas Teknikal',
  },
  strata: {
    hardware: {
      title: 'Perkakasan & Peranti Pinggiran',
      subtitle: 'Lapisan Ilustrasi: Pengimbas, Terminal, Pencetak & Pengkabelan',
      description:
        'Di kaunter daftar keluar, peranti fizikal merakam kod bar item atau sentuhan kad serta mencetak slip kertas setelah diluluskan. Bekalan kuasa yang stabil, kabel peranti, dan pautan rangkaian memastikan peralatan kaunter sentiasa boleh dicapai.',
      exampleStage: 'Contoh Langkah: Imbasan kod bar & input peranti pinggiran',
      examplePayload: 'INPUT -> Contoh digit SKU dihantar daripada pengimbas ke hos kaunter',
      whatHappensConceptually:
        'Pengimbas kod bar membaca pantulan cahaya, menyahkod garisan menjadi digit, dan menghantar input aksara kepada aplikasi kaunter yang aktif.',
      exampleComponents: ['Pengimbas Kod Bar', 'Pencetak Resit', 'Terminal Pembayaran', 'Titik Ethernet'],
    },
    kernel: {
      title: 'Sistem Pengendalian & Pemacu',
      subtitle: 'Lapisan Ilustrasi: Pengecaman Peranti & Baris Gilir Cetak',
      description:
        'Sistem pengendalian pada terminal mendedahkan pengimbas, pencetak, dan penyesuai rangkaian melalui pemacu standard supaya perisian perniagaan boleh membaca input serta menghantar kerja cetakan.',
      exampleStage: 'Contoh Langkah: Serahan peranti OS & penimbal cetak',
      examplePayload: 'OS -> Acara input USB -> Penghantaran baris gilir cetak',
      whatHappensConceptually:
        'Pemacu input menghantar acara imbasan ke tetingkap aktif, manakala baris gilir cetak OS memformat output untuk pencetak terma yang disambungkan.',
      exampleComponents: ['Pemacu USB', 'Penimbal Cetak', 'Penyesuai Rangkaian', 'Cache Setempat'],
    },
    network: {
      title: 'Rangkaian Setempat & Pautan Internet',
      subtitle: 'Lapisan Ilustrasi: Pensuisan LAN, Wi-Fi & Penghalaan Hala Atas',
      description:
        'Terminal setempat mencapai bahagian belakang aplikasi awan dan hos pembayaran melalui Ethernet atau Wi-Fi kedai menerusi suis setempat dan gerbang utama.',
      exampleStage: 'Contoh Langkah: Pautan setempat ke gerbang utama',
      examplePayload: 'Ethernet Setempat -> Suis -> Penghala Gerbang -> ISP Hala Atas',
      whatHappensConceptually:
        'Jika port dinding, kabel sambungan, atau pautan gerbang terputus, terminal setempat tidak dapat menarik harga katalog terkini atau menyegerakkan jualan yang selesai.',
      exampleComponents: ['Pautan Ethernet', 'Wi-Fi Cawangan', 'Suis Setempat', 'Penghala Gerbang'],
    },
    application: {
      title: 'Aplikasi & Aliran Transaksi',
      subtitle: 'Lapisan Ilustrasi: Carian Item, Promosi & Resit',
      description:
        'Aplikasi perniagaan memadankan SKU yang diimbas dengan peraturan harga dan promosi aktif, mengira jumlah, memohon pengesahan bayaran, serta merekodkan jualan.',
      exampleStage: 'Contoh Langkah: Carian item & pengiraan promosi',
      examplePayload: 'Aplikasi -> Padan harga katalog & peraturan promo -> Rekod transaksi',
      whatHappensConceptually:
        'Apabila katalog atau promosi tersekat semasa penyegerakan, pengguna barisan hadapan akan melihat harga lama atau diskaun tercicir sehingga penyegerakan selesai.',
      exampleComponents: ['Carian SKU', 'Peraturan Promosi', 'Pencetus Bayaran', 'Segerak Jualan'],
    },
    cloud: {
      title: 'Pejabat Belakang, ERP & Platform Kerjasama',
      subtitle: 'Lapisan Ilustrasi: Pelaporan Pusat, ERP & Akaun',
      description:
        'Rekod operasi disalurkan ke pelaporan pejabat belakang pusat, helaian data ERP, serta platform pemesejan atau e-mel kerja yang digunakan merentasi jabatan.',
      exampleStage: 'Contoh Langkah: Segerak HQ & serahan alat perniagaan',
      examplePayload: 'Segerak Tapak -> Pelaporan Pusat -> Alat Kerjasama & ERP',
      whatHappensConceptually:
        'Platform kongsi bergantung pada penyediaan akaun yang tepat, templat import yang tersusun, dan sambungan yang stabil merentasi pasukan.',
      exampleComponents: ['Segerak Pusat', 'E-mel & Sembang Kerja', 'Penyediaan Data ERP', 'Kawalan Akses'],
    },
    operations: {
      title: 'Pengguna, Saringan & Penyelarasan Vendor',
      subtitle: 'Lapisan Ilustrasi: Pengguna Akhir, Sokongan & Eskalasi',
      description:
        'Sistem kekal boleh diharap apabila pasukan sokongan berkomunikasi dengan jelas bersama pengguna, menjalankan semakan awal secara tersusun, dan mengeskalasi penemuan dengan tepat.',
      exampleStage: 'Contoh Langkah: Saringan isu & eskalasi',
      examplePayload: 'Laporan Pengguna -> Hasil Semula & Semak -> Eskalasi dengan Pemerhatian',
      whatHappensConceptually:
        'Pakar sokongan mengesahkan apa yang dilihat pengguna, menjalankan semakan awal yang selamat terlebih dahulu, dan berkongsi konteks terfokus bersama vendor apabila pembaikan platform diperlukan.',
      exampleComponents: ['Sokongan Pengguna', 'Saringan Jarak Jauh', 'Eskalasi Vendor', 'Kesediaan Tapak'],
    },
  },
  nodes: {
    'node-xilnex-pos': {
      label: 'Xilnex POS & Saringan Aplikasi',
      summary: 'Menyelesaikan isu Xilnex POS di HQ dan cawangan melibatkan penyegerakan, promosi, dan pembayaran.',
      usage: 'Sahkan simptom bersama pengguna, semak keadaan segerak/promosi/bayaran berkaitan, dan bimbing langkah awal.',
      year: '2024 hingga kini',
    },
    'node-vendor-escalation': {
      label: 'Eskalasi Vendor',
      summary: 'Menyelaras eskalasi vendor dengan simptom diperhatikan dan semakan awal yang tersusun.',
      usage: 'Mengeskalasi isu Xilnex POS atau pembayaran yang belum selesai kepada vendor luaran atau pasukan dalaman.',
      year: '2025 hingga kini',
    },
    'node-uat-support': {
      label: 'Sokongan UAT',
      summary: 'Membantu ujian penerimaan pengguna (UAT) mengikut skop yang ditetapkan.',
      usage: 'Menyokong semakan UAT yang ditugaskan di emart24 Malaysia.',
      year: '2025 hingga kini',
    },
    'node-delivery-integrations': {
      label: 'Konfigurasi Portal Penghantaran (Xilnex)',
      summary: 'Mengkonfigurasi integrasi penghantaran pihak cawangan dalam Xilnex bagi GrabFood, foodpanda, dan ShopeeFood.',
      usage: 'Menyelaras prasyarat; bagi foodpanda, memautkan kedai, skim harga, dan profil menu sebelum simpan dan segerak.',
      year: '2025 hingga kini',
    },
    'node-gws-migration': {
      label: 'Migrasi Google Workspace ke Lark',
      summary: 'Mengetuai migrasi Google Workspace ke Lark secara dalaman dengan sokongan pasukan Lark.',
      usage: 'Penyelarasan migrasi dalaman, pentadbiran akaun, dan membantu rakan sekerja menggunakan Lark di HWC Coffee Malaysia.',
      year: '2024 hingga 2025',
    },
    'node-lark-admin': {
      label: 'Pentadbiran & Kelulusan Lark',
      summary: 'Mentadbir akaun Lark, penyediaan akaun dan penamatan akses, aliran kerja kelulusan, dan sokongan meja bantuan.',
      usage: 'Mengurus akaun pengguna, kelulusan, dan sokongan rakan sekerja melalui pemesejan, e-mel, dan Lark Helpdesk.',
      year: '2024 hingga 2025',
    },
    'node-m365-provisioning': {
      label: 'Bantuan Penyediaan M365',
      summary: 'Membantu penyediaan akaun Microsoft 365 mengikut skop yang ditetapkan.',
      usage: 'Membantu tugasan penyediaan Microsoft 365 yang ditetapkan di emart24 Malaysia.',
      year: '2025 hingga kini',
    },
    'node-excel-netsuite': {
      label: 'Templat Excel & Penyediaan Import',
      summary: 'Menghasilkan templat Excel import promosi Xilnex dan menyediakan helaian import NetSuite.',
      usage: 'Membina templat import promosi berkala untuk Xilnex dengan panduan penggunaan dan menyediakan helaian Excel untuk NetSuite di HWC.',
      year: '2024 hingga kini',
    },
    'node-xilnex-access': {
      label: 'Akses Xilnex & Kemas Kini Staf Berhenti',
      summary: 'Menyediakan akaun Xilnex POS daripada permohonan kakitangan baharu HR dan membersihkan akses staf berhenti.',
      usage: 'Menyemak status permohonan, kumpulan pengguna, dan cawangan; menamatkan akses serta kelayakan diskaun staf berhenti.',
      year: '2025 hingga kini',
    },
    'node-remote-helpdesk': {
      label: 'Sokongan Jarak Jauh & Meja Bantuan',
      summary: 'Menyokong pengguna jarak jauh dan tiket perkhidmatan menggunakan TeamViewer, Lark Helpdesk, dan Freshdesk.',
      usage: 'Mengendalikan penyelesaian masalah jarak jauh dan kemas kini tiket di persekitaran runcit, pejabat, dan lokasi pelanggan.',
      year: '2023 hingga 2025',
    },
    'node-pos-peripherals': {
      label: 'Peranti POS & Pinggiran',
      summary: 'Memasang dan memeriksa peranti POS, terminal pembayaran, pengimbas, dan pencetak resit.',
      usage: 'Menyediakan serta memeriksa peralatan kaunter semasa penyediaan cawangan baharu sebelum pembukaan.',
      year: '2024 hingga kini',
    },
    'node-lan-cabling': {
      label: 'LAN / Wi-Fi & Semakan RJ45',
      summary: 'Memeriksa sambungan LAN / Wi-Fi semasa penyediaan dan menamatkan semula plag RJ45 yang melangkau pin 4.',
      usage: 'Memeriksa sambungan tapak baharu dan membaiki kerosakan pendawaian pin-4 RJ45 semasa satu penyediaan cawangan.',
      year: '2024 hingga kini',
    },
    'node-printers-onsite': {
      label: 'Pencetak, Penyalin & IT Di Lokasi',
      summary: 'Sokongan di lokasi untuk pencetak komersial, mesin penyalin pelbagai fungsi, stesen kerja, dan tiket Freshdesk.',
      usage: 'Menyampaikan penyelesaian masalah perkakasan, perisian, dan kesambungan dalam peranan perkhidmatan percetakan terurus.',
      year: 'Okt 2023 hingga Mac 2024',
    },
    'node-aws-ccp': {
      label: 'AWS Certified Cloud Practitioner',
      summary: 'Pensijilan asas AWS merangkumi konsep awan teras, perkhidmatan, tanggungjawab keselamatan, dan pengebilan.',
      usage: 'Pensijilan awan asas (AWS).',
      year: 'Kelayakan',
    },
    'node-laravel-mysql': {
      label: 'Laravel & MySQL (Latihan Industri)',
      summary: 'Latihan industri diploma menyumbang kepada sistem web DKICT dalaman menggunakan PHP Laravel, MySQL, dokumen, dan ERD.',
      usage: 'Menyumbang kepada ciri Laravel/MySQL serta membantu dokumentasi keperluan/ERD dan tugasan pengesahan.',
      year: 'Sep 2021 hingga Feb 2022',
    },
    'node-uitm-cs': {
      label: 'Diploma Sains Komputer & Matematik (UiTM)',
      summary: 'Diploma in Computer Science and Mathematics di Universiti Teknologi MARA (UiTM).',
      usage: 'Asas akademik dalam pengaturcaraan perisian, pangkalan data hubungan, dan matematik pengkomputeran.',
      year: '2019 hingga 2022',
    },
    'node-uipath-rpa': {
      label: 'UiPath & RPA',
      summary: 'Sedang mempelajari UiPath serta konsep Robotic Process Automation (RPA).',
      usage: 'Pembelajaran kendiri sahaja; tidak disenaraikan sebagai pengalaman kerja berbayar.',
      year: 'Sedang dipelajari',
    },
  },
  edges: [
    'Peranti kaunter bergantung pada pengkabelan setempat dan pautan Wi-Fi yang telah diperiksa.',
    'Kesambungan cawangan menyokong penyegerakan Xilnex dan semakan daftar keluar.',
    'Saringan POS barisan pertama menghubungkan semakan awal dengan eskalasi vendor.',
    'Penyelarasan migrasi dalaman membawa terus kepada pentadbiran Lark.',
    'Lark Helpdesk menghubungkan permohonan kakitangan dalaman dengan sokongan jarak jauh.',
    'Sokongan aliran kerja perniagaan memadankan helaian sah dengan operasi tempat kerja.',
    'Bantuan penyediaan pengguna digandingkan dengan pengurusan dan pembersihan akses Xilnex berasaskan HR.',
    'Sokongan Xilnex cawangan bergandingan dengan konfigurasi portal penghantaran.',
    'Penyelarasan tetapan cawangan selari dengan semakan UAT yang ditetapkan.',
    'Penyelesaian masalah perkakasan di lokasi bergandingan dengan pengendalian tiket Freshdesk.',
    'Asas diploma menyokong kerja Laravel & MySQL semasa latihan industri.',
    'Pembelajaran asas awan digandingkan dengan penerokaan UiPath & RPA semasa.',
  ],
};

export const msMYBundle: LocaleBundle = {
  meta: {
    code: 'ms-MY',
    nativeLabel: 'Bahasa Melayu',
    englishName: 'Malay',
    htmlLang: 'ms-MY',
    dir: 'ltr',
  },
  ui: msMYUi,
  content: msMYContent,
};
