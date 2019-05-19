import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../shared/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Input()
  address: Address;
}
