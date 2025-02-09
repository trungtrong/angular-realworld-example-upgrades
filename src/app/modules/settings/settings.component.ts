import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { ListErrorsComponent } from '@app/shared/components/index';
import { Errors, User } from '@app/shared/models';
import { UserService } from '@app/core/services';

interface SettingsForm {
    image: FormControl<string>;
    username: FormControl<string>;
    bio: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.component.html',
    imports: [
        ListErrorsComponent,
        ReactiveFormsModule
    ]
})
export class SettingsComponent implements OnInit {
    user!: User;
    settingsForm = new FormGroup<SettingsForm>({
        image: new FormControl('', { nonNullable: true }),
        username: new FormControl('', { nonNullable: true }),
        bio: new FormControl('', { nonNullable: true }),
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true
        }),
    });
    errors: Errors | null = null;
    isSubmitting = false;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.settingsForm.patchValue(this.userService.getCurrentUser());
    }

    logout(): void {
        this.userService.logout();
    }

    submitForm() {
        this.isSubmitting = true;

        this.userService
            .update(this.settingsForm.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: ({ user }) => void this.router.navigateByUrl('/profile/' + user.username),
                error: (err) => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            }
            );
    }

}
