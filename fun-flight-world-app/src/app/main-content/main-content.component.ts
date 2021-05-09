import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { LocationInformation } from '../models/location-information.model';
import { Token } from '../models/token.model';
import { AirportCitySearchService } from '../services/amadeus-api/airport-city-search.service';
import { FlightInspirationService } from '../services/amadeus-api/flight-inspiration.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})

export class MainContentComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  token: Token;
  flightInspirationForm = new FormControl();
  airports: LocationInformation[] = [];

  constructor(
    private airportCitySearch: AirportCitySearchService,
    private flightInspirationservice: FlightInspirationService
  ) {}

  ngOnInit(): void {
    this.flightInspirationForm.valueChanges
      .pipe(
        filter(value => value !== ''),
        debounceTime(500),
        switchMap((value) =>  this.getAirportCitySearch(value))
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  getAirportCitySearch(userSearchString: string): Observable<any> {
    // tslint:disable-next-line: deprecation
    return this.airportCitySearch.getAirportName$(userSearchString).pipe(
      map(airport =>  {
        this.airports = airport.data;
      }),
    );
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    console.log(this.airports);
    this.flightInspirationservice.getFlightInspiration$(this.flightInspirationForm.value)
    // tslint:disable-next-line: deprecation
    .subscribe((data) => console.log(data));
  }

}
