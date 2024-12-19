import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
//
import { ShowAuthedDirective } from '@app/common/directives/show-authed.directive';
import { Store } from '@ngxs/store';
import { UserSelectors } from '@app/core/store/user/user.selectors';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        RouterLinkActive,
        RouterLink,
        AsyncPipe,
        NgIf,
        ShowAuthedDirective
    ],
})
export class HeaderComponent {
    currentUser$ = this._store.select(UserSelectors.user);

    constructor(
        private readonly _store: Store,
    ) { }
}
