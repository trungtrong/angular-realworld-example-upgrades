import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
//
import { AUTH_ROUTES } from './modules/auth/auth.routes';
import { ARTICLE_ROUTES } from './modules/article/article.routes';
import { EDITOR_ROUTES } from './modules/editor/editor.routes';
import { HomeRoutes } from './modules/home/home.routes';
import { PROFILE_ROUTES } from './modules/profile/profile.routes';
import { SETTINGS_ROUTES } from './modules/settings/settings.routes';

const routes: Routes = [
    ...HomeRoutes,
    ...AUTH_ROUTES,
    ...SETTINGS_ROUTES,
    ...PROFILE_ROUTES,
    ...EDITOR_ROUTES,
    ...ARTICLE_ROUTES,
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
