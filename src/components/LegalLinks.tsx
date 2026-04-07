import React from 'react';
import { content } from '../i18n/content';
import type { Language } from '../i18n/types';

interface LegalLinksProps {
  className?: string;
  language: Language;
}

export const LegalLinks: React.FC<LegalLinksProps> = ({ className = '', language }) => {
  const c = content[language].legal;

  return (
    <div className={`text-center text-[12px] text-text-secondary/80 ${className}`.trim()}>
      <a className="underline hover:text-text-main transition-colors" href="/terms">
        {c.terms}
      </a>
      <span className="mx-2 text-text-secondary/60">•</span>
      <a className="underline hover:text-text-main transition-colors" href="/privacy">
        {c.privacy}
      </a>
    </div>
  );
};
