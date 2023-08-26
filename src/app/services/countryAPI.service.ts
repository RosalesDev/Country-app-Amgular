import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryAPIResponse } from '../models/CountryAPIResponse';

@Injectable({
  providedIn: 'root'
})
export class CountryAPIService {

  constructor( private http: HttpClient ) { }

  
  getAllCountries(){
    const url = 'https://restcountries.com/v3.1/all?fields=flags,name,translations,capital,population,currencies,continents,maps,latlng';

    return this.http.get<CountryAPIResponse[]>(url);

  }
  
  getCountryByName(name: string){
    const url = 'https://restcountries.com/v3.1/translation/'

    return this.http.get<CountryAPIResponse[]>(url+`${name}`);

  }

  // countryExistInApi(name: string){
  //   let matchCountries = [];
  //   let exist = false;
  //   return this.getCountryByName(name)
  //   .subscribe((resp: CountryAPIResponse[]) => {
  //     matchCountries = resp.filter((country) =>
  //     country.translations['spa'].common
  //         .toLowerCase()
  //         .includes(name.toLowerCase())
  //     );
  //     if(matchCountries.length > 0){
  //       exist = true;
  //     }
  //     return exist;
  //   });
    
  // }

}
