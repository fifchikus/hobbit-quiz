import { Riddle } from '@/types/riddle';

export const hobbitRiddles: Riddle[] = [
  // Riddles from The Hobbit book first
  {
    id: '1',
    question: 'Чиє коріння сховалось від зору, Що вище за дерево зноситься вгору, Височить, а проте Увись не росте?',
    options: ['Гора', 'Хмара', 'Дим', 'Сонце'],
    correctIndex: 0,
  },
  {
    id: '2',
    question: 'Безголосий — реве, Без крил — до польоту, Беззубий — рве, Лепече — без рота.',
    options: ['Вітер', 'Холод', 'Грім', 'Страх'],
    correctIndex: 0,
  },
  {
    id: '3',
    question: 'Жива, але не дише, Від смерті холодніша, Хоч не спрагла, п\'є щомить, Вся в броні, що не бряжчить.',
    options: ['Місяць', 'Камінь', 'Риба', 'Статуя'],
    correctIndex: 2,
  },
  {
    id: '4',
    question: 'Ні віка в скриньки, ні ключа нема, Та злиток золота у ній дріма',
    options: ['Серце', 'Яйце', 'Горіх', 'Книга'],
    correctIndex: 1,
  },
  {
    id: '5',
    question: 'Пожирає все він: Квіти, птаство, тварин, Сталь точить дебелу, Каміння меле, Вбива королів, руйнує міста, Гори на прах оберта.',
    options: ['Вогонь', 'Вода', 'Час', 'Іржа'],
    correctIndex: 2,
  },
  {
    id: '6',
    question: 'Жують на весь свій пагорб червоний, А все перетерши, Стихають, як перше, — Тридцять білих коней.',
    options: ['Зуби', 'Пальці', 'Хвилі', 'Зірки'],
    correctIndex: 0,
  },
  {
    id: '7',
    question: 'Що у мене в кишені?',
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
    options: ['Пітьма', 'Знання', 'Борг', 'Яма'],
    correctIndex: 3,
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
    options: ['Обіцянку', 'Серце', 'Тишу', 'Слово'],
    correctIndex: 3,
  },
  {
    id: '13',
    question: 'Що завжди йде, але ніколи не приходить?',
    options: ['Завтра', 'Сонце', 'Вода', 'Час'],
    correctIndex: 0,
  },
  {
    id: '14',
    question: 'Я маю міста, але немає будинків. Маю ліси, але немає дерев. Маю воду, але не маю риби. Що я?',
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
    options: ['Звук', 'Час', 'Думка', 'Тінь'],
    correctIndex: 0,
  },
  {
    id: '21',
    question: 'Вона — незрима, вона — нечутна, Вона — без запаху і невідчутна. Вона — вище зір, і нижче гір, - І в порожнечі нір. Це перша й остання з речей усіх, Життя уриває, вбиває сміх.',
    options: ['Темрява', 'Вода', 'Повітря', 'Вогонь'],
    correctIndex: 0,
  },
  {
    id: '22',
    question: 'Чим більше віддаєш, тим більше в тебе залишається.',
    options: ['Дружба', 'Золото', 'Хліб', 'Таємниця'],
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
