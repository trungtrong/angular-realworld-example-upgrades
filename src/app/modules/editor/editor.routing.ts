import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards';

const routes: Routes = [
    {
        path: 'editor',
        children: [
            {
                path: '',
                loadComponent: () => import('./editor.component').then(m => m.EditorComponent),
                canActivate: [AuthGuard]
            },
            {
                path: ':slug',
                loadComponent: () => import('./editor.component').then(m => m.EditorComponent),
                canActivate: [AuthGuard],
            }
        ]
    }
];

export {
    routes as EditorRoutes,
};
