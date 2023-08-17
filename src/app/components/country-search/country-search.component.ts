import { Component } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { CountryAPIResponse } from 'src/app/models/CountryAPIResponse';
import { CountryAPIService } from 'src/app/services/countryAPI.service';



@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
})
export class CountrySearchComponent {
  currentCountries: Country[] = [];
  // countryAPIService$: Subscription;

  constructor( private countryAPI: CountryAPIService ){

    this.countryAPI.getCountries().subscribe({
      next: data => {
        this.currentCountries = data;
      }
    });

  }

  cleanOptions(){
    this.currentCountries = [];
  } 

  getCountryByName(name: string){
    if(name.length < 3) return;

    this.countryAPI.getCountryByName(name)
      .subscribe((resp: CountryAPIResponse[]) => {
        let matchCountries = resp.filter(country => country.translations['spa'].common.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        this.countryAPI.setCountries(matchCountries.map(country => Country.countryFromJson(country)));
      });
  }

}
