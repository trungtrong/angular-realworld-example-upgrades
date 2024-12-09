import { Component, inject } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
//
import { UserService } from '@app/core/services';
import { ShowAuthedDirective } from '@app/common/directives/show-authed.directive';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    imports: [
        RouterLinkActive,
        RouterLink,
        AsyncPipe,
        NgIf,
        ShowAuthedDirective
    ]
})
export class HeaderComponent {
    currentUser$ = inject(UserService).currentUser;

    constructor(
        private userService: UserService
    ) { }
}
