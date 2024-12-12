import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Store } from '@ngxs/store';
//
import { User } from '@app/shared/models';
import { Comment } from '../../models';
import { UserSelectors } from '@app/core/store/user/user.selectors';

@Component({
    selector: 'app-article-comment',
    templateUrl: './article-comment.component.html',
    imports: [
        RouterLink,
        DatePipe,
        NgIf,
        AsyncPipe
    ],
    standalone: true
})
export class ArticleCommentComponent {
    @Input() comment!: Comment;
    @Output() delete = new EventEmitter<boolean>();

    canModify$ = this._store.select(UserSelectors.user).pipe(
        map((userData: User | null) => userData?.username === this.comment.author.username)
    );

    constructor(
        private readonly _store: Store,
    ) {
    }
}
