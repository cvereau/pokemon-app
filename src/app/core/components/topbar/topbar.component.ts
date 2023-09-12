import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { menu } from '../../constants/menu'; 

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  isResponsive: boolean;
  menuItems = menu;

  constructor() {
    this.isResponsive = false;
  }

  toggleResponsiveMenu() {
    this.isResponsive = !this.isResponsive;
  }
}
