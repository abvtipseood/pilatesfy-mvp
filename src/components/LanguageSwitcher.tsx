import React from 'react';
import type { Language } from '../i18n/types';

interface LanguageSwitcherProps {
  language: Language;
  onChange: (language: Language) => void;
}

const options: Array<{ code: Language; label: string }> = [
  { code: 'bg', label: 'BG' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onChange }) => {
  return (
    <div className="fixed right-3 top-3 z-50 rounded-full border border-white/80 bg-white/90 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="flex items-center gap-1">
        {options.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => onChange(option.code)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              language === option.code
                ? 'bg-pink-secondary text-white'
                : 'text-text-secondary hover:bg-bg-main'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

