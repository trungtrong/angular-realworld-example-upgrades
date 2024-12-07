import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '@app/shared/models';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(
        private apiService: ApiService
    ) { }

    query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
        // Convert any filters over to Angular's URLSearchParams
        const params = {};

        Object.keys(config.filters)
            .forEach((key) => {
                params[key] = config.filters[key];
            });

        return this.apiService
            .get(
                '/articles' + ((config.type === 'feed') ? '/feed' : ''),
                new HttpParams({ fromObject: params })
            );
    }

    get(slug: string): Observable<Article> {
        return this.apiService.get<{article: Article}>('/articles/' + slug)
            .pipe(map(data => data.article));
    }

    destroy(slug: string) {
        return this.apiService.delete('/articles/' + slug);
    }

    save(article: Article): Observable<Article> {
        // If we're updating an existing article
        if (article.slug) {
            return this.apiService.put<{article: Article}>('/articles/' + article.slug, { article })
                .pipe(map(data => data.article));

            // Otherwise, create a new article
        } else {
            return this.apiService.post<{article: Article}>('/articles/', { article })
                .pipe(map(data => data.article));
        }
    }

    favorite(slug: string): Observable<Article> {
        return this.apiService.post('/articles/' + slug + '/favorite');
    }

    unfavorite(slug: string): Observable<Article> {
        return this.apiService.delete('/articles/' + slug + '/favorite');
    }


}
