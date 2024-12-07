import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
//
import { Article } from '@app/shared/models';

@Component({
    selector: 'app-article-meta',
    templateUrl: './article-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        DatePipe
    ],
})
export class ArticleMetaComponent {
    @Input() article!: Article;
}
