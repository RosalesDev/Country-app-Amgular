import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countriesList: Country[] = [];
  _countries: BehaviorSubject<Country[]>;

  constructor() {
    this._countries = new BehaviorSubject<Country[]>([]);

    if(localStorage.getItem('countries')){
      this.countriesList = JSON.parse(localStorage.getItem('countries')!);
      console.log('Countries in LocalStorage: ',this.countriesList);
      this.setCountries(this.countriesList);
    }
    console.log('Constructor countriesService: ',this.countriesList);
  }

  saveInLocalStorage(countriesList: Country[]){
    localStorage.setItem('countries',JSON.stringify(countriesList));
  }

  setCountries(countries: Country[]){
    this._countries.next(countries);
  };

  get countries(){
    return this._countries.asObservable();
  }

  addCustomCountry(country: Country){
    let isInCountriesList = this.countriesList.findIndex(countryInList => countryInList.name === country.name)

    if(isInCountriesList != -1) return;

    country.isFavorite = true;
    this.countriesList.push(country);
    this.saveInLocalStorage(this.countriesList);
    this._countries.next(this.countriesList);
  }

  deleteCustomCountry(country: Country) {
    this.countriesList = this.countriesList.filter(countryInList => countryInList.name != country.name);
    this.saveInLocalStorage(this.countriesList);
    this._countries.next(this.countriesList);
  }

}
