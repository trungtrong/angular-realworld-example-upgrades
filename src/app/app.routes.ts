import { Routes } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
//
import { AUTH_ROUTES } from './modules/auth/auth.routes';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.routes').then(mod => mod.HOME_ROUTES)
    },
    ...AUTH_ROUTES,
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(mod => mod.SETTINGS_ROUTES)
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.routes').then(mod => mod.PROFILE_ROUTES)
    },
    {
        path: 'editor',
        loadChildren: () => import('./modules/editor/editor.routes').then(mod => mod.EDITOR_ROUTES)
    },
    {
        path: 'article',
        loadChildren: () => import('./modules/article/article.routes').then(mod => mod.ARTICLE_ROUTES)
    },
    { path: '**', component: PageNotFoundComponent }
];

