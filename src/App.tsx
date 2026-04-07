import React, { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { LegalPage } from './components/LegalPage';
import { calculateResult, QuizResult } from './utils/scoring';

type AppState = 'landing' | 'quiz' | 'loading' | 'result' | 'checkout';

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const [appState, setAppState] = useState<AppState>('landing');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (pathname === '/terms' || pathname === '/terms-and-conditions') {
    return <LegalPage type="terms" />;
  }
  if (pathname === '/privacy' || pathname === '/privacy-policy') {
    return <LegalPage type="privacy" />;
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
        throw new Error(data.error || 'Не успяхме да стартираме плащането.');
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Възникна проблем при пренасочването към плащане.');
    }
  };

  return (
    <div className="min-h-screen bg-bg-main selection:bg-pink-primary/30">
      {appState === 'landing' && <LandingScreen onStart={handleStartQuiz} />}
      {appState === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {appState === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      {appState === 'result' && quizResult && (
        <ResultScreen result={quizResult} onCheckout={handleCheckout} />
      )}
      {appState === 'checkout' && (
        <div className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h2 className="text-2xl font-display font-medium mb-4">
              {checkoutError ? 'Проблем с плащането' : 'Пренасочваме те към сигурно плащане'}
            </h2>
            <p className="text-text-secondary mb-8">
              {checkoutError || 'Моля, изчакай няколко секунди...'}
            </p>
            <button 
              onClick={() => setAppState(quizResult ? 'result' : 'landing')}
              className="text-pink-secondary underline"
            >
              {checkoutError ? 'Обратно към резултата' : 'Отказ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
