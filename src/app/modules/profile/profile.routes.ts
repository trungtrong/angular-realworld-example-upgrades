import { Routes } from '@angular/router';
//
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent, ProfileFavoritesComponent } from './components';


const routes: Routes = [
    {
        path: 'profile',
        children: [
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
        ]
    }
];

export {
    routes as ProfileRoutes,
};
