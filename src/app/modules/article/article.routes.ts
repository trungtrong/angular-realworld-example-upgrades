import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'article/:slug',
        loadComponent: () => import('./article.component').then(m => m.ArticleComponent)
    }
];

export {
    routes as ArticleRoutes,
};
