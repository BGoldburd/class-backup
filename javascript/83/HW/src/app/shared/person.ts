import { Address } from './address';

export interface Person {
    firstName: string;
    lastName: string;
    birthday: Date;
    address: Address;
    friends?: string[];
}
