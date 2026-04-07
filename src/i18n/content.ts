import type { ProgramType } from '../utils/scoring';
import type { Language } from './types';

type ProgramContent = {
  title: string;
  description: string;
  benefits: string[];
  intro: string;
};

type LocaleContent = {
  app: {
    checkoutErrorTitle: string;
    checkoutRedirectTitle: string;
    checkoutWait: string;
    checkoutBack: string;
    checkoutCancel: string;
    checkoutErrorFallback: string;
    checkoutRedirectErrorFallback: string;
  };
  legal: {
    terms: string;
    privacy: string;
    backToSite: string;
  };
  landing: {
    badge: string;
    heroTitleTop: string;
    heroTitleBottom: string;
    heroDescription: string;
    socialProof: string;
    startQuiz: string;
    liveUsers: string;
    users: string;
    freeQuiz: string;
    oneMinute: string;
    noRegistration: string;
    personalMatch: string;
    planStartsTop: string;
    planStartsBottom: string;
    planStartsDescription: string;
    guidance: string;
    tailoredLevel: string;
    level: string;
    forYou: string;
    time: string;
    result: string;
    oneMinuteShort: string;
    personalPlan: string;
    planShort: string;
    fitMessage: string;
  };
  quiz: {
    quizLabel: string;
    questionOf: string;
    backAria: string;
    progress: string;
    remaining: string;
    almostDone: string;
    question: string;
  };
  loading: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    description: string;
    status: string;
    now: string;
    processing: string;
    usefulFact: string;
    metrics: string[];
    facts: string[];
    stages: string[];
  };
  result: {
    recommendation: string;
    yourMatch: string;
    selectedByGoals: string;
    level: string;
    tempo: string;
    plan: string;
    builtForLifestyle: string;
    whatYouWillAchieve: string;
    resultLabel: string;
    painWarning: string;
    personalRecommendation: string;
    ctaTitle: string;
    ctaDescriptionMobile: string;
    bullets: string[];
    specialPriceToday: string;
    oneTimePayment: string;
    ctaButton: string;
    footerHint: string;
    legalHint: string;
    summaryMeta: Record<ProgramType, { level: string; tempo: string; duration: string }>;
  };
};

