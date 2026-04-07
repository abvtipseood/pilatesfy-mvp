import React, { Suspense, lazy, useEffect, useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { calculateResult, QuizResult } from './utils/scoring';
import { content } from './i18n/content';
import type { Language } from './i18n/types';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { detectLanguageByCountry } from './i18n/languageDetection';

const QuizScreen = lazy(() => import('./components/QuizScreen').then((module) => ({ default: module.QuizScreen })));
const LoadingScreen = lazy(() => import('./components/LoadingScreen').then((module) => ({ default: module.LoadingScreen })));
const ResultScreen = lazy(() => import('./components/ResultScreen').then((module) => ({ default: module.ResultScreen })));
const LegalPage = lazy(() => import('./components/LegalPage').then((module) => ({ default: module.LegalPage })));

type AppState = 'landing' | 'quiz' | 'loading' | 'result' | 'checkout';

export default function App() {
  const detectInitialLanguage = (): Language => {
    const stored = window.localStorage.getItem('pilatesfy-language');
    if (stored === 'bg' || stored === 'en' || stored === 'de') return stored;
    return detectLanguageByCountry();
  };

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);
  const [appState, setAppState] = useState<AppState>('landing');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const t = content[language];

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('pilatesfy-language', nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  if (pathname === '/terms' || pathname === '/terms-and-conditions') {
    return (
      <Suspense fallback={null}>
        <>
          <LanguageSwitcher language={language} onChange={handleLanguageChange} />
          <LegalPage type="terms" language={language} />
        </>
      </Suspense>
    );
  }
  if (pathname === '/privacy' || pathname === '/privacy-policy') {
    return (
      <Suspense fallback={null}>
        <>
          <LanguageSwitcher language={language} onChange={handleLanguageChange} />
          <LegalPage type="privacy" language={language} />
        </>
      </Suspense>
    );
  }

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = (answers: Record<number, number | string>) => {
    const result = calculateResult(answers);
    setQuizResult(result);
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    setAppState('result');
  };

  const handleCheckout = async () => {
    if (!quizResult) return;

    setCheckoutError(null);
    setAppState('checkout');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          program: quizResult.program,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || t.app.checkoutErrorFallback);
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : t.app.checkoutRedirectErrorFallback);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main selection:bg-pink-primary/30">
      <LanguageSwitcher language={language} onChange={handleLanguageChange} />
      {appState === 'landing' && <LandingScreen onStart={handleStartQuiz} language={language} />}
      {appState === 'quiz' && (
        <Suspense fallback={null}>
          <QuizScreen onComplete={handleQuizComplete} language={language} />
        </Suspense>
      )}
      {appState === 'loading' && (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={handleLoadingComplete} language={language} />
        </Suspense>
      )}
      {appState === 'result' && quizResult && (
        <Suspense fallback={null}>
          <ResultScreen result={quizResult} onCheckout={handleCheckout} language={language} />
        </Suspense>
      )}
      {appState === 'checkout' && (
        <div className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h2 className="text-2xl font-display font-medium mb-4">
              {checkoutError ? t.app.checkoutErrorTitle : t.app.checkoutRedirectTitle}
            </h2>
            <p className="text-text-secondary mb-8">
              {checkoutError || t.app.checkoutWait}
            </p>
            <button 
              onClick={() => setAppState(quizResult ? 'result' : 'landing')}
              className="text-pink-secondary underline"
            >
              {checkoutError ? t.app.checkoutBack : t.app.checkoutCancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
