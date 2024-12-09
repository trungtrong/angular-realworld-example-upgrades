import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { ArticleListComponent } from '@app/shared/features/index';
import { ProfilesService } from '@app/core/services';
import { ArticleListConfig } from '@app/modules/article/models';
import { Profile } from '@app/modules/profile/models/profile.model';


@Component({
    selector: 'app-profile-favorites',
    templateUrl: './profile-favorites.component.html',
    imports: [
        ArticleListComponent
    ]
})
export class ProfileFavoritesComponent implements OnInit {
    profile!: Profile;
    favoritesConfig!: ArticleListConfig;
    destroyRef = inject(DestroyRef);

    constructor(
        private route: ActivatedRoute,
        private readonly profileService: ProfilesService
    ) { }

    ngOnInit() {
        this.route.parent?.params.pipe(
            switchMap(({ username }) => this.profileService.get(username as string)),
            takeUntilDestroyed(this.destroyRef)
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
}
