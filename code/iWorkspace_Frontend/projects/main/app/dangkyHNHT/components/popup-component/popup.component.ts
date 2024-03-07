import {
    Component,
    NgModule,
    Input,
    Output, EventEmitter,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {
    DxButtonModule,
    DxToolbarModule,
    DxPopupModule,
  } from 'devextreme-angular';
  import { ApplyPipeModule, ScreenService, TranslatePipeModule } from 'projects/common-lib/src/public-api';
  
  type Require = {
    onHandle: () => void,
    visible: boolean
};

  @Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
  })
  
  export class PopupComponent {
  
    @Input() titleText = '';
  
    @Input() width = 480;
  
    @Input() height: string | number = 'auto';
  
    @Input() wrapperAttr: Record<string, string> = {};
  
    @Input() visible = true;
    
    @Input() forWard: Require = {
      visible: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onHandle: () => {}
    };

    @Output() visibleChange = new EventEmitter<boolean>();
  
    constructor(protected screen: ScreenService) { }
  
    close() {
      this.visible = false;
  
      this.visibleChange.emit(this.visible);
    }
  
    getWrapperAttrs = (inputWrapperAttr) => {
      return {
        ...inputWrapperAttr,
        class: `${inputWrapperAttr.class} form-popup`,
      };
    }
  }
  
  @NgModule({
    imports: [
      ApplyPipeModule,
      DxButtonModule,
      DxToolbarModule,
      DxPopupModule,
      CommonModule,
      TranslatePipeModule,
    ],
    declarations: [PopupComponent],
    exports: [PopupComponent],
  })
  export class PopupModule { }