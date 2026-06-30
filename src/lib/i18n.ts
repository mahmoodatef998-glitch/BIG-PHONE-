export type Lang = 'en' | 'ar';

export type LegalSection = { heading: string; body: string[] };

export type Translations = {
  nav: {
    home: string; inventory: string; brands: string; about: string; contact: string;
    featured: string; categories: string; deals: string; shop: string; rfq: string;
  };
  announcement: string;
  header: {
    searchPlaceholder: string; getQuote: string; admin: string; switchLang: string;
    wholesale: string;
  };
  footer: {
    tagline: string; marketplace: string; categories: string; support: string;
    browseAll: string; newArrivals: string; deals: string; requestQuote: string;
    contactUs: string; aboutUs: string; staffLogin: string;
    smartphones: string; tablets: string; accessories: string; audio: string; smartwatches: string;
    privacy: string; terms: string; rights: string;
    location: string;
  };
  common: {
    viewAll: string; search: string; home: string; clearFilters: string; clearAll: string;
    products: string; product: string; noResults: string; tryAdjusting: string;
    browseInventory: string; requestQuotation: string; viewAllCount: string;
    imageComingSoon: string; specifications: string; moreFrom: string;
    onlyLeft: string; inStock: string; units: string; perUnit: string;
  };
  categories: {
    smartphones: string; tablets: string; accessories: string; audio: string;
    smartwatches: string; earbuds: string; gaming: string; laptops: string;
    shopByCategory: string; topCategories: string;
    smartphoneSub: string; tabletSub: string; accessorySub: string; audioSub: string;
    watchSub: string; gamingSub: string; laptopSub: string; earbudsSub: string;
  };
  product: {
    requestQuote: string; priceOnRequest: string; outOfStock: string; moq: string;
    storage: string; condition: string; color: string; battery: string;
    warranty: string; available: string; origin: string; verifiedStock: string;
    whatsappInquiry: string; requestWholesaleQuote: string; quoteSubtitle: string;
    syncVariantsHint: string; various: string; asIs: string; na: string;
  };
  conditions: {
    brandNew: string; certified: string; gradeA: string; gradeB: string;
    bigDeal: string; superSale: string;
    allConditions: string; allRefurbished: string;
  };
  home: {
    heroEyebrow: string; heroTitle1: string; heroTitle2: string; heroSub: string;
    heroSearchPlaceholder: string; browseProducts: string; getQuote: string;
    statSkus: string; statMarkets: string; statRating: string; statVerified: string;
    featuredEyebrow: string; featuredTitle: string; filterAll: string; filterNew: string; filterRefurb: string;
    noProductsCategory: string; browseAllProducts: string;
    popularEyebrow: string; popularTitle: string;
    accessoriesTitle: string; accessoriesSub: string;
    refurbIphonesTitle: string; refurbIphonesSub: string;
    newArrivalsTitle: string; newArrivalsSub: string;
    brandsTitle: string; brandsSub: string;
    trustTitle: string; whyTitle: string; ctaTitle: string; ctaSub: string;
    brandsAvailable: string; liveStock: string; liveStockAria: string;
    trustVerified: string; trustVerifiedSub: string; trustGrade: string; trustGradeSub: string;
    trustExport: string; trustExportSub: string; trustMoq: string; trustMoqSub: string;
    trustEyebrow: string; trustSectionTitle: string; trustSectionSub: string;
    trustSecure: string; trustSecureSub: string; trustSuppliers: string; trustSuppliersSub: string;
    trustDelivery: string; trustDeliverySub: string; trustWarranty: string; trustWarrantySub: string;
    trustQuality: string; trustQualitySub: string; trustProtection: string; trustProtectionSub: string;
    whyEyebrow: string; whyTitleFull: string; whySub: string;
    whyVerified: string; whyVerifiedSub: string; whyPrices: string; whyPricesSub: string;
    whySecure: string; whySecureSub: string; whyShipping: string; whyShippingSub: string;
    whyDiscovery: string; whyDiscoverySub: string; whyPlatform: string; whyPlatformSub: string;
    ctaBadge: string; ctaHeading: string; ctaBody: string; ctaStartSelling: string;
    ctaExplore: string; ctaWhatsapp: string;
  };
  inventory: {
    title: string; breadcrumb: string; searchPlaceholder: string;
    brand: string; allBrands: string; quickFilters: string; productType: string;
    featured: string; inStock: string; refurbished: string;
    condition: string; sortBy: string; sortNewest: string; sortStockHigh: string;
    sortStockLow: string; sortBrand: string;
    typeSmartphones: string; typeTablets: string; typeAudio: string; typeAccessories: string;
    featuredHeading: string; newArrivalsHeading: string; noProducts: string;
    noSearchResults: string; productsAvailable: string;
    excludeBrand: string; collectionLabel: string;
  };
  brands: {
    title: string; breadcrumb: string; browseAll: string; productsAvailable: string;
    pageTitle: string; pageSub: string; productsCount: string;
    backToInventory: string; productsInStock: string; noProductsFor: string;
  };
  rfqPage: {
    breadcrumb: string; heroTitle: string; heroSub: string; heroSubHighlight: string;
    formTitle: string; formRequired: string; whatNext: string;
    stepResponse: string; stepManager: string; stepExport: string;
    whatsappTitle: string; whatsappSub: string; whatsappBtn: string;
    statProducts: string; statResponse: string; statCountries: string;
  };
  productPage: {
    inventory: string; noProductsBrand: string;
  };
  about: {
    title: string; breadcrumb: string; heroSub: string;
    whoTitle: string; whoP1: string; whoP2: string; whoP3: string;
    qualityTitle: string; qualityDesc: string;
    globalTitle: string; globalDesc: string;
    b2bTitle: string; b2bDesc: string;
    trustedTitle: string; trustedDesc: string;
    standardsTitle: string; standardsSub: string;
    gradeBrandNew: string; gradeBrandNewDesc: string;
    gradeCertified: string; gradeCertifiedDesc: string;
    gradeA: string; gradeADesc: string;
    gradeB: string; gradeBDesc: string;
    ctaTitle: string; ctaSub: string;
  };
  contact: {
    title: string; breadcrumb: string; heroSub: string;
    whatsappPreferred: string; whatsappFast: string;
    email: string; phone: string; location: string; hours: string;
    hoursValue: string; formTitle: string;
  };
  rfq: {
    title: string; subtitle: string; whatsappInquiry: string;
    companyName: string; contactPerson: string; country: string;
    phone: string; email: string; product: string; quantity: string; notes: string;
    companyPlaceholder: string; contactPlaceholder: string; productPlaceholder: string;
    quantityPlaceholder: string; notesPlaceholder: string;
    submit: string; sending: string;
    successTitle: string; successMsg: string; submitAnother: string;
    selectCountry: string; noSpam: string; error: string;
  };
  legal: {
    privacyTitle: string; termsTitle: string; lastUpdated: string;
    privacySections: LegalSection[];
    termsSections: LegalSection[];
  };
  errors: {
    notFoundTitle: string; notFoundMsg: string; backHome: string;
    errorTitle: string; errorMsg: string; tryAgain: string;
  };
  whatsapp: {
    productInquiry: string; productQuote: string; generalQuote: string;
  };
  validation: {
    companyRequired: string; contactRequired: string; countryRequired: string;
    phoneRequired: string; emailRequired: string; productRequired: string;
    quantityMin: string; quantityMax: string;
  };
  meta: {
    siteDefault: string; siteDescription: string;
    inventoryTitle: string; inventoryDescription: string;
    brandsTitle: string; brandsDescription: string;
    aboutTitle: string; aboutDescription: string;
    contactTitle: string; contactDescription: string;
    rfqTitle: string; rfqDescription: string;
    privacyTitle: string; privacyDescription: string;
    termsTitle: string; termsDescription: string;
    productNotFound: string; productWholesaleSuffix: string; productDescription: string;
    brandNotFound: string; brandTitle: string; brandDescription: string;
  };
};

