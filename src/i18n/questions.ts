import type { Question } from '../data/questions';
import type { Language } from './types';

const bgQuestions: Question[] = [
  { id: 1, text: 'Имаш ли опит с пилатес?', answers: [{ text: 'Никога не съм пробвал/а', value: 1 }, { text: 'Пробвал/а съм, но отдавна', value: 2 }, { text: 'Правя от време на време', value: 3 }, { text: 'Тренирам редовно', value: 4 }] },
  { id: 2, text: 'Кое най-добре описва ежедневието ти?', answers: [{ text: 'Почти не се движа', value: 1 }, { text: 'Движа се, но не тренирам', value: 2 }, { text: 'Тренирам 1–2 пъти седмично', value: 3 }, { text: 'Активен/на съм почти всеки ден', value: 4 }] },
  { id: 3, text: 'Реалистично – колко време можеш да отделяш за тренировки?', answers: [{ text: '1–2 пъти седмично', value: 1 }, { text: '3 пъти', value: 2 }, { text: '4 пъти', value: 3 }, { text: '5+ пъти', value: 4 }] },
  { id: 4, text: 'Колко време ти е комфортно за една тренировка?', answers: [{ text: 'До 20 мин', value: 1 }, { text: '20–30 мин', value: 2 }, { text: '30–45 мин', value: 3 }, { text: '45–60 мин', value: 4 }] },
  { id: 5, text: 'Какво най-много искаш да постигнеш?', answers: [{ text: 'Да започна да се движа и да се чувствам по-добре', value: 1 }, { text: 'Да отслабна и да се стегна', value: 2 }, { text: 'Да имам стегнат корем и по-добра стойка', value: 3 }, { text: 'Да изведа тялото си на следващо ниво', value: 4 }] },
  { id: 6, text: 'Как би описал/а гъвкавостта си?', answers: [{ text: 'Много съм скован/а', value: 1 }, { text: 'Малко съм скован/а', value: 2 }, { text: 'Средно ниво', value: 3 }, { text: 'Доста гъвкав/а', value: 4 }] },
  { id: 7, text: 'Колко време можеш да задържиш планк?', answers: [{ text: 'Не мога или не съм пробвал/а', value: 1 }, { text: 'До 15 сек', value: 2 }, { text: '15–45 сек', value: 3 }, { text: 'Над 45 сек', value: 4 }] },
  { id: 8, text: 'Имаш ли болки или напрежение в тялото?', answers: [{ text: 'Да, често', value: 1 }, { text: 'Понякога', value: 2 }, { text: 'Рядко', value: 3 }, { text: 'Не', value: 4 }] },
  { id: 9, text: 'С какво оборудване разполагаш?', answers: [{ text: 'Само постелка', value: 1 }, { text: 'Постелка + ластици', value: 2 }, { text: 'Постелка + тежести', value: 3 }, { text: 'Пълно оборудване / студио', value: 4 }] },
  { id: 10, text: 'Как се чувстваш след тренировка?', answers: [{ text: 'Изтощен/а много бързо', value: 1 }, { text: 'Уморен/а, но се справям', value: 2 }, { text: 'Чувствам се добре', value: 3 }, { text: 'Искам още', value: 4 }] },
  { id: 11, text: 'Какъв опит имаш с други тренировки?', answers: [{ text: 'Почти никакъв', value: 1 }, { text: 'Йога / стречинг', value: 2 }, { text: 'Фитнес / групови', value: 3 }, { text: 'Интензивни спортове', value: 4 }] },
  { id: 12, text: 'Как се чувстваш, когато мислиш за тренировки?', answers: [{ text: 'Объркан/а съм и не знам откъде да започна', value: 1 }, { text: 'Малко несигурен/а', value: 2 }, { text: 'Мотивиран/а, но ми липсва план', value: 3 }, { text: 'Готов/а съм за предизвикателство', value: 4 }] },
  { id: 13, text: 'Какво най-често те спира да тренираш?', isBehavioral: true, answers: [{ text: 'Нямам време', value: 'no_time' }, { text: 'Липсва ми мотивация', value: 'no_motivation' }, { text: 'Не знам какво точно да правя', value: 'no_plan' }, { text: 'Не съм постоянен/на', value: 'inconsistent' }] },
  { id: 14, text: 'Колко си готов/а да се ангажираш със себе си?', isBehavioral: true, answers: [{ text: 'Искам да започна бавно', value: 'start_slow' }, { text: 'Ще опитам да съм редовен/на', value: 'try_regular' }, { text: 'Готов/а съм да следвам план', value: 'follow_plan' }, { text: 'Давам 100%', value: 'all_in' }] },
];

