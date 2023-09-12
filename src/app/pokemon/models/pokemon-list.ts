export interface PokemonList {
  name: string;
  url: string;
}

export interface PaginatedPokemonList {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonList[];
}