const privacyEn: LegalSection[] = [
  { heading: 'Introduction', body: ['BIG PHONE ("we", "our", "us") operates the bigphone.ae wholesale platform. This Privacy Policy explains how we collect, use, and protect information when you use our website or submit a quotation request.'] },
  { heading: 'Information We Collect', body: ['Business contact details: company name, contact person, email, phone, and country.', 'Inquiry details: product interest, quantity, and messages you submit via RFQ forms.', 'Technical data: browser type, pages visited, and approximate location via standard server logs.'] },
  { heading: 'How We Use Your Information', body: ['To respond to wholesale quotation requests and provide pricing.', 'To communicate about orders, stock availability, and shipping.', 'To improve our website and B2B services.', 'We do not sell your personal data to third parties.'] },
  { heading: 'Data Storage & Security', body: ['RFQ submissions are stored securely in our database (Supabase) with access restricted to authorized staff.', 'We use industry-standard measures to protect data in transit (HTTPS) and at rest.'] },
  { heading: 'Your Rights', body: ['You may request access, correction, or deletion of your business contact data by emailing us.', 'You may opt out of marketing communications at any time.'] },
  { heading: 'Contact', body: ['For privacy questions, contact us via the Contact page or WhatsApp on this website.'] },
];

const privacyAr: LegalSection[] = [
  { heading: 'مقدمة', body: ['تدير BIG PHONE ("نحن") منصة bigphone.ae للجملة. توضّح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها وحمايتها عند استخدام الموقع أو تقديم طلب عرض سعر.'] },
  { heading: 'المعلومات التي نجمعها', body: ['بيانات التواصل التجاري: اسم الشركة، الشخص المسؤول، البريد الإلكتروني، الهاتف، والدولة.', 'تفاصيل الاستفسار: المنتج المطلوب، الكمية، والرسائل عبر نماذج طلب عرض السعر.', 'بيانات تقنية: نوع المتصفح، الصفحات التي تزورها، والموقع التقريبي عبر سجلات الخادم.'] },
  { heading: 'كيف نستخدم معلوماتك', body: ['للرد على طلبات عروض أسعار الجملة وتقديم التسعير.', 'للتواصل بخصوص الطلبات والمخزون والشحن.', 'لتحسين الموقع وخدمات B2B.', 'لا نبيع بياناتك الشخصية لأطراف ثالثة.'] },
  { heading: 'تخزين البيانات والأمان', body: ['تُخزَّن طلبات عرض السعر بشكل آمن في قاعدة بياناتنا مع وصول مقيد للموظفين المصرّح لهم.', 'نستخدم معايير أمان قياسية لحماية البيانات أثناء النقل (HTTPS) والتخزين.'] },
  { heading: 'حقوقك', body: ['يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عبر التواصل معنا.', 'يمكنك إلغاء الاشتراك في الرسائل التسويقية في أي وقت.'] },
  { heading: 'تواصل معنا', body: ['لأسئلة الخصوصية، تواصل معنا عبر صفحة اتصل بنا أو واتساب على هذا الموقع.'] },
];

const termsEn: LegalSection[] = [
  { heading: 'Agreement', body: ['By using the BIG PHONE website, you agree to these Terms of Service. Our platform is intended for business buyers (B2B wholesale) only, not consumer retail.'] },
  { heading: 'Products & Pricing', body: ['Product listings show approximate availability. Final pricing, MOQ, and stock are confirmed upon quotation.', 'Prices are in AED unless stated otherwise. Images are for illustration; actual devices may vary by grade and configuration.'] },
  { heading: 'Orders & Payment', body: ['Orders are confirmed only after written quotation acceptance and agreed payment terms.', 'We reserve the right to refuse orders that do not meet minimum order quantities or compliance requirements.'] },
  { heading: 'Shipping & Export', body: ['Export documentation and shipping arrangements are agreed per order. Buyers are responsible for import duties and local compliance in destination countries.'] },
  { heading: 'Warranty & Returns', body: ['Warranty terms depend on product condition (brand new, certified, Grade A/B) and are stated on each quotation.', 'Returns are handled per our wholesale return policy communicated at the time of sale.'] },
  { heading: 'Limitation of Liability', body: ['BIG PHONE is not liable for indirect or consequential damages arising from use of the website or delayed shipments beyond our reasonable control.'] },
  { heading: 'Governing Law', body: ['These terms are governed by the laws of the United Arab Emirates. Disputes shall be subject to the courts of Dubai, UAE.'] },
];

