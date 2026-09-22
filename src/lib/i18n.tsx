import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'es' | 'en' | 'zh' | 'hi' | 'ar' | 'fr' | 'bn' | 'pt' | 'ru' | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  locale: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', locale: 'es-ES' },
  { code: 'en', name: 'English', nativeName: 'English', locale: 'en-US' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', locale: 'zh-CN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', locale: 'hi-IN' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', locale: 'ar-SA', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', locale: 'fr-FR' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', locale: 'bn-BD' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', locale: 'pt-BR' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', locale: 'ru-RU' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', locale: 'ja-JP' },
];

export interface Translations {
  nav: {
    home: string;
    worldClock: string;
    compare: string;
    tools: string;
    blog: string;
  };
  header: {
    format12h: string;
    format24h: string;
    searchPlaceholder: string;
    selectLanguage: string;
  };
  hero: {
    exactTime: string;
    syncedWith: string;
    sunrise: string;
    sunset: string;
    dayLength: string;
    day: string;
    night: string;
    dragGlobe: string;
  };
  search: {
    title: string;
    placeholder: string;
    suggested: string;
    noResults: string;
  };
  comparator: {
    title: string;
    addCity: string;
    overlap: string;
    difference: string;
  };
  tools: {
    title: string;
    meetingPlanner: string;
    stopwatch: string;
    timer: string;
    alarm: string;
    converter: string;
  };
  worldClock: {
    title: string;
    subtitle: string;
    primaryLocation: string;
    emptyList: string;
    removeCity: string;
    searchTitle: string;
    searchPlaceholder: string;
    noResults: string;
    add: string;
    quickSuggestions: string;
  };
  blog: {
    title: string;
    subtitle: string;
    allCategories: string;
    searchPlaceholder: string;
    readMore: string;
    backToBlog: string;
    publishedOn: string;
    relatedPosts: string;
    featuredSnippetTitle: string;
    noResults: string;
    share: string;
    linkCopied: string;
    liveWidgetTitle: string;
  };
  about: {
    title: string;
    storyTitle: string;
    storyBody: string;
    missionTitle: string;
    missionBody: string;
  };
  privacy: {
    title: string;
    rightsReserved: string;
    noCookiesTitle: string;
    noCookiesBody: string;
    localProcessingTitle: string;
    localProcessingBody: string;
  };
  footer: {
    tagline: string;
    legalTitle: string;
  };
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  es: {
    nav: { home: 'Hora Actual', worldClock: 'Reloj Mundial', compare: 'Planificador de Reuniones', tools: 'Herramientas', blog: 'Blog' },
    header: { format12h: '12H', format24h: '24H', searchPlaceholder: 'Buscar ciudad...', selectLanguage: 'Seleccionar idioma' },
    hero: {
      exactTime: '¡Tu hora es exacta!',
      syncedWith: 'Sincronizado con servidor de alta precisión (±14ms)',
      sunrise: 'Salida del Sol',
      sunset: 'Puesta del Sol',
      dayLength: 'Duración del día',
      day: 'Día',
      night: 'Noche',
      dragGlobe: 'Arrastra para rotar la Tierra en 3D'
    },
    search: { title: 'Buscar Ciudad o País', placeholder: 'Escribe el nombre de una ciudad...', suggested: 'Ciudades Sugeridas', noResults: 'No se encontraron ciudades' },
    comparator: { title: 'Planificador de Reuniones', addCity: 'Agregar Ciudad', overlap: 'Horario de Trabajo Recomendado (9:00 AM - 5:00 PM)', difference: 'Diferencia:' },
    tools: { title: 'Herramientas', meetingPlanner: 'Planificador de Reuniones', stopwatch: 'Cronómetro', timer: 'Temporizador', alarm: 'Alarma', converter: 'Convertidor UTC' },
    worldClock: {
      title: 'Reloj Mundial',
      subtitle: 'Monitorea la hora exacta en múltiples ciudades simultáneamente.',
      primaryLocation: 'TU UBICACIÓN PRINCIPAL',
      emptyList: 'No has agregado ciudades adicionales a tu Reloj Mundial. Utiliza el buscador a continuación para agregar cualquier ciudad.',
      removeCity: 'Eliminar de mi Reloj Mundial',
      searchTitle: 'Buscar y agregar cualquier ciudad a tu Reloj Mundial:',
      searchPlaceholder: 'Escribe para buscar cualquier ciudad (ej. San Francisco, París, Tokio, Miami, Chicago)...',
      noResults: 'No se encontraron ciudades disponibles para',
      add: 'Añadir',
      quickSuggestions: 'Sugerencias rápidas para añadir:'
    },
        blog: {
      title: 'Blog 9:41 AM',
      subtitle: 'Inteligencia horaria, guías internacionales, productividad y cultura tech.',
      allCategories: 'Todas las Categorías',
      searchPlaceholder: 'Buscar artículos...',
      readMore: 'Leer Artículo Completo',
      backToBlog: '← Volver al Blog',
      publishedOn: 'Publicado el',
      relatedPosts: 'Artículos Relacionados',
      featuredSnippetTitle: 'Respuesta Rápida (Featured Snippet)',
      noResults: 'No se encontraron artículos que coincidan con tu búsqueda.',
      share: 'Compartir',
      linkCopied: '¡Enlace copiado!',
      liveWidgetTitle: 'Herramienta Interactiva en Vivo — 9:41 AM'
    },
    about: {
      title: 'Acerca de Nosotros',
      storyTitle: 'Inspiración & Homenaje a Apple',
      storyBody: 'Como fanáticos de Apple, la inspiración de nuestra plataforma surge de la mítica hora 9:41 AM. El 9 de enero de 2007 a las 9:41 a.m., Steve Jobs presentó el iPhone original al mundo. Desde aquel hito histórico, las 9:41 AM ha permanecido como la hora oficial fijada en las imágenes y anuncios de los productos de Apple.',
      missionTitle: 'Nuestra Misión',
      missionBody: 'Inspirados en esa búsqueda de simetría, elegancia y máxima precisión, creamos 9:41 AM: una plataforma temporal global de alta precisión sincronizada a ±14ms, diseñada bajo la filosofía "Time, beautifully simple."'
    },
    privacy: {
      title: 'Política de Privacidad y Seguridad',
      rightsReserved: '© 2026 9:41 AM — Todos los derechos reservados.',
      noCookiesTitle: 'Cero Cookies Invasivas y Cero Rastreo',
      noCookiesBody: 'En 9:41 AM la privacidad es nuestra máxima prioridad. No recopilamos, compartimos ni vendemos ningún tipo de datos personales, historial de navegación ni información del usuario a terceros. No utilizamos cookies de rastreo publicitario.',
      localProcessingTitle: 'Procesamiento 100% Local y Seguro',
      localProcessingBody: 'Todas las configuraciones, zonas horarias y ciudades preferidas se gestionan exclusivamente de forma local en tu navegador para garantizar una experiencia 100% privada, rápida y segura.'
    },
    footer: { tagline: '9:41 AM es una plataforma global de información temporal de alta precisión. Time, beautifully simple.', legalTitle: 'Información y Legal' }
  },
  en: {
    nav: { home: 'Current Time', worldClock: 'World Clock', compare: 'Meeting Planner', tools: 'Time Tools', blog: 'Blog' },
    header: { format12h: '12H', format24h: '24H', searchPlaceholder: 'Search city...', selectLanguage: 'Select Language' },
    hero: {
      exactTime: 'Your time is exact!',
      syncedWith: 'Synchronized with high-precision server (±14ms)',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      dayLength: 'Day length',
      day: 'Day',
      night: 'Night',
      dragGlobe: 'Drag to rotate 3D Earth'
    },
    search: { title: 'Search City or Country', placeholder: 'Type a city name...', suggested: 'Suggested Cities', noResults: 'No cities found' },
    comparator: { title: 'Meeting Planner', addCity: 'Add City', overlap: 'Recommended Working Overlap (9:00 AM - 5:00 PM)', difference: 'Difference:' },
    tools: { title: 'Time Tools', meetingPlanner: 'Meeting Planner', stopwatch: 'Stopwatch', timer: 'Timer', alarm: 'Alarm', converter: 'UTC Converter' },
    worldClock: {
      title: 'World Clock',
      subtitle: 'Monitor exact time in multiple cities simultaneously.',
      primaryLocation: 'YOUR PRIMARY LOCATION',
      emptyList: 'You have not added additional cities to your World Clock. Use the search below to add any city.',
      removeCity: 'Remove from my World Clock',
      searchTitle: 'Search and add any city to your World Clock:',
      searchPlaceholder: 'Type to search any city (e.g. San Francisco, Paris, Tokyo, Miami, Chicago)...',
      noResults: 'No available cities found for',
      add: 'Add',
      quickSuggestions: 'Quick suggestions to add:'
    },
        blog: {
      title: '9:41 AM Blog',
      subtitle: 'Time intelligence, international guides, productivity & tech culture.',
      allCategories: 'All Categories',
      searchPlaceholder: 'Search articles...',
      readMore: 'Read Full Article',
      backToBlog: '← Back to Blog',
      publishedOn: 'Published on',
      relatedPosts: 'Related Articles',
      featuredSnippetTitle: 'Quick Answer (Featured Snippet)',
      noResults: 'No articles found matching your search.',
      share: 'Share',
      linkCopied: 'Link copied!',
      liveWidgetTitle: 'Live Interactive Tool — 9:41 AM'
    },
    footer: { tagline: '9:41 AM is a global high-precision time information platform. Time, beautifully simple.', legalTitle: 'Information & Legal' },
    about: {
      title: 'About Us',
      storyTitle: 'Inspiration & Apple Tribute',
      storyBody: 'As avid Apple fans, the inspiration for our platform stems from the iconic 9:41 AM time. On January 9, 2007, at 9:41 AM, Steve Jobs introduced the original iPhone to the world. Ever since that historic moment, 9:41 AM has remained the legendary time shown on official Apple product imagery.',
      missionTitle: 'Our Mission',
      missionBody: 'Inspired by that relentless pursuit of elegance, symmetry, and high precision, we created 9:41 AM: a global high-precision time platform synchronized to ±14ms, crafted under the philosophy "Time, beautifully simple."'
    },
    privacy: {
      title: 'Privacy & Security Policy',
      rightsReserved: '© 2026 9:41 AM — All rights reserved.',
      noCookiesTitle: 'Zero Tracking & Zero Invasiveness',
      noCookiesBody: 'At 9:41 AM, user privacy is our top priority. We do not collect, share, or sell any personal data, browsing history, or user information to third parties. We do not use advertising tracking cookies.',
      localProcessingTitle: '100% Local & Secure Processing',
      localProcessingBody: 'All settings, timezones, and city preferences are managed strictly locally within your browser to guarantee a 100% private, fast, and secure experience.'
    }
  },
  zh: {
    nav: { home: '当前时间', worldClock: '世界时钟', compare: '会议计划', tools: '时间工具', blog: '博客' },
    header: { format12h: '12小时制', format24h: '24小时制', searchPlaceholder: '搜索城市...', selectLanguage: '选择语言' },
    hero: {
      exactTime: '您的时间准确无误！',
      syncedWith: '与高精度服务器同步 (±14ms)',
      sunrise: '日出',
      sunset: '日落',
      dayLength: '白昼时长',
      day: '白天',
      night: '夜晚',
      dragGlobe: '拖动以3D旋转地球'
    },
    search: { title: '搜索城市或国家', placeholder: '输入城市名称...', suggested: '推荐城市', noResults: '未找到匹配城市' },
    comparator: { title: '会议计划', addCity: '添加城市', overlap: '推荐工作重叠时间 (9:00 AM - 5:00 PM)', difference: '时差:' },
    tools: { title: '时间工具', meetingPlanner: '会议计划', stopwatch: '秒表', timer: '倒计时', alarm: '闹钟', converter: 'UTC转换器' },
    worldClock: {
      title: '世界时钟',
      subtitle: '同时监控多个城市的准确时间。',
      primaryLocation: '您的主要位置',
      emptyList: '您尚未将其他城市添加到世界时钟。请使用下面的搜索框添加任意城市。',
      removeCity: '从我的世界时钟中移除',
      searchTitle: '搜索并添加任意城市到您的世界时钟：',
      searchPlaceholder: '输入以搜索任何城市（例如 旧金山、巴黎、东京、迈阿密、芝加哥）...',
      noResults: '未找到可用的城市：',
      add: '添加',
      quickSuggestions: '快速添加建议：'
    },
        blog: {
      title: '9:41 AM 博客',
      subtitle: '时间智能、跨国指南、生产力与科技文化。',
      allCategories: '所有分类',
      searchPlaceholder: '搜索文章...',
      readMore: '阅读全文',
      backToBlog: '← 返回博客',
      publishedOn: '发布于',
      relatedPosts: '相关文章',
      featuredSnippetTitle: '快速解答 (Featured Snippet)',
      noResults: '未找到符合搜索条件的文章。',
      share: '分享',
      linkCopied: '链接已复制！',
      liveWidgetTitle: '实时互动工具 — 9:41 AM'
    },
    footer: { tagline: '9:41 AM 是一个全球高精度时间信息平台。Time, beautifully simple.', legalTitle: '法律与相关信息' },
    about: {
      title: '关于我们',
      storyTitle: '灵感与向苹果致敬',
      storyBody: '作为苹果公司的忠实粉丝，我们平台的灵感源于标志性的 9:41 AM。2007年1月9日上午9:41，史蒂夫·乔布斯向世界发布了第一代iPhone。自那一历史时刻起，9:41 AM 成为苹果官方产品展示图上的传奇时间。',
      missionTitle: '我们的使命',
      missionBody: '受极致优雅、对称与高精度追求的启发，我们打造了 9:41 AM：一个同步精度达 ±14毫秒的全球高精度时间平台，秉承“Time, beautifully simple.”的理念。'
    },
    privacy: {
      title: '隐私与安全政策',
      rightsReserved: '© 2026 9:41 AM — 保留所有权利。',
      noCookiesTitle: '零追踪与零侵入',
      noCookiesBody: '在 9:41 AM，用户隐私是我们的首要任务。我们绝不收集、共享或向第三方出售任何个人数据、浏览历史或用户信息。我们不使用任何广告追踪 Cookie。',
      localProcessingTitle: '100% 本地安全处理',
      localProcessingBody: '所有设置、时区和偏好城市均在您的浏览器本地进行严格管理，以确保 100% 私密、快速和安全的体验。'
    }
  },
  hi: {
    nav: { home: 'वर्तमान समय', worldClock: 'विश्व घड़ी', compare: 'बैठक योजनाकार', tools: 'समय उपकरण', blog: 'ब्लॉग' },
    header: { format12h: '12 घंटे', format24h: '24 घंटे', searchPlaceholder: 'शहर खोजें...', selectLanguage: 'भाषा चुनें' },
    hero: {
      exactTime: 'आपका समय बिल्कुल सटीक है!',
      syncedWith: 'उच्च-सटीक सर्वर के साथ समन्वयित (±14ms)',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      dayLength: 'दिन की अवधि',
      day: 'दिन',
      night: 'रात',
      dragGlobe: '3D पृथ्वी घुमाने के लिए खींचें'
    },
    search: { title: 'शहर या देश खोजें', placeholder: 'शहर का नाम लिखें...', suggested: 'सुझाए गए शहर', noResults: 'कोई शहर नहीं मिला' },
    comparator: { title: 'बैठक योजनाकार', addCity: 'शहर जोड़ें', overlap: 'अनुशंसित कार्य समय (9:00 AM - 5:00 PM)', difference: 'अंतर:' },
    tools: { title: 'समय उपकरण', meetingPlanner: 'बैठक योजनाकार', stopwatch: 'स्टॉपवॉच', timer: 'टाइमर', alarm: 'अलार्म', converter: 'UTC कनवर्टर' },
    worldClock: {
      title: 'विश्व घड़ी',
      subtitle: 'एक साथ कई शहरों में सटीक समय की निगरानी करें।',
      primaryLocation: 'आपका मुख्य स्थान',
      emptyList: 'आपने अपनी विश्व घड़ी में अतिरिक्त शहर नहीं जोड़े हैं। कोई भी शहर जोड़ने के लिए नीचे दिए गए खोज का उपयोग करें।',
      removeCity: 'मेरी विश्व घड़ी से हटाएं',
      searchTitle: 'अपनी विश्व घड़ी में कोई भी शहर खोजें और जोड़ें:',
      searchPlaceholder: 'किसी भी शहर को खोजने के लिए टाइप करें (जैसे सैन फ्रांसिस्को, पेरिस, टोक्यो, मियामी, शिकागो)...',
      noResults: 'के लिए कोई शहर उपलब्ध नहीं मिला',
      add: 'जोड़ें',
      quickSuggestions: 'जोड़ने के लिए त्वरित सुझाव:'
    },
        blog: {
      title: '9:41 AM ब्लॉग',
      subtitle: 'समय बुद्धिमत्ता, अंतर्राष्ट्रीय गाइड, उत्पादकता और तकनीकी संस्कृति।',
      allCategories: 'सभी श्रेणियां',
      searchPlaceholder: 'लेख खोजें...',
      readMore: 'पूरा लेख पढ़ें',
      backToBlog: '← ब्लॉग पर वापस जाएं',
      publishedOn: 'प्रकाशित',
      relatedPosts: 'संबंधित लेख',
      featuredSnippetTitle: 'त्वरित उत्तर (Featured Snippet)',
      noResults: 'आपकी खोज से मेल खाने वाला कोई लेख नहीं मिला।',
      share: 'शेयर करें',
      linkCopied: 'लिंक कॉपी हो गया!',
      liveWidgetTitle: 'लाइव इंटरएक्टिव टूल — 9:41 AM'
    },
    footer: { tagline: '9:41 AM एक वैश्विक उच्च-सटीकता समय मंच है। Time, beautifully simple.', legalTitle: 'जानकारी और कानूनी' },
    about: {
      title: 'हमारे बारे में',
      storyTitle: 'प्रेरणा और एप्पल को श्रद्धांजलि',
      storyBody: 'एप्पल के उत्साही प्रशंसकों के रूप में, हमारे प्लेटफॉर्म की प्रेरणा प्रतिष्ठित 9:41 AM समय से आती है। 9 जनवरी 2007 को सुबह 9:41 बजे, स्टीव जॉब्स ने दुनिया के सामने पहला आईफोन पेश किया था। उस ऐतिहासिक क्षण के बाद से, 9:41 AM एप्पल के आधिकारिक उत्पादों पर दिखाई देने वाला समय बना हुआ है।',
      missionTitle: 'हमारा उद्देश्य',
      missionBody: 'लालित्य, समरूपता और उच्च सटीकता की उस खोज से प्रेरित होकर, हमने 9:41 AM बनाया: ±14ms पर समन्वयित एक वैश्विक उच्च-सटीकता समय मंच, जो "Time, beautifully simple." के दर्शन पर आधारित है।'
    },
    privacy: {
      title: 'गोपनीयता और सुरक्षा नीति',
      rightsReserved: '© 2026 9:41 AM — सर्वाधिकार सुरक्षित।',
      noCookiesTitle: 'शून्य ट्रैकिंग और शून्य कुकीज़',
      noCookiesBody: '9:41 AM पर, आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। हम तीसरे पक्ष को किसी भी व्यक्तिगत डेटा, ब्राउज़िंग इतिहास या उपयोगकर्ता की जानकारी को एकत्र, साझा या बेचते नहीं हैं। हम विज्ञापन ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं।',
      localProcessingTitle: '100% स्थानीय और सुरक्षित प्रसंस्करण',
      localProcessingBody: '100% निजी, तेज़ और सुरक्षित अनुभव की गारंटी के लिए सभी सेटिंग्स, समय क्षेत्र और शहर की प्राथमिकताएं आपके ब्राउज़र में पूरी तरह स्थानीय रूप से प्रबंधित की जाती हैं।'
    }
  },
  ar: {
    nav: { home: 'الوقت الحالي', worldClock: 'الساعة العالمية', compare: 'مقارنة الأوقات', tools: 'مخطط الاجتماعات', blog: 'المدونة' },
    header: { format12h: '12 ساعة', format24h: '24 ساعة', searchPlaceholder: 'البحث عن مدينة...', selectLanguage: 'اختر اللغة' },
    hero: {
      exactTime: 'وقتك دقيق تماماً!',
      syncedWith: 'مزامن مع خادم عال الدقة (±14ms)',
      sunrise: 'الشروق',
      sunset: 'الغروب',
      dayLength: 'طول النهار',
      day: 'نهار',
      night: 'ليل',
      dragGlobe: 'اسحب لتدوير الأرض 3D'
    },
    search: { title: 'البحث عن مدينة أو دولة', placeholder: 'اكتب اسم المدينة...', suggested: 'المدن المقترحة', noResults: 'لم يتم العثور على مدن' },
    comparator: { title: 'مقارنة الأوقات', addCity: 'إضافة مدينة', overlap: 'تداخل العمل الموصى به (9:00 AM - 5:00 PM)', difference: 'الفرق:' },
    tools: { title: 'مخطط الاجتماعات', meetingPlanner: 'مخطط الاجتماعات', stopwatch: 'ساعة إيقاف', timer: 'مؤقت', alarm: 'إنذار', converter: 'محول UTC' },
    worldClock: {
      title: 'الساعة العالمية',
      subtitle: 'مراقبة الوقت الدقيق في مدن متعددة في وقت واحد.',
      primaryLocation: 'موقعك الرئيسي',
      emptyList: 'لم تقم بإضافة مدن إضافية إلى ساعتك العالمية. استخدم البحث أدناه لإضافة أي مدينة.',
      removeCity: 'إزالة من ساعتي العالمية',
      searchTitle: 'ابحث وأضف أي مدينة إلى ساعتك العالمية:',
      searchPlaceholder: 'اكتب للبحث عن أي مدينة (مثل سان فرانسيسكو، باريس، طوكيو، ميامي، شيكاغو)...',
      noResults: 'لم يتم العثور على مدن متاحة لـ',
      add: 'إضافة',
      quickSuggestions: 'اقتراحات سريعة للإضافة:'
    },
        blog: {
      title: 'مدونة 9:41 AM',
      subtitle: 'ذكاء الوقت، الأدلة الدولية، الإنتاجية وثقافة التكنولوجيا.',
      allCategories: 'جميع الفئات',
      searchPlaceholder: 'البحث في المقالات...',
      readMore: 'قراءة المقال كاملاً',
      backToBlog: 'العودة للمدونة ←',
      publishedOn: 'تم النشر في',
      relatedPosts: 'مقالات ذات صلة',
      featuredSnippetTitle: 'إجابة سريعة (Featured Snippet)',
      noResults: 'لم يتم العثور على مقالات تطابق بحثك.',
      share: 'مشاركة',
      linkCopied: 'تم نسخ الرابط!',
      liveWidgetTitle: 'أداة تفاعلية مباشرة — 9:41 AM'
    },
    footer: { tagline: '9:41 AM هي منصة عالمية لمعلومات الوقت عالية الدقة. Time, beautifully simple.', legalTitle: 'معلومات وقانوني' },
    about: {
      title: 'عن مشروعنا',
      storyTitle: 'الإلهام والتكريم لشركة Apple',
      storyBody: 'بصفتنا عشاقاً لشركة Apple، نبع إلهام منصتنا من الوقت الأيقوني 9:41 AM. في 9 يناير 2007 الساعة 9:41 صباحاً، قدم ستيف جوبز أول هاتف iPhone للعالم. ومنذ تلك اللحظة التاريخية، تظل الساعة 9:41 صباحاً هي الوقت الرسمي المعروض على صور منتجات Apple.',
      missionTitle: 'مهمتنا',
      missionBody: 'مستلهمين من السعي وراء الأناقة والتناسق والدقة العالية، أنشأنا 9:41 AM: منصة عالمية عالية الدقة للوقت بدقة ±14 مللي ثانية، تم تصميمها تحت شعار "Time, beautifully simple."'
    },
    privacy: {
      title: 'سياسة الخصوصية والأمان',
      rightsReserved: '© 2026 9:41 AM — جميع الحقوق محفوظة.',
      noCookiesTitle: 'صفر تتبع وصفر كوكيز إعلانية',
      noCookiesBody: 'في 9:41 AM، تعتبر خصوصية المستخدم أولوية قصوى. نحن لا نجمع أو نشارك أو نبيع أي بيانات شخصية أو سجل تصفح أو معلومات خاصة بالمستخدم لأطراف ثالثة. نحن لا نستخدم كوكيز التتبع الإعلاني.',
      localProcessingTitle: 'معالجة محلية وآمنة 100%',
      localProcessingBody: 'يتم إدارة جميع الإعدادات والمناطق الزمنية والمدن المفضلة محلياً وبشكل صارم داخل متصفحك لضمان تجربة خاصة وسريعة وآمنة 100%.'
    }
  },
  fr: {
    nav: { home: 'Heure Actuelle', worldClock: 'Horloge Mondiale', compare: 'Comparateur d\'Horaires', tools: 'Planificateur de Réunions', blog: 'Blog' },
    header: { format12h: '12H', format24h: '24H', searchPlaceholder: 'Rechercher une ville...', selectLanguage: 'Choisir la langue' },
    hero: {
      exactTime: 'Votre heure est exacte !',
      syncedWith: 'Synchronisé avec serveur haute précision (±14ms)',
      sunrise: 'Lever du soleil',
      sunset: 'Coucher du soleil',
      dayLength: 'Durée du jour',
      day: 'Jour',
      night: 'Nuit',
      dragGlobe: 'Faites glisser pour tourner la Terre en 3D'
    },
    search: { title: 'Rechercher une Ville ou un Pays', placeholder: 'Entrez le nom d\'une ville...', suggested: 'Villes Suggérées', noResults: 'Aucune ville trouvée' },
    comparator: { title: 'Planificateur de Réunions', addCity: 'Ajouter une Ville', overlap: 'Horaires de travail recommandés (9h00 - 17h00)', difference: 'Différence :' },
    tools: { title: 'Outils Temporels', meetingPlanner: 'Planificateur de Réunions', stopwatch: 'Chronomètre', timer: 'Minuteur', alarm: 'Alarme', converter: 'Convertisseur UTC' },
    worldClock: {
      title: 'Horloge Mondiale',
      subtitle: 'Surveillez l\'heure exacte dans plusieurs villes simultanément.',
      primaryLocation: 'VOTRE EMPLACEMENT PRINCIPAL',
      emptyList: 'Vous n\'avez pas ajouté de villes supplémentaires à votre horloge mondiale. Utilisez la recherche ci-dessous pour ajouter une ville.',
      removeCity: 'Supprimer de mon horloge mondiale',
      searchTitle: 'Rechercher et ajouter n\'importe quelle ville à votre horloge mondiale :',
      searchPlaceholder: 'Tapez pour rechercher une ville (ex. San Francisco, Paris, Tokyo, Miami, Chicago)...',
      noResults: 'Aucune ville disponible trouvée pour',
      add: 'Ajouter',
      quickSuggestions: 'Suggestions rapides à ajouter :'
    },
        blog: {
      title: 'Blog 9:41 AM',
      subtitle: 'Intelligence temporelle, guides internationaux, productivité & culture tech.',
      allCategories: 'Toutes les Catégories',
      searchPlaceholder: 'Rechercher des articles...',
      readMore: 'Lire l’Article Complet',
      backToBlog: '← Retour au Blog',
      publishedOn: 'Publié le',
      relatedPosts: 'Articles Similaires',
      featuredSnippetTitle: 'Réponse Rapide (Featured Snippet)',
      noResults: 'Aucun article ne correspond à votre recherche.',
      share: 'Partager',
      linkCopied: 'Lien copié !',
      liveWidgetTitle: 'Outil Interactif en Direct — 9:41 AM'
    },
    footer: { tagline: '9:41 AM est une plateforme mondiale d\'information temporelle haute précision. Time, beautifully simple.', legalTitle: 'Informations & Légal' },
    about: {
      title: 'À Propos de Nous',
      storyTitle: 'Inspiration et Hommage à Apple',
      storyBody: 'En tant que passionnés d\'Apple, l\'inspiration de notre plateforme provient de l\'heure mythique 9:41 AM. Le 9 janvier 2007 à 9h41, Steve Jobs a présenté le premier iPhone au monde. Depuis ce moment historique, 9:41 AM est restée l\'heure emblématique affichée sur les visuels officiels d\'Apple.',
      missionTitle: 'Notre Mission',
      missionBody: 'Inspirés par cette recherche d\'élégance, de symétrie et de haute précision, nous avons créé 9:41 AM : une plateforme temporelle mondiale de haute précision synchronisée à ±14ms, sous la philosophie "Time, beautifully simple."'
    },
    privacy: {
      title: 'Politique de Confidentialité et Sécurité',
      rightsReserved: '© 2026 9:41 AM — Tous droits réservés.',
      noCookiesTitle: 'Zéro Traçage et Zéro Cookies Invasifs',
      noCookiesBody: 'Chez 9:41 AM, la confidentialité est notre priorité absolue. Nous ne collectons, ne partageons ni ne vendons aucune donnée personnelle, historique de navigation ou information utilisateur à des tiers. Aucun cookie publicitaire n\'est utilisé.',
      localProcessingTitle: 'Traitement 100% Local et Sécurisé',
      localProcessingBody: 'Tous les paramètres, fuseaux horaires et villes préférées sont gérés exclusivement en local dans votre navigateur pour garantir une expérience 100% privée, rapide et sécurisée.'
    }
  },
  bn: {
    nav: { home: 'বর্তমান সময়', worldClock: 'বিশ্ব ঘড়ি', compare: 'সময় তুলনাকারী', tools: 'মিটিং প্ল্যানার', blog: 'ব্লগ' },
    header: { format12h: '১২ ঘণ্টা', format24h: '২৪ ঘণ্টা', searchPlaceholder: 'شهر खोजें...', selectLanguage: 'ভাষা নির্বাচন করুন' },
    hero: {
      exactTime: 'আপনার সময় একদম সঠিক!',
      syncedWith: 'উচ্চ-সঠিকতা সার্ভারের সাথে সিঙ্ক করা হয়েছে (±14ms)',
      sunrise: 'সূর্যোদয়',
      sunset: 'সূর্যাস্ত',
      dayLength: 'দিনের দৈর্ঘ্য',
      day: 'দিন',
      night: 'রাত',
      dragGlobe: '3D পৃথিবী ঘোরাতে ড্র্যাগ করুন'
    },
    search: { title: 'শহর বা দেশ অনুসন্ধান করুন', placeholder: 'একটি শহরের নাম লিখুন...', suggested: 'সুপারিশকৃত শহর', noResults: 'কোন শহর পাওয়া যায়নি' },
    comparator: { title: 'মিটিং প্ল্যানার', addCity: 'শহর যোগ করুন', overlap: 'সুপারিশকৃত কর্মঘণ্টা (9:00 AM - 5:00 PM)', difference: 'পার্থক্য:' },
    tools: { title: 'মিটিং প্ল্যানার', meetingPlanner: 'মিটিং প্ল্যানার', stopwatch: 'স্টপওয়াচ', timer: 'টাইমার', alarm: 'অ্যালার্ম', converter: 'UTC কনভার্টার' },
    worldClock: {
      title: 'বিশ্ব ঘড়ি',
      subtitle: 'একসাথে একাধিক শহরের সঠিক সময় পর্যবেক্ষণ করুন।',
      primaryLocation: 'আপনার প্রাথমিক অবস্থান',
      emptyList: 'আপনি আপনার বিশ্ব ঘড়িতে অতিরিক্ত শহর যুক্ত করেননি। যেকোনো শহর যোগ করতে নীচের অনুসন্ধান ব্যবহার করুন।',
      removeCity: 'আমার বিশ্ব ঘড়ি থেকে সরান',
      searchTitle: 'আপনার বিশ্ব ঘড়িতে যেকোনো শহর খুঁজুন এবং যোগ করুন:',
      searchPlaceholder: 'যেকোনো শহর খুঁজতে টাইপ করুন (যেমন সান ফ্রানসিসকো, প্যারিস, টোকিও, মায়ামি, শিকাগো)...',
      noResults: 'এর জন্য কোনো শহর পাওয়া যায়নি',
      add: 'যোগ করুন',
      quickSuggestions: 'যোগ করার জন্য দ্রুত পরামর্শ:'
    },
        blog: {
      title: '৯:৪১ AM ব্লগ',
      subtitle: 'সময় বুদ্ধিমত্তা, আন্তর্জাতিক গাইড, উৎপাদনশীলতা ও প্রযুক্তি সংস্কৃতি।',
      allCategories: 'সমস্ত বিভাগ',
      searchPlaceholder: 'নিবন্ধ খুঁজুন...',
      readMore: 'সম্পূর্ণ নিবন্ধ পড়ুন',
      backToBlog: '← ব্লগে ফিরে যান',
      publishedOn: 'প্রকাশিত',
      relatedPosts: 'সম্পর্কিত নিবন্ধ',
      featuredSnippetTitle: 'দ্রুত উত্তর (Featured Snippet)',
      noResults: 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নিবন্ধ পাওয়া যায়নি।',
      share: 'শেয়ার করুন',
      linkCopied: 'লিঙ্ক কপি করা হয়েছে!',
      liveWidgetTitle: 'লাইভ ইন্টারঅ্যাক্টিভ টুল — 9:41 AM'
    },
    footer: { tagline: '9:41 AM হল একটি বিশ্বব্যাপী উচ্চ-সঠিকতা সময় তথ্য প্ল্যাটফর্ম। Time, beautifully simple.', legalTitle: 'তথ্য ও আইনি' },
    about: {
      title: 'আমাদের সম্পর্কে',
      storyTitle: 'অনুপ্রেরণা ও অ্যাপল শ্রদ্ধাঞ্জলি',
      storyBody: 'অ্যাপল-এর ভক্ত হিসেবে, আমাদের প্ল্যাটফর্মের অনুপ্রেরণা এসেছে আইকনিক 9:41 AM সময় থেকে। ৯ জানুয়ারী ২০০৭ সকাল ৯:৪১ মিনিটে স্টিভ জবস বিশ্বের সামনে প্রথম আইফোন উন্মোচন করেছিলেন। সেই ঐতিহাসিক মুহূর্ত থেকে 9:41 AM অ্যাপলের অফিশিয়াল ছবিতে প্রদর্শিত সময় হিসেবে রয়েছে।',
      missionTitle: 'আমাদের লক্ষ্য',
      missionBody: 'নান্দনিকতা, সামঞ্জস্য ও উচ্চ সঠিকতার সেই অন্বেষণ থেকে অনুপ্রাণিত হয়ে আমরা 9:41 AM তৈরি করেছি: ±14ms সিঙ্ক করা একটি বিশ্বব্যাপী সময় প্ল্যাটফর্ম, যা "Time, beautifully simple." দর্শনে নির্মিত।'
    },
    privacy: {
      title: 'গোপনীয়তা ও সুরক্ষা নীতি',
      rightsReserved: '© 2026 9:41 AM — সর্বস্বত্ব সংরক্ষিত।',
      noCookiesTitle: 'শূন্য ট্র্যাকিং ও শূন্য কুকিজ',
      noCookiesBody: '9:41 AM এ ব্যবহারকারীর গোপনীয়তা আমাদের সর্বোচ্চ অগ্রাধিকার। আমরা কোনো ব্যক্তিগত ডেটা, ব্রাউজিং ইতিহাস বা তথ্য সংগ্রহ, শেয়ার বা বিক্রি করি না। আমরা বিজ্ঞাপন ট্র্যাকিং কুকিজ ব্যবহার করি না।',
      localProcessingTitle: '১০০% স্থানীয় ও নিরাপদ প্রক্রিয়া',
      localProcessingBody: '১০০% ব্যক্তিগত, দ্রুত ও নিরাপদ অভিজ্ঞতা নিশ্চিত করতে সমস্ত পছন্দ ও সময় অঞ্চল শুধুমাত্র আপনার ব্রাউজারে স্থানীয়ভাবে সংরক্ষিত হয়।'
    }
  },
  pt: {
    nav: { home: 'Hora Atual', worldClock: 'Relógio Mundial', compare: 'Comparador de Horários', tools: 'Planejador de Reuniões', blog: 'Blog' },
    header: { format12h: '12H', format24h: '24H', searchPlaceholder: 'Buscar cidade...', selectLanguage: 'Selecionar Idioma' },
    hero: {
      exactTime: 'Seu horário está exato!',
      syncedWith: 'Sincronizado com servidor de alta precisão (±14ms)',
      sunrise: 'Nascer do Sol',
      sunset: 'Pôr do Sol',
      dayLength: 'Duração do dia',
      day: 'Dia',
      night: 'Noite',
      dragGlobe: 'Arraste para girar a Terra em 3D'
    },
    search: { title: 'Buscar Cidade ou País', placeholder: 'Digite o nome de uma cidade...', suggested: 'Cidades Sugeridas', noResults: 'Nenhuma cidade encontrada' },
    comparator: { title: 'Planejador de Reuniões', addCity: 'Adicionar Cidade', overlap: 'Horário de Trabalho Recomendado (9:00 AM - 5:00 PM)', difference: 'Diferença:' },
    tools: { title: 'Planejador de Reuniões', meetingPlanner: 'Planejador de Reuniões', stopwatch: 'Cronômetro', timer: 'Temporizador', alarm: 'Alarme', converter: 'Conversor UTC' },
    worldClock: {
      title: 'Relógio Mundial',
      subtitle: 'Monitore a hora exata em várias cidades simultaneamente.',
      primaryLocation: 'SUA LOCALIZAÇÃO PRINCIPAL',
      emptyList: 'Você não adicionou cidades adicionais ao seu Relógio Mundial. Use a busca abaixo para adicionar qualquer cidade.',
      removeCity: 'Remover do meu Relógio Mundial',
      searchTitle: 'Pesquisar e adicionar qualquer cidade ao seu Relógio Mundial:',
      searchPlaceholder: 'Digite para pesquisar qualquer cidade (ex. São Francisco, Paris, Tóquio, Miami, Chicago)...',
      noResults: 'Nenhuma cidade disponível encontrada para',
      add: 'Adicionar',
      quickSuggestions: 'Sugestões rápidas para adicionar:'
    },
        blog: {
      title: 'Blog 9:41 AM',
      subtitle: 'Inteligência temporal, guias internacionais, produtividade e cultura tech.',
      allCategories: 'Todas as Categorias',
      searchPlaceholder: 'Pesquisar artigos...',
      readMore: 'Ler Artigo Completo',
      backToBlog: '← Voltar ao Blog',
      publishedOn: 'Publicado em',
      relatedPosts: 'Artigos Relacionados',
      featuredSnippetTitle: 'Resposta Rápida (Featured Snippet)',
      noResults: 'Nenhum artigo encontrado para sua pesquisa.',
      share: 'Compartilhar',
      linkCopied: 'Link copiado!',
      liveWidgetTitle: 'Ferramenta Interativa ao Vivo — 9:41 AM'
    },
    footer: { tagline: '9:41 AM é uma plataforma global de informação temporal de alta precisão. Time, beautifully simple.', legalTitle: 'Informações & Legal' },
    about: {
      title: 'Sobre Nós',
      storyTitle: 'Inspiração e Homenagem à Apple',
      storyBody: 'Como fãs fervorosos da Apple, a inspiração da nossa plataforma surge do horário icônico 9:41 AM. Em 9 de janeiro de 2007, às 9:41 a.m., Steve Jobs apresentou o iPhone original ao mundo. Desde esse marco histórico, 9:41 AM permanece como o horário oficial exibido nas imagens dos produtos Apple.',
      missionTitle: 'Nossa Missão',
      missionBody: 'Inspirados por essa busca por elegância, simetria e alta precisão, criamos o 9:41 AM: uma plataforma temporal global de alta precisão sincronizada a ±14ms, desenvolvida sob a filosofia "Time, beautifully simple."'
    },
    privacy: {
      title: 'Política de Privacidade e Segurança',
      rightsReserved: '© 2026 9:41 AM — Todos os direitos reservados.',
      noCookiesTitle: 'Zero Rastreamento e Zero Cookies Invasivos',
      noCookiesBody: 'No 9:41 AM, sua privacidade é nossa máxima prioridade. Não coletamos, compartilhamos ou vendemos nenhum tipo de dado pessoal, histórico de navegação ou informação a terceiros. Não utilizamos cookies de rastreamento publicitário.',
      localProcessingTitle: 'Processamento 100% Local e Seguro',
      localProcessingBody: 'Todas as configurações, fusos horários e cidades preferidas são gerenciados exclusivamente de forma local no seu navegador para garantir uma experiência 100% privada, rápida e segura.'
    }
  },
  ru: {
    nav: { home: 'Текущее время', worldClock: 'Мировое время', compare: 'Сравнение времени', tools: 'Планировщик встреч', blog: 'Блог' },
    header: { format12h: '12Ч', format24h: '24Ч', searchPlaceholder: 'Поиск города...', selectLanguage: 'Выбрать язык' },
    hero: {
      exactTime: 'Ваше время точное!',
      syncedWith: 'Синхронизировано с точным сервером (±14ms)',
      sunrise: 'Восход',
      sunset: 'Закат',
      dayLength: 'Световой день',
      day: 'День',
      night: 'Ночь',
      dragGlobe: 'Вращайте Землю 3D'
    },
    search: { title: 'Поиск города или страны', placeholder: 'Введите название города...', suggested: 'Рекомендуемые города', noResults: 'Города не найдены' },
    comparator: { title: 'Планировщик встреч', addCity: 'Добавить город', overlap: 'Рекомендуемое рабочее время (9:00 - 17:00)', difference: 'Разница:' },
    tools: { title: 'Планировщик встреч', meetingPlanner: 'Планировщик встреч', stopwatch: 'Секундомер', timer: 'Таймер', alarm: 'Будильник', converter: 'Конвертер UTC' },
    worldClock: {
      title: 'Мировое время',
      subtitle: 'Отслеживайте точное время в нескольких городах одновременно.',
      primaryLocation: 'ВАШЕ ОСНОВНОЕ МЕСТОПОЛОЖЕНИЕ',
      emptyList: 'Вы не добавили дополнительные города в Мировое время. Используйте поиск ниже, чтобы добавить любой город.',
      removeCity: 'Удалить из Мирового времени',
      searchTitle: 'Найдите и добавьте любой город в Мировое время:',
      searchPlaceholder: 'Введите название города (например, Сан-Франциско, Париж, Токио, Майами, Чикаго)...',
      noResults: 'Не найдено доступных городов для',
      add: 'Добавить',
      quickSuggestions: 'Быстрые предложения:'
    },
        blog: {
      title: 'Блог 9:41 AM',
      subtitle: 'Временная аналитика, международные гиды, продуктивность и IT-культура.',
      allCategories: 'Все категории',
      searchPlaceholder: 'Поиск статей...',
      readMore: 'Читать полностью',
      backToBlog: '← Назад в блог',
      publishedOn: 'Опубликовано',
      relatedPosts: 'Похожие статьи',
      featuredSnippetTitle: 'Быстрый ответ (Featured Snippet)',
      noResults: 'Статей по вашему запросу не найдено.',
      share: 'Поделиться',
      linkCopied: 'Ссылка скопирована!',
      liveWidgetTitle: 'Интерактивный инструмент — 9:41 AM'
    },
    footer: { tagline: '9:41 AM — это глобальная платформа точного времени. Time, beautifully simple.', legalTitle: 'Информация и закон' },
    about: {
      title: 'О нас',
      storyTitle: 'Вдохновение и дань уважения Apple',
      storyBody: 'Как преданные поклонники Apple, мы вдохновились легендарным временем 9:41 AM. 9 января 2007 года в 9:41 Стив Джобс представил миру первый iPhone. С этого исторического момента время 9:41 AM остается официальным временем на всех презентациях Apple.',
      missionTitle: 'Наша миссия',
      missionBody: 'Вдохновленные стремлением к элегантности, симметрии и высокой точности, мы создали 9:41 AM: глобальную платформу точного времени с синхронизацией ±14мс, созданную по философии "Time, beautifully simple."'
    },
    privacy: {
      title: 'Политика конфиденциальности и безопасности',
      rightsReserved: '© 2026 9:41 AM — Все права защищены.',
      noCookiesTitle: 'Нуль отслеживания и нуль файлы cookie',
      noCookiesBody: 'В 9:41 AM конфиденциальность пользователей является нашим главным приоритетом. Мы не собираем, не передаем и не продаем личные данные, историю просмотров или информацию о пользователях третьим лицам. Мы не используем рекламные файлы cookie.',
      localProcessingTitle: '100% локальная и безопасная обработка',
      localProcessingBody: 'Все настройки, часовые пояса и выбранные города управляются исключительно локально в вашем браузере для обеспечения 100% конфиденциального и быстрого использования.'
    }
  },
  ja: {
    nav: { home: '現在時刻', worldClock: '世界時計', compare: '時間比較', tools: 'ミーティングプランナー', blog: 'ブログ' },
    header: { format12h: '12時間', format24h: '24時間', searchPlaceholder: '都市を検索...', selectLanguage: '言語を選択' },
    hero: {
      exactTime: '正確な時刻です！',
      syncedWith: '高精度サーバーと同期中 (±14ms)',
      sunrise: '日の出',
      sunset: '日の入り',
      dayLength: '昼の長さ',
      day: '昼',
      night: '夜',
      dragGlobe: 'ドラッグして3D地球を回転'
    },
    search: { title: '都市または国を検索', placeholder: '都市名を入力...', suggested: 'おすすめの都市', noResults: '都市が見つかりません' },
    comparator: { title: 'ミーティングプランナー', addCity: '都市を追加', overlap: '推奨勤務時間 (9:00 AM - 5:00 PM)', difference: '時差:' },
    tools: { title: 'ミーティングプランナー', meetingPlanner: 'ミーティングプランナー', stopwatch: 'ストップウォッチ', timer: 'タイマー', alarm: 'アラーム', converter: 'UTCコンバーター' },
    worldClock: {
      title: '世界時計',
      subtitle: '複数の都市の正確な時間を同時にモニタリング。',
      primaryLocation: 'メインの現在地',
      emptyList: '世界時計に追加の都市が登録されていません。下の検索から任意の都市を追加してください。',
      removeCity: '世界時計から削除',
      searchTitle: '世界時計に都市を検索して追加：',
      searchPlaceholder: '都市名を入力して検索（例：サンフランシスコ、パリ、東京、マイアミ、シカゴ）...',
      noResults: '該当する都市が見つかりません：',
      add: '追加',
      quickSuggestions: 'クイック追加提案：'
    },
        blog: {
      title: '9:41 AM ブログ',
      subtitle: '時間インテリジェンス、国際ガイド、生産性とテクノロジーカルチャー。',
      allCategories: 'すべてのカテゴリー',
      searchPlaceholder: '記事を検索...',
      readMore: '記事を全文読む',
      backToBlog: '← ブログに戻る',
      publishedOn: '公開日',
      relatedPosts: '関連記事',
      featuredSnippetTitle: 'クイック回答 (Featured Snippet)',
      noResults: '検索条件に一致する記事は見つかりませんでした。',
      share: '共有',
      linkCopied: 'リンクをコピーしました！',
      liveWidgetTitle: 'ライブインタラクティブツール — 9:41 AM'
    },
    footer: { tagline: '9:41 AMは世界中の高精度時間情報プラットフォームです。Time, beautifully simple.', legalTitle: '情報・規約' },
    about: {
      title: '私たちについて',
      storyTitle: 'Appleへの敬意と開発のインスピレーション',
      storyBody: '熱狂的なAppleファンである私たちのプラットフォームのインスピレーションは、象徴的な時刻「9:41 AM」から生まれました。2007年1月9日午前9時41分、スティーブ・ジョブズが初代iPhoneを世界に発表しました。その歴史的瞬間以来、9:41 AMはApple製品の公式画像に刻まれる伝説の時刻となっています。',
      missionTitle: '私たちのミッション',
      missionBody: 'エレガンス、対称性、最高精度への追求にインスパイアされ、私たちは「9:41 AM」を開発しました。±14msの高精度サーバーと同期するグローバル時間プラットフォームであり、「Time, beautifully simple.」の理念のもと設計されています。'
    },
    privacy: {
      title: 'プライバシー＆セキュリティポリシー',
      rightsReserved: '© 2026 9:41 AM — All rights reserved.',
      noCookiesTitle: 'トラッキングゼロ＆侵入型Cookieゼロ',
      noCookiesBody: '9:41 AMでは、ユーザーのプライバシー保護を最優先事項としています。個人データ、閲覧履歴、ユーザー情報を収集・共有・第三者に販売することは一切ありません。広告トラッキング用Cookieも一切使用していません。',
      localProcessingTitle: '100%ローカル＆安全なデータ処理',
      localProcessingBody: 'すべての設定、タイムゾーン、お気に入りの都市データはお使いのブラウザ内で100%ローカルに処理され、完全にプライベートで高速、かつ安全な体験を保証します。'
    }
  }
};

