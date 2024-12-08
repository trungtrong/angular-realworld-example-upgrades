import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//
import { PageNotFoundComponent } from './core/pages';
import { AuthRoutes } from './modules/auth/auth.routing';
import { ArticleRoutes } from './modules/article/article.routing';
import { EditorRoutes } from './modules/editor/editor.routing';
import { HomeRoutes } from './modules/home/home.routing';
import { ProfileRoutes } from './modules/profile/profile.routing';
import { SettingsRoutes } from './modules/settings/settings.routing';

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
