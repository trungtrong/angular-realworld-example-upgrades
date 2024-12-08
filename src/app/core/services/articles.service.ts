import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleListConfig } from '@app/shared/models';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(
        private apiService: ApiService
    ) {
    }

    query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {// Convert any filters over to Angular's URLSearchParams
        let params = new HttpParams();

        Object.keys(config.filters)
            .forEach((key) => {
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                params = params.set(key, config.filters[key]);
            });

        return this.apiService.get<{ articles: Article[]; articlesCount: number }>(
            '/articles' + ((config.type === 'feed') ? '/feed' : ''),
            params
        );
    }

    get(slug: string): Observable<Article> {
        return this.apiService.get<{ article: Article }>(`/articles/${slug}`)
            .pipe(map(data => data.article));
    }

    delete(slug: string): Observable<void> {
        return this.apiService.delete<void>(`/articles/${slug}`);
    }

    create(article: Article): Observable<Article> {
        return this.apiService.post<{ article: Article }>('/articles/', { article })
            .pipe(map(data => data.article));
    }

    update(article: Partial<Article>): Observable<Article> {
        return this.apiService.put<{ article: Article }>(`/articles/${article.slug}`, { article })
            .pipe(map(data => data.article));
    }

    favorite(slug: string): Observable<Article> {
        return this.apiService.post<{ article: Article }>(`/articles/${slug}/favorite`, {})
            .pipe(map(data => data.article));
    }

    unfavorite(slug: string): Observable<void> {
        return this.apiService.delete<void>(`/articles/${slug}/favorite`);
    }


}
