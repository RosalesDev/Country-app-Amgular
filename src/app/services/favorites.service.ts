import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private favoritesList: Country[] = []
  
  _favorites: BehaviorSubject<Country[]>;

  constructor() {
    this._favorites = new BehaviorSubject<Country[]>([]);
  }

  setCountries(countries: Country[]){
    this._favorites.next(countries);
  };

  get countries(){
    return this._favorites.asObservable();
  }

  addFavoriteCountry(country: Country){
    let isInFavoriteList = this.favoritesList.findIndex(countryInList => countryInList.name === country.name)

    if(isInFavoriteList != -1) return;

    this.favoritesList.push(country);
    this._favorites.next(this.favoritesList);
  }

  deleteFavoriteCountry(index: number){
    this.favoritesList.splice(index, 1);
    this._favorites.next(this.favoritesList);
  }
}
