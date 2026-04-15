import en from './en';
import fr from './fr';
import ko from './ko';

type Lang = 'en' | 'fr' | 'ko';
const translations: Record<Lang, Record<string, string>> = { en, fr, ko };

export function useTranslations(lang: Lang) {
  return (key: string): string =>
    translations[lang][key] ?? translations.en[key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'fr' || seg === 'ko') return seg;
  return 'en';
}

export function getAlternateUrls(currentLang: Lang, pathname: string) {
  const base = 'https://ai.it-concept.kr';
  const path = currentLang === 'en' ? pathname : pathname.replace(/^\/(fr|ko)/, '');
  return {
    en: `${base}${path}`,
    fr: `${base}/fr${path}`,
    ko: `${base}/ko${path}`,
  };
}
