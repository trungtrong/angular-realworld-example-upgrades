import { Routes } from '@angular/router';
//
import { AuthGuard } from '@app/core/guards';

const routes: Routes = [
    {
        path: 'settings',
        loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
        canActivate: [AuthGuard]
    }
];

export {
    routes as SettingsRoutes,
};
