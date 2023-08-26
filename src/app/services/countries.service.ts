import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/Country';
import { CountryAPIService } from './countryAPI.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesList: Country[] = [];
  _countries: BehaviorSubject<Country[]>;

  constructor(private countryAPI: CountryAPIService) {
    this._countries = new BehaviorSubject<Country[]>([]);

    this.getCountries();
    console.log('Constructor countriesService: ', this.countriesList);
  }

  saveInLocalStorage(countriesList: Country[]) {
    localStorage.setItem('countries', JSON.stringify(countriesList));
  }

  setCountries(countries: Country[]) {
    console.log('setCountries', countries.length);
    this._countries.next(countries);
  }

  get countries() {
    return this._countries.asObservable();
  }

  getCountries() {
    if (localStorage.getItem('countries') && this.countriesList.length === 0) {
      this.countriesList = JSON.parse(localStorage.getItem('countries')!);
      console.log('Countries in LocalStorage: ', this.countriesList);
      // this.setCountries(this.countriesList);
    }
    if (this.countriesList.length === 0) {
      this.countryAPI.getAllCountries().subscribe((countries) => {
        countries.map((country) => {
          this.countriesList.push(Country.countryFromJson(country));
        });
        this.sortList(this.countriesList);
      });
    }
    this.setCountries(this.countriesList);
  }

  sortList(countries: Country[]) {
    console.log('sort', countries.length);
    countries.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  addCustomCountry(country: Country) {
    let isInCountriesList = this.countriesList.findIndex(
      (countryInList) => countryInList.name === country.name
    );

    if (isInCountriesList != -1) return;

    country.isFavorite = true;
    this.countriesList.push(country);
    this.sortList(this.countriesList);
    this.saveInLocalStorage(this.countriesList);
    this._countries.next(this.countriesList);
  }

  deleteCustomCountry(country: Country) {
    this.countriesList = this.countriesList.filter(
      (countryInList) => countryInList.name != country.name
    );
    this.saveInLocalStorage(this.countriesList);
    this._countries.next(this.countriesList);
  }
}
