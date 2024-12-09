import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Article } from '@app/modules/article/models';
//

@Component({
    selector: 'app-article-meta',
    templateUrl: './article-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        DatePipe
    ]
})
export class ArticleMetaComponent {
    @Input() article!: Article;
}
