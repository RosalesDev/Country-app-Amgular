import { Component } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { CountryAPIResponse } from 'src/app/models/CountryAPIResponse';
import { CountryAPIService } from 'src/app/services/countryAPI.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css'],
})
export class CountrySearchComponent {
  currentCountries: Country[] = [];
  favoriteNamesFromLocalStorageList: string[] = [];
  allCountryNames: string[] = [];
  // countryAPIService$: Subscription;

  constructor(
    private countryAPI: CountryAPIService,
    private favoritesService: FavoritesService
  ) {
    this.updateFavoriteNames();

    this.favoritesService.countries.subscribe(() => {
      this.updateFavoriteNames();
      this.setFavorites();
    });
  }

  updateFavoriteNames() {
    if (localStorage.getItem('favorites')) {
      let favoritesList: Country[] = JSON.parse(
        localStorage.getItem('favorites')!
      );
      this.favoriteNamesFromLocalStorageList = favoritesList.map(
        (country) => country.name
      );
    }
  }

  clearInput(inputRef: HTMLDataListElement) {
    console.log(inputRef);
  }

  setFavorites() {
    this.currentCountries.map((country) => {
      this.allCountryNames.push(country.name);
    });

    this.currentCountries.forEach((country) => {
      if (this.favoriteNamesFromLocalStorageList.includes(country.name)) {
        country.isFavorite = true;
      } else {
        country.isFavorite = false;
      }
    });
  }

  getCountryByName(name: string) {
    this.currentCountries = [];
    if (name.length < 3) return;

    this.countryAPI
      .getCountryByName(name)
      .subscribe((resp: CountryAPIResponse[]) => {
        let matchCountries = [];
        matchCountries = resp.filter((country) =>
          country.translations['spa'].common
            .toLowerCase()
            .includes(name.toLowerCase())
        );
        matchCountries.map((country) => {
          this.currentCountries.push(Country.countryFromJson(country));
        });
        this.setFavorites();
        matchCountries = [];
      });
  }
}
