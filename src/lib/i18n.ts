export type Lang = 'en' | 'ar';

export type Translations = {
  nav: { home: string; inventory: string; brands: string; about: string; contact: string };
  announcement: string;
  header: { searchPlaceholder: string; getQuote: string; admin: string; switchLang: string };
  categories: { smartphones: string; tablets: string; accessories: string };
  product: { requestQuote: string; priceOnRequest: string; outOfStock: string; moq: string };
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
};

export const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: 'Home', inventory: 'Inventory', brands: 'Brands', about: 'About', contact: 'Contact' },
    announcement: 'Global Export · 50+ Countries · MOQ from 5 Units · WhatsApp 24/7',
    header: {
      searchPlaceholder: 'Search iPhone 15, Samsung S24, iPad...',
      getQuote: 'Get Quote',
      admin: 'Admin',
      switchLang: 'عربي',
    },
    categories: { smartphones: 'Smartphones', tablets: 'Tablets', accessories: 'Accessories' },
    product: { requestQuote: 'Request Quote', priceOnRequest: 'Price on Request', outOfStock: 'Out of Stock', moq: 'MOQ' },
    rfq: {
      title: 'Request Wholesale Quote',
      subtitle: 'Get pricing & availability in under 2 hours',
      whatsappInquiry: 'WhatsApp Inquiry',
      companyName: 'Company Name *',
      contactPerson: 'Contact Person *',
      country: 'Country *',
      phone: 'Phone / WhatsApp *',
      email: 'Email Address *',
      product: 'Product / Model *',
      quantity: 'Required Quantity (units) *',
      notes: 'Additional Notes',
      companyPlaceholder: 'ABC Mobile Trading LLC',
      contactPlaceholder: 'John Smith',
      productPlaceholder: 'e.g. iPhone 15 Pro 128GB Grade A',
      quantityPlaceholder: '50',
      notesPlaceholder: 'Specify colors, storage variants, destination port, delivery timeline...',
      submit: 'Send Quotation Request',
      sending: 'Sending...',
      successTitle: 'Quotation Request Sent!',
      successMsg: 'Thank you! Our wholesale team will review your request and get back to you within 2 hours via email or WhatsApp.',
      submitAnother: 'Submit Another Request',
      selectCountry: 'Select country...',
      noSpam: 'By submitting you agree to be contacted by our wholesale team. No spam ever.',
      error: 'Something went wrong. Please try again or contact us directly.',
    },
  },
  ar: {
    nav: { home: 'الرئيسية', inventory: 'المخزون', brands: 'الماركات', about: 'من نحن', contact: 'اتصل بنا' },
    announcement: 'شحن دولي · +50 دولة · الحد الأدنى 5 وحدات · واتساب 24/7',
    header: {
      searchPlaceholder: 'ابحث عن iPhone 15، Galaxy S24...',
      getQuote: 'طلب سعر',
      admin: 'الإدارة',
      switchLang: 'EN',
    },
    categories: { smartphones: 'هواتف', tablets: 'أجهزة لوحية', accessories: 'إكسسوارات' },
    product: { requestQuote: 'طلب سعر', priceOnRequest: 'السعر عند الطلب', outOfStock: 'نفد المخزون', moq: 'الحد الأدنى' },
    rfq: {
      title: 'طلب عرض سعر جملة',
      subtitle: 'احصل على التسعير خلال ساعتين',
      whatsappInquiry: 'استفسار واتساب',
      companyName: 'اسم الشركة *',
      contactPerson: 'اسم المسؤول *',
      country: 'الدولة *',
      phone: 'الهاتف / واتساب *',
      email: 'البريد الإلكتروني *',
      product: 'المنتج / الموديل *',
      quantity: 'الكمية المطلوبة (وحدة) *',
      notes: 'ملاحظات إضافية',
      companyPlaceholder: 'شركة المثال للهواتف',
      contactPlaceholder: 'اسمك الكامل',
      productPlaceholder: 'مثال: iPhone 15 Pro 128GB',
      quantityPlaceholder: '50',
      notesPlaceholder: 'حدد الألوان، السعة، ميناء الوصول...',
      submit: 'إرسال طلب الاقتباس',
      sending: 'جاري الإرسال...',
      successTitle: 'تم إرسال الطلب!',
      successMsg: 'شكراً! سيراجع فريق المبيعات طلبك ويتواصل معك خلال ساعتين عبر البريد الإلكتروني أو واتساب.',
      submitAnother: 'تقديم طلب آخر',
      selectCountry: 'اختر الدولة...',
      noSpam: 'بالإرسال توافق على التواصل من قِبَل فريق المبيعات. لا رسائل مزعجة.',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.',
    },
  },
};
