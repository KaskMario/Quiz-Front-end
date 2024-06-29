import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
})
export class AppModule { }

