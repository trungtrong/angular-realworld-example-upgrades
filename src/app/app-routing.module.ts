import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
//
import { AuthRoutes } from './modules/auth/auth.routes';
import { ArticleRoutes } from './modules/article/article.routes';
import { EditorRoutes } from './modules/editor/editor.routes';
import { HomeRoutes } from './modules/home/home.routes';
import { ProfileRoutes } from './modules/profile/profile.routes';
import { SettingsRoutes } from './modules/settings/settings.routes';

const routes: Routes = [
    ...HomeRoutes,
    ...AuthRoutes,
    ...SettingsRoutes,
    ...ProfileRoutes,
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
