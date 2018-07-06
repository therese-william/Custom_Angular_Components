import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabselectComponent } from './tabselect.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TabselectComponent],
  exports: [TabselectComponent]
})
export class TabselectModule { }
