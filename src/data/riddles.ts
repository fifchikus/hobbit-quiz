import { Riddle } from '@/types/riddle';

export const hobbitRiddles: Riddle[] = [
  // Riddles from The Hobbit book first
  {
    id: '1',
    question: 'Що має корені, які ніхто не бачить, вище за дерева росте, вгору здіймається, а ніколи не виростає?',
    options: ['Гора', 'Хмара', 'Дим', 'Сонце'],
    correctIndex: 0,
  },
  {
    id: '2',
    question: 'Без голосу кричить, без крил летить, без зубів кусає, без вогню пече?',
    options: ['Вітер', 'Холод', 'Час', 'Страх'],
    correctIndex: 0,
  },
  {
    id: '3',
    question: 'Живе без дихання, холодне як смерть, ніколи не спрагне, завжди в кольчузі?',
    options: ['Риба', 'Камінь', 'Місяць', 'Статуя'],
    correctIndex: 0,
  },
  {
    id: '4',
    question: 'Скринька без петель, ключа і кришки, а всередині золотий скарб сховано?',
    options: ['Серце', 'Яйце', 'Горіх', 'Книга'],
    correctIndex: 1,
  },
  {
    id: '5',
    question: 'Що пожирає все навкруги: звірів, птахів, дерева й квіти, гризе залізо, крошить сталь, перетворює гори на пил?',
    options: ['Вогонь', 'Вода', 'Час', 'Іржа'],
    correctIndex: 2,
  },
  {
    id: '6',
    question: 'Тридцять білих коней на червоному пагорбі: тупотять, тупотять, а з місця не рушать?',
    options: ['Зуби', 'Пальці', 'Хвилі', 'Зірки'],
    correctIndex: 0,
  },
  {
    id: '7',
    question: 'Що воно в моїй кишені?',
    options: ['Перстень', 'Монета', 'Ключ', 'Нитка'],
    correctIndex: 0,
  },
  // Additional riddles in Tolkien spirit
  {
    id: '8',
    question: 'Я невидимий, але ти мене чуєш. Я ніколи не скажу брехні, бо повторюю лише те, що ти говориш. Хто я?',
    options: ['Тінь', 'Відлуння', 'Думка', 'Совість'],
    correctIndex: 1,
  },
  {
    id: '9',
    question: 'Що росте вниз головою?',
    options: ['Коріння', 'Бурулька', 'Сталактит', 'Павутина'],
    correctIndex: 1,
  },
  {
    id: '10',
    question: 'Чим більше з нього береш, тим більше воно стає?',
    options: ['Яма', 'Знання', 'Борг', 'Пітьма'],
    correctIndex: 0,
  },
  {
    id: '11',
    question: 'Що належить тобі, але інші користуються цим більше, ніж ти?',
    options: ["Твоє ім'я", 'Твоя тінь', 'Твій час', 'Твоя доля'],
    correctIndex: 0,
  },
  {
    id: '12',
    question: 'Що можна зламати, навіть не торкаючись?',
    options: ['Обіцянку', 'Серце', 'Тишу', 'Усе перелічене'],
    correctIndex: 3,
  },
  {
    id: '13',
    question: 'Що має око, але не бачить?',
    options: ['Голка', 'Буря', 'Картопля', 'Усе перелічене'],
    correctIndex: 3,
  },
  {
    id: '14',
    question: 'Я маю міста, але немає будинків. Маю ліси, але немає дерев. Маю воду, але немає риби. Що я?',
    options: ['Сон', 'Карта', 'Спогад', 'Казка'],
    correctIndex: 1,
  },
  {
    id: '15',
    question: 'Що завжди попереду тебе, але ти не можеш це побачити?',
    options: ['Майбутнє', 'Повітря', 'Твоє обличчя', 'Доля'],
    correctIndex: 0,
  },
  {
    id: '16',
    question: 'Один вхід, три виходи. Що це?',
    options: ['Светр', 'Печера', 'Річка', 'Дерево'],
    correctIndex: 0,
  },
  {
    id: '17',
    question: 'Сидить птах на вершині дуба. Крила має, а летіти не може. Що це?',
    options: ['Кажан', 'Млин', 'Хмара', 'Листок'],
    correctIndex: 1,
  },
  {
    id: '18',
    question: 'Вночі з\'являється без виклику, а вдень зникає без крадіжки. Що це?',
    options: ['Роса', 'Зірки', 'Сон', 'Місяць'],
    correctIndex: 1,
  },
  {
    id: '19',
    question: 'Що ніжніше за пір\'їнку, а тримати не можна?',
    options: ['Повітря', 'Сон', 'Подих', 'Думка'],
    correctIndex: 2,
  },
  {
    id: '20',
    question: 'Я йду без ніг, б\'ю без рук, а бачити мене не можна. Хто я?',
    options: ['Вітер', 'Час', 'Звук', 'Думка'],
    correctIndex: 0,
  },
];

export const MAX_HEIGHT = 120;
export const TOTAL_RIDDLES = hobbitRiddles.length;

export const getRandomRiddle = (answeredIds: string[]): Riddle | null => {
  const availableRiddles = hobbitRiddles.filter(r => !answeredIds.includes(r.id));
  
  if (availableRiddles.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableRiddles.length);
  return availableRiddles[randomIndex];
};
