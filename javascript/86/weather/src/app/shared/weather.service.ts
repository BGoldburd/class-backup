import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Weather } from './weather';

interface WeatherData {
  name: string;
  main: { temp: string };
  weather: [{ description: string, icon: string }];
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather: BehaviorSubject<Weather> = new BehaviorSubject<Weather>(null);
  lastFetchedZip: string;
  lastfetchedUnits: string;

  constructor(private httpClient: HttpClient) { }

  getWeather(zip: string, units: string): Observable<Weather> {
    if ((zip && zip !== this.lastFetchedZip) ||
      units && units !== this.lastfetchedUnits) {
      this.httpClient.get<WeatherData>
        (`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${zip}&units=${units}`)
        .pipe(map(weatherData => {
          return {
            place: weatherData.name,
            temp: weatherData.main.temp,
            description: weatherData.weather[0].description,
            picture: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
          };
        })).subscribe(w => this.weather.next(w));
    }
    return this.weather.asObservable();
  }
}
