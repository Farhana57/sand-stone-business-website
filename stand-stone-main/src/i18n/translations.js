/**
 * ---------------------------------------------------------------------------
 * CENTRALISED TRANSLATIONS
 * ---------------------------------------------------------------------------
 * Every visible string in the UI lives here, in both languages, under the same
 * key path. `useLanguage()` resolves a path such as `t('home.hero.title')`.
 *
 * Rules for editing:
 *  - `en` and `bn` must always have the same shape (a test enforces this).
 *  - Placeholders use {{curlyBraces}}, e.g. t('order.validation.minQuantity', { value: '100 CFT' }).
 *  - Values may be strings, arrays or nested objects; arrays keep the same
 *    length in both languages.
 *  - Product and business data live in src/data/*, not here.
 */

export const translations = {
  /* =======================================================================
     BANGLA
     ======================================================================= */
  bn: {
    lang: { label: 'ভাষা', bn: 'বাংলা', en: 'English', switchTo: 'ভাষা পরিবর্তন করুন' },

    nav: {
      home: 'হোম',
      products: 'পণ্যসমূহ',
      delivery: 'ডেলিভারি ও সেবা',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ ও অর্ডার',
      menu: 'মেনু',
      openMenu: 'মেনু খুলুন',
      closeMenu: 'মেনু বন্ধ করুন',
      callNow: 'এখনই কল করুন',
      orderNow: 'অর্ডার করুন',
    },

    actions: {
      requestQuote: 'দাম জানতে চান',
      requestQuoteShort: 'কোটেশন চান',
      orderNow: 'এখনই অর্ডার করুন',
      callNow: 'কল করুন',
      callUs: 'কল করুন',
      whatsapp: 'হোয়াটসঅ্যাপ',
      whatsappOrder: 'হোয়াটসঅ্যাপে অর্ডার করুন',
      viewProducts: 'সব পণ্য দেখুন',
      viewAllProducts: 'সব সামগ্রী দেখুন',
      viewDelivery: 'ডেলিভারি ও সেবা',
      learnMore: 'বিস্তারিত জানুন',
      contactUs: 'যোগাযোগ করুন',
      sendOrder: 'অর্ডার পাঠান',
      sending: 'পাঠানো হচ্ছে…',
      sendViaWhatsapp: 'হোয়াটসঅ্যাপে পাঠান',
      close: 'বন্ধ করুন',
      openInMaps: 'গুগল ম্যাপে দেখুন',
      backToHome: 'হোম পেজে ফিরে যান',
      copy: 'কপি করুন',
      copied: 'কপি হয়েছে',
      newRequest: 'নতুন অনুরোধ',
    },

    common: {
      priceOnRequest: 'মূল্য জানতে যোগাযোগ করুন',
      priceFrom: 'মূল্য শুরু',
      per: 'প্রতি',
      unitLabel: 'একক',
      quantityLabel: 'পরিমাণ',
      minOrder: 'নূন্যতম অর্ডার',
      availableUnits: 'যে এককে পাওয়া যায়',
      specifications: 'বিস্তারিত তথ্য',
      materialType: 'সামগ্রীর ধরন',
      popular: 'জনপ্রিয়',
      of: 'এর মধ্যে',
      showing: 'দেখানো হচ্ছে',
      noResults: 'এই ধরনের কোনো সামগ্রী পাওয়া যায়নি।',
      loading: 'লোড হচ্ছে…',
      required: 'আবশ্যক',
      optional: 'ঐচ্ছিক',
      demoNotice:
        'এই ওয়েবসাইটে দেখানো ব্যবসার নাম, ফোন নম্বর ও ঠিকানা নমুনা হিসেবে দেওয়া — ব্যবহারের আগে src/data/company.js ফাইলে নিজের তথ্য বসান।',
      notConnectedNotice:
        'এই মুহূর্তে অনলাইনে অর্ডার সরাসরি ডেটাবেসে সংরক্ষণ করা হচ্ছে না। নিচের বাটন দিয়ে অর্ডারের তথ্যটি হোয়াটসঅ্যাপে পাঠিয়ে দিন, অথবা সরাসরি কল করুন।',
    },

    home: {
      hero: {
        badge: 'সারা বাংলাদেশে ডেলিভারি',
        title: 'বালু, পাথর ও নির্মাণ সামগ্রীর',
        titleAccent: 'নির্ভরযোগ্য সরবরাহ',
        subtitle:
          'মোটা বালু, সিলেট বালু, পাথর চিপস, নুড়ি পাথর ও ইট — নিজস্ব ট্রাকে সরাসরি আপনার সাইটে। মাপা পরিমাণ, ওজন-স্লিপ এবং নমুনা দেখে অর্ডারের সুবিধা।',
        primaryCta: 'অর্ডার ও কোটেশন',
        secondaryCta: 'পণ্যের তালিকা দেখুন',
        imageAlt: 'বালু বোঝাই টিপার ট্রাক নির্মাণ সাইটে',
        trustPoints: [
          'সারা বাংলাদেশে দ্রুত ডেলিভারি',
          'মাপা পরিমাণ ও ওজন-স্লিপ',
          'ক্যাশ অন ডেলিভারি সুবিধা',
        ],
        cardTitle: 'কোটেশন নিন',
        cardSubtitle: 'ফোন বা হোয়াটসঅ্যাপে দ্রুত রেট জানুন',
      },
      about: {
        eyebrow: 'আমাদের সম্পর্কে',
        title: 'বালু-পাথরের ব্যবসায় স্বচ্ছতা ও সময়ানুবর্তিতা',
        body:
          'আমরা সরাসরি নদীঘাট ও কোয়ারি থেকে সামগ্রী সংগ্রহ করে নিজস্ব ট্রাকে সরবরাহ করি। প্রতিটি লোডে মাপ যাচাই করা হয়, তাই পরিমাণ নিয়ে আপনার দ্বিধা থাকবে না। ছোট বাড়ির কাজ হোক বা বড় প্রকল্প — একই মান ও একই আচরণ।',
        points: [
          'নিজস্ব ট্রাক ও ট্রাক ড্রাইভার',
          'নমুনা দেখে অর্ডারের সুবিধা',
          'সাইটে পৌঁছে টাকা পরিশোধ',
          'বড় প্রকল্পে নিয়মিত সরবরাহের চুক্তি',
        ],
        imageAlt: 'নির্মাণ সাইটে বালু বোঝাই করার কাজ',
        badgeLabel: 'সামগ্রীর ধরন',
        yearsLabel: 'বছরের অভিজ্ঞতা',
      },
      why: {
        eyebrow: 'কেন আমাদের বেছে নেবেন',
        title: 'যে বিষয়গুলো আমাদের আলাদা করে',
        subtitle: 'সামগ্রীর মান, সঠিক মাপ এবং সময়মতো ডেলিভারি — এই তিনটিই আমাদের মূল প্রতিশ্রুতি।',
      },
      products: {
        eyebrow: 'পণ্যসমূহ',
        title: 'আমাদের সামগ্রীর তালিকা',
        subtitle: 'প্রতিটি পণ্যের বিবরণ দেখুন এবং এক ক্লিকে কোটেশন চেয়ে পাঠান।',
      },
      process: {
        eyebrow: 'কীভাবে কাজ করে',
        title: 'অর্ডার থেকে ডেলিভারি — চার ধাপ',
        subtitle: 'ফোন, হোয়াটসঅ্যাপ বা ওয়েবসাইটের অর্ডার ফর্ম — যেভাবে সুবিধা সেভাবে যোগাযোগ করুন।',
        steps: [
          {
            title: 'যোগাযোগ করুন',
            body: 'কোন সামগ্রী, কত পরিমাণ এবং ডেলিভারির স্থান জানালেই আমরা হিসেব করে দাম জানিয়ে দেব।',
          },
          {
            title: 'দাম ও পরিমাণ নিশ্চিত করুন',
            body: 'রেট, একক ও ডেলিভারি সময় চূড়ান্ত করে অর্ডার কনফার্ম করা হয়।',
          },
          {
            title: 'লোডিং ও মাপা হয়',
            body: 'নদীঘাট বা কোয়ারি থেকে সামগ্রী লোড করে ট্রাক ছাড়ার আগেই পরিমাণ মাপা হয়।',
          },
          {
            title: 'সাইটে ডেলিভারি',
            body: 'নির্ধারিত সময়ে ট্রাক আপনার সাইটে পৌঁছাবে, সাথে মাপের স্লিপ ও পরিশোধের সুবিধা।',
          },
        ],
      },
      coverage: {
        eyebrow: 'ডেলিভারি এলাকা',
        title: 'ঢাকার আশপাশে প্রতিদিন, সারা দেশে ট্রাক লোডে',
        subtitle: 'নিচের এলাকাগুলোতে নিয়মিত ডেলিভারি হয়; অন্য জেলায় ট্রাক লোডে সরবরাহ করা হয়।',
        dhakaZone: 'নিয়মিত ডেলিভারি',
        longHaul: 'ট্রাক লোডে সারাদেশে',
      },
      cta: {
        title: 'আজই আপনার প্রয়োজনীয় সামগ্রী অর্ডার করুন',
        subtitle: 'কত পরিমাণ লাগবে জানালেই কয়েক মিনিটে রেট ও ডেলিভারির সময় জানিয়ে দেওয়া হবে।',
      },
      marquee: [
        'ভরাট বালু',
        'মোটা নদীর বালু',
        'সিলেট বালু',
        'পাথর চিপস ৩/৪"',
        'পাথর চিপস ১/২"',
        'স্টোন ডাস্ট',
        'নুড়ি পাথর',
        'প্রথম শ্রেণির ইট',
      ],
    },

    productsPage: {
      eyebrow: 'পণ্যসমূহ',
      title: 'সামগ্রী ও দামের তালিকা',
      subtitle:
        'নিচের তালিকা থেকে প্রয়োজনীয় সামগ্রী বেছে নিন। দাম বাজারের ওপর নির্ভর করে, তাই নির্দিষ্ট রেট জানতে কোটেশন চেয়ে নিন।',
      filterLabel: 'ধরন অনুযায়ী দেখুন',
      resultCount: '{{count}} টি সামগ্রী পাওয়া গেছে',
      requestQuoteFor: '{{name}} এর দাম জানুন',
    },

    deliveryPage: {
      eyebrow: 'ডেলিভারি ও সেবা',
      title: 'দ্রুত, মাপা ও নির্ভরযোগ্য ডেলিভারি সেবা',
      subtitle:
        'নিজস্ব ট্রাক ও অভিজ্ঞ চালকের সমন্বয়ে আমরা ঢাকার ভেতরে একই দিনে এবং জেলায় ১–৩ দিনের মধ্যে ডেলিভারি দেওয়ার চেষ্টা করি।',
      imageAlt: 'বালু বোঝাই ডেলিভারি ট্রাক',
      servicesTitle: 'আমাদের সেবাসমূহ',
      services: [
        {
          title: 'ঢাকায় একই দিনে ডেলিভারি',
          body: 'সকালে অর্ডার করলে একই দিনে, বিকেলের অর্ডার হলে পরদিন সকালে সরবরাহ।',
          icon: 'clock',
        },
        {
          title: 'সারা দেশে ট্রাক লোড',
          body: 'যেকোনো জেলায় ট্রাক লোড সরবরাহ, প্রয়োজন অনুযায়ী কাভার্ড বা টিপার ট্রাক।',
          icon: 'truck',
        },
        {
          title: 'মাপা পরিমাণ ও স্লিপ',
          body: 'প্রতিটি লোড মাপা হয় এবং ওজন-স্লিপ ডেলিভারির সময় দেওয়া হয়।',
          icon: 'scale',
        },
        {
          title: 'সাইটে আনলোড',
          body: 'ট্রাক থেকে সামগ্রী নির্দিষ্ট স্থানে নামিয়ে দেওয়া হয়, যেখানে সাইটে ঢোকার রাস্তা আছে।',
          icon: 'package',
        },
        {
          title: 'ভলিউম অর্ডারে বিশেষ রেট',
          body: 'বড় প্রকল্পে নিয়মিত সরবরাহের জন্য আলাদা রেট ও নিয়মিত সময়সূচি নির্ধারণ করা যায়।',
          icon: 'percent',
        },
        {
          title: 'নমুনা যাচাই',
          body: 'বড় অর্ডারের আগে নমুনা দেখে সামগ্রীর মান যাচাই করার সুযোগ।',
          icon: 'eye',
        },
      ],
      stepsTitle: 'ডেলিভারি প্রক্রিয়া',
      fleetTitle: 'আমাদের বহর',
      fleet: [
        { title: 'টিপার ট্রাক', body: 'বালু, চিপস ও নুড়ি পাথর সরাসরি সাইটে নামানোর জন্য।' },
        { title: 'কাভার্ড ট্রাক', body: 'দূরের জেলায় ধুলাবালি থেকে সুরক্ষিত রেখে পরিবহনের জন্য।' },
        { title: 'লোডার ও শ্রমিক দল', body: 'লোডিং ও আনলোডিংয়ের জন্য প্রশিক্ষিত দল।' },
      ],
      zonesTitle: 'ডেলিভারি এলাকা',
      notesTitle: 'জেনে রাখুন',
      notes: [
        'ডেলিভারির সময় নির্ভর করে রাস্তার অবস্থা ও ট্রাফিকের উপর — বৃষ্টি বা যানজটে কিছুটা দেরি হতে পারে।',
        'সাইটে ট্রাক ঢোকার রাস্তা সরু হলে আগেই জানানো ভালো।',
        'পরিমাণ বাড়লে রেট কমতে পারে — বড় অর্ডারের জন্য আলাদা কোটেশন নিন।',
      ],
      faqTitle: 'সাধারণ প্রশ্ন',
      faq: [
        {
          q: 'ডেলিভারি খরচ কি আলাদা?',
          a: 'ডেলিভারি খরচ দূরত্ব ও ট্রাকের ধরনের উপর নির্ভর করে। কোটেশনে সামগ্রীর দাম ও ডেলিভারি চার্জ আলাদাভাবে জানিয়ে দেওয়া হয়।',
        },
        {
          q: 'সামগ্রীর মান যাচাই করার উপায় কি?',
          a: 'বড় অর্ডারের আগে নমুনা দেখা যায়। ডেলিভারির সময় ওজন-স্লিপ দেওয়া হয়, তাই পরিমাণ নিয়ে সমস্যা হলে সাথে সাথে জানানো যায়।',
        },
        {
          q: 'অর্ডার কত দিন আগে দিতে হয়?',
          a: 'ঢাকার ভেতরে সাধারণত একই দিনে, কিন্তু বড় লোড বা দূরের জেলার জন্য অন্তত এক দিন আগে জানালে ভালো।',
        },
        {
          q: 'পেমেন্ট কীভাবে করা যায়?',
          a: 'ডেলিভারির সময় ক্যাশ পরিশোধ করা যায়। বড় প্রকল্পে অগ্রিম ও বাকির সুবিধা নিয়ে আলোচনা করা যায়।',
        },
      ],
    },

    aboutPage: {
      eyebrow: 'আমাদের সম্পর্কে',
      title: 'নির্মাণ সামগ্রী সরবরাহে আমাদের পদ্ধতি',
      subtitle:
        'আমরা সরাসরি উৎস থেকে সামগ্রী সংগ্রহ করি, নিজস্ব ট্রাকে সরবরাহ করি এবং প্রতিটি লোডে মাপ যাচাই করে দিই।',
      imageAlt: 'নির্মাণ প্রকল্প ও কর্মরত শ্রমিক',
      storyTitle: 'আমাদের কাজের ধরন',
      story: [
        'বালু ও পাথরের ব্যবসায় সবচেয়ে বড় উদ্বেগ হলো মাপ ও মান। আমরা এই দুই জায়গাতেই স্পষ্ট থাকার চেষ্টা করি: পণ্য লোড করার সময় মাপা হয় এবং ডেলিভারির সময় তথ্য লেখা স্লিপ দেওয়া হয়।',
        'আমাদের ট্রাক ও চালক নিজেদের, তাই ঢাকার ভেতরে একই দিনে এবং জেলায় নির্দিষ্ট সময়ে পৌঁছে দেওয়া যায়। বড় প্রকল্পের জন্য নির্দিষ্ট সময়সূচি মেনে নিয়মিত সরবরাহের ব্যবস্থা করা হয়।',
        'গ্রাহক ছোট হোক বা বড়, আমরা একই রকম ব্যবহার ও একই মান দিতে চাই। কোনো কিছু নিয়ে প্রশ্ন থাকলে সরাসরি ফোন বা হোয়াটসঅ্যাপে জানাতে পারেন — কথা দিয়ে সমাধান করার চেষ্টা করি।',
      ],
      valuesTitle: 'আমাদের মূল্যবোধ',
      values: [
        { title: 'স্বচ্ছ মাপ', body: 'প্রতিটি লোড মাপা ও হিসাব করা হয়।', icon: 'scale' },
        { title: 'সময়ানুবর্তিতা', body: 'কথা দিলে সেই সময়েই ডেলিভারির চেষ্টা।', icon: 'clock' },
        { title: 'মানের নিশ্চয়তা', body: 'নমুনা দেখে অর্ডার করার সুযোগ।', icon: 'shield' },
        { title: 'সহজ যোগাযোগ', body: 'ফোন, হোয়াটসঅ্যাপ বা ওয়েবসাইট — সব পথ খোলা।', icon: 'phone' },
      ],
      statsTitle: 'এক নজরে',
      stats: [
        { value: '৮', label: 'সামগ্রীর ধরন' },
        { value: '১', label: 'দিনে ঢাকায় ডেলিভারি' },
        { value: '৬৪', label: 'জেলায় পৌঁছানোর লক্ষ্য' },
      ],
      coverageTitle: 'আমরা কোথায় সরবরাহ করি',
      cta: {
        title: 'আপনার প্রকল্পের জন্য সরবরাহ দরকার?',
        subtitle: 'প্রয়োজনীয় পরিমাণ জানালে আমরা রেট ও সময়সূচি জানিয়ে দেব।',
      },
    },

    contactPage: {
      eyebrow: 'যোগাযোগ',
      title: 'যোগাযোগ ও অর্ডার',
      subtitle: 'যেকোনো সময় ফোন, হোয়াটসঅ্যাপ বা নিচের ফর্ম দিয়ে অর্ডার ও কোটেশনের অনুরোধ পাঠাতে পারেন।',
      infoTitle: 'সরাসরি যোগাযোগ',
      phoneLabel: 'ফোন',
      whatsappLabel: 'হোয়াটসঅ্যাপ',
      emailLabel: 'ই-মেইল',
      addressLabel: 'ঠিকানা',
      hoursLabel: 'সময়সূচি',
      formTitle: 'অর্ডার ও কোটেশনের অনুরোধ',
      formSubtitle: 'তারা চিহ্নিত ঘরগুলো অবশ্যই পূরণ করুন। তথ্য দিলে আমরা দ্রুত যোগাযোগ করব।',
      mapTitle: 'আমাদের অবস্থান',
      mapNote: 'নিচের লিঙ্কে ক্লিক করে ঢাকা শহরের মানচিত্রে আমাদের এলাকা দেখতে পারেন।',
    },

    order: {
      fields: {
        name: 'নাম',
        namePlaceholder: 'আপনার নাম',
        phone: 'মোবাইল নম্বর',
        phonePlaceholder: '01XXXXXXXXX',
        product: 'কোন সামগ্রী চান?',
        productPlaceholder: 'সামগ্রী বেছে নিন',
        quantity: 'পরিমাণ',
        quantityPlaceholder: 'যেমন ২০০',
        unit: 'একক',
        address: 'ডেলিভারির ঠিকানা',
        addressPlaceholder: 'বাসা/প্রকল্পের নাম, সড়ক, এলাকা, শহর',
        message: 'অতিরিক্ত বার্তা (ঐচ্ছিক)',
        messagePlaceholder: 'ডেলিভারির সময়, সাইটে ঢোকার রাস্তার তথ্য ইত্যাদি লিখতে পারেন।',
      },
      preferTalk: 'সরাসরি কথা বলতে চান?',
      preferTalkBody: 'ফোন বা হোয়াটসঅ্যাপে দ্রুত রেট ও ডেলিভারির সময় জানিয়ে দেওয়া হয়।',
      messageLabel: 'বার্তা',
      unitHint: 'কোন এককে চান বেছে নিন',
      summaryTitle: 'আপনার অর্ডারের সারসংক্ষেপ',
      summaryEmpty: 'সামগ্রী ও পরিমাণ দিলে এখানে সারসংক্ষেপ দেখতে পাবেন।',
      summaryMaterial: 'সামগ্রী',
      summaryQuantity: 'পরিমাণ',
      summaryAddress: 'ঠিকানা',
      validation: {
        summaryTitle: 'নিচের ঘরগুলো একবার দেখে নিন',
        nameRequired: 'নাম লেখা আবশ্যক।',
        nameShort: 'অন্তত ৩ অক্ষরের নাম লিখুন।',
        phoneRequired: 'মোবাইল নম্বর দেওয়া আবশ্যক।',
        phoneInvalid: 'সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন, যেমন 01712345678।',
        productRequired: 'সামগ্রী বেছে নিন।',
        quantityRequired: 'কত পরিমাণ লাগবে লিখুন।',
        quantityInvalid: 'শুধু সংখ্যা দিয়ে পরিমাণ লিখুন।',
        quantityPositive: 'পরিমাণ শূন্যের বেশি হতে হবে।',
        unitRequired: 'একক বেছে নিন।',
        addressRequired: 'ডেলিভারির ঠিকানা আবশ্যক।',
        addressShort: 'ডেলিভারির জন্য আরও স্পষ্ট ঠিকানা লিখুন।',
        minQuantity: 'এই সামগ্রীতে নূন্যতম অর্ডার {{value}}।',
      },
      successTitle: 'আপনার অনুরোধ পাঠানো হয়েছে',
      successWhatsapp:
        'অর্ডারের তথ্যটি হোয়াটসঅ্যাপে পাঠানোর জন্য প্রস্তুত করা হয়েছে। বার্তাটি পাঠিয়ে দিন — আমরা দ্রুত যোগাযোগ করব।',
      successSaved: 'অর্ডার নম্বর {{ref}} — আমরা শীঘ্রই যোগাযোগ করব।',
      errorTitle: 'দুঃখিত, পাঠানো যায়নি',
      errorBody: 'সার্ভারে সংযোগ করা যায়নি বা একটি সমস্যা হয়েছে। ইন্টারনেট দেখে আবার চেষ্টা করুন, অথবা সরাসরি কল করুন।',
      statusNotConnected: 'অনলাইন অর্ডার সংরক্ষণ এখনো চালু হয়নি',
      statusConnected: 'এই অর্ডারটি সার্ভারে সংরক্ষিত হবে',
      statusNotConnectedHelp: 'বিস্তারিত জানতে README দেখুন',
    },

    quote: {
      title: 'কোটেশনের অনুরোধ',
      subtitle: 'তথ্য দিন — আমরা দাম ও ডেলিভারি সময় জানিয়ে দেব।',
      productLabel: 'সামগ্রী',
    },

    footer: {
      aboutTitle: 'আমাদের সম্পর্কে',
      aboutBody:
        'বাংলাদেশে বালু, সিলেট বালু, পাথর চিপস, নুড়ি পাথর ও নির্মাণ সামগ্রীর সরবরাহকারী। নিজস্ব ট্রাকে দ্রুত ডেলিভারি ও মাপা পরিমাণ।',
      quickLinks: 'দ্রুত লিঙ্ক',
      materials: 'সামগ্রী',
      contactTitle: 'যোগাযোগ',
      hoursTitle: 'সেবার সময়',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      builtNote: 'প্রয়োজনীয় তথ্য বদলাতে README দেখুন।',
    },

    notFound: {
      title: 'পৃষ্ঠাটি পাওয়া যায়নি',
      body: 'আপনি যে ঠিকানায় এসেছেন সেটি এই ওয়েবসাইটে নেই।',
    },

    meta: {
      homeTitle: 'বালু, পাথর ও নির্মাণ সামগ্রী সরবরাহ',
      productsTitle: 'পণ্যসমূহ — বালু, পাথর চিপস ও নুড়ি পাথর',
      deliveryTitle: 'ডেলিভারি ও সেবা',
      aboutTitle: 'আমাদের সম্পর্কে',
      contactTitle: 'যোগাযোগ ও অর্ডার',
      notFoundTitle: 'পৃষ্ঠা পাওয়া যায়নি',
    },
  },

  /* =======================================================================
     ENGLISH
     ======================================================================= */
  en: {
    lang: { label: 'Language', bn: 'বাংলা', en: 'English', switchTo: 'Switch language' },

    nav: {
      home: 'Home',
      products: 'Products',
      delivery: 'Delivery & Services',
      about: 'About Us',
      contact: 'Contact & Order',
      menu: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      callNow: 'Call Now',
      orderNow: 'Order Now',
    },

    actions: {
      requestQuote: 'Request a Quote',
      requestQuoteShort: 'Get a quote',
      orderNow: 'Order Now',
      callNow: 'Call',
      callUs: 'Call us',
      whatsapp: 'WhatsApp',
      whatsappOrder: 'Order on WhatsApp',
      viewProducts: 'View all products',
      viewAllProducts: 'See all materials',
      viewDelivery: 'Delivery & services',
      learnMore: 'Learn more',
      contactUs: 'Contact us',
      sendOrder: 'Send order request',
      sending: 'Sending…',
      sendViaWhatsapp: 'Send on WhatsApp',
      close: 'Close',
      openInMaps: 'Open in Google Maps',
      backToHome: 'Back to home',
      copy: 'Copy',
      copied: 'Copied',
      newRequest: 'New request',
    },

    common: {
      priceOnRequest: 'Price on request',
      priceFrom: 'Starting at',
      per: 'per',
      unitLabel: 'Unit',
      quantityLabel: 'Quantity',
      minOrder: 'Minimum order',
      availableUnits: 'Available in',
      specifications: 'Specifications',
      materialType: 'Material type',
      popular: 'Popular',
      of: 'of',
      showing: 'Showing',
      noResults: 'No materials found in this category.',
      loading: 'Loading…',
      required: 'required',
      optional: 'optional',
      demoNotice:
        'The business name, phone numbers and address on this site are demo placeholders. Replace them in src/data/company.js before going live.',
      notConnectedNotice:
        'Online order saving is not connected right now. Use the button below to send these details on WhatsApp, or call directly.',
    },

    home: {
      hero: {
        badge: 'Delivering across Bangladesh',
        title: 'Dependable supply of sand, stone',
        titleAccent: '& construction materials',
        subtitle:
          'Coarse sand, Sylhet sand, stone chips, gravel and bricks — delivered straight to your site on our own trucks, with measured quantities, a weigh slip and sample checks available.',
        primaryCta: 'Order or get a quote',
        secondaryCta: 'Browse the catalogue',
        imageAlt: 'Tipper truck loaded with sand at a construction site',
        trustPoints: [
          'Fast delivery across Bangladesh',
          'Measured loads with a weigh slip',
          'Cash on delivery available',
        ],
        cardTitle: 'Get a quote',
        cardSubtitle: 'Call or message us for today’s rates',
      },
      about: {
        eyebrow: 'About us',
        title: 'Transparency and punctuality in the sand & stone business',
        body:
          'We source material directly from river ghats and quarries and deliver it on our own trucks. Every load is measured, so the quantity is never in doubt. A small house project or a large development gets the same standard — and the same courtesy.',
        points: [
          'Our own trucks and drivers',
          'Sample checks before you order',
          'Pay after the material reaches your site',
          'Scheduled supply contracts for large projects',
        ],
        imageAlt: 'Loading sand and aggregate at a construction site',
        badgeLabel: 'material types',
        yearsLabel: 'years of experience',
      },
      why: {
        eyebrow: 'Why choose us',
        title: 'What sets our supply apart',
        subtitle: 'Material quality, accurate measurement and on-time delivery — those three are the whole promise.',
      },
      products: {
        eyebrow: 'Products',
        title: 'Our material catalogue',
        subtitle: 'Read the details of each material and send a quote request in one click.',
      },
      process: {
        eyebrow: 'How it works',
        title: 'From order to delivery, in four steps',
        subtitle: 'Call, message on WhatsApp or use the website form — whichever is easiest for you.',
        steps: [
          {
            title: 'Get in touch',
            body: 'Tell us the material, the quantity and where it should go, and we will price it for you.',
          },
          {
            title: 'Confirm the rate',
            body: 'We agree the rate, the unit choice and the delivery window, then confirm the order.',
          },
          {
            title: 'Loading and weighing',
            body: 'The material is loaded from the ghat or quarry and measured before the truck leaves.',
          },
          {
            title: 'Delivery to your site',
            body: 'The truck arrives in the agreed window with the measurement slip and payment options.',
          },
        ],
      },
      coverage: {
        eyebrow: 'Delivery coverage',
        title: 'Daily in and around Dhaka, truck-load nationwide',
        subtitle: 'These areas are served regularly; other districts are supplied by truck load.',
        dhakaZone: 'Regular delivery',
        longHaul: 'Nationwide by truck load',
      },
      cta: {
        title: 'Order the materials you need today',
        subtitle: 'Tell us the quantity and we will come back within minutes with rates and a delivery window.',
      },
      marquee: [
        'Filling Sand',
        'Coarse River Sand',
        'Sylhet Sand',
        'Stone Chips 3/4"',
        'Stone Chips 1/2"',
        'Stone Dust',
        'Gravel & Pebbles',
        'First Class Bricks',
      ],
    },

    productsPage: {
      eyebrow: 'Products',
      title: 'Materials and pricing',
      subtitle:
        'Pick what you need from the list below. Rates move with the market, so request a quote for a firm price.',
      filterLabel: 'Filter by type',
      resultCount: '{{count}} materials found',
      requestQuoteFor: 'Request a quote for {{name}}',
    },

    deliveryPage: {
      eyebrow: 'Delivery & services',
      title: 'Fast, measured and dependable delivery',
      subtitle:
        'With our own trucks and experienced drivers we aim for same-day delivery inside Dhaka and 1–3 days for other districts.',
      imageAlt: 'Delivery truck loaded with sand',
      servicesTitle: 'What we offer',
      services: [
        {
          title: 'Same-day delivery in Dhaka',
          body: 'Order in the morning for the same day; an afternoon order arrives the next morning.',
          icon: 'clock',
        },
        {
          title: 'Truck loads nationwide',
          body: 'Supply to any district by truck load — covered or tipper depending on the route.',
          icon: 'truck',
        },
        {
          title: 'Measured loads and slips',
          body: 'Every load is measured and the weight slip is handed over on delivery.',
          icon: 'scale',
        },
        {
          title: 'Unloading at your site',
          body: 'Material is tipped where you need it, wherever a truck can reach the site.',
          icon: 'package',
        },
        {
          title: 'Special rates on volume',
          body: 'Large projects can fix a rate and a supply schedule for the whole build.',
          icon: 'percent',
        },
        {
          title: 'Sample verification',
          body: 'Inspect a sample of the material before committing to a big order.',
          icon: 'eye',
        },
      ],
      stepsTitle: 'The delivery process',
      fleetTitle: 'Our fleet',
      fleet: [
        { title: 'Tipper trucks', body: 'For sand, chips and gravel tipped directly at your site.' },
        { title: 'Covered trucks', body: 'For longer hauls, keeping the material protected from dust and rain.' },
        { title: 'Loaders and labour', body: 'A trained crew for loading and unloading on site.' },
      ],
      zonesTitle: 'Delivery areas',
      notesTitle: 'Good to know',
      notes: [
        'Delivery timing depends on road conditions and traffic — rain or congestion can add a little delay.',
        'If the road to your site is narrow, tell us in advance so we send the right truck.',
        'Bigger quantities can mean a better rate — ask for a volume quote.',
      ],
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'Is delivery charged separately?',
          a: 'Delivery cost depends on distance and truck type. A quote shows the material price and the delivery charge separately.',
        },
        {
          q: 'How can I verify the material quality?',
          a: 'You can inspect a sample before a large order, and every delivery comes with a weight slip so quantity problems can be raised immediately.',
        },
        {
          q: 'How far ahead should I order?',
          a: 'Same-day is often possible inside Dhaka, but for a large load or a distant district please give us at least one day.',
        },
        {
          q: 'What are the payment options?',
          a: 'Cash on delivery is standard. Advance and credit terms can be discussed for larger projects.',
        },
      ],
    },

    aboutPage: {
      eyebrow: 'About us',
      title: 'How we approach material supply',
      subtitle:
        'We source directly, deliver on our own trucks, and measure every load so you know exactly what you received.',
      imageAlt: 'Construction project with workers on site',
      storyTitle: 'How we work',
      story: [
        'In the sand and stone trade the two real worries are quantity and quality. We try to be plain about both: material is measured as it is loaded, and you get a written slip when it is delivered.',
        'Our trucks and drivers are our own, which is why same-day delivery inside Dhaka is realistic and outlying districts can be scheduled. Large projects get a fixed schedule with regular supply.',
        'Whether you are building one house or a whole development, we aim to give the same standard and the same treatment. If anything is unclear, call or message us and we will sort it out directly.',
      ],
      valuesTitle: 'What we stand for',
      values: [
        { title: 'Measured honestly', body: 'Every load is measured and accounted for.', icon: 'scale' },
        { title: 'On time', body: 'If we promise a window, we work to it.', icon: 'clock' },
        { title: 'Quality you can check', body: 'Inspect a sample before you order.', icon: 'shield' },
        { title: 'Easy to reach', body: 'Phone, WhatsApp or the website — all open.', icon: 'phone' },
      ],
      statsTitle: 'At a glance',
      stats: [
        { value: '8', label: 'material types' },
        { value: '1', label: 'day delivery inside Dhaka' },
        { value: '64', label: 'districts we aim to reach' },
      ],
      coverageTitle: 'Where we deliver',
      cta: {
        title: 'Need supply for your project?',
        subtitle: 'Tell us the quantity and we will send rates and a delivery schedule.',
      },
    },

    contactPage: {
      eyebrow: 'Contact',
      title: 'Contact & order',
      subtitle: 'Call, message on WhatsApp or use the form below to order or request a quote at any time.',
      infoTitle: 'Reach us directly',
      phoneLabel: 'Phone',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'Email',
      addressLabel: 'Address',
      hoursLabel: 'Opening hours',
      formTitle: 'Order & quote request',
      formSubtitle: 'Fields marked with an asterisk are required. Share the details and we will get back quickly.',
      mapTitle: 'Our location',
      mapNote: 'Use the link below to see our area on the Dhaka map.',
    },

    order: {
      fields: {
        name: 'Name',
        namePlaceholder: 'Your name',
        phone: 'Mobile number',
        phonePlaceholder: '01XXXXXXXXX',
        product: 'Which material?',
        productPlaceholder: 'Choose a material',
        quantity: 'Quantity',
        quantityPlaceholder: 'e.g. 200',
        unit: 'Unit',
        address: 'Delivery address',
        addressPlaceholder: 'House / project name, road, area, city',
        message: 'Additional message (optional)',
        messagePlaceholder: 'Delivery timing, access notes for the truck, anything else.',
      },
      preferTalk: 'Prefer to talk to us?',
      preferTalkBody: 'Call or message on WhatsApp and we will give you rates and a delivery window quickly.',
      messageLabel: 'Message',
      unitHint: 'Choose the unit you want to order in',
      summaryTitle: 'Your order summary',
      summaryEmpty: 'Choose a material and quantity to see the summary here.',
      summaryMaterial: 'Material',
      summaryQuantity: 'Quantity',
      summaryAddress: 'Address',
      validation: {
        summaryTitle: 'Please check these fields',
        nameRequired: 'Please enter your name.',
        nameShort: 'Please enter at least 3 characters.',
        phoneRequired: 'A mobile number is required.',
        phoneInvalid: 'Enter a valid Bangladeshi mobile number, e.g. 01712345678.',
        productRequired: 'Please choose a material.',
        quantityRequired: 'Please enter the quantity you need.',
        quantityInvalid: 'Quantity must be a number.',
        quantityPositive: 'Quantity must be greater than zero.',
        unitRequired: 'Please choose a unit.',
        addressRequired: 'The delivery address is required.',
        addressShort: 'Please give a more specific delivery address.',
        minQuantity: 'The minimum order for this material is {{value}}.',
      },
      successTitle: 'Your request has been sent',
      successWhatsapp:
        'Your order details are ready in WhatsApp. Press send in WhatsApp and we will get back to you shortly.',
      successSaved: 'Order reference {{ref}} — we will contact you soon.',
      errorTitle: 'Sorry, that did not go through',
      errorBody:
        'We could not reach the server or something went wrong. Check your connection and try again, or call us directly.',
      statusNotConnected: 'Online order saving is not enabled yet',
      statusConnected: 'This order will be saved on the server',
      statusNotConnectedHelp: 'See the README for details',
    },

    quote: {
      title: 'Request a quote',
      subtitle: 'Share the details and we will come back with rates and a delivery window.',
      productLabel: 'Material',
    },

    footer: {
      aboutTitle: 'About us',
      aboutBody:
        'Supplier of sand, Sylhet sand, stone chips, gravel and construction materials in Bangladesh. Fast delivery on our own trucks, with measured quantities.',
      quickLinks: 'Quick links',
      materials: 'Materials',
      contactTitle: 'Contact',
      hoursTitle: 'Opening hours',
      rights: 'All rights reserved.',
      builtNote: 'See the README to change the placeholder business details.',
    },

    notFound: {
      title: 'Page not found',
      body: 'The address you followed does not exist on this website.',
    },

    meta: {
      homeTitle: 'Sand, stone & construction material supply',
      productsTitle: 'Products — sand, stone chips & gravel',
      deliveryTitle: 'Delivery & services',
      aboutTitle: 'About us',
      contactTitle: 'Contact & order',
      notFoundTitle: 'Page not found',
    },
  },
}

export const supportedLanguages = ['bn', 'en']
export const defaultLanguage = 'bn'

export default translations
