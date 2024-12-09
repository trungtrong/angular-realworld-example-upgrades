import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgForOf } from '@angular/common';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RxLet } from '@rx-angular/template/let';
//
import { ArticleListComponent } from '@app/shared/features/index';
import { ShowAuthedDirective } from '@app/common/directives/show-authed.directive';
import { ArticleListConfig } from '@app/shared/models';
import { TagsService, UserService } from '@app/core/services';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [
        NgClass,
        ArticleListComponent,
        NgForOf,
        ShowAuthedDirective,
        RxLet
    ],
    standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    listConfig: ArticleListConfig = new ArticleListConfig({
        type: 'all',
        filters: {}
    });
    tags$ = inject(TagsService).getAll().pipe(tap(() => this.tagsLoaded = true));
    tagsLoaded = false;
    destroy$ = new Subject<void>();

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.userService.isAuthenticated.pipe(
            tap(isAuthenticated => {
                if (isAuthenticated) {
                    this.setListTo('feed');
                } else {
                    this.setListTo('all');
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setListTo(type: string = '', filters: object = {}) {
        // If feed is requested but user is not authenticated, redirect to login
        if (type === 'feed' && !this.isAuthenticated) {
            void this.router.navigateByUrl('/login');
            return;
        }

        // Otherwise, set the list object
        this.listConfig = { type, filters };
    }
}
