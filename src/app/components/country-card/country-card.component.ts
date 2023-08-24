import { Component, Input } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
})
export class CountryCardComponent {
  @Input() country: Country = new Country();
  show = true;
  favoritesCountries: Country[] = [];
  language = 'ES';

  changeLanguage(){
    if(this.language == 'ES') {
      this.language = 'EN';
    }else{
      this.language = 'ES';
    }
  }
  
  constructor(
    private favariteService: FavoritesService
    ) {
    this.favariteService.countries.subscribe((countries) => {
      this.favoritesCountries = countries;
    });
  }

  addFavoriteCountry(country: Country){
    this.favariteService.addFavoriteCountry(country);
  }

  deleteFavoriteCountry(country: Country) {
    this.favariteService.deleteFavoriteCountry(country);
  }

}
