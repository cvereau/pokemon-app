import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { PaginatedPokemonList, PaginatedPokemonListWithDetails, PokemonDetails } from '../models';
import { PokemonService } from '../services/pokemon.service';
import {
  getPokemonDetailsQueryFailed,
  getPokemonDetailsQueryRequest,
  getPokemonDetailsQuerySuccess,
  getPokemonEvolutionChainFailed,
  getPokemonEvolutionChainRequest,
  getPokemonEvolutionChainSuccess,
  getPokemonsQueryFailed,
  getPokemonsQueryRequest,
  getPokemonsWithDetailsQueryFailed,
  getPokemonsWithDetailsQueryRequest,
  getPokemonsWithDetailsQuerySuccess,
} from './pokemon.actions';

@Injectable()
export class PokemonsEffects {
  pokemonsQueryRequest$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getPokemonsQueryRequest),
      switchMap((action) =>
        this._pokemonService.getAllPokemons(action.params).pipe(
          map((response) => getPokemonsWithDetailsQueryRequest({ response: response.body as PaginatedPokemonList })),
          catchError(() => of(getPokemonsQueryFailed())),
        ),
      ),
    );
  });

  pokemonsListWithDetailsQueryRequest$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getPokemonsWithDetailsQueryRequest),
      switchMap((action) =>
        combineLatest([
          of(action),
          forkJoin(action.response.results.map((pokemon) => this._pokemonService.getPokemonDetailByName(pokemon.name))),
        ]),
      ),
      map(
        ([action, pokemonsResponse]) =>
          ({
            count: action.response.count,
            previous: action.response.previous,
            next: action.response.next,
            results: pokemonsResponse.map((p) => p.body),
          }) as PaginatedPokemonListWithDetails,
      ),
      mergeMap((pokemons) => of(getPokemonsWithDetailsQuerySuccess({ response: pokemons }))),
      catchError(() => of(getPokemonsWithDetailsQueryFailed())),
    );
  });

  pokemonDetailsQueryRequest$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getPokemonDetailsQueryRequest),
      switchMap((action) =>
        this._pokemonService.getPokemonDetailByName(action.pokemonName).pipe(
          map((response) => getPokemonDetailsQuerySuccess({ response: response.body as PokemonDetails })),
          catchError(() => of(getPokemonDetailsQueryFailed())),
        ),
      ),
    );
  });

  pokemonEvolutionChainRequest$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(getPokemonEvolutionChainRequest),
        switchMap((action) =>
          this._pokemonService
            .getPokemonSpeciesData(action.url)
            .pipe(
              switchMap((res) =>
                this._pokemonService
                  .getPokemonEvolutionChain(res.body?.evolution_chain.url as string)
                  .pipe(map((res) => res.body as string[])),
              ),
            ),
        ),
        switchMap((res) => forkJoin(res.map((pokemonName) => this._pokemonService.getPokemonDetailByName(pokemonName)))),
        map((res) => res.map((r) => r.body)),
        mergeMap((pokemonDetails) =>
          of(getPokemonEvolutionChainSuccess({ response: pokemonDetails as PokemonDetails[] })),
        ),
        catchError((error: HttpErrorResponse) => of(getPokemonEvolutionChainFailed(error))),
      );
    }
  );

  constructor(
    private _pokemonService: PokemonService,
    private _actions$: Actions,
  ) {}
}
