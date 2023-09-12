import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, mergeMap, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { PokemonDetails } from '../../models';
import { PokemonService } from '../../services/pokemon.service';
import {
  getPokemonDetailsQueryFailed,
  getPokemonDetailsQueryRequest,
  getPokemonDetailsQuerySuccess,
  getPokemonEvolutionChainFailed,
  getPokemonEvolutionChainRequest,
  getPokemonEvolutionChainSuccess,
} from '../../store/pokemon.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemonDetails$: Observable<PokemonDetails | null>;
  pokemonEvolutionDetails$: Observable<PokemonDetails[] | null>;
  loadingPokemonDetail = false;

  private _selectedPokemon$: Observable<PokemonDetails | null>;
  private _unsub$: Subject<void> = new Subject<void>();

  constructor(
    // eslint-disable-next-line @ngrx/use-consistent-global-store-name
    private _store$: Store,
    private _actions$: Actions,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pokemonService: PokemonService,
    private _toastrService: ToastrService,
    private _location: Location,
  ) {
    this._selectedPokemon$ = this._pokemonService.selectedPokemon$;
    this.pokemonDetails$ = new Observable<PokemonDetails | null>();
    this.pokemonEvolutionDetails$ = new Observable<PokemonDetails[] | null>();
  }

  ngOnInit(): void {
    this.pokemonDetails$ = combineLatest([
      this._selectedPokemon$,
      this._route.params.pipe(map(({ pokemonName }) => pokemonName)),
    ]).pipe(
      // tap((res) => console.log(res)),
      mergeMap(([pokemon, pokemonName]) =>
        !pokemon
          ? of(true).pipe(
              tap(() => this.loadPokemonDetails(pokemonName)),
              mergeMap(() =>
                this._actions$.pipe(
                  ofType(getPokemonDetailsQuerySuccess),
                  map((action) => action.response),
                ),
              ),
            )
          : of(pokemon),
      ),
      tap(() => (this.loadingPokemonDetail = false)),
      tap((pokemon) => this.loadPokemonEvolutionChain(pokemon?.speciesUrl)),
    );

    this.pokemonEvolutionDetails$ = this._actions$.pipe(
      ofType(getPokemonEvolutionChainSuccess),
      map((action) => action.response),
    );

    this._actions$
      .pipe(
        ofType(getPokemonEvolutionChainFailed, getPokemonDetailsQueryFailed),
        tap(() => this._toastrService.error('There was an error while trying to load pokemon data', 'Error')),
        takeUntil(this._unsub$),
      )
      .subscribe();
  }

  goToPokemonDetail(pokemon: PokemonDetails): void {
    this._pokemonService.selectPokemon(pokemon);
    this._router.navigate([`main/pokemon/${pokemon.name}`]);
  }

  goBack(): void {
    this._pokemonService.clearPokemonSelection();
    this._location.back();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
  }

  private loadPokemonDetails(pokemonName: string) {
    this.loadingPokemonDetail = true;
    this._store$.dispatch(getPokemonDetailsQueryRequest({ pokemonName }));
  }

  private loadPokemonEvolutionChain(speciesUrl = '') {
    this._store$.dispatch(getPokemonEvolutionChainRequest({ url: speciesUrl }));
  }
}
