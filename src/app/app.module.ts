import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

//RUTAS
import { APP_ROUTING } from './app.routes';

//COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CountriesGridComponent } from './components/countries-grid/countries-grid.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeMainComponent,
    CountryCardComponent,
    CountrySearchComponent,
    FavoritesComponent,
    CountriesGridComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
