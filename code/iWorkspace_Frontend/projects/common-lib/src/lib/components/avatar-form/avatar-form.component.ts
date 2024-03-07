import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, Input, NgModule, OnInit,
} from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'form-avatar',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss'],
})
export class FormAvatarComponent implements OnInit {
  @Input() link: string;

  @Input() editable = false;

  @Input() size = 124;

  imageUrl: string;

  hostRef = this.elRef.nativeElement;

  constructor(private elRef:ElementRef) {}

  ngOnInit() {
    this.imageUrl = this.link ? `url('data:image/png;base64,${this.link}')`: `url('assets/images/avatar.jpg')`;
  }
}

@NgModule({
  imports: [
    DxFileUploaderModule,
    CommonModule
  ],
  declarations: [FormAvatarComponent],
  exports: [FormAvatarComponent],
})
export class FormAvatarModule { }