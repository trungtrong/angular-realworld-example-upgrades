import { Component, OnInit } from '@angular/core';
//
import { UserService } from '@app/core/services';
import { User } from '@app/shared/models';


@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(
        private userService: UserService
    ) { }

    currentUser: User;

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        );
    }
}