const enQuestions: Question[] = [
  { id: 1, text: 'Do you have Pilates experience?', answers: [{ text: 'I have never tried it', value: 1 }, { text: 'I tried it, but long ago', value: 2 }, { text: 'I do it from time to time', value: 3 }, { text: 'I train regularly', value: 4 }] },
  { id: 2, text: 'Which best describes your daily routine?', answers: [{ text: 'I barely move', value: 1 }, { text: 'I move, but I do not train', value: 2 }, { text: 'I train 1-2 times per week', value: 3 }, { text: 'I am active almost every day', value: 4 }] },
  { id: 3, text: 'Realistically, how much time can you dedicate to workouts?', answers: [{ text: '1-2 times per week', value: 1 }, { text: '3 times', value: 2 }, { text: '4 times', value: 3 }, { text: '5+ times', value: 4 }] },
  { id: 4, text: 'How long feels comfortable for one workout?', answers: [{ text: 'Up to 20 min', value: 1 }, { text: '20-30 min', value: 2 }, { text: '30-45 min', value: 3 }, { text: '45-60 min', value: 4 }] },
  { id: 5, text: 'What is your main goal?', answers: [{ text: 'Start moving and feel better', value: 1 }, { text: 'Lose weight and tone up', value: 2 }, { text: 'Get a toned core and better posture', value: 3 }, { text: 'Take my body to the next level', value: 4 }] },
  { id: 6, text: 'How would you describe your flexibility?', answers: [{ text: 'Very stiff', value: 1 }, { text: 'A bit stiff', value: 2 }, { text: 'Average', value: 3 }, { text: 'Quite flexible', value: 4 }] },
  { id: 7, text: 'How long can you hold a plank?', answers: [{ text: 'I cannot or have not tried', value: 1 }, { text: 'Up to 15 sec', value: 2 }, { text: '15-45 sec', value: 3 }, { text: 'Over 45 sec', value: 4 }] },
  { id: 8, text: 'Do you have pain or body tension?', answers: [{ text: 'Yes, often', value: 1 }, { text: 'Sometimes', value: 2 }, { text: 'Rarely', value: 3 }, { text: 'No', value: 4 }] },
  { id: 9, text: 'What equipment do you have?', answers: [{ text: 'Mat only', value: 1 }, { text: 'Mat + resistance bands', value: 2 }, { text: 'Mat + weights', value: 3 }, { text: 'Full equipment / studio', value: 4 }] },
  { id: 10, text: 'How do you feel after a workout?', answers: [{ text: 'I get exhausted very quickly', value: 1 }, { text: 'Tired, but I can handle it', value: 2 }, { text: 'I feel good', value: 3 }, { text: 'I want more', value: 4 }] },
  { id: 11, text: 'What experience do you have with other training?', answers: [{ text: 'Almost none', value: 1 }, { text: 'Yoga / stretching', value: 2 }, { text: 'Gym / group classes', value: 3 }, { text: 'Intense sports', value: 4 }] },
  { id: 12, text: 'How do you feel when you think about workouts?', answers: [{ text: 'I am confused and do not know where to start', value: 1 }, { text: 'A little unsure', value: 2 }, { text: 'Motivated, but missing a plan', value: 3 }, { text: 'Ready for a challenge', value: 4 }] },
  { id: 13, text: 'What most often stops you from training?', isBehavioral: true, answers: [{ text: 'I do not have time', value: 'no_time' }, { text: 'I lack motivation', value: 'no_motivation' }, { text: 'I do not know what exactly to do', value: 'no_plan' }, { text: 'I am not consistent', value: 'inconsistent' }] },
  { id: 14, text: 'How ready are you to commit to yourself?', isBehavioral: true, answers: [{ text: 'I want to start slowly', value: 'start_slow' }, { text: 'I will try to stay regular', value: 'try_regular' }, { text: 'I am ready to follow a plan', value: 'follow_plan' }, { text: 'I am all in', value: 'all_in' }] },
];

