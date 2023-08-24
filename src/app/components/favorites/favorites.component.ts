import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {

  favoritesCountries: Country[] = [];
  isEmpty: boolean = true;

  constructor( private favoritesService: FavoritesService){
    this.favoritesService.countries.subscribe(countries => {
      this.favoritesCountries = countries;
    });
  }
  
  ngOnInit(): void {
    this.isEmpty = this.favoritesCountries.length === 0;
  }
  
  deleteFavoriteCountry(country: Country){
    this.favoritesService.deleteFavoriteCountry(country);
    this.isEmpty = this.favoritesCountries.length === 0;
  }

}
