import { FlightLinks } from './flight-links.model';
import { Price } from './price.model';

export interface FlightInspiration {
  departureDate: string;
  destination: string;
  links: FlightLinks;
  origin: string;
  price: Price;
  returnDate: string;
  type: string;
}
