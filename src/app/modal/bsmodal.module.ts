import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    ModalService
  ],
  declarations: [ModalComponent],
  entryComponents:[ModalComponent]
})
export class BSModalModule { }
