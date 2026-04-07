import React from 'react';

interface LegalLinksProps {
  className?: string;
}

export const LegalLinks: React.FC<LegalLinksProps> = ({ className = '' }) => {
  return (
    <div className={`text-center text-[12px] text-text-secondary/80 ${className}`.trim()}>
      <a className="underline hover:text-text-main transition-colors" href="/terms">
        Общи условия
      </a>
      <span className="mx-2 text-text-secondary/60">•</span>
      <a className="underline hover:text-text-main transition-colors" href="/privacy">
        Политика за поверителност
      </a>
    </div>
  );
};
