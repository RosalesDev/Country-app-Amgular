import { RouterModule, Routes} from '@angular/router'
import { HomeMainComponent } from './components/home-main/home-main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { NewCountryFormComponent } from './components/new-country-form/new-country-form.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeMainComponent },
  { path: 'favorites', component: FavoritesComponent},
  { path: 'search', component: CountrySearchComponent},
  { path: 'country/:', component: NewCountryFormComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);