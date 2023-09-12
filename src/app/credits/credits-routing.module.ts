import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreditsComponent } from "./components/credits/credits.component";

const routes: Routes = [
  {
    path: '',
    component: CreditsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }
