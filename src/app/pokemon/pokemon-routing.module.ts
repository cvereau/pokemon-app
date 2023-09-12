import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonDetailsComponent } from "./components/pokemon-details/pokemon-details.component";
import { PokemonListViewComponent } from "./components/pokemon-list-view/pokemon-list-view.component";

const routes: Routes = [
  {
    path: '',
    component: PokemonListViewComponent
  },
  {
    path: ':pokemonName',
    component: PokemonDetailsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
