import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsComponent } from './components/credits/credits.component';
import { CreditsRoutingModule } from './credits-routing.module';


@NgModule({
  declarations: [
    CreditsComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule
  ]
})
export class CreditsModule { }
