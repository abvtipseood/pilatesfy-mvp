import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { QuizResult, PROGRAM_DETAILS, getPersonalizedMessaging } from '../utils/scoring';
import { trackEvent } from '../utils/analytics';
import resultModel from '../assets/result-model.png';

interface ResultScreenProps {
  result: QuizResult;
  onCheckout: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onCheckout }) => {
  const program = PROGRAM_DETAILS[result.program];
  const { q13Message, q14Message } = getPersonalizedMessaging(result.behavioral.q13, result.behavioral.q14);

  const pricing = {
    foundation_reset: { original: '€40', discounted: '€25' },
    core_sculpt: { original: '€40', discounted: '€25' },
    elite_flow: { original: '€40', discounted: '€25' }
  };
  const currentPrice = pricing[result.program];
  const summaryMeta = {
    foundation_reset: { level: 'Начинаещо', tempo: 'Спокойно', duration: '4 седмици' },
    core_sculpt: { level: 'Средно', tempo: 'Балансирано', duration: '6 седмици' },
    elite_flow: { level: 'Напреднало', tempo: 'Интензивно', duration: '8 седмици' }
  } as const;
  const currentMeta = summaryMeta[result.program];

  useEffect(() => {
    trackEvent('result_view', { program: result.program, score: result.score });
    trackEvent(`result_program_${result.program}`);
  }, [result]);

  const handleCheckout = () => {
    trackEvent('cta_click_result');
    trackEvent('continue_to_checkout');
    onCheckout();
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-bg-main pb-24 relative overflow-hidden">
      {/* Ambient Premium Background */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-sand-soft/60 to-transparent pointer-events-none" />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] lg:right-[10%] w-[60vw] lg:w-[40vw] h-[60vw] lg:h-[40vw] min-w-[300px] bg-pink-primary/20 rounded-full blur-[80px] pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-5 sm:px-6 pt-8 sm:pt-12 lg:pt-20 relative z-10"
      >
        {/* Header Area - Centered */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-pink-primary/30 rounded-full mb-4 sm:mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-secondary mr-2" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-text-main/80">
              Твоята препоръка
            </span>
          </div>
          
          <h1 className="text-[2.2rem] sm:text-5xl lg:text-6xl font-display font-semibold text-text-main mb-4 sm:mb-6 tracking-tight text-balance relative">
            {program.title}
            {/* Subtle glow behind title */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-primary/20 blur-2xl -z-10 rounded-full" />
          </h1>
          
          <p className="text-[15px] sm:text-[17px] lg:text-lg text-text-secondary leading-relaxed text-balance mx-auto max-w-[330px] sm:max-w-none">
            {program.intro}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="sm:hidden mb-5">
          <div className="rounded-[1.8rem] border border-white/80 bg-white/68 px-4 pt-4 pb-0 shadow-[0_20px_36px_rgba(235,199,207,0.16)] backdrop-blur-[10px] overflow-hidden">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <div className="inline-flex items-center rounded-full bg-pink-primary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-secondary mb-2">
                  Твоят match
                </div>
                <h3 className="text-[1.45rem] font-display font-semibold text-text-main leading-[1.05]">
                  {program.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                  Подбрана според нивото ти, ритъма ти и това, което искаш да постигнеш.
                </p>
              </div>
              <img
                src={resultModel}
                alt="Pilates model"
                loading="lazy"
                decoding="async"
                className="w-[118px] max-w-none object-contain object-bottom -mr-2 -mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/70 py-3">
              <div className="rounded-[1.1rem] bg-bg-main/78 px-2 py-2.5 text-center">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Ниво</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.level}</p>
              </div>
              <div className="rounded-[1.1rem] bg-bg-main/78 px-2 py-2.5 text-center">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Темпо</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.tempo}</p>
              </div>
              <div className="rounded-[1.1rem] bg-bg-main/78 px-2 py-2.5 text-center">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">План</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.duration}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Details & Benefits */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="rounded-[2rem] border border-white/80 bg-white/68 px-6 pt-6 pb-5 shadow-[0_20px_36px_rgba(235,199,207,0.16)] backdrop-blur-[10px] overflow-hidden">
                <div className="grid grid-cols-[1.05fr_0.95fr] items-end gap-5">
                  <div className="min-w-0">
                    <div className="inline-flex items-center rounded-full bg-pink-primary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-secondary mb-3">
                      Твоят match
                    </div>
                    <h3 className="text-[2rem] font-display font-semibold text-text-main leading-[1.02]">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-text-secondary max-w-[360px]">
                      Подбрана според нивото ти, ритъма ти и това, което искаш да постигнеш.
                    </p>
                  </div>
                  <img
                    src={resultModel}
                    alt="Pilates model"
                    loading="lazy"
                    decoding="async"
                    className="w-[220px] max-w-none ml-auto object-contain object-bottom -mr-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-white/70 pt-4 mt-3">
                  <div className="rounded-[1.1rem] bg-bg-main/78 px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Ниво</p>
                    <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.level}</p>
                  </div>
                  <div className="rounded-[1.1rem] bg-bg-main/78 px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Темпо</p>
                    <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.tempo}</p>
                  </div>
                  <div className="rounded-[1.1rem] bg-bg-main/78 px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">План</p>
                    <p className="mt-1 text-[13px] font-semibold text-text-main">{currentMeta.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personalized Messaging Block */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/60 backdrop-blur-md p-5 sm:p-7 lg:p-8 rounded-[1.8rem] sm:rounded-3xl shadow-[0_12px_28px_rgba(235,199,207,0.12)] border border-white/80 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pink-primary to-pink-secondary" />
                <h3 className="text-[1.35rem] sm:text-xl font-display font-medium text-text-main mb-3">
                  Създадена за твоя начин на живот
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-base text-text-secondary mb-3 leading-relaxed">
                  {q13Message}
                </p>
                <p className="text-[14px] sm:text-[15px] lg:text-base font-medium text-pink-secondary leading-relaxed">
                  {q14Message}
                </p>
              </div>
            </motion.div>

            {/* Benefits List */}
            <motion.div variants={itemVariants} className="px-0 sm:px-2 lg:px-0">
              <h3 className="text-[1.1rem] sm:text-lg font-display font-medium text-text-main mb-4 opacity-90">
                Какво ще постигнеш:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {program.benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,255,255,0.56))] p-4 sm:p-4 rounded-[1.3rem] sm:rounded-2xl border border-white/70 shadow-[0_12px_24px_rgba(235,199,207,0.14)]"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
                  >
                    <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-[0.95rem] bg-pink-primary/16 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-secondary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/60 mb-1 sm:hidden">
                        Резултат
                      </p>
                      <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-snug text-text-main">{benefit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Safety Layer */}
            {result.hasPain && (
              <motion.div variants={itemVariants}>
                <div className="flex items-start p-4 sm:p-5 bg-sand-soft/60 rounded-[1.4rem] sm:rounded-3xl border border-sand-soft">
                  <AlertCircle className="w-5 h-5 text-text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed">
                    Ако имаш постоянен дискомфорт или сериозни оплаквания, е добра идея да се консултираш със специалист преди да започнеш.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Sticky CTA Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <motion.div variants={itemVariants}>
              <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-[1.8rem] sm:rounded-[32px] shadow-[0_20px_40px_-15px_rgba(235,199,207,0.4)] border border-pink-primary/10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sand-soft/50 to-transparent rounded-bl-full pointer-events-none" />
                <div className="mb-3 inline-flex items-center rounded-full bg-pink-primary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-secondary relative z-10">
                  Персонална препоръка
                </div>

                <h3 className="text-[1.7rem] sm:text-2xl lg:text-3xl font-display font-semibold text-text-main mb-3 sm:mb-6 text-balance relative z-10">
                  Започни своята програма още днес
                </h3>

                <p className="text-[13px] sm:hidden text-text-secondary mb-4 relative z-10 max-w-[250px] mx-auto leading-relaxed">
                  Имаш ясна посока. Следващата стъпка е да започнеш с програмата, която най-много ти пасва.
                </p>
                
                <ul className="text-left space-y-3 sm:space-y-4 mb-5 sm:mb-8 text-[14px] sm:text-[15px] lg:text-base text-text-secondary relative z-10 max-w-[280px] mx-auto">
                  <li className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-pink-secondary mr-3 flex-shrink-0" /> 
                    <span>Ясен план стъпка по стъпка</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-pink-secondary mr-3 flex-shrink-0" /> 
                    <span>Видео тренировки</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-pink-secondary mr-3 flex-shrink-0" /> 
                    <span>Персонализирана програма на email</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-pink-secondary mr-3 flex-shrink-0" /> 
                    <span>Достъп веднага след покупка</span>
                  </li>
                </ul>
                
                {/* Optimized Price Block (Moved above CTA for better CRO & UX) */}
                <div className="mb-5 sm:mb-6 relative z-10 rounded-[1.3rem] bg-bg-main/70 px-4 py-4 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.16em] text-text-secondary/65 mb-2">
                    Специална цена днес
                  </div>
                  <div className="flex items-baseline justify-center gap-2.5">
                    <span className="text-base sm:text-lg text-text-secondary/50 line-through font-medium decoration-1">
                      {currentPrice.original}
                    </span>
                    <span className="text-[2rem] sm:text-4xl font-display font-bold text-text-main tracking-tight">
                      {currentPrice.discounted}
                    </span>
                  </div>
                  <span className="text-[11px] text-pink-secondary uppercase tracking-[0.15em] font-medium mt-1 block">
                    Еднократно плащане
                  </span>
                </div>
                
                <Button 
                  fullWidth 
                  onClick={handleCheckout} 
                  className="mb-3 h-[58px] sm:h-14 lg:h-16 text-[17px] sm:text-lg shadow-[0_10px_24px_rgba(235,199,207,0.42)] hover:shadow-[0_10px_28px_rgba(235,199,207,0.62)] relative z-10 group"
                >
                  Продължи към програмата
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-[12px] sm:text-[13px] text-text-secondary/70 relative z-10 max-w-[250px] mx-auto">
                  Ясен старт, веднага след следващата стъпка.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
