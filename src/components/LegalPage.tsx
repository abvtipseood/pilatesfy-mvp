import React, { useEffect } from 'react';
import { content as i18nContent } from '../i18n/content';
import { legalContent } from '../i18n/legal';
import type { Language } from '../i18n/types';

type LegalPageType = 'terms' | 'privacy';

interface LegalPageProps {
  type: LegalPageType;
  language: Language;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, language }) => {
  const isTerms = type === 'terms';
  const title = isTerms ? i18nContent[language].legal.terms : i18nContent[language].legal.privacy;
  const legalBody = legalContent[language][type];
  const pageUrl = isTerms ? 'https://www.pilatesfy.com/terms' : 'https://www.pilatesfy.com/privacy';
  const pageTitle = `${title} | Pilatesfy`;
  const pageDescription = isTerms
    ? {
        bg: 'Общи условия за ползване на уебсайта и дигиталните продукти на Pilatesfy.',
        en: 'Terms and Conditions for using the Pilatesfy website and digital products.',
        de: 'Allgemeine Geschaftsbedingungen fur die Nutzung der Pilatesfy Website und digitaler Produkte.',
      }[language]
    : {
        bg: 'Политика за поверителност и обработка на лични данни на Pilatesfy.',
        en: 'Privacy Policy and personal data processing information for Pilatesfy.',
        de: 'Datenschutzrichtlinie und Informationen zur Verarbeitung personenbezogener Daten bei Pilatesfy.',
      }[language];

  useEffect(() => {
    const upsertMeta = (selector: string, attribute: 'name' | 'property', value: string, contentValue: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    const upsertCanonical = (href: string) => {
      let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', href);
    };

    document.title = pageTitle;
    upsertMeta('meta[name="description"]', 'name', 'description', pageDescription);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', pageDescription);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription);
    upsertCanonical(pageUrl);
  }, [pageDescription, pageTitle, pageUrl]);

  return (
    <div className="min-h-screen bg-bg-main px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        <a href="/" className="inline-block text-sm text-pink-secondary underline hover:text-text-main transition-colors">
          {i18nContent[language].legal.backToSite}
        </a>
        <h1 className="mt-4 text-3xl sm:text-4xl font-display font-semibold text-text-main">
          {title}
        </h1>
        <div className="mt-6 rounded-3xl border border-white/80 bg-white/70 p-5 sm:p-8 shadow-[0_20px_40px_rgba(235,199,207,0.14)]">
          <pre className="whitespace-pre-wrap text-[14px] sm:text-[15px] leading-relaxed text-text-secondary font-sans">
            {legalBody}
          </pre>
        </div>
      </div>
    </div>
  );
};

