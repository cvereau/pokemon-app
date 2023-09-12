import { PokemonType } from "./pokemon-type";

export interface PokemonDetails {
  imageUrl: string;
  name: string;
  hp: number;
  experience: number;
  attack: number;
  special: number;
  defense: number;
  speciesUrl: string;
  types: PokemonType[];
}

export interface PokemonDetailsRaw {
  abilities: {
    [key: string]: unknown;
  }[];
  base_experience: number;
  forms: {
    [key: string]: string;
  }[];
  game_indices: {
    game_index: number;
    version: unknown;
  }[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: unknown[];
  name: string;
  order: number;
  past_types: unknown[];
  species: { name: string; url: string };
  sprites: {
    other: {
      dream_world: { front_default: string };
    };
  };
  stats: { base_stat: number }[];
  types: { slot: number; type: { name: string; url: string } }[];
  weight: number;
}

export interface PaginatedPokemonListWithDetails {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonDetails[];
}
