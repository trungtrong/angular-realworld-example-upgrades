import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject, combineLatest, throwError } from 'rxjs';
import { Article, Comment, Errors, Profile, User } from '@app/shared/models';
//
import { ArticleMetaComponent } from '@app/shared/features/index';
import {
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent
} from '@app/shared/components';
import { MarkdownPipe } from './pipes';
import { ArticleCommentComponent } from './components';
import { ShowAuthedDirective } from '@app/common/directives/show-authed.directive';
import { ArticlesService, CommentsService, UserService } from '@app/core/services';

const BASE_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgForOf,
    NgIf,
];
//
const PIPES = [
    MarkdownPipe,
    AsyncPipe,
];

const DIRECTIVES = [
    ShowAuthedDirective,
];

const COMPONENTS = [
    ArticleMetaComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ListErrorsComponent,
    ArticleCommentComponent,
];

@Component({
    selector: 'app-article-page',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [
        BASE_MODULES,
        PIPES,
        DIRECTIVES,
        COMPONENTS,
    ],
})
export class ArticleComponent implements OnInit, OnDestroy {
    article: Article = new Article();
    currentUser!: User | null;
    comments: Comment[] = [];
    canModify: boolean = false;

    commentControl = new FormControl<string>('', { nonNullable: true });
    commentFormErrors: Errors | null = null;

    isSubmitting = false;
    isDeleting = false;
    destroy$ = new Subject<void>();


    constructor(
        private readonly route: ActivatedRoute,
        private readonly articleService: ArticlesService,
        private readonly commentsService: CommentsService,
        private readonly router: Router,
        private readonly userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(({ slug }) => this.articleService.get(slug as string)),
            switchMap(article => combineLatest([
                of(article),
                this.commentsService.getAll(article.slug),
                this.userService.currentUser
            ])
            ),
            catchError((err) => {
                this.router.navigateByUrl('/');
                return throwError(err);
            })
        ).subscribe(([article, comments, currentUser]) => {
            this.article = article;
            this.comments = comments;
            this.currentUser = currentUser;
            this.canModify = currentUser?.username === article.author.username;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onToggleFavorite(favorited: boolean): void {
        this.article.favorited = favorited;

        if (favorited) {
            this.article.favoritesCount++;
        } else {
            this.article.favoritesCount--;
        }
    }

    toggleFollowing(profile: Profile): void {
        this.article.author.following = profile.following;
    }

    deleteArticle(): void {
        this.isDeleting = true;

        this.articleService.delete(this.article.slug)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                void this.router.navigateByUrl('/');
            });
    }

    addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = null;

        this.commentsService.add(this.article.slug, this.commentControl.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: comment => {
                    this.comments.unshift(comment);
                    this.commentControl.reset('');
                    this.isSubmitting = false;
                },
                error: errors => {
                    this.isSubmitting = false;
                    this.commentFormErrors = errors;
                }
            }
            );
    }

    deleteComment(comment: Comment): void {
        this.commentsService
            .delete(comment.id, this.article.slug)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.comments = this.comments.filter(item => item !== comment);
            });
    }

    trackById(index: number, item: Comment): string {
        return item.id;
    }
}
