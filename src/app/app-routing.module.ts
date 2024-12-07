import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
import { AuthRoutes } from './modules/auth/auth.routing';
import { ArticleRoutes } from './modules/article/article.routing';
import { EditorRoutes } from './modules/editor/editor.routing';
import { HomeRoutes } from './modules/home/home.routing';

const routes: Routes = [
    ...HomeRoutes,
    ...AuthRoutes,
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    ...EditorRoutes,
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
