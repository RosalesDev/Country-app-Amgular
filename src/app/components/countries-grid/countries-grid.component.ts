import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { CountriesService } from 'src/app/services/countries.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-countries-grid',
  templateUrl: './countries-grid.component.html',
})
export class CountriesGridComponent implements OnInit {
  allCountries: Country[] = [];
  allCountryNames: string[] = [];
  favoriteNamesFromLocalStorageList: string[] = [];
  isLoading = true;
  page = 1;

  constructor(
    private favoritesService: FavoritesService,
    private countriesService: CountriesService
  ) {

    this.favoritesService.countries.subscribe(() => {
      if (this.allCountries.length > 0) {
        this.updateFavotireNames();
      }
      this.setFavorites();
    });

    this.countriesService.countries.subscribe((countries) => {
      this.allCountries = countries;
      this.setFavorites();
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.updateFavotireNames();
    this.setFavorites();

  }

  updateFavotireNames() {
    if (localStorage.getItem('favorites')) {
      let countriesFromLocalStorage: Country[] = JSON.parse(
        localStorage.getItem('favorites')!
      );
      this.favoriteNamesFromLocalStorageList = countriesFromLocalStorage.map(
        (country) => country.name
      );
    }
  }

  setFavorites() {
    this.allCountries.map((country) => {
      this.allCountryNames.push(country.name);
    });

    this.allCountries.forEach((country) => {
      if (this.favoriteNamesFromLocalStorageList.includes(country.name)) {
        country.isFavorite = true;
      } else {
        country.isFavorite = false;
      }
    });
  }

}
