/**
 * Multi-language support via Google Translate API.
 * Managed via cookies to ensure persistence across page loads.
 */

const TRANSLATION_CONFIG = {
  defaultLang: 'en',
  supportedLangs: ['en', 'it'],
  cookieName: 'googtrans',
  anchorId: 'google-translate-anchor'
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

function setupTranslation() {
  const buttons = $$('.language-button');
  if (!buttons.length) return;

  // Parse current language from cookie
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${TRANSLATION_CONFIG.cookieName}=\\/${TRANSLATION_CONFIG.defaultLang}\\/([^;]+)`));
  const activeLanguage = match?.[1] === 'it' ? 'it' : 'en';

  const setActive = (language) => {
    buttons.forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  setActive(activeLanguage);

  buttons.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    if (language === activeLanguage) return;

    const hostname = location.hostname;
    const cookieVal = language === 'en' ? '' : `/${TRANSLATION_CONFIG.defaultLang}/${language}`;
    const maxAge = language === 'en' ? 0 : 31536000; // 1 year for non-english

    // Set cookie for current path and for the domain to ensure it works across the site
    document.cookie = `${TRANSLATION_CONFIG.cookieName}=${cookieVal};path=/;max-age=${maxAge}`;
    document.cookie = `${TRANSLATION_CONFIG.cookieName}=${cookieVal};path=/;domain=${hostname};max-age=${maxAge}`;

    location.reload();
  }));

  // Initialize Google Translate widget
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) return;
    new window.google.translate.TranslateElement({
      pageLanguage: TRANSLATION_CONFIG.defaultLang,
      includedLanguages: TRANSLATION_CONFIG.supportedLangs.join(','),
      autoDisplay: false,
    }, TRANSLATION_CONFIG.anchorId);
  };

  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupTranslation);
} else {
  setupTranslation();
}
