import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NvD3Module } from 'ng2-nvd3';
import { HttpClientModule } from '@angular/common/http';

// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomlegendComponent } from './components/customlegend/customlegend.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomlegendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NvD3Module,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
