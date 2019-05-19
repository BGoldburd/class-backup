import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../shared/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input()
  person: Person;

  /* just for fun*/
  getFriends() {
    // cant filter if we want delete based on index to work without complications
    return this.person.friends; // .filter(f => f !== 'Putin');
  }

  addFriend(friend: string) {
    this.person.friends = this.person.friends || [];
    this.person.friends.push(friend);
  }

  deleteFriend(index: number) {
    this.person.friends.splice(index, 1);
  }
}
