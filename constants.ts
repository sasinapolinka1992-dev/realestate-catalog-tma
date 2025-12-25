
import { Apartment, Promotion, Collection } from './types';

export const MOCK_APARTMENTS: Apartment[] = [
  {
    id: '606-124',
    number: '124',
    title: '1-комнатная квартира',
    price: 7240000,
    area: 38.5,
    rooms: 1,
    floor: 5,
    maxFloor: 12,
    section: '1',
    district: 'Центральный',
    project: 'ЖК "Квартал 606"',
    status: 'available',
    finishType: 'whitebox',
    deadline: 'II кв. 2025',
    description: 'Уютная квартира с видом на парк. Улучшенная черновая отделка.',
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=400',
    gallery: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200']
  },
  {
    id: '606-45',
    number: '45',
    title: 'Студия Smart',
    price: 5100000,
    area: 24.2,
    rooms: 0,
    floor: 8,
    maxFloor: 12,
    section: '2',
    district: 'Центральный',
    project: 'ЖК "Квартал 606"',
    status: 'available',
    finishType: 'final',
    deadline: 'I кв. 2025',
    description: 'Готовая отделка. Идеально под инвестиции.',
    imageUrl: 'https://images.unsplash.com/photo-1583339824000-5afec64299ec?auto=format&fit=crop&w=400',
    gallery: ['https://images.unsplash.com/photo-1583339824000-5afec64299ec?auto=format&fit=crop&w=1200']
  }
];

export const MOCK_PROMOS: Promotion[] = [
  {
    id: 'p1',
    title: 'Ипотека 0.01%',
    description: 'Специальные условия от застройщика и банков-партнеров.',
    fullContent: 'Рассчитайте платеж в отделе продаж.',
    date: 'до 31.05',
    imageUrl: 'https://picsum.photos/seed/p7/800/400'
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'top',
    title: 'Выгодное предложение',
    description: 'Лучшая цена за квадратный метр',
    icon: '🔥',
    filter: (apt) => apt.price < 6000000
  }
];

export const MANAGER_USERNAME = 'plan7_manager';
export const SALES_PHONE = '8 (800) 555-35-35';
export const SALES_EMAIL = 'sales@plan7.ru';
export const PLAN7_IFRAME_URL = 'https://plan7.ru/catalog/exp/index.php?zk=606&page=apa';
