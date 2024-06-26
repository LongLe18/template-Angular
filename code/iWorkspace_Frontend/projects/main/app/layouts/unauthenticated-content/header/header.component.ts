import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

@Component({
  selector: 'app-single-card',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SingleCardComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;

  @Input()
  logo!: string;

  constructor() { }
}

@NgModule({
  imports: [CommonModule, DxScrollViewModule],
  exports: [SingleCardComponent],
  declarations: [SingleCardComponent],
})
export class SingleCardModule {

}
