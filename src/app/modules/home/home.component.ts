import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgForOf } from '@angular/common';
import { tap } from 'rxjs/operators';
import { RxLet } from '@rx-angular/template/let';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
//
import { ArticleListComponent } from '@app/shared/features/index';
import { ShowAuthedDirective } from '@app/common/directives/show-authed.directive';
import { TagsService, UserService } from '@app/core/services';
import { ArticleListConfig } from '../article/models';
import { UserSelectors } from '@app/core/store/user/user.selectors';

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
export class HomeComponent implements OnInit {
    private _isLoggedIn$ = this._store.select(UserSelectors.isLoggedIn);

    isAuthenticated = false;
    listConfig: ArticleListConfig = new ArticleListConfig({
        type: 'all',
        filters: {}
    });
    tags$ = inject(TagsService).getAll().pipe(tap(() => this.tagsLoaded = true));
    tagsLoaded = false;

    destroyRef = inject(DestroyRef);

    constructor(
        private readonly router: Router,
        private readonly _store: Store,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this._isLoggedIn$.pipe(
            tap(isAuthenticated => {
                if (isAuthenticated) {
                    this.setListTo('feed');
                } else {
                    this.setListTo('all');
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
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
