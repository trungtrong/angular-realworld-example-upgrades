import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { combineLatest, filter, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { ListErrorsComponent } from '@app/shared/components';
import { Errors } from '@app/shared/models';
import { ArticlesService, UserService } from '@app/core/services';
import { Article } from '../article/models';

interface ArticleForm {
    title: FormControl<string>;
    description: FormControl<string>;
    body: FormControl<string>;
}

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor.component.html',
    imports: [
        ListErrorsComponent,
        ReactiveFormsModule,
        NgForOf
    ],
    standalone: true
})
export class EditorComponent implements OnInit {
    tagList: string[] = [];
    articleForm: UntypedFormGroup = new FormGroup<ArticleForm>({
        title: new FormControl('', { nonNullable: true }),
        description: new FormControl('', { nonNullable: true }),
        body: new FormControl('', { nonNullable: true }),
    });
    tagField = new FormControl<string>('', { nonNullable: true });

    errors: Errors | null = null;
    isSubmitting = false;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly articleService: ArticlesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly userService: UserService
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            filter(({ slug }) => !!slug),
            switchMap(({ slug }) => combineLatest([
                this.articleService.get(slug as string),
                this.userService.getCurrentUser()
            ])),
            map(([article, { user }]) => {
                if (user.username === article.author.username) {
                    return article;
                } else {
                    void this.router.navigateByUrl('/');
                    return null;
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((article: Article | null) => {
            if (article) {
                this.tagList = article.tagList;
                this.articleForm.patchValue(article);
            }
        });
    }

    addTag() {
        // retrieve tag control
        const tag = this.tagField.value;
        // only add tag if it does not exist yet
        if (tag != null && tag.trim() !== '' && this.tagList.indexOf(tag) < 0) {
            this.tagList.push(tag);
        }
        // clear the input
        this.tagField.reset('');
    }

    removeTag(tagName: string): void {
        this.tagList = this.tagList.filter(tag => tag !== tagName);
    }

    submitForm(): void {
        this.isSubmitting = true;

        // update any single tag
        this.addTag();

        // post the changes
        this.articleService.create(new Article({
            ...this.articleForm.value as Article,
            tagList: this.tagList
        }))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: article => void this.router.navigateByUrl('/article/' + article.slug),
                error: err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            }
            );
    }
}
