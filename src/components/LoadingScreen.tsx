import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Language } from '../i18n/types';
import { content } from '../i18n/content';

interface LoadingScreenProps {
  onComplete: () => void;
  language: Language;
}

const TOTAL_DURATION = 6800;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, language }) => {
  const c = content[language].loading;
  const FACTS = c.facts;
  const STAGES = c.stages;
  const [elapsed, setElapsed] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();

    const tick = window.setInterval(() => {
      const nextElapsed = Math.min(Date.now() - startedAt, TOTAL_DURATION);
      setElapsed(nextElapsed);
    }, 100);

    const factTimer = window.setInterval(() => {
      setFactIndex((current) => (current + 1) % FACTS.length);
    }, 2200);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(factTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, FACTS.length]);

  const progress = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));

  const currentStage = useMemo(() => {
    const stageIndex = Math.min(
      STAGES.length - 1,
      Math.floor((progress / 100) * STAGES.length)
    );

    return STAGES[stageIndex];
  }, [progress, STAGES]);

  return (
    <div className="min-h-screen relative overflow-hidden px-5 py-8 md:px-6 md:py-10 flex items-center justify-center">
      <div className="absolute left-[8%] top-[14%] h-40 w-40 rounded-full bg-pink-primary/20 blur-[90px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[12%] h-48 w-48 rounded-full bg-sand-soft/70 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="rounded-[2rem] md:rounded-[2.3rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.58))] px-5 py-6 md:px-10 md:py-10 shadow-[0_28px_64px_rgba(235,199,207,0.18)] backdrop-blur-[12px]">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-pink-primary/30 bg-white/65 px-3.5 py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-[0_10px_24px_rgba(235,199,207,0.12)]">
                {c.badge}
              </div>

              <h2 className="mt-4 md:mt-5 text-[1.8rem] md:text-[2.8rem] font-display font-semibold leading-[1] tracking-[-0.03em] text-text-main">
                {c.titleTop}
                <span className="block">{c.titleBottom}</span>
              </h2>

              <p className="mt-3.5 md:mt-4 max-w-[460px] text-[14px] md:text-[17px] leading-[1.65] text-text-secondary">
                {c.description}
              </p>
            </div>

            <div className="rounded-[1.6rem] md:rounded-[2rem] border border-white/75 bg-white/68 p-4 md:p-6 shadow-[0_18px_40px_rgba(235,199,207,0.14)]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary/70">
                  {c.status}
                </span>
                <span className="text-sm font-semibold text-text-main">
                  {progress}%
                </span>
              </div>

              <div className="mt-3.5 md:mt-4 h-3 overflow-hidden rounded-full bg-sand-soft/85">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#ddb7bf_0%,#e7c2ca_45%,#e8c9b4_100%)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <div className="mt-4 md:mt-5 rounded-[1.2rem] md:rounded-[1.4rem] border border-white/75 bg-bg-main/70 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/60">
                  {c.now}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-[17px] md:text-[20px] font-semibold leading-[1.3] text-text-main"
                  >
                    {currentStage}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-4 md:mt-5 grid grid-cols-3 gap-2.5 md:gap-3">
                {[
                  ...c.metrics,
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1rem] md:rounded-[1.2rem] border border-white/75 bg-white/60 px-3 py-3 text-center shadow-[0_10px_24px_rgba(235,199,207,0.10)]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">
                      {item}
                    </p>
                    <p className="mt-1 text-[13px] md:text-[14px] font-semibold text-text-main">{c.processing}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-5 rounded-[1.2rem] md:rounded-[1.4rem] border border-white/75 bg-white/58 px-4 py-4 shadow-[0_10px_24px_rgba(235,199,207,0.10)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/60">
                  {c.usefulFact}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={factIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-[13.5px] md:text-[15px] leading-[1.65] text-text-secondary"
                  >
                    {FACTS[factIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
