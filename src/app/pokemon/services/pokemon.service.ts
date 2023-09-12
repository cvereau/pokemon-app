import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  PaginatedPokemonList,
  PokemonDetails,
  PokemonDetailsRaw,
  PokemonEvolutionChainRaw,
  PokemonSpeciesRaw,
  QueryParams,
} from '../models';

@Injectable()
export class PokemonService {
  private _baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private _selectedPokemonDetails$ = new BehaviorSubject<PokemonDetails | null>(null);

  selectedPokemon$: Observable<PokemonDetails | null> = this._selectedPokemonDetails$.asObservable();

  constructor(private _http: HttpClient) {}

  getAllPokemons(params: QueryParams): Observable<HttpResponse<PaginatedPokemonList>> {
    return this._http.get<PaginatedPokemonList>(`${this._baseUrl}?limit=${params.limit}&offset=${params.offset}`, {
      observe: 'response',
    });
  }

  getPokemonDetailByName(name: string): Observable<HttpResponse<PokemonDetails>> {
    return this._http
      .get<PokemonDetailsRaw>(`${this._baseUrl}/${name}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<PokemonDetailsRaw>) => this.convertPokemonDetailsResponse(res)));
  }

  getPokemonEvolutionChain(url: string): Observable<HttpResponse<string[]>> {
    return this._http
      .get<PokemonEvolutionChainRaw>(url, { observe: 'response' })
      .pipe(map((res: HttpResponse<PokemonEvolutionChainRaw>) => this.convertPokemonEvolutionChainResponse(res)));
  }

  getPokemonSpeciesData(url: string): Observable<HttpResponse<PokemonSpeciesRaw>> {
    return this._http.get<PokemonSpeciesRaw>(url, { observe: 'response' });
  }

  selectPokemon(pokemon: PokemonDetails): void {
    this._selectedPokemonDetails$.next(pokemon);
  }

  clearPokemonSelection() : void {
    this._selectedPokemonDetails$.next(null);
  }

  private convertPokemonDetailsResponse(response: HttpResponse<PokemonDetailsRaw>): HttpResponse<PokemonDetails> {
    const data = response.body as PokemonDetailsRaw;
    const pokemonDetails: PokemonDetails = {
      imageUrl: data.sprites.other.dream_world.front_default,
      name: data.name,
      hp: data.stats[0].base_stat,
      experience: data.base_experience,
      attack: data.stats[1].base_stat,
      special: data.stats[2].base_stat,
      defense: data.stats[3].base_stat,
      speciesUrl: data.species?.url,
      types: data.types.map(({ type }) => ({
        name: type.name,
        imageLocation: `assets/img/pokemon-types/${type.name}.svg`,
      })),
    };
    return response.clone({ body: pokemonDetails });
  }

  private convertPokemonEvolutionChainResponse(
    response: HttpResponse<PokemonEvolutionChainRaw>,
  ): HttpResponse<string[]> {
    const data = response.body as PokemonEvolutionChainRaw;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nextEvolution: any = data.chain.evolves_to;
    let nextEvolutionName = data.chain.species.name;

    const evolutionChain: string[] = [nextEvolutionName];

    while (nextEvolution.length > 0) {
      nextEvolutionName = nextEvolution[0].species.name;
      nextEvolution = nextEvolution[0].evolves_to;
      evolutionChain.push(nextEvolutionName);
    }
    return response.clone({ body: evolutionChain });
  }
}
