import type { Language } from './types';

const countryLanguageMap: Record<string, Language> = {
  BG: 'bg',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  LU: 'de',
  BE: 'de',
};

const timezoneLanguageMap: Array<{ pattern: RegExp; language: Language }> = [
  { pattern: /^Europe\/Sofia$/i, language: 'bg' },
  { pattern: /^Europe\/(Berlin|Vienna|Zurich|Vaduz|Luxembourg)$/i, language: 'de' },
];

function extractCountryCode(locale: string): string | null {
  const match = locale.match(/[-_](?<country>[A-Z]{2})\b/i);
  return match?.groups?.country?.toUpperCase() ?? null;
}

export function detectLanguageByCountry(): Language {
  const localeCandidates = [
    ...(navigator.languages || []),
    navigator.language || '',
  ].filter(Boolean);

  for (const locale of localeCandidates) {
    const countryCode = extractCountryCode(locale);
    if (countryCode && countryLanguageMap[countryCode]) {
      return countryLanguageMap[countryCode];
    }
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  for (const rule of timezoneLanguageMap) {
    if (rule.pattern.test(timezone)) {
      return rule.language;
    }
  }

  return 'en';
}