interface LanguageContextType {
  language: LanguageCode;
  languageInfo: LanguageInfo;
  setLanguage: (code: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = '941_language';

export function detectBestLanguage(): LanguageCode {
  // 1. Check saved preference in localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved as LanguageCode;
    }
  } catch (e) {
    console.error(e);
  }

  // 2. Inspect navigator.languages & navigator.language (Browser Preferences)
  const userLangs = (navigator.languages || [navigator.language || '']).map(l => l.toLowerCase());
  for (const langStr of userLangs) {
    const primary = langStr.split('-')[0];
    const found = SUPPORTED_LANGUAGES.find(l => l.code === primary);
    if (found) {
      return found.code;
    }
  }

  // 3. Geographical Region & Timezone Detection Fallback
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    if (
      tz.includes('new_york') ||
      tz.includes('chicago') ||
      tz.includes('los_angeles') ||
      tz.includes('denver') ||
      tz.includes('london') ||
      tz.includes('sydney') ||
      tz.includes('toronto')
    ) {
      return 'en';
    }
    if (
      tz.includes('madrid') ||
      tz.includes('santo_domingo') ||
      tz.includes('mexico') ||
      tz.includes('bogota') ||
      tz.includes('buenos_aires') ||
      tz.includes('santiago')
    ) {
      return 'es';
    }
    if (tz.includes('shanghai') || tz.includes('hong_kong') || tz.includes('beijing')) {
      return 'zh';
    }
    if (tz.includes('tokyo')) {
      return 'ja';
    }
    if (tz.includes('paris')) {
      return 'fr';
    }
    if (tz.includes('sao_paulo')) {
      return 'pt';
    }
    if (tz.includes('moscow')) {
      return 'ru';
    }
    if (tz.includes('riyadh') || tz.includes('dubai') || tz.includes('cairo')) {
      return 'ar';
    }
    if (tz.includes('kolkata')) {
      return 'hi';
    }
    if (tz.includes('dhaka')) {
      return 'bn';
    }
  } catch (e) {
    console.error(e);
  }

  return 'en';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => detectBestLanguage());

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const languageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    document.documentElement.dir = languageInfo.dir || 'ltr';
    document.documentElement.lang = languageInfo.locale;
  }, [languageInfo]);

  const value = {
    language,
    languageInfo,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.es
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function getTranslatedCountry(countryCode: string, locale: string, fallback: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    return displayNames.of(countryCode) || fallback;
  } catch (e) {
    return fallback;
  }
}

