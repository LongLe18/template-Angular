import {
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { ThemeService } from 'projects/common-lib/src/public-api';

@Component({
  selector: 'theme-switcher',
  template: `
    <dx-button
      class="theme-button"
      stylingMode="text"
      [icon]="themeService.currentTheme !== 'dark' ? 'moon' : 'sun'"
      (onClick)="onButtonClick()"
    ></dx-button>
`,
  styleUrls: [],
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}

  onButtonClick () {
    this.themeService.switchTheme();
  }
}

@NgModule({
  imports: [CommonModule, DxButtonModule],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule { }
