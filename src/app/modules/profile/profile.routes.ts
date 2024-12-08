import { Routes } from '@angular/router';
//
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent, ProfileFavoritesComponent } from './components';

export const PROFILE_ROUTES: Routes = [
    {
        path: ':username',
        component: ProfileComponent,
        children: [
            {
                path: '',
                component: ProfileArticlesComponent
            },
            {
                path: 'favorites',
                component: ProfileFavoritesComponent
            }
        ]
    }
];
