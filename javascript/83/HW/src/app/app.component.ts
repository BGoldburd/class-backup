import { Component } from '@angular/core';
import { Person } from './shared/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW';

  person: Person = {
    firstName: 'Mike',
    lastName: 'Pence',
    birthday: new Date('1960-01-01'),
    address: {
      street: '1600 Pennsylvania Ave',
      city: 'Washington',
      state: 'DC',
      zip: '12345'
    }/*,
    friends: ['Putin', 'Trump', 'Sessions']*/
  };

  /*updateTitle(event) {
    console.log(event);
    this.title = event.target.value;
  }*/
}
