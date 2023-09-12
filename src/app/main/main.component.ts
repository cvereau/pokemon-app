import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../core/components/topbar/topbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TopbarComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {}