const localizedPrograms: Record<Language, Record<ProgramType, ProgramContent>> = {
  bg: {
    foundation_reset: {
      title: 'Foundation Reset',
      description: '4-седмична програма с по-леки и ясни тренировки, създадена да ти помогне да започнеш уверено, да подобриш стойката си и да изградиш стабилна основа.',
      benefits: ['По-добра стойка', 'Повече енергия', 'Плавен и сигурен старт', 'По-ясен и лесен план'],
      intro: 'Това е най-добрият старт за теб, ако искаш да се раздвижиш, да влезеш в ритъм и да изградиш увереност без излишно натоварване.',
    },
    core_sculpt: {
      title: 'Core Sculpt',
      description: '6-седмична програма за по-стегнато тяло, по-добра стойка и силен център на тялото. Подходяща за хора, които искат баланс между достъпност и реален прогрес.',
      benefits: ['По-стегнато тяло', 'Силен център на тялото', 'По-стабилно тяло', 'Ясен план за прогрес'],
      intro: 'Тази програма е отличен баланс между структура, резултат и прогрес. Подходяща е за теб, ако искаш по-стегнато тяло, по-добра стойка и ясен план.',
    },
    elite_flow: {
      title: 'Elite Flow',
      description: '8-седмична програма с по-интензивен ритъм и по-предизвикателни движения, за хора, които вече имат добра основа и искат следващо ниво.',
      benefits: ['Следващо ниво на издръжливост', 'Стегнат корем и силен център', 'Предизвикателни серии', 'Осезаем прогрес'],
      intro: 'Това е програма за по-уверено ниво, създадена за хора, които искат по-силен ритъм, по-предизвикателни тренировки и осезаемо следващо ниво.',
    },
  },
  en: {
    foundation_reset: {
      title: 'Foundation Reset',
      description: 'A 4-week program with lighter, clear workouts to help you start confidently, improve posture, and build a stable foundation.',
      benefits: ['Better posture', 'More energy', 'Smooth and safe start', 'Clear and simple plan'],
      intro: 'This is the best starting point if you want to get moving, build rhythm, and gain confidence without unnecessary strain.',
    },
    core_sculpt: {
      title: 'Core Sculpt',
      description: 'A 6-week program for a more toned body, better posture, and a stronger core. Great for people who want balance between accessibility and real progress.',
      benefits: ['More toned body', 'Strong core', 'Better stability', 'Clear progress plan'],
      intro: 'This program gives a strong balance between structure and results. Ideal if you want a toned body, better posture, and a clear path.',
    },
    elite_flow: {
      title: 'Elite Flow',
      description: 'An 8-week program with a more intense rhythm and challenging movements for people who already have a solid base and want the next level.',
      benefits: ['Next-level endurance', 'Toned abs and strong core', 'Challenging sets', 'Visible progress'],
      intro: 'This is for a more advanced level and for people who want a stronger rhythm, harder sessions, and clear next-level progress.',
    },
  },
  de: {
    foundation_reset: {
      title: 'Foundation Reset',
      description: 'Ein 4-Wochen-Programm mit leichteren, klaren Workouts, damit du sicher startest, deine Haltung verbesserst und eine stabile Basis aufbaust.',
      benefits: ['Bessere Haltung', 'Mehr Energie', 'Sanfter und sicherer Start', 'Klarer und einfacher Plan'],
      intro: 'Das ist der beste Start fur dich, wenn du in Bewegung kommen, Rhythmus aufbauen und Selbstvertrauen gewinnen willst.',
    },
    core_sculpt: {
      title: 'Core Sculpt',
      description: 'Ein 6-Wochen-Programm fur einen strafferen Korper, bessere Haltung und einen starken Core. Ideal fur alle, die Balance zwischen Leichtigkeit und Fortschritt suchen.',
      benefits: ['Strafferer Korper', 'Starker Core', 'Mehr Stabilitat', 'Klarer Fortschrittsplan'],
      intro: 'Dieses Programm bietet ein starkes Gleichgewicht aus Struktur und Ergebnissen. Ideal fur dich, wenn du klaren Fortschritt willst.',
    },
    elite_flow: {
      title: 'Elite Flow',
      description: 'Ein 8-Wochen-Programm mit hoherer Intensitat und anspruchsvolleren Bewegungen fur Menschen mit guter Basis, die das nachste Level wollen.',
      benefits: ['Ausdauer auf nachstem Level', 'Straffer Bauch und starker Core', 'Anspruchsvolle Serien', 'Spurbarer Fortschritt'],
      intro: 'Dieses Programm ist fur ein fortgeschrittenes Niveau und fur Menschen, die mehr Intensitat und klare Weiterentwicklung suchen.',
    },
  },
};

