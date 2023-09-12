import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PaginatedPokemonList, PaginatedPokemonListWithDetails, PokemonDetails, QueryParams } from "../models";

export enum PokemonsActions {
  GetPokemonsQueryRequest = '[Pokemons] Get Pokemons Query Request',
  GetPokemonsQueryFailed = '[Pokemons] Get Pokemons Query Failed',

  GetPokemonsWithDetailsQueryRequest = '[Pokemons] Get Pokemons With Details Query Request',
  GetPokemonsWithDetailsQuerySuccess = '[Pokemons] Get Pokemons With Details Query Success',
  GetPokemonsWithDetailsQueryFailed = '[Pokemons] Get Pokemons With Details Query Failed',
  
  GetPokemonDetailsQueryRequest = '[Pokemons] Get Pokemon Details Query Request',
  GetPokemonDetailsQuerySuccess = '[Pokemons] Get Pokemon Details Query Success',
  GetPokemonDetailsQueryFailed = '[Pokemons] Get Pokemon Details Query Failed',

  GetPokemonEvolutionChainRequest = '[Pokemons] Get Pokemon Evolution Chain Request',
  GetPokemonEvolutionChainSuccess = '[Pokemons] Get Pokemon Evolution Chain Success',
  GetPokemonEvolutionChainFailed = '[Pokemons] Get Pokemon Evolution Chain Failed'
}

export const getPokemonsQueryRequest = createAction(
  PokemonsActions.GetPokemonsQueryRequest,
  props<{ params: QueryParams }>()
);

export const getPokemonsQueryFailed = createAction(
  PokemonsActions.GetPokemonsQueryFailed
);

export const getPokemonsWithDetailsQueryRequest = createAction(
  PokemonsActions.GetPokemonsWithDetailsQueryRequest,
  props<{ response: PaginatedPokemonList }>()
);

export const getPokemonsWithDetailsQuerySuccess = createAction(
  PokemonsActions.GetPokemonsWithDetailsQuerySuccess,
  props<{ response: PaginatedPokemonListWithDetails }>()
);

export const getPokemonsWithDetailsQueryFailed = createAction(
  PokemonsActions.GetPokemonsWithDetailsQueryFailed
);

export const getPokemonDetailsQueryRequest = createAction(
  PokemonsActions.GetPokemonDetailsQueryRequest,
  props<{ pokemonName: string }>()
);

export const getPokemonDetailsQuerySuccess = createAction(
  PokemonsActions.GetPokemonDetailsQuerySuccess,
  props<{ response: PokemonDetails }>()
);

export const getPokemonDetailsQueryFailed = createAction(
  PokemonsActions.GetPokemonDetailsQueryFailed
);

export const getPokemonEvolutionChainRequest = createAction(
  PokemonsActions.GetPokemonEvolutionChainRequest,
  props<{ url: string }>()
);

export const getPokemonEvolutionChainSuccess = createAction(
  PokemonsActions.GetPokemonEvolutionChainSuccess,
  props<{ response: PokemonDetails[] }>()
);

export const getPokemonEvolutionChainFailed = createAction(
  PokemonsActions.GetPokemonEvolutionChainFailed,
  props<{ error: HttpErrorResponse}>()
);
