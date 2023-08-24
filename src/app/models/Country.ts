import { CountryAPIResponse } from "./CountryAPIResponse";

export class Country {

  flagUrl: string = '';
  flagAlt: string = '';
  name: string = '';
  currencies: Array<{}> = [];
  // currencies: Object = {};
  capital?: string = '';
  englishName: string = '';
  mapsUrl: string = '';
  population: number = 0;
  continent: string = '';
  isFavorite: boolean = false;
  isCustomCountry: boolean = false;

  constructor(){}

  static countryFromJson(json: CountryAPIResponse){

    let newCountry = new Country();
    newCountry.flagUrl = json.flags.png;
    newCountry.flagAlt = json.flags.alt;
    newCountry.name = json.translations['spa'].common;
    // newCountry.currencies = json.currencies;
    newCountry.currencies = Object.entries(json.currencies)[0]?.map(obj => Object.values(obj)).slice(1);
    if(json.capital) newCountry.capital = json.capital[0];
    newCountry.englishName = json.name.common;
    newCountry.mapsUrl = json.maps.googleMaps;
    newCountry.population = json.population;
    newCountry.continent = json.continents[0];

    
    return newCountry;
  }
}