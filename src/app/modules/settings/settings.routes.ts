import { Routes } from '@angular/router';
//
import { AuthGuard } from '@app/core/guards';

export const SETTINGS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
        canActivate: [AuthGuard]
    }
];
