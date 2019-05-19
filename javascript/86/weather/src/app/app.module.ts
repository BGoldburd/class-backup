import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { AnotherpageComponent } from './anotherpage/anotherpage.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ZipFormComponent } from './zip-form/zip-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPageComponent,
    AnotherpageComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ZipFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
