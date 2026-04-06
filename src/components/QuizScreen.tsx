import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { questions } from '../data/questions';
import { OptionCard } from './ui/OptionCard';
import { ProgressBar } from './ui/ProgressBar';
import { trackEvent } from '../utils/analytics';

interface QuizScreenProps {
  onComplete: (answers: Record<number, number | string>) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const currentQuestion = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const remainingQuestions = questions.length - currentIndex - 1;
  const progressDots = questions.map((_, index) => index);

  useEffect(() => {
    if (currentIndex === 0) {
      trackEvent('quiz_question_viewed', { question_id: currentQuestion.id });
    }
  }, []);

  const handleAnswer = (value: number | string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    trackEvent('quiz_question_answered', { question_id: currentQuestion.id, answer: value });

    // Track progress milestones
    if (currentIndex === Math.floor(questions.length * 0.25)) trackEvent('quiz_progress_25');
    if (currentIndex === Math.floor(questions.length * 0.5)) trackEvent('quiz_progress_50');
    if (currentIndex === Math.floor(questions.length * 0.75)) trackEvent('quiz_progress_75');

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
        trackEvent('quiz_question_viewed', { question_id: questions[currentIndex + 1].id });
      } else {
        trackEvent('quiz_complete');
        onComplete(newAnswers);
      }
    }, 300); // Small delay for the user to see the selection
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 36 : -36,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 36 : -36,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.985
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col max-w-md lg:max-w-[1180px] mx-auto px-5 py-5 lg:px-8 lg:py-10">
      <div className="absolute left-[-14%] top-[4%] h-40 w-40 rounded-full bg-pink-primary/20 blur-[80px] pointer-events-none" />
      <div className="absolute right-[-12%] top-[18%] h-32 w-32 rounded-full bg-sand-soft/70 blur-[70px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 lg:mb-8 relative z-10">
        <button 
          onClick={handleBack}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/65 text-text-secondary transition-colors ${currentIndex === 0 ? 'invisible' : ''}`}
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary/70">
            Pilatesfy quiz
          </p>
          <span className="text-sm font-medium text-text-secondary">
            Въпрос {currentIndex + 1} от {questions.length}
          </span>
        </div>
        <div className="w-10" />
      </div>

      <div className="relative z-10 mb-4 lg:mb-8 rounded-[1.65rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.56))] px-4 py-4 lg:rounded-[2rem] lg:px-7 lg:py-5 shadow-[0_14px_32px_rgba(235,199,207,0.14)] backdrop-blur-[8px]">
        <div className="flex items-center justify-between mb-3 lg:mb-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary/70">
            Прогрес
          </span>
          <span className="rounded-full bg-white/72 px-2.5 py-1 text-[11px] font-medium text-text-secondary shadow-[0_6px_16px_rgba(235,199,207,0.08)] lg:bg-transparent lg:px-0 lg:py-0 lg:text-[13px] lg:shadow-none">
            Остават {remainingQuestions}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1.5 lg:gap-3">
          {progressDots.map((dotIndex) => {
            const isCurrent = dotIndex === currentIndex;
            const isCompleted = dotIndex < currentIndex;

            return (
              <div
                key={dotIndex}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'h-10 min-w-[2.75rem] px-2 lg:h-12 lg:w-12 lg:min-w-0 lg:px-0 border-2 border-pink-primary bg-white text-text-main shadow-[0_10px_22px_rgba(235,199,207,0.24)]'
                    : isCompleted
                      ? 'h-2.5 w-2.5 lg:h-3 lg:w-3 bg-pink-secondary shadow-[0_0_0_6px_rgba(235,199,207,0.08)]'
                      : 'h-2.5 w-2.5 lg:h-3 lg:w-3 bg-pink-primary/30'
                }`}
              >
                {isCurrent ? (
                  <span className="text-[12px] font-semibold tracking-[0.01em] lg:text-[13px]">{dotIndex + 1}</span>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-4 lg:mt-4">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Encouragement Message */}
      <AnimatePresence mode="wait">
        {currentIndex === 7 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 text-center text-sm font-medium text-pink-secondary"
          >
            Остава съвсем малко… резултатът ти почти е готов
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center mb-6 lg:mb-8 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-[450px] lg:min-h-[520px] flex flex-col"
          >
            <div className="rounded-[1.75rem] border border-white/75 bg-white/72 px-4 py-4.5 lg:rounded-[2.25rem] lg:px-10 lg:py-8 shadow-[0_20px_40px_rgba(235,199,207,0.16)] backdrop-blur-[10px] mb-4 lg:mb-6">
              <div className="mb-3.5 flex items-center justify-between lg:mb-5">
                <span className="rounded-full bg-pink-primary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-secondary">
                  Въпрос {currentIndex + 1}
                </span>
                <span className="text-[11px] font-medium text-text-secondary/75 lg:text-[12px]">
                  {progress}%
                </span>
              </div>

              <div className="hidden lg:block mb-4 h-px w-full bg-gradient-to-r from-transparent via-pink-primary/18 to-transparent" />

              <h2 className="text-[30px] lg:text-[44px] font-display font-medium text-text-main leading-[1.08] tracking-[-0.03em] text-center text-balance max-w-[900px] mx-auto">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-2.5 lg:space-y-3.5 flex-1 max-w-[860px] mx-auto w-full">
              {currentQuestion.answers.map((answer, idx) => (
                <OptionCard
                  key={idx}
                  text={answer.text}
                  selected={answers[currentQuestion.id] === answer.value}
                  onClick={() => handleAnswer(answer.value)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
