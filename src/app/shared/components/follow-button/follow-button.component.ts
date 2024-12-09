import { Component, EventEmitter, Input, DestroyRef, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { NgClass } from '@angular/common';
import { ProfilesService, UserService } from '@app/core/services';
import { Profile } from '@app/modules/profile/models/profile.model';
//

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
    imports: [
        NgClass
    ],
    standalone: true
})
export class FollowButtonComponent {
    @Input() profile!: Profile;
    @Output() toggle = new EventEmitter<Profile>();
    isSubmitting = false;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly router: Router,
        private readonly profileService: ProfilesService,
        private readonly userService: UserService
    ) {
    }

    toggleFollowing(): void {
        this.isSubmitting = true;

        this.userService.isAuthenticated.pipe(
            switchMap((isAuthenticated: boolean) => {
                if (!isAuthenticated) {
                    void this.router.navigateByUrl('/login');
                    return EMPTY;
                }

                if (!this.profile.following) {
                    return this.profileService.follow(this.profile.username);
                } else {
                    return this.profileService.unfollow(this.profile.username);
                }
            }
            ),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(
            {
                next: (profile) => {
                    this.isSubmitting = false;
                    this.toggle.emit(profile);
                },
                error: () => this.isSubmitting = false
            }
        );
    }
}
