import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Observable, of } from 'rxjs';
import { Weather } from '../shared/weather';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  weather: Observable<Weather>;
  // weather: Weather;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.weather = this.route.paramMap.pipe(switchMap(p => {
      const zip = p.get('zip');
      const units = p.get('units');
      // if (zip && units) {
      return this.weatherService.getWeather(zip, units);
      // }
      // return of(null);
    }));
  }
}
