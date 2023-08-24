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
    if(localStorage.getItem('favorites')){
      this.favoritesList = JSON.parse(localStorage.getItem('favorites')!);
      this.setCountries(this.favoritesList);
    }
  }

  saveInLocalStorage(favoritesList: Country[]){
    // let namesList: string[] = favoritesList.map(country => country.name);
    localStorage.setItem('favorites',JSON.stringify(favoritesList));
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

    country.isFavorite = true;
    this.favoritesList.push(country);
    this.saveInLocalStorage(this.favoritesList);
    this._favorites.next(this.favoritesList);
  }

  deleteFavoriteCountry(country: Country) {
    this.favoritesList = this.favoritesList.filter(countryInList => countryInList.name != country.name);
    this.saveInLocalStorage(this.favoritesList);
    this._favorites.next(this.favoritesList);
  }
}
