import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
//
import { ArticleMetaComponent } from '../article-meta/article-meta.component';
import { Article } from '@app/shared/models';
import { FavoriteButtonComponent } from '@app/shared/components';

@Component({
    selector: 'app-article-preview',
    templateUrl: './article-preview.component.html',
    imports: [
        ArticleMetaComponent,
        FavoriteButtonComponent,
        RouterLink,
        NgForOf
    ],
    standalone: true
})
export class ArticlePreviewComponent {
    @Input() article!: Article;

    toggleFavorite(favorited: boolean): void {
        this.article.favorited = favorited;

        if (favorited) {
            this.article.favoritesCount++;
        } else {
            this.article.favoritesCount--;
        }
    }
}
