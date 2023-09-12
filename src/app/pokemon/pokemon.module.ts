import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListViewComponent } from './components/pokemon-list-view/pokemon-list-view.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonService } from './services/pokemon.service';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './store/pokemon.effects';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../shared/components/loader/loader.component';


@NgModule({
  declarations: [
    PokemonListViewComponent,
    PokemonDetailsComponent
  ],
  imports: [
    LoaderComponent,
    CommonModule,
    HttpClientModule,
    PokemonRoutingModule,
    EffectsModule.forFeature([PokemonsEffects])
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
