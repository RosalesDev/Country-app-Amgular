import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/Country';
import { CountryAPIService } from 'src/app/services/countryAPI.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  show = false;
  country: Country = new Country();
  countryApiService$ = Subscription;
  favoritesCountries: Country[] = [];

  constructor(
    private countryAPIService: CountryAPIService,
    private favariteService: FavoritesService
  ) {
    this.countryAPIService.getCountries().subscribe({
      next: (data) => {
        if (data.length != 1) return;
        this.country = data[0];
        this.show = true;
      },
      error: (error) => {
        console.log('Error al obtener el país.', error);
      },
    });

    this.favariteService.countries.subscribe((countries) => {
      this.favoritesCountries = countries;
    });
  }

  addFavoriteCountry(country: Country){
    this.favariteService.addFavoriteCountry(country);
  }
}
