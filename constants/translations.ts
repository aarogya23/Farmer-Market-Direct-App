export type AppLanguage = 'en' | 'ne';

type TranslationShape = {
  splash: {
    brandTop: string;
    brandBottom: string;
    tagline: string;
    next: string;
  };
  language: {
    skip: string;
    title: string;
    subtitle: string;
    save: string;
    options: {
      english: string;
      nepali: string;
    };
  };
  signup: {
    hello: string;
    login: string;
    now: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    orWith: string;
    phoneLabel: string;
    phonePlaceholder: string;
    signIn: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    todaySales: string;
    newOrders: string;
    activeListings: string;
    quickActions: string;
    recentActivity: string;
    addProduct: string;
    manageOrders: string;
    weatherCenter: string;
    priceWatch: string;
  };
  market: {
    eyebrow: string;
    title: string;
    description: string;
    howItWorks: string;
    listings: string;
    viewAll: string;
    farmerPrice: string;
    marketAverage: string;
    save: string;
    impactTitle: string;
    impactText: string;
    farmerListing: string;
    directOrder: string;
    priceCompare: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    description: string;
    weatherAlerts: string;
    cropSuggestions: string;
    marketSignals: string;
  };
  profile: {
    title: string;
    subtitle: string;
    farmerName: string;
    role: string;
    location: string;
    phone: string;
    language: string;
    support: string;
    logout: string;
  };
  tabs: {
    dashboard: string;
    market: string;
    insights: string;
    profile: string;
  };
};

