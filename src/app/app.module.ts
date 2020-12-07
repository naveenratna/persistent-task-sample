
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{ MaterialModule } from '../material.module';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    DialogboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule
  ],
  entryComponents: [
    DialogboxComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
