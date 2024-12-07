import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
//
import { ArticleListComponent } from '@app/shared/features/index';
import { ArticleListConfig, Profile } from '@app/shared/models';
import { ProfilesService } from '@app/core/services';


@Component({
    selector: 'app-profile-favorites',
    templateUrl: './profile-favorites.component.html',
    imports: [
        ArticleListComponent
    ],
    standalone: true
})
export class ProfileFavoritesComponent implements OnInit, OnDestroy {
    profile!: Profile;
    favoritesConfig!: ArticleListConfig;
    destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private readonly profileService: ProfilesService
    ) { }

    ngOnInit() {
        this.route.parent?.params.pipe(
            switchMap(({ username }) => this.profileService.get(username as string))
        ).subscribe({
            next: (profile: Profile) => {
                this.profile = profile;
                this.favoritesConfig = {
                    type: 'all',
                    filters: {
                        favorited: this.profile.username
                    }
                };
            }
        }
        );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
