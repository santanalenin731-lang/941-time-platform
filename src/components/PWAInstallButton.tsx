import React, { useState, useEffect } from 'react';
import { Smartphone, Share, PlusSquare, X, Check } from 'lucide-react';
import { useLanguage } from '../lib/i18n.tsx';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const { languageInfo } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt on Chromium / Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Translations for the 10 supported languages
  const textDict: Record<string, {
    btnText: string;
    modalTitle: string;
    iosSubtitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    desktopNotice: string;
    gotIt: string;
  }> = {
    es: {
      btnText: 'Instalar App',
      modalTitle: 'Instalar 9:41 AM en tu dispositivo',
      iosSubtitle: 'Disfruta de la experiencia nativa a pantalla completa y sin barras de navegación.',
      step1: 'Pulsa el botón Compartir',
      step1Desc: 'En la barra inferior o superior de Safari, toca el icono de compartir',
      step2: 'Añadir a pantalla de inicio',
      step2Desc: 'Desplázate hacia abajo en el menú y selecciona',
      step3: 'Confirma pulsando «Añadir»',
      step3Desc: 'El icono de 9:41 AM aparecerá junto a tus aplicaciones favoritas.',
      desktopNotice: 'Puedes instalar 9:41 AM pulsando el icono de instalación en la barra de direcciones de tu navegador.',
      gotIt: '¡Entendido!'
    },
    en: {
      btnText: 'Install App',
      modalTitle: 'Install 9:41 AM on your device',
      iosSubtitle: 'Enjoy the full-screen native app experience without browser bars.',
      step1: 'Tap the Share button',
      step1Desc: 'In the Safari menu bar, tap the share icon',
      step2: 'Add to Home Screen',
      step2Desc: 'Scroll down the options list and select',
      step3: 'Tap «Add» to confirm',
      step3Desc: 'The 9:41 AM icon will appear right alongside your native apps.',
      desktopNotice: 'You can install 9:41 AM by clicking the install icon in your browser address bar.',
      gotIt: 'Got it!'
    },
    zh: {
      btnText: '安装应用',
      modalTitle: '在您的设备上安装 9:41 AM',
      iosSubtitle: '享受全屏无浏览器地址栏的原生应用体验。',
      step1: '点击分享按钮',
      step1Desc: '在 Safari 底栏或顶栏中点击分享图标',
      step2: '添加到主屏幕',
      step2Desc: '在选项列表中向下滑动并选择',
      step3: '点击“添加”以确认',
      step3Desc: '9:41 AM 图标将直接显示在您的手机桌面上。',
      desktopNotice: '您可以点击浏览器地址栏中的安装图标进行安装。',
      gotIt: '知道了'
    },
    hi: {
      btnText: 'ऐप इंस्टॉल करें',
      modalTitle: 'अपने डिवाइस पर 9:41 AM इंस्टॉल करें',
      iosSubtitle: 'बिना ब्राउज़र बार के फुल स्क्रीन नेटिव ऐप अनुभव का आनंद लें।',
      step1: 'शेयर बटन पर टैप करें',
      step1Desc: 'Safari में शेयर आइकन पर टैप करें',
      step2: 'होम स्क्रीन पर जोड़ें',
      step2Desc: 'नीचे स्क्रॉल करें और यह विकल्प चुनें',
      step3: 'पुष्टि करने के लिए «जोड़ें» दबाएं',
      step3Desc: '9:41 AM आइकन आपके ऐप्स के साथ दिखाई देगा।',
      desktopNotice: 'आप ब्राउज़र एड्रेस बार में इंस्टॉल आइकन पर क्लिक करके इंस्टॉल कर सकते हैं।',
      gotIt: 'समझ गया'
    },
    ar: {
      btnText: 'تثبيت التطبيق',
      modalTitle: 'تثبيت 9:41 AM على جهازك',
      iosSubtitle: 'استمتع بتجربة تطبيق كامل الشاشة بدون أشرطة المتصفح.',
      step1: 'اضغط على زر المشاركة',
      step1Desc: 'في شريط Safari، اضغط على أيقونة المشاركة',
      step2: 'إضافة إلى الشاشة الرئيسية',
      step2Desc: 'مرر لأسفل القائمة وحدد هذا الخيار',
      step3: 'اضغط «إضافة» للتأكيد',
      step3Desc: 'ستظهر أيقونة 9:41 AM على شاشتك الرئيسية.',
      desktopNotice: 'يمكنك تثبيت التطبيق من شريط العناوين في متصفحك.',
      gotIt: 'حسناً'
    },
    fr: {
      btnText: "Installer l'app",
      modalTitle: 'Installer 9:41 AM sur votre appareil',
      iosSubtitle: 'Profitez de la fluidité plein écran sans barres de navigation.',
      step1: 'Appuyez sur Partager',
      step1Desc: "Dans la barre de Safari, touchez l'icône de partage",
      step2: "Sur l'écran d'accueil",
      step2Desc: 'Faites défiler le menu et sélectionnez cette option',
      step3: 'Confirmez avec « Ajouter »',
      step3Desc: "L'icône 9:41 AM apparaîtra aux côtés de vos applications.",
      desktopNotice: "Vous pouvez installer l'application via la barre d'adresse de votre navigateur.",
      gotIt: 'Compris !'
    },
    bn: {
      btnText: 'অ্যাপ ইনস্টল করুন',
      modalTitle: 'আপনার ডিভাইসে 9:41 AM ইনস্টল করুন',
      iosSubtitle: 'ব্রাউজার বার ছাড়া ফুল স্ক্রিন নেটিভ অ্যাপের অভিজ্ঞতা উপভোগ করুন।',
      step1: 'শেয়ার বোতামে ট্যাপ করুন',
      step1Desc: 'Safari বারে শেয়ার আইকনে চাপুন',
      step2: 'হোম স্ক্রিনে যোগ করুন',
      step2Desc: 'তালিকায় নিচে স্ক্রোল করে নির্বাচন করুন',
      step3: 'নিশ্চিত করতে «যোগ করুন» চাপুন',
      step3Desc: '9:41 AM আইকনটি আপনার হোম স্ক্রিনে যুক্ত হবে।',
      desktopNotice: 'আপনি ব্রাউজারের অ্যাড্রেস বার থেকে সরাসরি ইনস্টল করতে পারেন।',
      gotIt: 'বুঝেছি'
    },
    pt: {
      btnText: 'Instalar App',
      modalTitle: 'Instalar 9:41 AM no seu dispositivo',
      iosSubtitle: 'Aproveite a experiência nativa em tela cheia sem barras de navegação.',
      step1: 'Toque no botão Compartilhar',
      step1Desc: 'Na barra do Safari, toque no ícone de compartilhamento',
      step2: 'Adicionar à Tela de Início',
      step2Desc: 'Role para baixo e selecione esta opção',
      step3: 'Confirme em «Adicionar»',
      step3Desc: 'O ícone do 9:41 AM aparecerá junto aos seus aplicativos.',
      desktopNotice: 'Você pode instalar clicando no ícone da barra de endereços do seu navegador.',
      gotIt: 'Entendi!'
    },
    ru: {
      btnText: 'Установить',
      modalTitle: 'Установить 9:41 AM на устройство',
      iosSubtitle: 'Полноэкранный режим без адресной строки и лишних рамок.',
      step1: 'Нажмите «Поделиться»',
      step1Desc: 'В панели Safari нажмите иконку «Поделиться»',
      step2: 'На экран «Домой»',
      step2Desc: 'Прокрутите меню вниз и выберите этот пункт',
      step3: 'Подтвердите «Добавить»',
      step3Desc: 'Иконка 9:41 AM появится на вашем рабочем столе.',
      desktopNotice: 'Вы можете установить приложение прямо из адресной строки браузера.',
      gotIt: 'Понятно'
    },
    ja: {
      btnText: 'アプリをインストール',
      modalTitle: '9:41 AM をデバイスにインストール',
      iosSubtitle: 'ブラウザのアドレスバーなしで、全画面の快適なアプリ体験をお楽しみください。',
      step1: '共有ボタンをタップ',
      step1Desc: 'Safari のバーにある共有アイコンをタップします',
      step2: '「ホーム画面に追加」を選択',
      step2Desc: 'メニューを下にスクロールしてこの項目を選択します',
      step3: '「追加」をタップして完了',
      step3Desc: 'ホーム画面に 9:41 AM の公式アイコンが追加されます。',
      desktopNotice: 'ブラウザのアドレスバーにあるインストールアイコンからもインストールできます。',
      gotIt: '了解'
    }
  };

  const t = textDict[languageInfo.code] || textDict['en'];

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsStandalone(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Error triggering PWA install prompt:', err);
        setShowModal(true);
      }
    } else {
      // For iOS, Safari, or browsers without native prompt event
      setShowModal(true);
    }
  };

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button - Apple Liquid Crystal Glass Material */}
      <aside
        aria-label="PWA Installation"
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '22px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.12)',
          padding: '6px 12px 6px 15px',
          borderRadius: '9999px',
          boxShadow: '0 4px 20px rgba(7, 26, 51, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.65), inset 0 -0.5px 1px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.42)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          backdropFilter: 'blur(28px) saturate(210%)',
          WebkitBackdropFilter: 'blur(28px) saturate(210%)'
        }}
        onClick={handleInstallClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(7, 26, 51, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.85)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(7, 26, 51, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.65), inset 0 -0.5px 1px rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.42)';
        }}
      >
        <span style={{
          fontSize: '0.84rem',
          fontWeight: 600,
          color: '#071A33',
          letterSpacing: '-0.01em',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          {t.btnText}
        </span>

        {/* Small dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          title={languageInfo.code === 'es' ? 'Ocultar' : 'Dismiss'}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(7, 26, 51, 0.4)',
            cursor: 'pointer',
            padding: '2px 0 2px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '2px',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#071A33'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(7, 26, 51, 0.4)'; }}
        >
          <X size={14} />
        </button>
      </aside>

      {/* Instructional Modal for Safari / iOS or unsupported browsers */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(4, 14, 28, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '430px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 60px rgba(7, 26, 51, 0.35)',
              border: '1px solid rgba(2, 132, 199, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#E2E8F0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284C7 0%, #0D47A1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                flexShrink: 0
              }}>
                <Smartphone size={26} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#071A33',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  {t.modalTitle}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#0284C7', fontWeight: 600 }}>
                  Progressive Web App (PWA)
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: '#475569',
              lineHeight: 1.5,
              margin: '0 0 1.25rem 0'
            }}>
              {t.iosSubtitle}
            </p>

            {/* Steps Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
              {/* Step 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                background: '#F8FAFC',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#E0F2FE',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Share size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#071A33' }}>
                    1. {t.step1}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                    {t.step1Desc} <strong style={{ color: '#0284C7' }}>[ ⎋ ]</strong>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                background: '#F8FAFC',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#E0F2FE',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <PlusSquare size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#071A33' }}>
                    2. {t.step2}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                    {t.step2Desc} <strong style={{ color: '#071A33' }}>«{t.step2}»</strong>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                background: '#F8FAFC',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#E0F2FE',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#071A33' }}>
                    3. {t.step3}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                    {t.step3Desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Notice */}
            {!isIOS && (
              <p style={{
                fontSize: '0.76rem',
                color: '#64748B',
                fontStyle: 'italic',
                margin: '0 0 1.25rem 0',
                textAlign: 'center'
              }}>
                {t.desktopNotice}
              </p>
            )}

            {/* Confirmation Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284C7 0%, #0D47A1 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              {t.gotIt}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
