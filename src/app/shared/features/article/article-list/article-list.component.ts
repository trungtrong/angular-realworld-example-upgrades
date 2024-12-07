import { Component, Input, OnDestroy } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//
import { Article, ArticleListConfig } from '@app/shared/models';
import { LoadingState } from '@app/shared/enums';
import { ArticlesService } from '@app/core/services';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    selector: 'app-article-list',
    styleUrls: ['article-list.component.css'],
    templateUrl: './article-list.component.html',
    standalone: true,
    imports: [
        ArticlePreviewComponent,
        NgForOf,
        NgClass,
        NgIf
    ],
})
export class ArticleListComponent implements OnDestroy {
    query!: ArticleListConfig;
    results: Article[] = [];
    currentPage = 1;
    totalPages: Array<number> = [];
    loading = LoadingState.NOT_LOADED;
    LoadingState = LoadingState;
    destroy$ = new Subject<void>();

    @Input() limit!: number;
    @Input()
    set config(config: ArticleListConfig) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.runQuery();
        }
    }

    constructor(
        private articlesService: ArticlesService
    ) { }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setPageTo(pageNumber: number) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        this.loading = LoadingState.LOADING;
        this.results = [];

        // Create limit and offset filter (if necessary)
        if (this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset = (this.limit * (this.currentPage - 1));
        }

        this.articlesService.query(this.query).pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            this.loading = LoadingState.LOADED;
            this.results = data.articles;

            // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
            this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
        });
    }
}
