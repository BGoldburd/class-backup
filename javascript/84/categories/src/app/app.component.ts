import { Component } from '@angular/core';
import { Category } from './shared/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PCS Store';

  categories: Category[] = [{
    name: 'Electronics',
    items: [{
      name: 'mp3',
      price: 99.99
    }, {
      name: 'laptop',
      price: 299.99
    }]
  }, {
    name: 'Groceries',
    items: [{
      name: 'lettuce',
      price: 2.99
    }, {
      name: 'soda',
      price: 1.65
    }]
  }];
}