const termsAr: LegalSection[] = [
  { heading: 'الموافقة', body: ['باستخدام موقع BIG PHONE، فإنك توافق على شروط الخدمة هذه. المنصة مخصّصة لمشتري الأعمال (جملة B2B) وليس للبيع بالتجزئة للمستهلكين.'] },
  { heading: 'المنتجات والأسعار', body: ['قوائم المنتجات تعكس التوفر التقريبي. يُؤكَّد السعر النهائي والحد الأدنى للطلب والمخزون عند تقديم عرض السعر.', 'الأسعار بالدرهم الإماراتي ما لم يُذكر غير ذلك. الصور للتوضيح وقد تختلف الأجهزة الفعلية حسب الدرجة والمواصفات.'] },
  { heading: 'الطلبات والدفع', body: ['تُؤكَّد الطلبات فقط بعد قبول عرض السعر كتابياً واتفاق شروط الدفع.', 'نحتفظ بحق رفض الطلبات التي لا تستوفي الحد الأدنى للكمية أو متطلبات الامتثال.'] },
  { heading: 'الشحن والتصدير', body: ['مستندات التصدير وترتيبات الشحن تُتفق عليها لكل طلب. المشتري مسؤول عن الرسوم الجمركية والامتثال المحلي في بلد الوصول.'] },
  { heading: 'الضمان والمرتجعات', body: ['شروط الضمان تعتمد على حالة المنتج (جديد، معتمد، درجة A/B) وتُذكر في كل عرض سعر.', 'المرتجعات تُدار وفق سياسة الجملة المُبلّغة وقت البيع.'] },
  { heading: 'حدود المسؤولية', body: ['BIG PHONE غير مسؤولة عن الأضرار غير المباشرة الناتجة عن استخدام الموقع أو تأخير الشحن خارج نطاق سيطرتنا المعقولة.'] },
  { heading: 'القانون الحاكم', body: ['تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة. وتختص محاكم دبي بالنزاعات.'] },
];

