import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { PaginatedPokemonListWithDetails, PokemonDetails } from '../../models';
import { PokemonService } from '../../services/pokemon.service';
import {
  getPokemonsQueryFailed,
  getPokemonsQueryRequest,
  getPokemonsWithDetailsQueryFailed,
  getPokemonsWithDetailsQuerySuccess,
} from '../../store/pokemon.actions';

@Component({
  selector: 'app-pokemon-list-view',
  templateUrl: './pokemon-list-view.component.html',
  styleUrls: ['./pokemon-list-view.component.scss'],
})
export class PokemonListViewComponent implements OnInit, OnDestroy {
  page: number;
  itemsPerPage: number;
  paginatedPokemonList$: Observable<PaginatedPokemonListWithDetails>;
  loadingPokemonList = false;

  private _unsub$: Subject<void> = new Subject<void>();

  constructor(
    // eslint-disable-next-line @ngrx/use-consistent-global-store-name
    private _store$: Store,
    private _actions$: Actions,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pokemonService: PokemonService,
    private _toastrService: ToastrService,
  ) {
    this.page = 0;
    this.itemsPerPage = 30;
    this.paginatedPokemonList$ = new Observable<PaginatedPokemonListWithDetails>();
  }

  ngOnInit(): void {
    this._route.queryParams
      .pipe(
        map(({ offset, limit }) => {          
          if(isNaN(offset || 0) || isNaN(limit || 0)) {
            this._toastrService.error('There was an error while trying to load the pokemon list', 'Error')
            return;
          }

          if (offset && limit) {
            this.page = offset / limit;
            this.itemsPerPage = limit;
          }
          this.loadPokemonList();
          if (!offset && !limit) this.addFilterParamToUrl();
        }),
      )
      .subscribe();

    this.paginatedPokemonList$ = this._actions$.pipe(
      ofType(getPokemonsWithDetailsQuerySuccess),
      map((data) => data.response),
      tap(() => (this.loadingPokemonList = false)),
    );

    this._actions$
      .pipe(
        ofType(getPokemonsQueryFailed, getPokemonsWithDetailsQueryFailed),
        tap(() => this._toastrService.error('There was an error while trying to load the pokemon list', 'Error')),
        takeUntil(this._unsub$),
      )
      .subscribe();
  }

  goToPokemonDetail(pokemon: PokemonDetails): void {
    this._pokemonService.selectPokemon(pokemon);
    this._router.navigate([`main/pokemon/${pokemon.name}`]);
  }

  goToNextPage(): void {
    this.page++;
    this.loadPokemonList();
    this.addFilterParamToUrl();
  }

  goToPreviousPage(): void {
    this.page--;
    this.loadPokemonList();
    this.addFilterParamToUrl();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
  }

  private loadPokemonList(): void {
    this.loadingPokemonList = true;
    this._store$.dispatch(
      getPokemonsQueryRequest({
        params: {
          offset: this.page * this.itemsPerPage,
          limit: this.itemsPerPage,
        },
      }),
    );
  }

  private addFilterParamToUrl(): void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        offset: this.page * this.itemsPerPage,
        limit: this.itemsPerPage,
      },
      queryParamsHandling: 'merge',
    });
  }
}
