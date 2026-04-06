import React, { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { calculateResult, QuizResult } from './utils/scoring';

type AppState = 'landing' | 'quiz' | 'loading' | 'result' | 'checkout';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

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

  const handleCheckout = () => {
    // In MVP, this might just alert or go to a placeholder checkout page
    alert("Пренасочване към checkout/плащане...");
    setAppState('checkout');
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
            <h2 className="text-2xl font-display font-medium mb-4">Checkout Placeholder</h2>
            <p className="text-text-secondary mb-8">Тук ще бъде интегрирана системата за плащане (Stripe, etc.)</p>
            <button 
              onClick={() => setAppState('landing')}
              className="text-pink-secondary underline"
            >
              Обратно в началото
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
