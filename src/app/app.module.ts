import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BSModalModule } from './modal/bsmodal.module';
import { TabselectModule } from './tabselect/tabselect.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TabselectModule,
    BSModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
