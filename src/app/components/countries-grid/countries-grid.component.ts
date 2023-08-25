import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryAPIService } from 'src/app/services/countryAPI.service';
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
    private countryAPI: CountryAPIService,
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
      this.allCountries = [];
      console.log('Constructor grid:', countries);
      this.allCountries = this.allCountries.concat(countries);
      this.sortList(this.allCountries);
    });
  }

  ngOnInit(): void {
    this.updateFavotireNames();

    this.getCountries();
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

  getCountries() {
    this.isLoading = true;
    this.countryAPI.getAllCountries().subscribe((countries) => {
      countries.map((country) => {
        this.allCountries.push(Country.countryFromJson(country));
      });
      this.sortList(this.allCountries);
      this.setFavorites();
    });
    this.isLoading = false;
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

  sortList(countries: Country[]){
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
}