export const REGION_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Norteamérica': {
    en: 'North America', es: 'Norteamérica', fr: 'Amérique du Nord', pt: 'América do Norte',
    zh: '北美洲', hi: 'उत्तरी अमेरिका', ar: 'أمريكا الشمالية', ru: 'Северная Америка',
    ja: '北米', bn: 'উত্তর আমেরিকা'
  },
  'Sudamérica': {
    en: 'South America', es: 'Sudamérica', fr: 'Amérique du Sud', pt: 'América do Sul',
    zh: '南美洲', hi: 'दक्षिण अमेरिका', ar: 'أمريكا الجنوبية', ru: 'Южная Америка',
    ja: '南米', bn: 'দক্ষিণ আমেরিকা'
  },
  'Centroamérica': {
    en: 'Central America', es: 'Centroamérica', fr: 'Amérique centrale', pt: 'América Central',
    zh: '中美洲', hi: 'मध्य अमेरिका', ar: 'أمريكا الوسطى', ru: 'Центральная Америка',
    ja: '中央アメリカ', bn: 'মধ্য আমেরিকা'
  },
  'Caribe': {
    en: 'Caribbean', es: 'Caribe', fr: 'Caraïbes', pt: 'Caribe',
    zh: '加勒比', hi: 'कैरेबियन', ar: 'البحر الكاريبي', ru: 'Карибы',
    ja: 'カリブ海', bn: 'ক্যারিবীয়'
  },
  'Europa': {
    en: 'Europe', es: 'Europa', fr: 'Europe', pt: 'Europa',
    zh: '欧洲', hi: 'यूरोप', ar: 'أوروبا', ru: 'Европа',
    ja: 'ヨーロッパ', bn: 'ইউরোপ'
  },
  'Asia': {
    en: 'Asia', es: 'Asia', fr: 'Asie', pt: 'Ásia',
    zh: '亚洲', hi: 'एशिया', ar: 'آسيا', ru: 'Азия',
    ja: 'アジア', bn: 'এশিয়া'
  },
  'Medio Oriente': {
    en: 'Middle East', es: 'Medio Oriente', fr: 'Moyen-Orient', pt: 'Oriente Médio',
    zh: '中东', hi: 'मध्य पूर्व', ar: 'الشرق الأوسط', ru: 'Ближний Восток',
    ja: '中東', bn: 'মধ্যপ্রাচ্য'
  },
  'África': {
    en: 'Africa', es: 'África', fr: 'Afrique', pt: 'África',
    zh: '非洲', hi: 'अफ्रीका', ar: 'أفريقيا', ru: 'Африка',
    ja: 'アフリカ', bn: 'আফ্রিকা'
  },
  'Oceanía': {
    en: 'Oceania', es: 'Oceanía', fr: 'Océanie', pt: 'Oceania',
    zh: '大洋洲', hi: 'ओशिनिया', ar: 'أوقيانوسيا', ru: 'Океания',
    ja: 'オセアニア', bn: 'ওশেনিয়া'
  }
};

