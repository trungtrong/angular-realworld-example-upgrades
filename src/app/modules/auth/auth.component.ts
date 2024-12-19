import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
    Validators,
    FormGroup,
    FormControl,
    ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { ListErrorsComponent } from '@app/shared/components';
import { Errors } from '@app/shared/models';
import { UserService } from '@app/core/services';

interface AuthForm {
    email: FormControl<string>;
    password: FormControl<string>;
    username?: FormControl<string>;
}

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        ListErrorsComponent,
        ReactiveFormsModule
    ]
})
export class AuthComponent implements OnInit {
    authType = '';
    title = '';
    errors: Errors = new Errors({ errors: {} });
    isSubmitting = false;
    authForm: FormGroup<AuthForm>;
    destroyRef = inject(DestroyRef);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly userService: UserService,
    ) {
        // use FormBuilder to create a form group
        this.authForm = new FormGroup<AuthForm>({
            email: new FormControl('', {
                validators: [Validators.required],
                nonNullable: true
            }),
            password: new FormControl('', {
                validators: [Validators.required],
                nonNullable: true
            })
        });
    }

    ngOnInit(): void {
        this.route.url.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(data => {
            this.authType = data[data.length - 1].path;
            this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
            if (this.authType === 'register') {
                this.authForm.addControl('username', new FormControl('', { nonNullable: true }));
            }
        });
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.errors = { errors: {} };

        const observable = (this.authType === 'login')
            ? this.userService.login(this.authForm.value as { email: string; password: string })
            : this.userService.register(this.authForm.value as { email: string; password: string; username: string });

        observable.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: () => {
                void this.router.navigateByUrl('/');
            },
            error: err => {
                this.errors = err;
                this.isSubmitting = false;
            }
        }
        );
    }
}