const localizedMessages: Record<Language, Record<string, string>> = {
  bg: {
    no_time: 'Създадена е така, че лесно да я вместиш в натовареното си ежедневие. Ясен план, без излишно чудене какво да правиш.',
    no_motivation: 'Ще знаеш точно откъде да започнеш. Малки стъпки, които се усещат постижими.',
    no_plan: 'Получаваш ясен план стъпка по стъпка. Без хаос, без чудене, без губене на време.',
    inconsistent: 'Програмата е направена така, че да ти е лесно да останеш последователен/на. Стъпка по стъпка, без да се претоварваш.',
    start_slow: 'Започваме със спокойно темпо, за да изградиш увереност.',
    try_regular: 'Структурата ще ти помогне да изградиш навик лесно.',
    follow_plan: 'Имаш плана, просто трябва да го следваш.',
    all_in: 'Готови сме за предизвикателството. Време е за резултати.',
  },
  en: {
    no_time: 'Built so you can fit it into a busy schedule. Clear structure with no guesswork.',
    no_motivation: 'You will know exactly where to start. Small steps that feel realistic.',
    no_plan: 'You get a clear step-by-step path. No chaos and no wasted time.',
    inconsistent: 'Designed to help you stay consistent. Step by step, without overload.',
    start_slow: 'We start at a calm pace to build confidence.',
    try_regular: 'The structure helps you build a habit with ease.',
    follow_plan: 'You have the plan, now simply follow it.',
    all_in: 'Ready for the challenge. Time for real results.',
  },
  de: {
    no_time: 'So aufgebaut, dass es in einen vollen Alltag passt. Klarer Plan ohne Raten.',
    no_motivation: 'Du weisst genau, wo du startest. Kleine Schritte, die machbar sind.',
    no_plan: 'Du bekommst einen klaren Schritt-fur-Schritt-Plan. Kein Chaos, kein Zeitverlust.',
    inconsistent: 'Das Programm hilft dir, konsequent zu bleiben. Schritt fur Schritt ohne Uberlastung.',
    start_slow: 'Wir starten in ruhigem Tempo, um Sicherheit aufzubauen.',
    try_regular: 'Die Struktur hilft dir, leicht eine Routine aufzubauen.',
    follow_plan: 'Du hast den Plan, jetzt folgst du ihm einfach.',
    all_in: 'Bereit fur die Herausforderung. Zeit fur Ergebnisse.',
  },
};

export function getProgramDetails(language: Language, program: ProgramType): ProgramContent {
  return localizedPrograms[language][program];
}

export function getPersonalizedMessages(language: Language, q13: string, q14: string) {
  const source = localizedMessages[language];
  return {
    q13Message: source[q13] || '',
    q14Message: source[q14] || '',
  };
}

