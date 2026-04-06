import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, UserCircle2, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { trackEvent } from '../utils/analytics';
import landingModel from '../assets/landing-model.png';
import pilatesfyLogo from '../assets/pilatesfy-logo.png';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  const [liveUsers, setLiveUsers] = useState(68);

  useEffect(() => {
    trackEvent('landing_view');
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLiveUsers((current) => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = current + change;
        return Math.min(85, Math.max(40, next));
      });
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const handleStart = () => {
    trackEvent('quiz_start');
    onStart();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col px-5 py-6 sm:px-6 sm:py-8 relative overflow-hidden bg-bg-main">
      {/* Animated Premium Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-12%] right-[-12%] w-[42vw] h-[42vw] min-w-[240px] min-h-[240px] sm:min-w-[300px] sm:min-h-[300px] bg-pink-primary/30 rounded-full blur-[88px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-12%] left-[-12%] w-[54vw] h-[54vw] min-w-[260px] min-h-[260px] sm:min-w-[350px] sm:min-h-[350px] bg-sand-soft/60 rounded-full blur-[88px] pointer-events-none" 
      />

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-center justify-center text-center z-10 w-full max-w-md lg:max-w-6xl mx-auto mt-1 sm:mt-0"
      >
        <div className="mb-2 sm:mb-10 lg:hidden">
          <img
            src={pilatesfyLogo}
            alt="Pilatesfy"
            decoding="async"
            className="h-auto w-[120px] sm:w-[140px] mx-auto object-contain"
          />
        </div>

        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-pink-primary/35 bg-white/68 px-3.5 py-2 shadow-[0_10px_28px_rgba(235,199,207,0.18)] backdrop-blur-sm lg:hidden">
          <Sparkles className="w-[13px] h-[13px] text-pink-secondary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Персонален Pilates Match
          </span>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12 xl:gap-16 lg:w-full">
          <div className="text-left pt-0">
            <div className="mb-4">
              <img
                src={pilatesfyLogo}
                alt="Pilatesfy"
                decoding="async"
                className="h-auto w-[250px] object-contain"
              />
            </div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-primary/35 bg-white/70 px-4 py-2 shadow-[0_10px_28px_rgba(235,199,207,0.16)] backdrop-blur-sm">
              <Sparkles className="w-[14px] h-[14px] text-pink-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                Персонален Pilates Match
              </span>
            </div>
            <h1 className="max-w-[590px] text-[4.55rem] font-display font-medium text-text-main leading-[0.9] tracking-[-0.045em]">
              Открий пилатес програма,
              <span className="block">персонализирана за теб.</span>
            </h1>
            <p className="mt-7 max-w-[510px] text-[19px] leading-[1.68] text-text-secondary/90">
              Отговори на няколко кратки въпроса и виж коя програма е най-подходяща според нивото, целите и времето ти.
            </p>
            <div className="mt-7 flex items-center gap-2.5 text-[13px] text-text-secondary/82">
              <div className="flex items-center gap-0.5 text-pink-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`desktop-star-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-medium">600+ жени започнаха промяната</span>
            </div>

            <div className="mt-9 flex items-center gap-5">
              <Button
                onClick={handleStart}
                className="h-[68px] min-w-[276px] rounded-[1.55rem] border border-white/80 bg-[linear-gradient(90deg,#ddb7bf_0%,#e7c2ca_45%,#e8c9b4_100%)] px-10 text-[20px] tracking-[0.01em] shadow-[0_18px_38px_rgba(235,199,207,0.5),0_2px_0_rgba(255,255,255,0.34)_inset] hover:shadow-[0_18px_38px_rgba(235,199,207,0.62),0_2px_0_rgba(255,255,255,0.34)_inset]"
              >
                Започни теста
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="rounded-[1.4rem] border border-white/70 bg-white/56 px-4 py-3 shadow-[0_12px_28px_rgba(235,199,207,0.10)] backdrop-blur-[8px]">
                <motion.div
                  key={`desktop-${liveUsers}`}
                  initial={{ opacity: 0.65, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-[13px] font-medium leading-tight text-text-secondary/80"
                >
                  В момента попълват <span className="text-text-main">{liveUsers} души</span>
                </motion.div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-[13px] text-text-secondary/78 font-medium">
              <span className="flex items-center gap-2 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0.36))] px-4 py-2.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px]">
                <Sparkles className="w-3.5 h-3.5 text-pink-secondary" />
                Безплатен тест
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0.36))] px-4 py-2.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px]">
                <Clock className="w-3.5 h-3.5 text-pink-secondary" />
                Под 1 минута
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0.36))] px-4 py-2.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px]">
                <UserCircle2 className="w-3.5 h-3.5 text-pink-secondary" />
                Без регистрация
              </span>
            </div>
          </div>

          <div className="isolate w-full rounded-[2.75rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.74))] shadow-[0_34px_70px_rgba(235,199,207,0.20)] overflow-hidden">
            <div className="px-10 pt-9">
              <div className="text-center">
                <div className="inline-flex items-center rounded-full bg-pink-primary/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-secondary">
                  Персонален match
                </div>

                <div className="mt-6">
                  <p className="mx-auto max-w-[440px] text-[37px] font-display font-semibold leading-[1.02] tracking-[-0.032em] text-text-main">
                    Твоят план започва
                    <span className="block">с ясна посока</span>
                  </p>
                  <p className="mx-auto mt-5 max-w-[430px] text-[15px] leading-[1.8] text-text-secondary/92">
                    Персонализирана препоръка според твоето ниво, ритъм и цели, за да започнеш уверено още днес.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-4 min-h-[332px] px-10">
              <motion.div
                animate={{ y: [0, -6, 0], scale: [1, 1.015, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-20 right-20 bottom-12 h-24 rounded-full bg-pink-primary/28 blur-3xl"
              />
              <motion.img
                src={landingModel}
                alt="Pilates model"
                decoding="async"
                fetchPriority="high"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 mx-auto w-full max-w-[640px] object-contain object-center drop-shadow-[0_28px_38px_rgba(46,42,43,0.10)]"
              />
            </div>

            <div className="px-10 pb-5 pt-1">
              <div className="grid grid-cols-[0.9fr_1.05fr_1.35fr] items-center overflow-hidden rounded-[1.45rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.52))] shadow-[0_12px_28px_rgba(235,199,207,0.10)] backdrop-blur-[6px]">
                <div className="px-4 py-3 text-center">
                  <p className="text-[12px] font-medium leading-[1.35] text-text-secondary/76">Pilatesfy fit</p>
                </div>
                <div className="border-l border-r border-white/70 px-4 py-3 text-center">
                  <p className="text-[12px] font-medium leading-[1.35] text-text-secondary/76">Персонална насока</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-[12px] font-medium leading-[1.35] text-text-secondary/76">Съобразена с твоето ниво и ритъм.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 px-10 pb-9 pt-1">
              <div className="rounded-[1.55rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.56))] px-4 py-4 text-center shadow-[0_12px_24px_rgba(235,199,207,0.12)] backdrop-blur-[6px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary/58">Ниво</p>
                <p className="mt-2 text-[16px] font-medium leading-[1.2] text-text-main">За теб</p>
              </div>
              <div className="rounded-[1.55rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.56))] px-4 py-4 text-center shadow-[0_12px_24px_rgba(235,199,207,0.12)] backdrop-blur-[6px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary/58">Време</p>
                <p className="mt-2 text-[16px] font-medium leading-[1.2] text-text-main">1 минута</p>
              </div>
              <div className="rounded-[1.55rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.56))] px-4 py-4 text-center shadow-[0_12px_24px_rgba(235,199,207,0.12)] backdrop-blur-[6px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary/58">Резултат</p>
                <p className="mt-2 text-[16px] font-medium leading-[1.2] text-text-main">Персонален план</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,255,255,0.58))] shadow-[0_22px_46px_rgba(235,199,207,0.16)] backdrop-blur-[10px] overflow-hidden lg:hidden">
          <div className="px-4 pt-4.5">
            <h1 className="text-[28px] sm:text-[58px] font-display font-medium text-text-main leading-[1.02] sm:leading-[0.98] mb-3 tracking-[-0.025em] w-full max-w-[320px] mx-auto">
              <span className="sm:hidden">
                Открий персонализирана
                <span className="block">пилатес програма за теб</span>
              </span>
              <span className="hidden sm:inline">
                Открий пилатес програма,
                <span className="block">персонализирана за теб.</span>
              </span>
            </h1>
            
            <p className="text-[13.5px] sm:text-[18px] text-text-secondary/92 mb-3.5 leading-[1.48] w-full max-w-[286px] sm:max-w-[430px] mx-auto text-balance">
              Отговори на няколко кратки въпроса и виж коя програма е най-подходяща според нивото, целите и времето ти.
            </p>

            <div className="flex items-center justify-center gap-2 text-[11.5px] text-text-secondary/82 mb-4">
              <div className="flex items-center gap-0.5 text-pink-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="font-medium">600+ жени започнаха промяната</span>
            </div>
          </div>

          <div className="relative px-3 pt-1">
            <motion.div
              animate={{ y: [0, -5, 0], scale: [1, 1.015, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-10 top-7 h-24 rounded-full bg-pink-primary/28 blur-3xl"
            />
            <motion.img
              src={landingModel}
              alt="Pilates model"
              decoding="async"
              fetchPriority="high"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[360px] mx-auto object-contain object-bottom drop-shadow-[0_18px_28px_rgba(46,42,43,0.08)]"
            />
          </div>

          <div className="px-3 pb-3.5">
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded-[1.2rem] border border-white/75 bg-white/60 px-2 py-2.5 text-center shadow-[0_10px_24px_rgba(235,199,207,0.12)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Ниво</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">За теб</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/75 bg-white/60 px-2 py-2.5 text-center shadow-[0_10px_24px_rgba(235,199,207,0.12)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Време</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">1 минута</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/75 bg-white/60 px-2 py-2.5 text-center shadow-[0_10px_24px_rgba(235,199,207,0.12)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary/65">Резултат</p>
                <p className="mt-1 text-[13px] font-semibold text-text-main">План</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto z-10 pt-4 sm:pt-0 pb-3 sm:pb-8 lg:hidden"
      >
        <div className="w-full max-w-[320px] sm:max-w-[360px] mx-auto space-y-6 sm:space-y-6">
          <Button 
            fullWidth 
            onClick={handleStart}
            className="h-[58px] sm:h-16 border border-white/75 bg-[linear-gradient(90deg,#ddb7bf_0%,#e7c2ca_45%,#e8c9b4_100%)] text-[17px] sm:text-lg tracking-[0.01em] shadow-[0_16px_34px_rgba(235,199,207,0.52),0_2px_0_rgba(255,255,255,0.34)_inset] hover:shadow-[0_16px_34px_rgba(235,199,207,0.64),0_2px_0_rgba(255,255,255,0.34)_inset] sm:shadow-[0_8px_30px_rgba(235,199,207,0.5)] sm:hover:shadow-[0_8px_30px_rgba(235,199,207,0.7)]"
          >
            Започни теста
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <motion.div
            key={liveUsers}
            initial={{ opacity: 0.65, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center text-[11.5px] font-medium text-text-secondary/78"
          >
            В момента попълват <span className="text-text-main">{liveUsers} души</span>
          </motion.div>

          <div className="rounded-[1.35rem] border border-white/75 bg-white/55 px-4 py-3.5 text-center shadow-[0_10px_24px_rgba(235,199,207,0.14)] backdrop-blur-[6px]">
            <div className="flex items-center justify-center gap-2 text-[12.5px] sm:text-[13px] font-medium text-text-main">
              <CheckCircle2 className="h-4 w-4 text-pink-secondary" />
              Ще разбереш коя програма ти пасва най-добре
            </div>
          </div>

          {/* Premium Micro-trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] sm:text-[13px] text-text-secondary/78 font-medium">
            <span className="flex items-center gap-1.5 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.32))] px-2.5 py-1.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <Sparkles className="w-3.5 h-3.5 text-pink-secondary" />
              Безплатен тест
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.32))] px-2.5 py-1.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <Clock className="w-3.5 h-3.5 text-pink-secondary" />
              Под 1 минута
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.32))] px-2.5 py-1.5 shadow-[0_8px_18px_rgba(235,199,207,0.10)] backdrop-blur-[6px] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
              <UserCircle2 className="w-3.5 h-3.5 text-pink-secondary" />
              Без регистрация
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
