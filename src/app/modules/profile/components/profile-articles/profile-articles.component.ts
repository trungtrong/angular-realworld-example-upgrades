import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
//
import { ArticleListComponent } from '@app/shared/features/index';
import { Profile, ArticleListConfig } from '@app/shared/models';
import { ProfilesService } from '@app/core/services';


@Component({
    selector: 'app-profile-articles',
    templateUrl: './profile-articles.component.html',
    imports: [
        ArticleListComponent
    ],
    standalone: true
})
export class ProfileArticlesComponent implements OnInit, OnDestroy {
    profile!: Profile;
    articlesConfig!: ArticleListConfig;
    destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private readonly profileService: ProfilesService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(({ username }) => this.profileService.get(username as string)),
            takeUntil(this.destroy$)
        ).subscribe({
            next: (profile: Profile) => {
                this.profile = profile;
                this.articlesConfig = {
                    type: 'all',
                    filters: {
                        author: this.profile.username
                    }
                };
            }
        }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
