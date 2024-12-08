import { Routes } from '@angular/router';

export const ARTICLE_ROUTES: Routes = [
    {
        path: ':slug',
        loadComponent: () => import('./article.component').then(m => m.ArticleComponent)
    }
];
