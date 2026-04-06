export type ProgramType = 'foundation_reset' | 'core_sculpt' | 'elite_flow';

export interface QuizResult {
  program: ProgramType;
  score: number;
  behavioral: {
    q13: string;
    q14: string;
  };
  hasPain: boolean;
}

export function calculateResult(answers: Record<number, number | string>): QuizResult {
  let score = 0;
  
  // Calculate base score (Q1-Q12)
  for (let i = 1; i <= 12; i++) {
    if (typeof answers[i] === 'number') {
      score += answers[i] as number;
    }
  }

  const q1 = answers[1] as number;
  const q2 = answers[2] as number;
  const q7 = answers[7] as number;
  const q8 = answers[8] as number;
  
  const hasPain = q8 === 1;

  let program: ProgramType = 'foundation_reset';

  if (score >= 12 && score <= 22) {
    program = 'foundation_reset';
  } else if (score >= 23 && score <= 35) {
    program = 'core_sculpt';
  } else if (score >= 36 && score <= 48) {
    program = 'elite_flow';
  }

  // Override Rule A: Pain -> Max Beginner
  if (hasPain) {
    program = 'foundation_reset';
  }

  // Override Rule B: Weak start -> Max Intermediate
  if (q1 <= 2 && q2 <= 2 && q7 <= 2 && program === 'elite_flow') {
    program = 'core_sculpt';
  }

  // Override Rule C is implicitly handled if they score >= 36 and don't hit A or B.
  
  // Override Rule D: Borderline conservative
  if (score === 23 && !hasPain) {
    program = 'foundation_reset';
  }
  if (score === 36 && !hasPain && (q1 <= 2 || q2 <= 2)) {
    program = 'core_sculpt';
  }

  return {
    program,
    score,
    behavioral: {
      q13: answers[13] as string,
      q14: answers[14] as string,
    },
    hasPain
  };
}

export const PROGRAM_DETAILS = {
  foundation_reset: {
    title: "Foundation Reset",
    description: "4-седмична програма с по-леки и ясни тренировки, създадена да ти помогне да започнеш уверено, да подобриш стойката си и да изградиш стабилна основа.",
    benefits: [
      "По-добра стойка",
      "Повече енергия",
      "Плавен и сигурен старт",
      "По-ясен и лесен план"
    ],
    intro: "Това е най-добрият старт за теб, ако искаш да се раздвижиш, да влезеш в ритъм и да изградиш увереност без излишно натоварване."
  },
  core_sculpt: {
    title: "Core Sculpt",
    description: "6-седмична програма за по-стегнато тяло, по-добра стойка и силен център на тялото. Подходяща за хора, които искат баланс между достъпност и реален прогрес.",
    benefits: [
      "По-стегнато тяло",
      "Силен център на тялото",
      "По-стабилно тяло",
      "Ясен план за прогрес"
    ],
    intro: "Тази програма е отличен баланс между структура, резултат и прогрес. Подходяща е за теб, ако искаш по-стегнато тяло, по-добра стойка и ясен план."
  },
  elite_flow: {
    title: "Elite Flow",
    description: "8-седмична програма с по-интензивен ритъм и по-предизвикателни движения, за хора, които вече имат добра основа и искат следващо ниво.",
    benefits: [
      "Следващо ниво на издръжливост",
      "Стегнат корем и силен център",
      "Предизвикателни серии",
      "Осезаем прогрес"
    ],
    intro: "Това е програма за по-уверено ниво, създадена за хора, които искат по-силен ритъм, по-предизвикателни тренировки и осезаемо следващо ниво."
  }
};

export function getPersonalizedMessaging(q13: string, q14: string) {
  let q13Message = "";
  let q14Message = "";

  switch (q13) {
    case 'no_time':
      q13Message = "Създадена е така, че лесно да я вместиш в натовареното си ежедневие. Ясен план, без излишно чудене какво да правиш.";
      break;
    case 'no_motivation':
      q13Message = "Ще знаеш точно откъде да започнеш. Малки стъпки, които се усещат постижими.";
      break;
    case 'no_plan':
      q13Message = "Получаваш ясен план стъпка по стъпка. Без хаос, без чудене, без губене на време.";
      break;
    case 'inconsistent':
      q13Message = "Програмата е направена така, че да ти е лесно да останеш последователен/на. Стъпка по стъпка, без да се претоварваш.";
      break;
  }

  switch (q14) {
    case 'start_slow':
      q14Message = "Започваме със спокойно темпо, за да изградиш увереност.";
      break;
    case 'try_regular':
      q14Message = "Структурата ще ти помогне да изградиш навик лесно.";
      break;
    case 'follow_plan':
      q14Message = "Имаш плана, просто трябва да го следваш.";
      break;
    case 'all_in':
      q14Message = "Готови сме за предизвикателството. Време е за резултати.";
      break;
  }

  return { q13Message, q14Message };
}
