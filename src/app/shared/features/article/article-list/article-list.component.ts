import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

//
import { Article, ArticleListConfig } from '@app/shared/models';
import { LoadingState } from '@app/shared/enums';
import { ArticlesService } from '@app/core/services';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    selector: 'app-article-list',
    styleUrls: ['article-list.component.scss'],
    templateUrl: './article-list.component.html',
    standalone: true,
    imports: [
        ArticlePreviewComponent,
        NgForOf,
        NgClass,
        NgIf
    ],
})
export class ArticleListComponent {
    query!: ArticleListConfig;
    results: Article[] = [];
    currentPage = 1;
    totalPages: Array<number> = [];
    loading = LoadingState.NOT_LOADED;
    LoadingState = LoadingState;
    destroyRef = inject(DestroyRef);

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
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(data => {
            this.loading = LoadingState.LOADED;
            this.results = data.articles;

            // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
            this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
        });
    }
}