const deQuestions: Question[] = [
  { id: 1, text: 'Hast du Erfahrung mit Pilates?', answers: [{ text: 'Ich habe es nie ausprobiert', value: 1 }, { text: 'Ich habe es ausprobiert, aber vor langer Zeit', value: 2 }, { text: 'Ich mache es gelegentlich', value: 3 }, { text: 'Ich trainiere regelmassig', value: 4 }] },
  { id: 2, text: 'Was beschreibt deinen Alltag am besten?', answers: [{ text: 'Ich bewege mich kaum', value: 1 }, { text: 'Ich bewege mich, trainiere aber nicht', value: 2 }, { text: 'Ich trainiere 1-2 Mal pro Woche', value: 3 }, { text: 'Ich bin fast jeden Tag aktiv', value: 4 }] },
  { id: 3, text: 'Realistisch: Wie viel Zeit kannst du fur Training einplanen?', answers: [{ text: '1-2 Mal pro Woche', value: 1 }, { text: '3 Mal', value: 2 }, { text: '4 Mal', value: 3 }, { text: '5+ Mal', value: 4 }] },
  { id: 4, text: 'Wie lange ist ein Training fur dich angenehm?', answers: [{ text: 'Bis zu 20 Min', value: 1 }, { text: '20-30 Min', value: 2 }, { text: '30-45 Min', value: 3 }, { text: '45-60 Min', value: 4 }] },
  { id: 5, text: 'Was mochtest du am meisten erreichen?', answers: [{ text: 'Ich mochte anfangen, mich zu bewegen und mich besser fuhlen', value: 1 }, { text: 'Ich mochte abnehmen und straffer werden', value: 2 }, { text: 'Ich mochte einen straffen Bauch und bessere Haltung', value: 3 }, { text: 'Ich mochte meinen Korper aufs nachste Level bringen', value: 4 }] },
  { id: 6, text: 'Wie wurdest du deine Flexibilitat beschreiben?', answers: [{ text: 'Sehr steif', value: 1 }, { text: 'Etwas steif', value: 2 }, { text: 'Mittel', value: 3 }, { text: 'Ziemlich flexibel', value: 4 }] },
  { id: 7, text: 'Wie lange kannst du einen Plank halten?', answers: [{ text: 'Ich kann nicht oder habe es nicht versucht', value: 1 }, { text: 'Bis 15 Sek', value: 2 }, { text: '15-45 Sek', value: 3 }, { text: 'Uber 45 Sek', value: 4 }] },
  { id: 8, text: 'Hast du Schmerzen oder Spannungen im Korper?', answers: [{ text: 'Ja, oft', value: 1 }, { text: 'Manchmal', value: 2 }, { text: 'Selten', value: 3 }, { text: 'Nein', value: 4 }] },
  { id: 9, text: 'Welche Ausrustung hast du?', answers: [{ text: 'Nur Matte', value: 1 }, { text: 'Matte + Bander', value: 2 }, { text: 'Matte + Gewichte', value: 3 }, { text: 'Vollstandige Ausrustung / Studio', value: 4 }] },
  { id: 10, text: 'Wie fuhlst du dich nach dem Training?', answers: [{ text: 'Ich bin sehr schnell erschopft', value: 1 }, { text: 'Mude, aber ich schaffe es', value: 2 }, { text: 'Ich fuhle mich gut', value: 3 }, { text: 'Ich will mehr', value: 4 }] },
  { id: 11, text: 'Welche Erfahrung hast du mit anderen Trainings?', answers: [{ text: 'Fast keine', value: 1 }, { text: 'Yoga / Stretching', value: 2 }, { text: 'Fitness / Gruppenkurse', value: 3 }, { text: 'Intensive Sportarten', value: 4 }] },
  { id: 12, text: 'Wie fuhlst du dich, wenn du an Training denkst?', answers: [{ text: 'Ich bin verwirrt und weiss nicht, wo ich anfangen soll', value: 1 }, { text: 'Etwas unsicher', value: 2 }, { text: 'Motiviert, aber ohne Plan', value: 3 }, { text: 'Bereit fur eine Herausforderung', value: 4 }] },
  { id: 13, text: 'Was halt dich am haufigsten vom Training ab?', isBehavioral: true, answers: [{ text: 'Ich habe keine Zeit', value: 'no_time' }, { text: 'Mir fehlt Motivation', value: 'no_motivation' }, { text: 'Ich weiss nicht genau, was ich tun soll', value: 'no_plan' }, { text: 'Ich bin nicht konsequent', value: 'inconsistent' }] },
  { id: 14, text: 'Wie bereit bist du, dich auf dich selbst festzulegen?', isBehavioral: true, answers: [{ text: 'Ich mochte langsam anfangen', value: 'start_slow' }, { text: 'Ich versuche regelmassig zu bleiben', value: 'try_regular' }, { text: 'Ich bin bereit, einem Plan zu folgen', value: 'follow_plan' }, { text: 'Ich gebe 100%', value: 'all_in' }] },
];

const questionsByLanguage: Record<Language, Question[]> = {
  bg: bgQuestions,
  en: enQuestions,
  de: deQuestions,
};

export function getQuestions(language: Language): Question[] {
  return questionsByLanguage[language];
}