export const translations: Record<AppLanguage, TranslationShape> = {
  en: {
    splash: {
      brandTop: 'Farmer',
      brandBottom: 'Market Direct',
      tagline:
        'A direct marketplace that helps farmers earn fairly and buyers purchase fresh produce without middlemen.',
      next: 'Next',
    },
    language: {
      skip: 'Skip',
      title: 'Choose Your Preferred Language',
      subtitle: 'Please select your language before entering the app.',
      save: 'Save & Continue',
      options: {
        english: 'English',
        nepali: 'Nepali',
      },
    },
    signup: {
      hello: 'Hey,',
      login: 'Login',
      now: 'Now !',
      emailLabel: 'E-Mail / Username',
      emailPlaceholder: 'Enter e-mail address / username',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      forgotPassword: 'Forgot Password ?',
      orWith: 'or with',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Enter phone number',
      signIn: 'Sign In',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Track sales, orders, and farm activity from one place.',
      todaySales: 'Today sales',
      newOrders: 'New orders',
      activeListings: 'Active listings',
      quickActions: 'Quick actions',
      recentActivity: 'Recent activity',
      addProduct: 'Add product',
      manageOrders: 'Manage orders',
      weatherCenter: 'Weather center',
      priceWatch: 'Price watch',
    },
    market: {
      eyebrow: 'Farmer Market Direct',
      title: 'Fair prices for farmers. Fresh deals for buyers.',
      description:
        'A direct marketplace where farmers list produce, buyers order without middlemen, and everyone sees a clear market price comparison before purchase.',
      howItWorks: 'How the app works',
      listings: 'Live product listings',
      viewAll: 'View all',
      farmerPrice: 'Farmer price',
      marketAverage: 'Market average',
      save: 'Save',
      impactTitle: 'Built for social impact',
      impactText:
        'Every direct order helps farmers keep more of the sale price while giving buyers fresher, more trustworthy produce.',
      farmerListing: 'Farmer listing',
      directOrder: 'Direct order',
      priceCompare: 'Price compare',
    },
    insights: {
      eyebrow: 'Smart farming support',
      title: 'Weather alerts and crop guidance in one place',
      description:
        'Farmers can react faster to changing conditions, plan high-demand crops, and make better selling decisions with live pricing signals.',
      weatherAlerts: 'Weather alerts',
      cropSuggestions: 'Crop suggestions',
      marketSignals: 'Market price signals',
    },
    profile: {
      title: 'Profile',
      subtitle: 'Manage your farmer account, contact details, and preferences.',
      farmerName: 'Farmer name',
      role: 'Role',
      location: 'Location',
      phone: 'Phone',
      language: 'Language',
      support: 'Support',
      logout: 'Log out',
    },
    tabs: {
      dashboard: 'Dashboard',
      market: 'Market',
      insights: 'Insights',
      profile: 'Profile',
    },
  },
  ne: {
    splash: {
      brandTop: 'किसान',
      brandBottom: 'मार्केट डाइरेक्ट',
      tagline:
        'एक प्रत्यक्ष बजार जहाँ किसानले उचित मूल्य पाउँछन् र ग्राहकले बिचौलिया बिना ताजा उत्पादन किन्न सक्छन्।',
      next: 'अर्को',
    },
    language: {
      skip: 'छोड्नुहोस्',
      title: 'आफ्नो मनपर्ने भाषा छान्नुहोस्',
      subtitle: 'एप भित्र जानु अघि आफ्नो भाषा चयन गर्नुहोस्।',
      save: 'सेभ गरेर अगाडि बढ्नुहोस्',
      options: {
        english: 'अंग्रेजी',
        nepali: 'नेपाली',
      },
    },
    signup: {
      hello: 'नमस्ते,',
      login: 'लगइन',
      now: 'गर्नुहोस् !',
      emailLabel: 'इमेल / प्रयोगकर्ता नाम',
      emailPlaceholder: 'इमेल ठेगाना / प्रयोगकर्ता नाम लेख्नुहोस्',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड लेख्नुहोस्',
      forgotPassword: 'पासवर्ड बिर्सनुभयो ?',
      orWith: 'वा',
      phoneLabel: 'फोन नम्बर',
      phonePlaceholder: 'फोन नम्बर लेख्नुहोस्',
      signIn: 'साइन इन',
    },
    dashboard: {
      title: 'ड्यासबोर्ड',
      subtitle: 'एकै ठाउँबाट बिक्री, अर्डर र खेती गतिविधि हेर्नुहोस्।',
      todaySales: 'आजको बिक्री',
      newOrders: 'नयाँ अर्डर',
      activeListings: 'सक्रिय सूची',
      quickActions: 'छिटो कार्य',
      recentActivity: 'हालिको गतिविधि',
      addProduct: 'उत्पादन थप्नुहोस्',
      manageOrders: 'अर्डर व्यवस्थापन',
      weatherCenter: 'मौसम केन्द्र',
      priceWatch: 'मूल्य हेर्नुहोस्',
    },
    market: {
      eyebrow: 'किसान मार्केट डाइरेक्ट',
      title: 'किसानका लागि उचित मूल्य। ग्राहकका लागि ताजा सौदा।',
      description:
        'एक प्रत्यक्ष बजार जहाँ किसानले आफ्नो उत्पादन सूचीकृत गर्छन्, ग्राहकले बिचौलिया बिना अर्डर गर्छन्, र किन्ने अघि स्पष्ट बजार मूल्य तुलना देखिन्छ।',
      howItWorks: 'एप कसरी काम गर्छ',
      listings: 'प्रत्यक्ष उत्पादन सूची',
      viewAll: 'सबै हेर्नुहोस्',
      farmerPrice: 'किसान मूल्य',
      marketAverage: 'बजार औसत',
      save: 'बचत',
      impactTitle: 'सामाजिक प्रभावका लागि बनाइएको',
      impactText:
        'हरेक प्रत्यक्ष अर्डरले किसानलाई बिक्री रकमको ठूलो हिस्सा राख्न मद्दत गर्छ र ग्राहकलाई अझ ताजा तथा भरपर्दो उत्पादन दिन्छ।',
      farmerListing: 'किसान सूची',
      directOrder: 'प्रत्यक्ष अर्डर',
      priceCompare: 'मूल्य तुलना',
    },
    insights: {
      eyebrow: 'स्मार्ट खेती सहयोग',
      title: 'एकै ठाउँमा मौसम सूचना र बाली सुझाव',
      description:
        'किसानले बदलिँदो अवस्थालाई छिटो सम्हाल्न, बढी माग भएका बाली योजना बनाउन, र प्रत्यक्ष मूल्य संकेतका आधारमा राम्रो निर्णय लिन सक्छन्।',
      weatherAlerts: 'मौसम सूचना',
      cropSuggestions: 'बाली सुझाव',
      marketSignals: 'बजार मूल्य संकेत',
    },
    profile: {
      title: 'प्रोफाइल',
      subtitle: 'किसान खाता, सम्पर्क विवरण र रुचि व्यवस्थापन गर्नुहोस्।',
      farmerName: 'किसानको नाम',
      role: 'भूमिका',
      location: 'ठेगाना',
      phone: 'फोन',
      language: 'भाषा',
      support: 'सहयोग',
      logout: 'लग आउट',
    },
    tabs: {
      dashboard: 'ड्यासबोर्ड',
      market: 'बजार',
      insights: 'जानकारी',
      profile: 'प्रोफाइल',
    },
  },
};