export const content: Record<Language, LocaleContent> = {
  bg: {
    app: {
      checkoutErrorTitle: 'Проблем с плащането',
      checkoutRedirectTitle: 'Пренасочваме те към сигурно плащане',
      checkoutWait: 'Моля, изчакай няколко секунди...',
      checkoutBack: 'Обратно към резултата',
      checkoutCancel: 'Отказ',
      checkoutErrorFallback: 'Не успяхме да стартираме плащането.',
      checkoutRedirectErrorFallback: 'Възникна проблем при пренасочването към плащане.',
    },
    legal: { terms: 'Общи условия', privacy: 'Политика за поверителност', backToSite: 'Назад към Pilatesfy' },
    landing: {
      badge: 'Персонален Pilates Match',
      heroTitleTop: 'Открий пилатес програма,',
      heroTitleBottom: 'персонализирана за теб.',
      heroDescription: 'Отговори на няколко кратки въпроса и виж коя програма е най-подходяща според нивото, целите и времето ти.',
      socialProof: '600+ жени започнаха промяната',
      startQuiz: 'Започни теста',
      liveUsers: 'В момента попълват',
      users: 'души',
      freeQuiz: 'Безплатен тест',
      oneMinute: 'Под 1 минута',
      noRegistration: 'Без регистрация',
      personalMatch: 'Персонален match',
      planStartsTop: 'Твоят план започва',
      planStartsBottom: 'с ясна посока',
      planStartsDescription: 'Персонализирана препоръка според твоето ниво, ритъм и цели, за да започнеш уверено още днес.',
      guidance: 'Персонална насока',
      tailoredLevel: 'Съобразена с твоето ниво и ритъм.',
      level: 'Ниво',
      forYou: 'За теб',
      time: 'Време',
      result: 'Резултат',
      oneMinuteShort: '1 минута',
      personalPlan: 'Персонален план',
      planShort: 'План',
      fitMessage: 'Ще разбереш коя програма ти пасва най-добре',
    },
    quiz: { quizLabel: 'Pilatesfy quiz', questionOf: 'Въпрос {current} от {total}', backAria: 'Назад', progress: 'Прогрес', remaining: 'Остават {count}', almostDone: 'Остава съвсем малко... резултатът ти почти е готов', question: 'Въпрос {current}' },
    loading: {
      badge: 'Персонален анализ',
      titleTop: 'Подготвяме твоята',
      titleBottom: 'персонална програма',
      description: 'Още малко. Съпоставяме твоите цели, ниво и ритъм, за да ти покажем най-подходящия старт.',
      status: 'Статус',
      now: 'В момента',
      processing: 'Обработва се',
      usefulFact: 'Полезен факт',
      metrics: ['Ниво', 'Цели', 'Ритъм'],
      facts: [
        'Пилатесът подпомага стойката, контрола и стабилността на центъра на тялото.',
        'Редовното движение може да помогне за по-добро усещане за енергия и ритъм в ежедневието.',
        'Дори кратки, но постоянни тренировки често водят до по-осезаем резултат от хаотични дълги сесии.',
        'Силният център на тялото подпомага по-добър баланс и по-стабилни движения.',
      ],
      stages: ['Анализираме твоите отговори', 'Подготвяме твоя персонален план', 'Съпоставяме целите ти с най-подходящата програма', 'Финализираме препоръката ти'],
    },
    result: {
      recommendation: 'Твоята препоръка',
      yourMatch: 'Твоят match',
      selectedByGoals: 'Подбрана според нивото ти, ритъма ти и това, което искаш да постигнеш.',
      level: 'Ниво',
      tempo: 'Темпо',
      plan: 'План',
      builtForLifestyle: 'Създадена за твоя начин на живот',
      whatYouWillAchieve: 'Какво ще постигнеш:',
      resultLabel: 'Резултат',
      painWarning: 'Ако имаш постоянен дискомфорт или сериозни оплаквания, е добра идея да се консултираш със специалист преди да започнеш.',
      personalRecommendation: 'Персонална препоръка',
      ctaTitle: 'Започни своята програма още днес',
      ctaDescriptionMobile: 'Имаш ясна посока. Следващата стъпка е да започнеш с програмата, която най-много ти пасва.',
      bullets: ['Ясен план стъпка по стъпка', 'Видео тренировки', 'Персонализирана програма на email', 'Достъп веднага след покупка'],
      specialPriceToday: 'Специална цена днес',
      oneTimePayment: 'Еднократно плащане',
      ctaButton: 'Продължи към програмата',
      footerHint: 'Ясен старт, веднага след следващата стъпка.',
      legalHint: 'С продължаване приемаш нашите условия и политика.',
      summaryMeta: {
        foundation_reset: { level: 'Начинаещо', tempo: 'Спокойно', duration: '4 седмици' },
        core_sculpt: { level: 'Средно', tempo: 'Балансирано', duration: '6 седмици' },
        elite_flow: { level: 'Напреднало', tempo: 'Интензивно', duration: '8 седмици' },
      },
    },
  },
  en: {
    app: {
      checkoutErrorTitle: 'Payment issue',
      checkoutRedirectTitle: 'Redirecting you to secure checkout',
      checkoutWait: 'Please wait a few seconds...',
      checkoutBack: 'Back to result',
      checkoutCancel: 'Cancel',
      checkoutErrorFallback: 'We could not start checkout.',
      checkoutRedirectErrorFallback: 'There was a problem redirecting to checkout.',
    },
    legal: { terms: 'Terms and Conditions', privacy: 'Privacy Policy', backToSite: 'Back to Pilatesfy' },
    landing: {
      badge: 'Personal Pilates Match',
      heroTitleTop: 'Find a Pilates program',
      heroTitleBottom: 'tailored to you.',
      heroDescription: 'Answer a few quick questions and discover which program fits your level, goals, and schedule.',
      socialProof: '600+ women started their transformation',
      startQuiz: 'Start quiz',
      liveUsers: 'Currently taking the quiz',
      users: 'people',
      freeQuiz: 'Free quiz',
      oneMinute: 'Under 1 minute',
      noRegistration: 'No registration',
      personalMatch: 'Personal match',
      planStartsTop: 'Your plan starts',
      planStartsBottom: 'with clear direction',
      planStartsDescription: 'A personalized recommendation based on your level, rhythm, and goals so you can start confidently today.',
      guidance: 'Personal guidance',
      tailoredLevel: 'Tailored to your level and rhythm.',
      level: 'Level',
      forYou: 'For you',
      time: 'Time',
      result: 'Result',
      oneMinuteShort: '1 minute',
      personalPlan: 'Personal plan',
      planShort: 'Plan',
      fitMessage: 'You will discover which program fits you best',
    },
    quiz: { quizLabel: 'Pilatesfy quiz', questionOf: 'Question {current} of {total}', backAria: 'Back', progress: 'Progress', remaining: '{count} left', almostDone: 'Almost there... your result is nearly ready', question: 'Question {current}' },
    loading: {
      badge: 'Personal analysis',
      titleTop: 'Preparing your',
      titleBottom: 'personal program',
      description: 'Just a bit more. We are matching your goals, level, and rhythm to show your best starting point.',
      status: 'Status',
      now: 'Right now',
      processing: 'Processing',
      usefulFact: 'Useful fact',
      metrics: ['Level', 'Goals', 'Rhythm'],
      facts: [
        'Pilates supports posture, control, and core stability.',
        'Regular movement can improve your daily energy and rhythm.',
        'Short, consistent sessions often beat random long workouts.',
        'A strong core supports better balance and stability.',
      ],
      stages: ['Analyzing your answers', 'Preparing your personal plan', 'Matching your goals to the best program', 'Finalizing your recommendation'],
    },
    result: {
      recommendation: 'Your recommendation',
      yourMatch: 'Your match',
      selectedByGoals: 'Selected for your level, rhythm, and what you want to achieve.',
      level: 'Level',
      tempo: 'Tempo',
      plan: 'Plan',
      builtForLifestyle: 'Built for your lifestyle',
      whatYouWillAchieve: 'What you will achieve:',
      resultLabel: 'Result',
      painWarning: 'If you have ongoing discomfort or serious symptoms, it is a good idea to consult a specialist before you start.',
      personalRecommendation: 'Personal recommendation',
      ctaTitle: 'Start your program today',
      ctaDescriptionMobile: 'You have clear direction. The next step is to begin the program that fits you best.',
      bullets: ['Clear step-by-step plan', 'Video workouts', 'Personalized program by email', 'Instant access after purchase'],
      specialPriceToday: 'Special price today',
      oneTimePayment: 'One-time payment',
      ctaButton: 'Continue to program',
      footerHint: 'Clear start, right after the next step.',
      legalHint: 'By continuing, you accept our terms and policy.',
      summaryMeta: {
        foundation_reset: { level: 'Beginner', tempo: 'Calm', duration: '4 weeks' },
        core_sculpt: { level: 'Intermediate', tempo: 'Balanced', duration: '6 weeks' },
        elite_flow: { level: 'Advanced', tempo: 'Intense', duration: '8 weeks' },
      },
    },
  },
  de: {
    app: {
      checkoutErrorTitle: 'Zahlungsproblem',
      checkoutRedirectTitle: 'Weiterleitung zur sicheren Zahlung',
      checkoutWait: 'Bitte warte ein paar Sekunden...',
      checkoutBack: 'Zuruck zum Ergebnis',
      checkoutCancel: 'Abbrechen',
      checkoutErrorFallback: 'Die Zahlung konnte nicht gestartet werden.',
      checkoutRedirectErrorFallback: 'Es gab ein Problem bei der Weiterleitung zur Zahlung.',
    },
    legal: { terms: 'Nutzungsbedingungen', privacy: 'Datenschutzrichtlinie', backToSite: 'Zuruck zu Pilatesfy' },
    landing: {
      badge: 'Personlicher Pilates Match',
      heroTitleTop: 'Finde ein Pilates-Programm,',
      heroTitleBottom: 'das zu dir passt.',
      heroDescription: 'Beantworte ein paar kurze Fragen und finde heraus, welches Programm zu deinem Level, deinen Zielen und deinem Zeitplan passt.',
      socialProof: '600+ Frauen haben ihre Veranderung gestartet',
      startQuiz: 'Quiz starten',
      liveUsers: 'Aktuell im Quiz',
      users: 'Personen',
      freeQuiz: 'Kostenloses Quiz',
      oneMinute: 'Unter 1 Minute',
      noRegistration: 'Keine Registrierung',
      personalMatch: 'Personlicher Match',
      planStartsTop: 'Dein Plan startet',
      planStartsBottom: 'mit klarer Richtung',
      planStartsDescription: 'Eine personalisierte Empfehlung basierend auf deinem Level, Rhythmus und deinen Zielen.',
      guidance: 'Personliche Orientierung',
      tailoredLevel: 'An dein Level und deinen Rhythmus angepasst.',
      level: 'Level',
      forYou: 'Fur dich',
      time: 'Zeit',
      result: 'Ergebnis',
      oneMinuteShort: '1 Minute',
      personalPlan: 'Personlicher Plan',
      planShort: 'Plan',
      fitMessage: 'Du erfahrst, welches Programm am besten zu dir passt',
    },
    quiz: { quizLabel: 'Pilatesfy quiz', questionOf: 'Frage {current} von {total}', backAria: 'Zuruck', progress: 'Fortschritt', remaining: '{count} ubrig', almostDone: 'Fast geschafft... dein Ergebnis ist fast bereit', question: 'Frage {current}' },
    loading: {
      badge: 'Personliche Analyse',
      titleTop: 'Wir bereiten dein',
      titleBottom: 'personliches Programm vor',
      description: 'Noch ein Moment. Wir gleichen Ziele, Level und Rhythmus ab, um den besten Start fur dich zu finden.',
      status: 'Status',
      now: 'Aktuell',
      processing: 'In Bearbeitung',
      usefulFact: 'Nutzlicher Fakt',
      metrics: ['Level', 'Ziele', 'Rhythmus'],
      facts: [
        'Pilates unterstutzt Haltung, Kontrolle und Core-Stabilitat.',
        'Regelmassige Bewegung kann deine Energie im Alltag verbessern.',
        'Kurze, konstante Einheiten sind oft effektiver als lange, unregelmassige Sessions.',
        'Ein starker Core verbessert Balance und stabile Bewegungen.',
      ],
      stages: ['Wir analysieren deine Antworten', 'Wir bereiten deinen personlichen Plan vor', 'Wir gleichen deine Ziele mit dem besten Programm ab', 'Wir finalisieren deine Empfehlung'],
    },
    result: {
      recommendation: 'Deine Empfehlung',
      yourMatch: 'Dein Match',
      selectedByGoals: 'Ausgewahlt nach deinem Level, Rhythmus und deinen Zielen.',
      level: 'Level',
      tempo: 'Tempo',
      plan: 'Plan',
      builtForLifestyle: 'Fur deinen Alltag gemacht',
      whatYouWillAchieve: 'Was du erreichen wirst:',
      resultLabel: 'Ergebnis',
      painWarning: 'Wenn du anhaltende Beschwerden oder starke Symptome hast, solltest du vor dem Start eine Fachperson konsultieren.',
      personalRecommendation: 'Personliche Empfehlung',
      ctaTitle: 'Starte dein Programm noch heute',
      ctaDescriptionMobile: 'Du hast jetzt klare Richtung. Der nachste Schritt ist der Start mit dem passenden Programm.',
      bullets: ['Klarer Schritt-fur-Schritt-Plan', 'Video-Workouts', 'Personalisiertes Programm per E-Mail', 'Sofortiger Zugriff nach Kauf'],
      specialPriceToday: 'Spezialpreis heute',
      oneTimePayment: 'Einmalige Zahlung',
      ctaButton: 'Weiter zum Programm',
      footerHint: 'Klarer Start direkt nach dem nachsten Schritt.',
      legalHint: 'Mit dem Fortfahren akzeptierst du unsere Bedingungen und Richtlinie.',
      summaryMeta: {
        foundation_reset: { level: 'Anfanger', tempo: 'Ruhig', duration: '4 Wochen' },
        core_sculpt: { level: 'Mittelstufe', tempo: 'Ausgewogen', duration: '6 Wochen' },
        elite_flow: { level: 'Fortgeschritten', tempo: 'Intensiv', duration: '8 Wochen' },
      },
    },
  },
};

