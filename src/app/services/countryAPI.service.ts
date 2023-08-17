import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs'
import { Country } from '../models/Country';
import { CountryAPIResponse } from '../models/CountryAPIResponse';

@Injectable({
  providedIn: 'root'
})
export class CountryAPIService {

  bsCountries = new BehaviorSubject<Country[]>([]);


  constructor( private http: HttpClient ) { }

  getCountryByName(name: string){
    const url = 'https://restcountries.com/v3.1/translation/'

    return this.http.get<CountryAPIResponse[]>(url+`${name}`);

  }

  setCountries(data: Country[]){
    this.bsCountries.next(data);
  };

  getCountries(){
    return this.bsCountries.asObservable();
  }  

}
