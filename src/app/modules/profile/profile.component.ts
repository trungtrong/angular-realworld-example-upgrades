import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineLatest, of, throwError } from 'rxjs';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

//
import { FollowButtonComponent } from '@app/shared/components';
import { ProfilesService, UserService } from '@app/core/services';
import { Profile } from './models/profile.model';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html',
    imports: [
        FollowButtonComponent,
        NgIf,
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
    standalone: true
})
export class ProfileComponent implements OnInit {
    profile!: Profile;
    isUser: boolean = false;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly profileService: ProfilesService
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            map(({ username }) => username),
            switchMap(username => this.profileService.get(username as string)),
            catchError((error) => {
                void this.router.navigateByUrl('/');
                return throwError(error);
            }),
            switchMap(profile => combineLatest([
                of(profile),
                this.userService.currentUser
            ])),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(([profile, user]) => {
            this.profile = profile;
            this.isUser = profile.username === user?.username;
        });
    }

    onToggleFollowing(profile: Profile) {
        this.profile = profile;
    }
}