export const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: 'Home', inventory: 'Inventory', brands: 'Brands', about: 'About', contact: 'Contact', featured: 'Featured', categories: 'Categories', deals: 'Deals', shop: 'Shop', rfq: 'Get Quote' },
    announcement: 'Global Export · 50+ Countries · MOQ from 5 Units · WhatsApp 24/7',
    header: { searchPlaceholder: 'Search iPhone 15, Samsung S24, iPad...', getQuote: 'Get Quote', admin: 'Admin', switchLang: 'عربي', wholesale: 'WHOLESALE' },
    footer: {
      tagline: "UAE's trusted B2B wholesale supplier for new and refurbished mobile devices. Global export from Dubai.",
      marketplace: 'Marketplace', categories: 'Categories', support: 'Support',
      browseAll: 'Browse All', newArrivals: 'New Arrivals', deals: 'Deals', requestQuote: 'Request a Quote',
      contactUs: 'Contact Us', aboutUs: 'About Us', staffLogin: 'Staff Login',
      smartphones: 'Smartphones', tablets: 'Tablets', accessories: 'Accessories', audio: 'Audio', smartwatches: 'Smart Watches',
      privacy: 'Privacy Policy', terms: 'Terms of Service', rights: 'All rights reserved.',
      location: 'Dubai, United Arab Emirates',
    },
    common: {
      viewAll: 'View All', search: 'Search', home: 'Home', clearFilters: 'Clear filters', clearAll: 'Clear all',
      products: 'products', product: 'product', noResults: 'No products found',
      tryAdjusting: 'Try adjusting your filters.', browseInventory: 'Browse Inventory',
      requestQuotation: 'Request Quotation', viewAllCount: 'View all',
      imageComingSoon: 'Image coming soon', specifications: 'Specifications', moreFrom: 'More from {brand}',
      onlyLeft: 'Only {n} left', inStock: 'In Stock', units: 'units', perUnit: '/unit',
    },
    categories: {
      smartphones: 'Smartphones', tablets: 'Tablets', accessories: 'Accessories', audio: 'Audio',
      smartwatches: 'Smart Watches', earbuds: 'Earbuds & Audio', gaming: 'Gaming', laptops: 'Laptops',
      shopByCategory: 'Shop by Category', topCategories: 'Top Categories',
      smartphoneSub: 'iPhone & Android', tabletSub: 'iPad & Android', accessorySub: 'Cables & Chargers',
      audioSub: 'HiFi Headphones', watchSub: 'Apple & Samsung', gamingSub: 'Accessories & Gear', laptopSub: 'Mac & Windows', earbudsSub: 'AirPods & TWS',
    },
    product: {
      requestQuote: 'Request Quote', priceOnRequest: 'Price on Request', outOfStock: 'Out of Stock', moq: 'MOQ',
      storage: 'Storage', condition: 'Condition', color: 'Color', battery: 'Battery',
      warranty: 'Warranty', available: 'Available', origin: 'Origin', verifiedStock: 'Verified Stock',
      whatsappInquiry: 'WhatsApp Inquiry', requestWholesaleQuote: 'Request Wholesale Quote',
      quoteSubtitle: 'Get pricing & availability in under 2 hours', syncVariantsHint: '',
      various: 'Various', asIs: 'As-is', na: 'N/A',
    },
    conditions: {
      brandNew: 'Brand New', certified: 'Certified Refurbished', gradeA: 'Grade A', gradeB: 'Grade B',
      bigDeal: 'Big Deal', superSale: 'Super Sale',
      allConditions: 'All conditions', allRefurbished: 'All Refurbished',
    },
    home: {
      heroEyebrow: "UAE's Trusted B2B Wholesale Supplier",
      heroTitle1: 'Wholesale Mobile', heroTitle2: 'Devices', heroSub: 'Brand new & refurbished iPhones, Samsung, Xiaomi & more.\nMOQ from 5 units · Global export · Quote within 2 hours.',
      heroSearchPlaceholder: 'Search iPhone, Samsung, Xiaomi…',
      browseProducts: 'Browse Products', getQuote: 'Get a Quote',
      statSkus: 'SKUs in Stock', statMarkets: 'Export Markets', statRating: 'Client Rating', statVerified: 'Verified Stock',
      featuredEyebrow: 'Featured', featuredTitle: 'Featured Products',
      filterAll: 'All', filterNew: 'New', filterRefurb: 'Refurbished',
      noProductsCategory: 'No products in this category yet.', browseAllProducts: 'Browse All Products',
      popularEyebrow: 'Curated For You', popularTitle: 'Popular Listings',
      accessoriesTitle: 'Accessories', accessoriesSub: 'Cases, chargers, earbuds & more — top picks',
      refurbIphonesTitle: 'Refurbished iPhones', refurbIphonesSub: 'iPhone 11 Pro Max → 17 Pro Max — certified & graded',
      newArrivalsTitle: 'New Arrivals', newArrivalsSub: 'Latest products added to our catalog — all categories',
      brandsTitle: 'Shop by Brand', brandsSub: 'Apple, Samsung, Xiaomi & more',
      trustTitle: 'Why Buyers Trust Us', whyTitle: 'Why Choose BIG PHONE', ctaTitle: 'Ready to Start Wholesale?', ctaSub: 'Browse inventory or request a quotation today',
      brandsAvailable: 'Trusted Brands Available', liveStock: 'LIVE STOCK', liveStockAria: 'Live wholesale stock levels',
      trustVerified: 'Verified Stock', trustVerifiedSub: 'Live inventory counts',
      trustGrade: 'Grade A/B/Cert', trustGradeSub: 'Professional grading',
      trustExport: 'Global Export', trustExportSub: '50+ countries served',
      trustMoq: 'MOQ from 5', trustMoqSub: 'Flexible wholesale lots',
      trustEyebrow: 'Why Trust Us', trustSectionTitle: 'Built for Serious Buyers', trustSectionSub: 'Everything you need to trade wholesale electronics with confidence.',
      trustSecure: 'Secure Payments', trustSecureSub: 'Every transaction is protected with bank-grade encryption.',
      trustSuppliers: 'Verified Suppliers', trustSuppliersSub: 'All suppliers pass strict identity and quality verification.',
      trustDelivery: 'Fast Delivery', trustDeliverySub: 'Global shipping to 50+ countries with real-time tracking.',
      trustWarranty: 'Warranty Support', trustWarrantySub: 'Devices covered with manufacturer or seller warranty.',
      trustQuality: 'Quality Checked', trustQualitySub: 'Every product graded and inspected before listing.',
      trustProtection: 'Buyer Protection', trustProtectionSub: 'Dispute resolution and full refund guarantee on all orders.',
      whyEyebrow: 'Why Us', whyTitleFull: 'The smarter way to source wholesale electronics', whySub: 'From verified suppliers and wholesale pricing to secure payments and fast shipping — BIG PHONE is built for serious B2B buyers.',
      whyVerified: 'Verified Suppliers', whyVerifiedSub: 'Every seller on our platform is identity-verified and quality-approved.',
      whyPrices: 'Wholesale Prices', whyPricesSub: 'MOQ from 5 units. Best market prices directly from UAE distributors.',
      whySecure: 'Secure Transactions', whySecureSub: 'Escrow-style payment flow protects both buyers and sellers.',
      whyShipping: 'Fast Shipping', whyShippingSub: 'Same-day dispatch from Dubai warehouses to 50+ countries.',
      whyDiscovery: 'Easy Discovery', whyDiscoverySub: 'Filter by brand, condition, storage, and price to find exactly what you need.',
      whyPlatform: 'Multi-Vendor Platform', whyPlatformSub: 'Hundreds of vetted stores competing for your business — you always win.',
      ctaBadge: '✨ Join 500+ verified suppliers', ctaHeading: 'Ready to Grow Your Electronics Business?',
      ctaBody: 'Start listing your devices or browse thousands of wholesale listings from trusted UAE suppliers today.',
      ctaStartSelling: 'Request a Quote', ctaExplore: 'Explore Marketplace', ctaWhatsapp: 'WhatsApp Us',
    },
    inventory: {
      title: 'Wholesale Inventory', breadcrumb: 'Inventory', searchPlaceholder: 'Search model or product name...',
      brand: 'Brand', allBrands: 'All brands', quickFilters: 'Quick filters', productType: 'Product type',
      featured: 'Featured', inStock: 'In stock', refurbished: 'Refurbished',
      condition: 'Condition', sortBy: 'Sort by', sortNewest: 'Newest first', sortStockHigh: 'Most stock',
      sortStockLow: 'Least stock', sortBrand: 'Brand A–Z',
      typeSmartphones: 'Smartphones', typeTablets: 'Tablets', typeAudio: 'Audio', typeAccessories: 'Accessories',
      featuredHeading: 'Featured Products', newArrivalsHeading: 'New Arrivals',
      noProducts: 'No products found', noSearchResults: 'No results for "{q}". Try different keywords.',
      productsAvailable: 'available',
      excludeBrand: 'Excl. {brand}', collectionLabel: 'Collection',
    },
    brands: {
      title: 'Our Brands', breadcrumb: 'Brands', browseAll: 'Browse all inventory', productsAvailable: 'available',
      pageTitle: 'Shop by Brand', pageSub: "Choose from the world's leading mobile manufacturers",
      productsCount: '{n} Products', backToInventory: 'Back to Inventory',
      productsInStock: '{n} products in wholesale stock', noProductsFor: 'No products currently available for {brand}.',
    },
    rfqPage: {
      breadcrumb: 'Request Quotation', heroTitle: 'Request a Wholesale Quotation',
      heroSub: 'Fill in the form and our B2B team will send you pricing, stock availability and shipping details',
      heroSubHighlight: 'within 2 hours',
      formTitle: 'Your Quotation Details', formRequired: 'All fields marked * are required',
      whatNext: 'What happens next?',
      stepResponse: 'Response within 2 hours (business hours)',
      stepManager: 'Dedicated wholesale account manager',
      stepExport: 'Export documentation available',
      whatsappTitle: 'Prefer WhatsApp?', whatsappSub: 'Chat directly with our team for the fastest response.',
      whatsappBtn: 'Chat on WhatsApp',
      statProducts: 'Products', statResponse: 'Response', statCountries: 'Countries',
    },
    productPage: { inventory: 'Inventory', noProductsBrand: 'No products currently available for {brand}.' },
    about: {
      title: 'About BIG PHONE', breadcrumb: 'About',
      heroSub: 'Dubai-based B2B wholesale supplier specializing in refurbished and brand new smartphones, tablets, and mobile accessories for resellers worldwide.',
      whoTitle: 'Who We Are',
      whoP1: 'BIG PHONE is a leading B2B wholesale platform based in Dubai, UAE, supplying premium refurbished and brand new mobile devices to shops, traders, and export customers across 50+ countries.',
      whoP2: 'We work directly with manufacturers, authorized distributors, and certified refurbishers to bring you the best wholesale pricing on Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo, and more.',
      whoP3: 'Our commitment is simple: quality products, transparent grading, fast response, and competitive pricing — every single time.',
      qualityTitle: 'Quality Certified', qualityDesc: '100-point testing on every refurbished device',
      globalTitle: 'Global Reach', globalDesc: 'Export to 50+ countries with full documentation',
      b2bTitle: 'B2B Focused', b2bDesc: 'Dedicated account managers for wholesale buyers',
      trustedTitle: 'Trusted Brand', trustedDesc: 'Years of experience in mobile wholesale',
      standardsTitle: 'Our Refurbishment Standards', standardsSub: 'We never use the word "used" — every device is professionally graded',
      gradeBrandNew: 'Brand New', gradeBrandNewDesc: 'Sealed in original packaging. Never opened, full warranty.',
      gradeCertified: 'Certified Refurbished', gradeCertifiedDesc: 'Manufacturer or carrier certified. Fully tested, factory reset.',
      gradeA: 'Grade A Refurbished', gradeADesc: 'Excellent condition. No visible scratches. Battery 85%+ health.',
      gradeB: 'Grade B Refurbished', gradeBDesc: 'Good condition. Minor cosmetic wear. Battery 80%+ health. Great value.',
      ctaTitle: 'Ready to Start Wholesale?', ctaSub: 'Browse our inventory or request a quotation today',
    },
    contact: {
      title: 'Get in Touch', breadcrumb: 'Contact',
      heroSub: 'Our wholesale team is ready to help with pricing, stock and shipping.',
      whatsappPreferred: 'WhatsApp (Preferred)', whatsappFast: 'Fastest response — chat now',
      email: 'Email', phone: 'Phone', location: 'Location', hours: 'Business Hours',
      hoursValue: 'Mon – Sat: 9:00 AM – 7:00 PM (GST)', formTitle: 'Send Us a Wholesale Inquiry',
    },
    rfq: {
      title: 'Request Wholesale Quote', subtitle: 'Get pricing & availability in under 2 hours', whatsappInquiry: 'WhatsApp Inquiry',
      companyName: 'Company Name *', contactPerson: 'Contact Person *', country: 'Country *',
      phone: 'Phone / WhatsApp *', email: 'Email Address *', product: 'Product / Model *', quantity: 'Required Quantity (units) *', notes: 'Additional Notes',
      companyPlaceholder: 'ABC Mobile Trading LLC', contactPlaceholder: 'John Smith',
      productPlaceholder: 'e.g. iPhone 15 Pro 128GB Grade A', quantityPlaceholder: '50',
      notesPlaceholder: 'Specify colors, storage variants, destination port, delivery timeline...',
      submit: 'Send Quotation Request', sending: 'Sending...',
      successTitle: 'Quotation Request Sent!',
      successMsg: 'Thank you! Our wholesale team will review your request and get back to you within 2 hours via email or WhatsApp.',
      submitAnother: 'Submit Another Request', selectCountry: 'Select country...',
      noSpam: 'By submitting you agree to be contacted by our wholesale team. No spam ever.',
      error: 'Something went wrong. Please try again or contact us directly.',
    },
    legal: {
      privacyTitle: 'Privacy Policy', termsTitle: 'Terms of Service',
      lastUpdated: 'Last updated: June 2026',
      privacySections: privacyEn, termsSections: termsEn,
    },
    errors: {
      notFoundTitle: 'Page not found', notFoundMsg: 'The page you are looking for does not exist or has been moved.',
      backHome: 'Back to Home', errorTitle: 'Something went wrong',
      errorMsg: 'An unexpected error occurred. Please try again.', tryAgain: 'Try again',
    },
    whatsapp: {
      productInquiry: "Hi, I'm interested in {name}. Can you provide pricing for wholesale quantity?",
      productQuote: "Hi, I'd like a wholesale quote for: {name}. Quantity: ",
      generalQuote: 'Hi, I want a wholesale quote for mobile devices.',
    },
    validation: {
      companyRequired: 'Company name is required',
      contactRequired: 'Contact person is required',
      countryRequired: 'Country is required',
      phoneRequired: 'Valid phone number required',
      emailRequired: 'Valid email required',
      productRequired: 'Please specify the product',
      quantityMin: 'Minimum 1 unit',
      quantityMax: 'Max 100,000 units',
    },
    meta: {
      siteDefault: "BIG PHONE — UAE's Trusted B2B Mobile Marketplace",
      siteDescription: 'Wholesale mobile devices from Dubai — brand new and refurbished iPhones, Samsung, Xiaomi and more. MOQ from 5 units, global export.',
      inventoryTitle: 'Wholesale Mobile Phone Inventory',
      inventoryDescription: 'Browse wholesale inventory of brand new and refurbished iPhones, Samsung Galaxy, Xiaomi and more.',
      brandsTitle: 'Mobile Phone Brands',
      brandsDescription: 'Shop by brand — Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo wholesale devices.',
      aboutTitle: 'About Us',
      aboutDescription: 'Learn about BIG PHONE — UAE-based B2B wholesale supplier of mobile devices.',
      contactTitle: 'Contact Us',
      contactDescription: 'Get in touch with BIG PHONE wholesale team.',
      rfqTitle: 'Request Quotation',
      rfqDescription: 'Submit a wholesale quotation request for iPhones, Samsung, Xiaomi and other mobile devices. Get pricing within 2 hours.',
      privacyTitle: 'Privacy Policy',
      privacyDescription: 'BIG PHONE privacy policy — how we collect and use business inquiry data.',
      termsTitle: 'Terms of Service',
      termsDescription: 'BIG PHONE terms of service for B2B wholesale buyers.',
      productNotFound: 'Product Not Found',
      productWholesaleSuffix: ' — Wholesale',
      productDescription: 'Buy {name} wholesale from Dubai. {condition} | Stock: {stock} units | MOQ: {moq} | Fast global shipping.',
      brandNotFound: 'Brand Not Found',
      brandTitle: '{brand} Wholesale Inventory',
      brandDescription: 'Buy {brand} smartphones and devices wholesale from Dubai.',
    },
  },
  ar: {
    nav: { home: 'الرئيسية', inventory: 'المخزون', brands: 'الماركات', about: 'من نحن', contact: 'اتصل بنا', featured: 'مميز', categories: 'الفئات', deals: 'عروض', shop: 'تسوق', rfq: 'طلب سعر' },
    announcement: 'شحن دولي · +50 دولة · الحد الأدنى 5 وحدات · واتساب 24/7',
    header: { searchPlaceholder: 'ابحث عن iPhone 15، Galaxy S24، iPad...', getQuote: 'طلب سعر', admin: 'الإدارة', switchLang: 'EN', wholesale: 'جملة' },
    footer: {
      tagline: 'مورّد جملة B2B موثوق في الإمارات للأجهزة الجديدة والمجدّدة. تصدير عالمي من دبي.',
      marketplace: 'السوق', categories: 'الفئات', support: 'الدعم',
      browseAll: 'تصفح الكل', newArrivals: 'وصل حديثاً', deals: 'عروض', requestQuote: 'طلب عرض سعر',
      contactUs: 'اتصل بنا', aboutUs: 'من نحن', staffLogin: 'دخول الموظفين',
      smartphones: 'هواتف', tablets: 'أجهزة لوحية', accessories: 'إكسسوارات', audio: 'صوتيات', smartwatches: 'ساعات ذكية',
      privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', rights: 'جميع الحقوق محفوظة.',
      location: 'دبي، الإمارات العربية المتحدة',
    },
    common: {
      viewAll: 'عرض الكل', search: 'بحث', home: 'الرئيسية', clearFilters: 'مسح الفلاتر', clearAll: 'مسح الكل',
      products: 'منتجات', product: 'منتج', noResults: 'لا توجد منتجات',
      tryAdjusting: 'جرّب تعديل الفلاتر.', browseInventory: 'تصفح المخزون',
      requestQuotation: 'طلب عرض سعر', viewAllCount: 'عرض الكل',
      imageComingSoon: 'الصورة قريباً', specifications: 'المواصفات', moreFrom: 'المزيد من {brand}',
      onlyLeft: 'متبقي {n} فقط', inStock: 'متوفر', units: 'وحدة', perUnit: '/وحدة',
    },
    categories: {
      smartphones: 'هواتف', tablets: 'أجهزة لوحية', accessories: 'إكسسوارات', audio: 'صوتيات',
      smartwatches: 'ساعات ذكية', earbuds: 'سماعات وصوتيات', gaming: 'إكسسوارات ألعاب', laptops: 'لابتوب',
      shopByCategory: 'تسوق حسب الفئة', topCategories: 'أهم الفئات',
      smartphoneSub: 'iPhone وأندرويد', tabletSub: 'iPad وأندرويد', accessorySub: 'كابلات وشواحن',
      audioSub: 'سماعات HiFi', watchSub: 'Apple وSamsung', gamingSub: 'إكسسوارات', laptopSub: 'Mac وWindows', earbudsSub: 'AirPods ولاسلكي',
    },
    product: {
      requestQuote: 'طلب سعر', priceOnRequest: 'السعر عند الطلب', outOfStock: 'نفد المخزون', moq: 'الحد الأدنى',
      storage: 'السعة', condition: 'الحالة', color: 'اللون', battery: 'البطارية',
      warranty: 'الضمان', available: 'المتوفر', origin: 'المنشأ', verifiedStock: 'مخزون موثّق',
      whatsappInquiry: 'استفسار واتساب', requestWholesaleQuote: 'طلب عرض سعر جملة',
      quoteSubtitle: 'احصل على التسعير خلال ساعتين', syncVariantsHint: '',
      various: 'متنوع', asIs: 'كما هو', na: 'غ/م',
    },
    conditions: {
      brandNew: 'جديد', certified: 'مجدّد معتمد', gradeA: 'درجة A', gradeB: 'درجة B',
      bigDeal: 'Big Deal', superSale: 'Super Sale',
      allConditions: 'جميع الحالات', allRefurbished: 'جميع المجدّدة',
    },
    home: {
      heroEyebrow: 'مورّد الجملة الموثوق في الإمارات',
      heroTitle1: 'أجهزة موبايل', heroTitle2: 'بالجملة', heroSub: 'iPhone وSamsung وXiaomi جديدة ومجدّدة.\nحد أدنى 5 وحدات · تصدير عالمي · عرض سعر خلال ساعتين.',
      heroSearchPlaceholder: 'ابحث عن iPhone، Samsung، Xiaomi…',
      browseProducts: 'تصفح المنتجات', getQuote: 'احصل على عرض سعر',
      statSkus: 'منتج في المخزون', statMarkets: 'أسواق تصدير', statRating: 'تقييم العملاء', statVerified: 'مخزون موثّق',
      featuredEyebrow: 'مميز', featuredTitle: 'منتجات مميزة',
      filterAll: 'الكل', filterNew: 'جديد', filterRefurb: 'مجدّد',
      noProductsCategory: 'لا منتجات في هذه الفئة بعد.', browseAllProducts: 'تصفح كل المنتجات',
      popularEyebrow: 'مختار لك', popularTitle: 'قوائم شائعة',
      accessoriesTitle: 'إكسسوارات', accessoriesSub: 'أغطية، شواحن، سماعات — الأكثر طلباً',
      refurbIphonesTitle: 'iPhone مجدّد', refurbIphonesSub: 'iPhone 11 Pro Max → 17 Pro Max — معتمد ومصنّف',
      newArrivalsTitle: 'وصل حديثاً', newArrivalsSub: 'آخر المنتجات المضافة — جميع الفئات',
      brandsTitle: 'تسوق حسب الماركة', brandsSub: 'Apple وSamsung وXiaomi والمزيد',
      trustTitle: 'لماذا يثق بنا المشترون', whyTitle: 'لماذا BIG PHONE', ctaTitle: 'جاهز للجملة؟', ctaSub: 'تصفح المخزون أو اطلب عرض سعر اليوم',
      brandsAvailable: 'ماركات موثوقة متاحة', liveStock: 'مخزون مباشر', liveStockAria: 'مستويات مخزون الجملة المباشرة',
      trustVerified: 'مخزون موثّق', trustVerifiedSub: 'أعداد مخزون محدّثة',
      trustGrade: 'درجة A/B/معتمد', trustGradeSub: 'تصنيف احترافي',
      trustExport: 'تصدير عالمي', trustExportSub: 'خدمة +50 دولة',
      trustMoq: 'حد أدنى 5', trustMoqSub: 'دفعات جملة مرنة',
      trustEyebrow: 'لماذا تثق بنا', trustSectionTitle: 'مصمّم لمشتري الجملة الجادّين', trustSectionSub: 'كل ما تحتاجه لتجارة إلكترونيات الجملة بثقة.',
      trustSecure: 'مدفوعات آمنة', trustSecureSub: 'كل معاملة محمية بتشفير بمستوى البنوك.',
      trustSuppliers: 'مورّدون موثّقون', trustSuppliersSub: 'جميع المورّدين يجتازون التحقق من الهوية والجودة.',
      trustDelivery: 'شحن سريع', trustDeliverySub: 'شحن عالمي لـ +50 دولة مع تتبّع مباشر.',
      trustWarranty: 'دعم الضمان', trustWarrantySub: 'أجهزة مغطاة بضمان المصنّع أو البائع.',
      trustQuality: 'فحص الجودة', trustQualitySub: 'كل منتج مُصنَّف ومُفحص قبل الإدراج.',
      trustProtection: 'حماية المشتري', trustProtectionSub: 'حل النزاعات وضمان استرداد كامل على جميع الطلبات.',
      whyEyebrow: 'لماذا نحن', whyTitleFull: 'الطريقة الأذكى لتوريد إلكترونيات الجملة', whySub: 'من مورّدين موثّقين وأسعار جملة إلى مدفوعات آمنة وشحن سريع — BIG PHONE مبني لمشتري B2B الجادّين.',
      whyVerified: 'مورّدون موثّقون', whyVerifiedSub: 'كل بائع على منصتنا مُتحقَّق من هويته وجودة منتجاته.',
      whyPrices: 'أسعار الجملة', whyPricesSub: 'حد أدنى 5 وحدات. أفضل أسعار السوق مباشرة من موزّعي الإمارات.',
      whySecure: 'معاملات آمنة', whySecureSub: 'تدفق دفع محمي يحمي المشتري والبائع.',
      whyShipping: 'شحن سريع', whyShippingSub: 'إرسال في نفس اليوم من مستودعات دبي لـ +50 دولة.',
      whyDiscovery: 'بحث سهل', whyDiscoverySub: 'فلترة حسب الماركة والحالة والسعة والسعر.',
      whyPlatform: 'منصة متعددة البائعين', whyPlatformSub: 'مئات المتاجر المعتمدة تتنافس على خدمتك — أنت الرابح دائماً.',
      ctaBadge: '✨ انضم لـ +500 مورّد موثّق', ctaHeading: 'جاهز لتوسيع أعمال الإلكترونيات؟',
      ctaBody: 'تصفّح آلاف قوائم الجملة من مورّدين موثوقين في الإمارات اليوم.',
      ctaStartSelling: 'طلب عرض سعر', ctaExplore: 'استكشف السوق', ctaWhatsapp: 'تواصل عبر واتساب',
    },
    inventory: {
      title: 'مخزون الجملة', breadcrumb: 'المخزون', searchPlaceholder: 'ابحث عن موديل أو منتج...',
      brand: 'الماركة', allBrands: 'كل الماركات', quickFilters: 'فلاتر سريعة', productType: 'نوع المنتج',
      featured: 'مميز', inStock: 'متوفر', refurbished: 'مجدّد',
      condition: 'الحالة', sortBy: 'ترتيب', sortNewest: 'الأحدث', sortStockHigh: 'الأكثر مخزوناً',
      sortStockLow: 'الأقل مخزوناً', sortBrand: 'الماركة أ–ي',
      typeSmartphones: 'هواتف', typeTablets: 'أجهزة لوحية', typeAudio: 'صوتيات', typeAccessories: 'إكسسوارات',
      featuredHeading: 'منتجات مميزة', newArrivalsHeading: 'وصل حديثاً',
      noProducts: 'لا توجد منتجات', noSearchResults: 'لا نتائج لـ "{q}". جرّب كلمات أخرى.',
      productsAvailable: 'متوفر',
      excludeBrand: 'استثناء {brand}', collectionLabel: 'مجموعة',
    },
    brands: {
      title: 'ماركاتنا', breadcrumb: 'الماركات', browseAll: 'تصفح كل المخزون', productsAvailable: 'متوفر',
      pageTitle: 'تسوق حسب الماركة', pageSub: 'اختر من أبرز مصنعي الهواتف في العالم',
      productsCount: '{n} منتج', backToInventory: 'العودة للمخزون',
      productsInStock: '{n} منتج في مخزون الجملة', noProductsFor: 'لا منتجات متاحة حالياً لـ {brand}.',
    },
    rfqPage: {
      breadcrumb: 'طلب عرض سعر', heroTitle: 'طلب عرض سعر جملة',
      heroSub: 'املأ النموذج وسيرسل فريق B2B التسعير وتوفر المخزون وتفاصيل الشحن',
      heroSubHighlight: 'خلال ساعتين',
      formTitle: 'تفاصيل طلبك', formRequired: 'جميع الحقول المميزة بـ * مطلوبة',
      whatNext: 'ماذا يحدث بعد ذلك؟',
      stepResponse: 'رد خلال ساعتين (ساعات العمل)',
      stepManager: 'مدير حساب جملة مخصّص',
      stepExport: 'مستندات تصدير متاحة',
      whatsappTitle: 'تفضّل واتساب؟', whatsappSub: 'تحدّث مباشرة مع فريقنا لأسرع رد.',
      whatsappBtn: 'محادثة على واتساب',
      statProducts: 'منتج', statResponse: 'الرد', statCountries: 'دولة',
    },
    productPage: { inventory: 'المخزون', noProductsBrand: 'لا منتجات متاحة حالياً لـ {brand}.' },
    about: {
      title: 'عن BIG PHONE', breadcrumb: 'من نحن',
      heroSub: 'مورّد جملة B2B في دبي متخصص في الهواتف والأجهزة اللوحية والإكسسوارات للموزّعين حول العالم.',
      whoTitle: 'من نحن',
      whoP1: 'BIG PHONE منصة جملة B2B رائدة في دبي، نوفّر أجهزة موبايل جديدة ومجدّدة للمتاجر والتجار والتصدير في أكثر من 50 دولة.',
      whoP2: 'نعمل مباشرة مع المصنّعين والموزّعين المعتمدين ومراكز التجديد المعتمدة لأفضل أسعار الجملة على Apple وSamsung وXiaomi وHuawei وOppo وVivo.',
      whoP3: 'التزامنا بسيط: جودة، تصنيف شفاف، استجابة سريعة، وأسعار تنافسية — في كل مرة.',
      qualityTitle: 'جودة معتمدة', qualityDesc: 'فحص 100 نقطة لكل جهاز مجدّد',
      globalTitle: 'وصول عالمي', globalDesc: 'تصدير لـ +50 دولة مع مستندات كاملة',
      b2bTitle: 'تركيز B2B', b2bDesc: 'مديرو حسابات لمشتري الجملة',
      trustedTitle: 'علامة موثوقة', trustedDesc: 'سنوات خبرة في جملة الموبايل',
      standardsTitle: 'معايير التجديد', standardsSub: 'لا نستخدم كلمة "مستعمل" — كل جهاز مصنّف مهنياً',
      gradeBrandNew: 'جديد', gradeBrandNewDesc: 'مغلّف بعبوة المصنّع. لم يُفتح، ضمان كامل.',
      gradeCertified: 'مجدّد معتمد', gradeCertifiedDesc: 'معتمد من المصنّع أو المشغّل. مُختبر بالكامل ومعاد ضبط المصنع.',
      gradeA: 'مجدّد درجة A', gradeADesc: 'حالة ممتازة. بدون خدوش ظاهرة. بطارية +85%.',
      gradeB: 'مجدّد درجة B', gradeBDesc: 'حالة جيدة. علامات استخدام بسيطة. بطارية +80%. قيمة ممتازة.',
      ctaTitle: 'جاهز للجملة؟', ctaSub: 'تصفح المخزون أو اطلب عرض سعر اليوم',
    },
    contact: {
      title: 'تواصل معنا', breadcrumb: 'اتصل بنا',
      heroSub: 'فريق الجملة جاهز للمساعدة في الأسعار والمخزون والشحن.',
      whatsappPreferred: 'واتساب (مفضّل)', whatsappFast: 'أسرع رد — تحدث الآن',
      email: 'البريد', phone: 'الهاتف', location: 'الموقع', hours: 'ساعات العمل',
      hoursValue: 'الإثنين – السبت: 9:00 – 19:00 (GST)', formTitle: 'أرسل استفسار جملة',
    },
    rfq: {
      title: 'طلب عرض سعر جملة', subtitle: 'احصل على التسعير خلال ساعتين', whatsappInquiry: 'استفسار واتساب',
      companyName: 'اسم الشركة *', contactPerson: 'اسم المسؤول *', country: 'الدولة *',
      phone: 'الهاتف / واتساب *', email: 'البريد الإلكتروني *', product: 'المنتج / الموديل *', quantity: 'الكمية المطلوبة *', notes: 'ملاحظات',
      companyPlaceholder: 'شركة المثال للتجارة', contactPlaceholder: 'اسمك الكامل',
      productPlaceholder: 'مثال: iPhone 15 Pro 128GB', quantityPlaceholder: '50',
      notesPlaceholder: 'حدد الألوان، السعة، ميناء الوصول...',
      submit: 'إرسال طلب الاقتباس', sending: 'جاري الإرسال...',
      successTitle: 'تم إرسال الطلب!', successMsg: 'شكراً! سيراجع فريقنا طلبك ويتواصل خلال ساعتين.',
      submitAnother: 'طلب آخر', selectCountry: 'اختر الدولة...',
      noSpam: 'بالإرسال توافق على التواصل من فريق الجملة. بدون رسائل مزعجة.',
      error: 'حدث خطأ. حاول مرة أخرى أو تواصل معنا.',
    },
    legal: {
      privacyTitle: 'سياسة الخصوصية', termsTitle: 'شروط الخدمة',
      lastUpdated: 'آخر تحديث: يونيو 2026',
      privacySections: privacyAr, termsSections: termsAr,
    },
    errors: {
      notFoundTitle: 'الصفحة غير موجودة', notFoundMsg: 'الصفحة التي تبحث عنها غير موجودة أو نُقلت.',
      backHome: 'العودة للرئيسية', errorTitle: 'حدث خطأ',
      errorMsg: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.', tryAgain: 'حاول مرة أخرى',
    },
    whatsapp: {
      productInquiry: 'مرحباً، أنا مهتم بـ {name}. هل يمكنكم تزويدي بأسعار الجملة؟',
      productQuote: 'مرحباً، أود طلب عرض سعر جملة لـ: {name}. الكمية: ',
      generalQuote: 'مرحباً، أريد عرض سعر جملة لأجهزة موبايل.',
    },
    validation: {
      companyRequired: 'اسم الشركة مطلوب',
      contactRequired: 'اسم المسؤول مطلوب',
      countryRequired: 'الدولة مطلوبة',
      phoneRequired: 'رقم هاتف صالح مطلوب',
      emailRequired: 'بريد إلكتروني صالح مطلوب',
      productRequired: 'يرجى تحديد المنتج',
      quantityMin: 'الحد الأدنى وحدة واحدة',
      quantityMax: 'الحد الأقصى 100,000 وحدة',
    },
    meta: {
      siteDefault: 'BIG PHONE — سوق الجملة الموثوق للموبايل في الإمارات',
      siteDescription: 'أجهزة موبايل بالجملة من دبي — iPhone وSamsung وXiaomi جديدة ومجدّدة. حد أدنى 5 وحدات، تصدير عالمي.',
      inventoryTitle: 'مخزون هواتف الجملة',
      inventoryDescription: 'تصفّح مخزون الجملة من iPhone وSamsung Galaxy وXiaomi جديدة ومجدّدة.',
      brandsTitle: 'ماركات الهواتف',
      brandsDescription: 'تسوق حسب الماركة — Apple وSamsung وXiaomi وHuawei وOppo وVivo بالجملة.',
      aboutTitle: 'من نحن',
      aboutDescription: 'تعرّف على BIG PHONE — مورّد جملة B2B للأجهزة المحمولة في الإمارات.',
      contactTitle: 'اتصل بنا',
      contactDescription: 'تواصل مع فريق الجملة في BIG PHONE.',
      rfqTitle: 'طلب عرض سعر',
      rfqDescription: 'قدّم طلب عرض سعر جملة لـ iPhone وSamsung وXiaomi وغيرها. احصل على التسعير خلال ساعتين.',
      privacyTitle: 'سياسة الخصوصية',
      privacyDescription: 'سياسة خصوصية BIG PHONE — كيف نجمع ونستخدم بيانات استفسارات الأعمال.',
      termsTitle: 'شروط الخدمة',
      termsDescription: 'شروط خدمة BIG PHONE لمشتري الجملة B2B.',
      productNotFound: 'المنتج غير موجود',
      productWholesaleSuffix: ' — جملة',
      productDescription: 'اشترِ {name} بالجملة من دبي. {condition} | المخزون: {stock} وحدة | الحد الأدنى: {moq} | شحن عالمي سريع.',
      brandNotFound: 'الماركة غير موجودة',
      brandTitle: 'مخزون {brand} بالجملة',
      brandDescription: 'اشترِ هواتف وأجهزة {brand} بالجملة من دبي.',
    },
  },
};

/** Replace {key} placeholders in translated strings */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
    template,
  );
}

const CONDITION_KEYS: Record<string, keyof Translations['conditions']> = {
  'brand-new': 'brandNew',
  'refurbished-grade-a': 'gradeA',
  'refurbished-grade-b': 'gradeB',
  'certified-refurbished': 'certified',
  'big-deal': 'bigDeal',
  'super-sale': 'superSale',
};

export function conditionLabel(condition: string, t: Translations): string {
  const key = CONDITION_KEYS[condition];
  return key ? t.conditions[key] : condition;
}