export function getTranslatedRegion(region: string, langCode: string): string {
  const normLang = langCode.split('-')[0];
  const map = REGION_TRANSLATIONS[region];
  if (!map) return region;
  return map[normLang] || map['en'] || region;
}

export interface TranslatableCity {
  id: string;
  name: string;
  country?: string;
  countryCode?: string;
  region?: string;
  seoSlug?: string;
}

export const CITY_NAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  'new-york': { en: 'New York', es: 'Nueva York', fr: 'New York', pt: 'Nova York', zh: '纽约', hi: 'न्यूयॉर्क', ar: 'نيويورك', ru: 'Нью-Йорк', ja: 'ニューヨーク', bn: 'নিউ ইয়র্ক' },
  'washington-dc': { en: 'Washington D.C.', es: 'Washington D.C.', fr: 'Washington D.C.', pt: 'Washington D.C.', zh: '华盛顿哥伦比亚特区', hi: 'वाशिंगटन डी.सी.', ar: 'واشنطن العاصمة', ru: 'Вашингтон', ja: 'ワシントンD.C.', bn: 'ওয়াশিংটন ডিসি' },
  'philadelphia': { en: 'Philadelphia', es: 'Filadelfia', fr: 'Philadelphie', pt: 'Filadélfia', zh: '费城', hi: 'फिलाडेल्फिया', ar: 'فيلادلفيا', ru: 'Филадельфия', ja: 'フィラデルフィア', bn: 'ফিলাডেলফিয়া' },
  'indianapolis': { en: 'Indianapolis', es: 'Indianápolis', fr: 'Indianapolis', pt: 'Indianápolis', zh: '印第安纳波利斯', hi: 'इंडियानापोलिस', ar: 'إنديانابوليس', ru: 'Индианаполис', ja: 'インディアナポリス', bn: 'ইন্ডিয়ানাপোলিস' },
  'new-orleans': { en: 'New Orleans', es: 'Nueva Orleans', fr: 'La Nouvelle-Orléans', pt: 'Nova Orleans', zh: '新奥尔良', hi: 'न्यू ऑरलियन्स', ar: 'نيو أورليانز', ru: 'Новый Орлеан', ja: 'ニューオーリンズ', bn: 'নিউ অরলিন্স' },
  'minneapolis': { en: 'Minneapolis', es: 'Minneápolis', fr: 'Minneapolis', pt: 'Minneapolis', zh: '明尼阿波利斯', hi: 'मिनियापोलिस', ar: 'منيابولس', ru: 'Миннеаполис', ja: 'ミネアポリス', bn: 'মিনিয়াপোলিস' },
  'st-louis': { en: 'St. Louis', es: 'San Luis', fr: 'Saint-Louis', pt: 'Saint Louis', zh: '圣路易斯', hi: 'सेंट लुइस', ar: 'سانت لويس', ru: 'Сент-Луис', ja: 'セントルイス', bn: 'সেন্ট লুইস' },
  'los-angeles': { en: 'Los Angeles', es: 'Los Ángeles', fr: 'Los Angeles', pt: 'Los Angeles', zh: '洛杉矶', hi: 'लॉस एंजिल्स', ar: 'لوس أنجلوس', ru: 'Лос-Анджелес', ja: 'ロサンゼルス', bn: 'লস অ্যাঞ্জেলেস' },
  'san-francisco': { en: 'San Francisco', es: 'San Francisco', fr: 'San Francisco', pt: 'São Francisco', zh: '旧金山', hi: 'सैन फ्रांसिस्को', ar: 'سان فرانسيسكو', ru: 'Сан-Франциско', ja: 'サンフランシスコ', bn: 'সান ফ্রান্সিসকো' },
  'san-diego': { en: 'San Diego', es: 'San Diego', fr: 'San Diego', pt: 'San Diego', zh: '圣迭戈', hi: 'सैन डिएगो', ar: 'سان دييغو', ru: 'Сан-Диего', ja: 'サンディエゴ', bn: 'সান দিয়েগো' },
  'san-jose-ca': { en: 'San Jose (CA)', es: 'San José (CA)', fr: 'San José (CA)', pt: 'San José (CA)', zh: '圣何塞 (加州)', hi: 'सैन जोस (सीए)', ar: 'سان خوسيه (كاليفورنيا)', ru: 'Сан-Хосе (Калифорния)', ja: 'サンノゼ (カリフォルニア)', bn: 'সান জোসে (সিএ)' },
  'la-habana': { en: 'Havana', es: 'La Habana', fr: 'La Havane', pt: 'Havana', zh: '哈瓦那', hi: 'हवाना', ar: 'هافانا', ru: 'Гавана', ja: 'ハバナ', bn: 'হাভানা' },
  'mexico-city': { en: 'Mexico City', es: 'Ciudad de México', fr: 'Mexico', pt: 'Cidade do México', zh: '墨西哥城', hi: 'मेक्सिको सिटी', ar: 'مدينة مكسيكو', ru: 'Мехико', ja: 'メキシコシティ', bn: 'মেক্সিকো সিটি' },
  'bogota': { en: 'Bogota', es: 'Bogotá', fr: 'Bogota', pt: 'Bogotá', zh: '波哥大', hi: 'बोगोटा', ar: 'بوغوتا', ru: 'Богота', ja: 'ボゴタ', bn: 'বোগোটা' },
  'sao-paulo': { en: 'Sao Paulo', es: 'São Paulo', fr: 'São Paulo', pt: 'São Paulo', zh: '圣保罗', hi: 'साओ पाउलो', ar: 'ساو باولو', ru: 'Сан-Паулу', ja: 'サンパウロ', bn: 'সাঁও পাওলো' },
  'panama': { en: 'Panama City', es: 'Ciudad de Panamá', fr: 'Panama', pt: 'Cidade do Panamá', zh: '巴拿马城', hi: 'पनामा सिटी', ar: 'بنما سيتي', ru: 'Панама', ja: 'パナマ市', bn: 'পানামা সিটি' },
  'london': { en: 'London', es: 'Londres', fr: 'Londres', pt: 'Londres', zh: '伦敦', hi: 'लंदन', ar: 'لندن', ru: 'Лондон', ja: 'ロンドン', bn: 'লন্ডন' },
  'paris': { en: 'Paris', es: 'París', fr: 'Paris', pt: 'Paris', zh: '巴黎', hi: 'पेरिस', ar: 'باريس', ru: 'Париж', ja: 'パリ', bn: 'প্যারিস' },
  'berlin': { en: 'Berlin', es: 'Berlín', fr: 'Berlin', pt: 'Berlim', zh: '柏林', hi: 'बर्लिन', ar: 'برلين', ru: 'Берлин', ja: 'ベルリン', bn: 'বার্লিন' },
  'rome': { en: 'Rome', es: 'Roma', fr: 'Rome', pt: 'Roma', zh: '罗马', hi: 'रोम', ar: 'روما', ru: 'Рим', ja: 'ローマ', bn: 'রোম' },
  'amsterdam': { en: 'Amsterdam', es: 'Ámsterdam', fr: 'Amsterdam', pt: 'Amsterdã', zh: '阿姆斯特丹', hi: 'एम्स्टर्डम', ar: 'أمستردام', ru: 'Амстердам', ja: 'アムステルダム', bn: 'আমস্টারডাম' },
  'lisbon': { en: 'Lisbon', es: 'Lisboa', fr: 'Lisbonne', pt: 'Lisboa', zh: '里斯本', hi: 'लिस्बन', ar: 'لشبونة', ru: 'Лиссабон', ja: 'リスボン', bn: 'লিসবন' },
  'brussels': { en: 'Brussels', es: 'Bruselas', fr: 'Bruxelles', pt: 'Bruxelas', zh: '布鲁塞尔', hi: 'ब्रुसेल्स', ar: 'بروكسل', ru: 'Брюссель', ja: 'ブリュッセル', bn: 'ব্রাসেলস' },
  'vienna': { en: 'Vienna', es: 'Viena', fr: 'Vienne', pt: 'Viena', zh: '维也纳', hi: 'वियना', ar: 'فيينا', ru: 'Вена', ja: 'ウィーン', bn: 'ভিয়েনা' },
  'athens': { en: 'Athens', es: 'Atenas', fr: 'Athènes', pt: 'Atenas', zh: '雅典', hi: 'एथेंस', ar: 'أثينا', ru: 'Афины', ja: 'アテネ', bn: 'এথেন্স' },
  'zurich': { en: 'Zurich', es: 'Zúrich', fr: 'Zurich', pt: 'Zurique', zh: '苏黎世', hi: 'ज्यूरिख', ar: 'زيورخ', ru: 'Цюрих', ja: 'チューリッヒ', bn: 'জুরিখ' },
  'moscow': { en: 'Moscow', es: 'Moscú', fr: 'Moscou', pt: 'Moscou', zh: '莫斯科', hi: 'मास्को', ar: 'موسكو', ru: 'Москва', ja: 'モスクワ', bn: 'মস্কো' },
  'tokyo': { en: 'Tokyo', es: 'Tokio', fr: 'Tokyo', pt: 'Tóquio', zh: '东京', hi: 'टोक्यो', ar: 'طوكيو', ru: 'Токио', ja: '東京', bn: 'টোকিও' },
  'seoul': { en: 'Seoul', es: 'Seúl', fr: 'Séoul', pt: 'Seul', zh: '首尔', hi: 'सियोल', ar: 'سيول', ru: 'Сеул', ja: 'ソウル', bn: 'সিওল' },
  'beijing': { en: 'Beijing', es: 'Pekín', fr: 'Pékin', pt: 'Pequim', zh: '北京', hi: 'बीजिंग', ar: 'بكين', ru: 'Пекин', ja: '北京', bn: 'বেইজিং' },
  'singapore': { en: 'Singapore', es: 'Singapur', fr: 'Singapour', pt: 'Singapura', zh: '新加坡', hi: 'सिंगापुर', ar: 'سنغافورة', ru: 'Сингапур', ja: 'シンガポール', bn: 'সিঙ্গাপুর' },
  'new-delhi': { en: 'New Delhi', es: 'Nueva Delhi', fr: 'New Delhi', pt: 'Nova Déli', zh: '新德里', hi: 'नई दिल्ली', ar: 'نيودلهي', ru: 'Нью-Дели', ja: 'ニューデリー', bn: 'নয়াদিল্লি' },
  'dubai': { en: 'Dubai', es: 'Dubái', fr: 'Dubaï', pt: 'Dubai', zh: '迪拜', hi: 'दुबई', ar: 'دبي', ru: 'Дубай', ja: 'ドバイ', bn: 'দুবাই' },
  'istanbul': { en: 'Istanbul', es: 'Estambul', fr: 'Istanbul', pt: 'Istambul', zh: '伊斯坦布尔', hi: 'इस्तांबुल', ar: 'إسطنبول', ru: 'Стамбул', ja: 'イスタンブール', bn: 'ইস্তাম্বুল' },
  'cairo': { en: 'Cairo', es: 'El Cairo', fr: 'Le Caire', pt: 'Cairo', zh: '开罗', hi: 'काहिरा', ar: 'القاهرة', ru: 'Каир', ja: 'カイロ', bn: 'কায়রো' },
  'johannesburg': { en: 'Johannesburg', es: 'Johannesburgo', fr: 'Johannesbourg', pt: 'Joanesburgo', zh: '约翰内斯堡', hi: 'जोहान्सबर्ग', ar: 'جوهانسبرغ', ru: 'Йоханнесбург', ja: 'ヨハネスブルグ', bn: 'জোহানেসবার্গ' },
  'sydney': { en: 'Sydney', es: 'Sídney', fr: 'Sydney', pt: 'Sydney', zh: '悉尼', hi: 'सिडनी', ar: 'سيدني', ru: 'Сидней', ja: 'シドニー', bn: 'সিডনি' },
  'stockholm': { en: 'Stockholm', es: 'Estocolmo', fr: 'Stockholm', pt: 'Estocolmo', zh: '斯德哥尔摩', hi: 'स्टॉकहोम', ar: 'ستوكهولم', ru: 'Стокгольм', ja: 'ストックホルム', bn: 'স্টকহোম' },
  'copenhagen': { en: 'Copenhagen', es: 'Copenhague', fr: 'Copenhague', pt: 'Copenhague', zh: '哥本哈根', hi: 'कोपेनहेगन', ar: 'كوبنهاغن', ru: 'Копенгаген', ja: 'コペンハーゲン', bn: 'কোপেনহেগেন' },
  'reykjavik': { en: 'Reykjavik', es: 'Reikiavik', fr: 'Reykjavik', pt: 'Reykjavik', zh: '雷克雅未克', hi: 'रेकजाविक', ar: 'ريكيافيك', ru: 'Рейкьявик', ja: 'レイキャビク', bn: 'রেকিয়াভিক' },
  'dublin': { en: 'Dublin', es: 'Dublín', fr: 'Dublin', pt: 'Dublin', zh: '都柏林', hi: 'डबलिन', ar: 'دبلن', ru: 'Дублин', ja: 'ダブリン', bn: 'ডাবলিন' },
  'warsaw': { en: 'Warsaw', es: 'Varsovia', fr: 'Varsovie', pt: 'Varsóvia', zh: '华沙', hi: 'वारसॉ', ar: 'وارسو', ru: 'Варшава', ja: 'ワルシャワ', bn: 'ওয়ারশ' },
  'prague': { en: 'Prague', es: 'Praga', fr: 'Prague', pt: 'Praga', zh: '布拉格', hi: 'प्राग', ar: 'براغ', ru: 'Прага', ja: 'プラハ', bn: 'প্রাগ' },
  'bucharest': { en: 'Bucharest', es: 'Bucarest', fr: 'Bucarest', pt: 'Bucareste', zh: '布加勒斯特', hi: 'बुखारेस्ट', ar: 'بوخارست', ru: 'Бухарест', ja: 'ブカレスト', bn: 'বুখারেস্ট' },
  'kyiv': { en: 'Kyiv', es: 'Kiev', fr: 'Kyiv', pt: 'Kiev', zh: '基辅', hi: 'कीव', ar: 'كييف', ru: 'Киев', ja: 'キーウ', bn: 'কিয়েভ' },
  'belgrade': { en: 'Belgrade', es: 'Belgrado', fr: 'Belgrade', pt: 'Belgrado', zh: '贝尔格莱德', hi: 'बेलग्रेड', ar: 'بلغراد', ru: 'Белград', ja: 'ベオグラード', bn: 'বেলগ্রেড' },
  'jakarta': { en: 'Jakarta', es: 'Yakarta', fr: 'Jakarta', pt: 'Jacarta', zh: '雅加达', hi: 'जकार्ता', ar: 'جاكرتا', ru: 'Джакарта', ja: 'ジャカルタ', bn: 'জাকার্তা' },
  'hanoi': { en: 'Hanoi', es: 'Hanói', fr: 'Hanoï', pt: 'Hanói', zh: '河内', hi: 'हनोई', ar: 'هانوي', ru: 'Ханой', ja: 'ハノイ', bn: 'হ্যানয়' },
  'ho-chi-minh': { en: 'Ho Chi Minh City', es: 'Ciudad Ho Chi Minh', fr: 'Hô Chi Minh-Ville', pt: 'Cidade de Ho Chi Minh', zh: '胡志明市', hi: 'हो ची मिन्ह सिटी', ar: 'مدينة هو تشي منه', ru: 'Хошимин', ja: 'ホーチミン市', bn: 'হো চি মিন সিটি' },
  'taipei': { en: 'Taipei', es: 'Taipéi', fr: 'Taipei', pt: 'Taipei', zh: '台北', hi: 'ताइपे', ar: 'تايبيه', ru: 'Тайбэй', ja: '台北', bn: 'তাইপেই' },
  'kathmandu': { en: 'Kathmandu', es: 'Katmandú', fr: 'Katmandou', pt: 'Catmandu', zh: '加德满都', hi: 'काठमांडू', ar: 'كاتماندو', ru: 'Катманду', ja: 'カトマンズ', bn: 'কাঠমান্ডু' },
  'dhaka': { en: 'Dhaka', es: 'Daca', fr: 'Dacca', pt: 'Daca', zh: '达卡', hi: 'ढाका', ar: 'دكا', ru: 'Дакка', ja: 'ダッカ', bn: 'ঢাকা' },
  'ulaanbaatar': { en: 'Ulaanbaatar', es: 'Ulán Bator', fr: 'Oulan-Bator', pt: 'Ulan Bator', zh: '乌兰巴托', hi: 'उलानबटार', ar: 'أولان باتور', ru: 'Улан-Батор', ja: 'ウランバートル', bn: 'উলানবাটর' },
  'riyadh': { en: 'Riyadh', es: 'Riad', fr: 'Riyad', pt: 'Riade', zh: '利雅得', hi: 'रियाद', ar: 'الرياض', ru: 'Эр-Рияд', ja: 'リヤド', bn: 'রিয়াদ' },
  'jeddah': { en: 'Jeddah', es: 'Yeda', fr: 'Djeddah', pt: 'Jidá', zh: '吉达', hi: 'जेद्दा', ar: 'جدة', ru: 'Джидда', ja: 'ジッダ', bn: 'জেদ্দা' },
  'tehran': { en: 'Tehran', es: 'Teherán', fr: 'Téhéran', pt: 'Teerã', zh: '德黑兰', hi: 'तेहरान', ar: 'طهران', ru: 'Тегеран', ja: 'テヘラン', bn: 'তেহরান' },
  'kuwait-city': { en: 'Kuwait City', es: 'Ciudad de Kuwait', fr: 'Koweït', pt: 'Cidade do Kuwait', zh: '科威特城', hi: 'कुवैत सिटी', ar: 'مدينة الكويت', ru: 'Эль-Кувейт', ja: 'クウェート市', bn: 'কুয়েত সিটি' },
  'addis-ababa': { en: 'Addis Ababa', es: 'Adís Abeba', fr: 'Addis-Abeba', pt: 'Adis Abeba', zh: '亚的斯亚贝巴', hi: 'अदीस अबाबा', ar: 'أديس أबाबा', ru: 'Аддис-Абеба', ja: 'アディスアベバ', bn: 'আদ্দিস আবাবা' },
  'accra': { en: 'Accra', es: 'Acra', fr: 'Accra', pt: 'Acra', zh: '阿克拉', hi: 'अकरा', ar: 'أكرا', ru: 'Аккра', ja: 'アクラ', bn: 'আক্রা' },
  'algiers': { en: 'Algiers', es: 'Argel', fr: 'Alger', pt: 'Argel', zh: '阿尔及尔', hi: 'अल्जीयर्स', ar: 'الجزائر', ru: 'Алжир', ja: 'アルジェ', bn: 'আলজিয়ার্স' },
  'cape-town': { en: 'Cape Town', es: 'Ciudad del Cabo', fr: 'Le Cap', pt: 'Cidade do Cabo', zh: '开普敦', hi: 'केप टाउन', ar: 'كيب تاون', ru: 'Кейптаун', ja: 'ケープタウン', bn: 'কেপ টাউন' },
  'guatemala-city': { en: 'Guatemala City', es: 'Ciudad de Guatemala', fr: 'Guatemala', pt: 'Cidade da Guatemala', zh: '危地马拉城', hi: 'ग्वाटेमाला सिटी', ar: 'مدينة غواتيمالا', ru: 'Гватемала', ja: 'グアテマラシティ', bn: 'গুয়াতেমালা সিটি' },
  'adelaide': { en: 'Adelaide', es: 'Adelaida', fr: 'Adélaïde', pt: 'Adelaide', zh: '阿德莱德', hi: 'एडिलेड', ar: 'أديلايد', ru: 'Аделаида', ja: 'アデレード', bn: 'অ্যাডিলেড' }
};

export function getTranslatedCity(city: TranslatableCity, langCode: string): string {
  if (!city) return '';
  const normLang = langCode.split('-')[0];
  const translations = CITY_NAME_TRANSLATIONS[city.id];
  if (translations && translations[normLang]) {
    return translations[normLang];
  }
  if (normLang === 'en' && translations && translations.en) {
    return translations.en;
  }
  return city.name;
}

export function getCitySeoSlug(city: TranslatableCity, langCode: string): string {
  if (!city) return '';
  const normLang = langCode.split('-')[0];
  if (normLang === 'en') {
    return `time-in-${city.id}`;
  }
  return city.seoSlug || `hora-en-${city.id}`;
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
