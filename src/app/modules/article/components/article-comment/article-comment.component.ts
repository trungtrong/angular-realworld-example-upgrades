import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
//
import { UserService } from '@app/core/services';
import { User } from '@app/shared/models';
import { Comment } from '../../models';

@Component({
    selector: 'app-article-comment',
    templateUrl: './article-comment.component.html',
    imports: [
        RouterLink,
        DatePipe,
        NgIf,
        AsyncPipe
    ]
})
export class ArticleCommentComponent {
    @Input() comment!: Comment;
    @Output() delete = new EventEmitter<boolean>();

    canModify$ = inject(UserService).currentUser.pipe(
        map((userData: User | null) => userData?.username === this.comment.author.username)
    );
}
