export interface PokemonEvolutionChainRaw {
  chain: {
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
        evolves_to: {
          [key: string]: unknown;
        }[];
      }[];
    }[];
    species: {
      name: string;
      url: string;
    };
  };
}
