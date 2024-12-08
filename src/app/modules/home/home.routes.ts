import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent)
    }
];

export {
    routes as HomeRoutes,
};
