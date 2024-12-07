import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, of, Subject, throwError } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
//
import { FollowButtonComponent } from '@app/shared/components';
import { Profile } from '@app/shared/models';
import { ProfilesService, UserService } from '@app/core/services';

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
export class ProfileComponent implements OnInit, OnDestroy {
    profile!: Profile;
    isUser: boolean = false;
    destroy$ = new Subject<void>();

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
            takeUntil(this.destroy$)
        ).subscribe(([profile, user]) => {
            this.profile = profile;
            this.isUser = profile.username === user?.username;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onToggleFollowing(profile: Profile) {
        this.profile = profile;
    }
}
