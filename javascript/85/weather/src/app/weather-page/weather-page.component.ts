import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Observable } from 'rxjs';
import { Weather } from '../shared/weather';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent {
  weather: Observable<Weather>;
  // weather: Weather;

  constructor(private weatherService: WeatherService) { }

  getWeather(zip: string, units: string) {
    this.weather = this.weatherService.getWeather(zip, units);
    // .subscribe(w => this.weather = w);
  }
}
