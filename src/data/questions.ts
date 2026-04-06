export type Answer = {
  text: string;
  value: number | string;
};

export type Question = {
  id: number;
  text: string;
  answers: Answer[];
  isBehavioral?: boolean;
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Имаш ли опит с пилатес?",
    answers: [
      { text: "Никога не съм пробвал/а", value: 1 },
      { text: "Пробвал/а съм, но отдавна", value: 2 },
      { text: "Правя от време на време", value: 3 },
      { text: "Тренирам редовно", value: 4 },
    ]
  },
  {
    id: 2,
    text: "Кое най-добре описва ежедневието ти?",
    answers: [
      { text: "Почти не се движа", value: 1 },
      { text: "Движа се, но не тренирам", value: 2 },
      { text: "Тренирам 1–2 пъти седмично", value: 3 },
      { text: "Активен/на съм почти всеки ден", value: 4 },
    ]
  },
  {
    id: 3,
    text: "Реалистично – колко време можеш да отделяш за тренировки?",
    answers: [
      { text: "1–2 пъти седмично", value: 1 },
      { text: "3 пъти", value: 2 },
      { text: "4 пъти", value: 3 },
      { text: "5+ пъти", value: 4 },
    ]
  },
  {
    id: 4,
    text: "Колко време ти е комфортно за една тренировка?",
    answers: [
      { text: "До 20 мин", value: 1 },
      { text: "20–30 мин", value: 2 },
      { text: "30–45 мин", value: 3 },
      { text: "45–60 мин", value: 4 },
    ]
  },
  {
    id: 5,
    text: "Какво най-много искаш да постигнеш?",
    answers: [
      { text: "Да започна да се движа и да се чувствам по-добре", value: 1 },
      { text: "Да отслабна и да се стегна", value: 2 },
      { text: "Да имам стегнат корем и по-добра стойка", value: 3 },
      { text: "Да изведа тялото си на следващо ниво", value: 4 },
    ]
  },
  {
    id: 6,
    text: "Как би описал/а гъвкавостта си?",
    answers: [
      { text: "Много съм скован/а", value: 1 },
      { text: "Малко съм скован/а", value: 2 },
      { text: "Средно ниво", value: 3 },
      { text: "Доста гъвкав/а", value: 4 },
    ]
  },
  {
    id: 7,
    text: "Колко време можеш да задържиш планк?",
    answers: [
      { text: "Не мога или не съм пробвал/а", value: 1 },
      { text: "До 15 сек", value: 2 },
      { text: "15–45 сек", value: 3 },
      { text: "Над 45 сек", value: 4 },
    ]
  },
  {
    id: 8,
    text: "Имаш ли болки или напрежение в тялото?",
    answers: [
      { text: "Да, често", value: 1 },
      { text: "Понякога", value: 2 },
      { text: "Рядко", value: 3 },
      { text: "Не", value: 4 },
    ]
  },
  {
    id: 9,
    text: "С какво оборудване разполагаш?",
    answers: [
      { text: "Само постелка", value: 1 },
      { text: "Постелка + ластици", value: 2 },
      { text: "Постелка + тежести", value: 3 },
      { text: "Пълно оборудване / студио", value: 4 },
    ]
  },
  {
    id: 10,
    text: "Как се чувстваш след тренировка?",
    answers: [
      { text: "Изтощен/а много бързо", value: 1 },
      { text: "Уморен/а, но се справям", value: 2 },
      { text: "Чувствам се добре", value: 3 },
      { text: "Искам още", value: 4 },
    ]
  },
  {
    id: 11,
    text: "Какъв опит имаш с други тренировки?",
    answers: [
      { text: "Почти никакъв", value: 1 },
      { text: "Йога / стречинг", value: 2 },
      { text: "Фитнес / групови", value: 3 },
      { text: "Интензивни спортове", value: 4 },
    ]
  },
  {
    id: 12,
    text: "Как се чувстваш, когато мислиш за тренировки?",
    answers: [
      { text: "Объркан/а съм и не знам откъде да започна", value: 1 },
      { text: "Малко несигурен/а", value: 2 },
      { text: "Мотивиран/а, но ми липсва план", value: 3 },
      { text: "Готов/а съм за предизвикателство", value: 4 },
    ]
  },
  {
    id: 13,
    text: "Какво най-често те спира да тренираш?",
    isBehavioral: true,
    answers: [
      { text: "Нямам време", value: "no_time" },
      { text: "Липсва ми мотивация", value: "no_motivation" },
      { text: "Не знам какво точно да правя", value: "no_plan" },
      { text: "Не съм постоянен/на", value: "inconsistent" },
    ]
  },
  {
    id: 14,
    text: "Колко си готов/а да се ангажираш със себе си?",
    isBehavioral: true,
    answers: [
      { text: "Искам да започна бавно", value: "start_slow" },
      { text: "Ще опитам да съм редовен/на", value: "try_regular" },
      { text: "Готов/а съм да следвам план", value: "follow_plan" },
      { text: "Давам 100%", value: "all_in" },
    ]
  }
];
