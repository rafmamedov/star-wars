export interface FanDetails {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender?: string;
  homeworld: string;
}

export interface Fan extends FanDetails {
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Counter {
  female: Fan[];
  male: Fan[];
  others: Fan[];
}

export type paginationOrder = 'previous' | 'next';
