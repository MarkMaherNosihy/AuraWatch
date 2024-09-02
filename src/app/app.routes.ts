import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { MediaListComponent } from './pages/media-list/media-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'movies',
        component: MediaListComponent
    },
    {
        path: 'tv-shows',
        component: MediaListComponent
    },
    {
        path:'details/:type/:id',
        component: DetailsComponent
    }

];
