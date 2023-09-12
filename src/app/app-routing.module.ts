import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'main/pokemon', pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'pokemon',
        loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule)
      },
      {
        path: 'credits',
        loadChildren: () => import('./credits/credits.module').then(m => m.CreditsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
