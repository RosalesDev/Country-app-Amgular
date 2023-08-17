import { Component } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  favoritesCounter = 0;

  constructor( private favoriteService: FavoritesService){
    this.favoriteService._favorites.subscribe(countries => {
      this.favoritesCounter = countries.length;
    });

  }

}
