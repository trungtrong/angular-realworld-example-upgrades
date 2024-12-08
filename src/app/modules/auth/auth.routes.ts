import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth.component').then(m => m.AuthComponent),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./auth.component').then(m => m.AuthComponent),
        canActivate: [NoAuthGuard]
    }
];

