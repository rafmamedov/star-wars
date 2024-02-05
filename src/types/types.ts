export interface CharacterDetails {
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

export interface Character extends CharacterDetails {
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Counter {
  female: Character[];
  male: Character[];
  others: Character[];
}

export type paginationOrder = 'previous' | 'next';
