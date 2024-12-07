import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import { UserService } from '@app/core/services';
import { Errors, User } from '@app/shared/models';


@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    user = new User();
    settingsForm = new UntypedFormGroup({
        value: new UntypedFormControl(''),
    });
    errors: Errors = new Errors();
    isSubmitting = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private fb: UntypedFormBuilder
    ) {
        // create form group using the form builder
        this.settingsForm = this.fb.group({
            image: '',
            username: '',
            bio: '',
            email: '',
            password: ['', Validators.required]
        });
        // Optional: subscribe to changes on the form
        // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
    }

    ngOnInit() {
        // Make a fresh copy of the current user's object to place in editable form fields
        Object.assign(this.user, this.userService.getCurrentUser());
        // Fill the form
        this.settingsForm.patchValue(this.user);
    }

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }

    submitForm() {
        this.isSubmitting = true;

        // update the model
        this.updateUser(this.settingsForm.value as User);

        this.userService
            .update(this.user)
            .subscribe(
                (data) => {
                    this.router.navigateByUrl('/profile/' + data?.user?.username).then();
                },
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
    }

    updateUser(values: User) {
        Object.assign(this.user, values);
    }

}
