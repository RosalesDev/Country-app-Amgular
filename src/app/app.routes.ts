import { RouterModule, Routes} from '@angular/router'
import { HomeMainComponent } from './components/home-main/home-main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeMainComponent },
  { path: 'favorites', component: FavoritesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);