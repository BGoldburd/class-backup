import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { AnotherpageComponent } from './anotherpage/anotherpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path: 'weather',
  component: WeatherPageComponent
}, {
  path: 'another',
  component: AnotherpageComponent
}, {
  path: '',
  redirectTo: 'weather',
  pathMatch: 'full'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
