import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zip-form',
  templateUrl: './zip-form.component.html',
  styleUrls: ['./zip-form.component.css']
})
export class ZipFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getWeather(zip: string, units: string) {
    // this.router.navigate(['\weather', zip, units]);
    this.router.navigate(['\weather', { zip, units }]);
  }
}
