import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/Country';
import { CountryAPIService } from './countryAPI.service';
import { CountryAPIResponse } from '../models/CountryAPIResponse';

@Injectable({
  providedIn: 'root',
})
export class CustomCountryService {
  private customCountriesList: Country[] = [];

  _customCountries: BehaviorSubject<Country[]>;

  constructor(private countryApiService: CountryAPIService) {
    this._customCountries = new BehaviorSubject<Country[]>([]);
    if (localStorage.getItem('customCountries')) {
      this._customCountries = JSON.parse(
        localStorage.getItem('customCountries')!
      );
      this.setCustomCountries(this.customCountriesList);
    }
  }

  setCustomCountries(countries: Country[]) {
    this._customCountries.next(countries);
  }

  get cusotomCountries() {
    return this._customCountries.asObservable();
  }

  saveInLocalStorage(countriesList: Country[]) {
    localStorage.setItem('customCountries', JSON.stringify(countriesList));
  }

  // countryExistInApi(country: Country){
  //   let matchCountries = [];
  //   this.countryApiService
  //   .getCountryByName(country.name)
  //   .subscribe((resp: CountryAPIResponse[]) => {
  //     matchCountries = resp.filter((countryResp) =>
  //     countryResp.translations['spa'].common
  //         .toLowerCase()
  //         .includes(country.name.toLowerCase())
  //     );
  //     console.log(matchCountries.length);
  //     return matchCountries.length > 0;
  //   });
    
  // }

  countryExist(country: Country){
    let exist = this.customCountriesList.findIndex(
      (countryInList) =>
        countryInList.name.toLowerCase() === country.name.toLowerCase()
    );

    return exist != -1;
  }

  addCustomCountry(country: Country) {
    console.log('addCustomCountry', country);
    //TODO: implementar función para agregar pais. Verificar que no exista en ningun lado(api, favoritos, paises ya creados).
    // if (this.countryExist(country) || this.countryApiService.countryExistInApi(country.name)) return;

    country.isFavorite = true;
    this.customCountriesList.push(country);
    this.saveInLocalStorage(this.customCountriesList);
    this._customCountries.next(this.customCountriesList);
  }
}
