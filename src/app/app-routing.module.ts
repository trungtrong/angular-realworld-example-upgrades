import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
import { AuthRoutes } from './modules/auth/auth.routing';
import { ArticleRoutes } from './modules/article/article.routing';

const routes: Routes = [
    ...AuthRoutes,
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'editor',
        loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule)
    },
    ...ArticleRoutes,
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preload all modules; optionally we could
        // implement a custom preloading strategy for just some
        // of the modules (PRs welcome 😉)
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
