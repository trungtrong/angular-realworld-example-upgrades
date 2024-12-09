import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

//
import { ArticleListComponent } from '@app/shared/features/index';
import { ProfilesService } from '@app/core/services';
import { ArticleListConfig } from '@app/modules/article/models';
import { Profile } from '../../models/profile.model';


@Component({
    selector: 'app-profile-articles',
    templateUrl: './profile-articles.component.html',
    imports: [
        ArticleListComponent
    ]
})
export class ProfileArticlesComponent implements OnInit {
    profile!: Profile;
    articlesConfig!: ArticleListConfig;
    destroyRef = inject(DestroyRef);

    constructor(
        private route: ActivatedRoute,
        private readonly profileService: ProfilesService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(({ username }) => this.profileService.get(username as string)),
            takeUntilDestroyed(this.destroyRef)
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
}
