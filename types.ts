
export interface Apartment {
  id: string;
  number: string;
  title: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  maxFloor: number;
  district: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  project: string;
  section: string;
  status: 'available' | 'reserved' | 'sold';
  finishType: 'rough' | 'whitebox' | 'final';
  deadline: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  date: string;
  imageUrl: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  icon: string;
  filter: (apt: Apartment) => boolean;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export enum Page {
  Home = 'home',
  Interactive = 'interactive',
  Promos = 'promos',
  Collections = 'collections'
}
