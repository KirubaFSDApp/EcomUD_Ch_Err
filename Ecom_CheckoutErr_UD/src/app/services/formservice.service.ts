import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '@popperjs/core';
import { States } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {

  private countryUrl: string = 'http://localhost:9090/api/country/all';
  private stateUrl: string = 'http://localhost:9090/api/country/state?code=';

  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>
  {
    return this.httpClient.get<Country[]>(this.countryUrl);
  }

  getState(code:string):Observable<States[]>
  {
    return this.httpClient.get<States[]>(this.stateUrl+code);
  }
  getCreditCardMonths(startMonth: number):Observable<number[]>
  {
    let data:number[] = [];

    for(let month = startMonth; month<=12; month++)
    {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears():Observable<number[]>
  {
    let data:number[] = [];
    const currentYear:number = new Date().getFullYear();

    for(let year = currentYear; year<=currentYear+10; year++)
    {
      data.push(year);
    }

    return of(data);
  }
}
