import {Component, OnInit} from '@angular/core';
// import {AuthenticationService} from '../../../core/services';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    standalone: true
})
export class PageNotFoundComponent implements OnInit {
    constructor() {
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() {
    }

    logout(event: Event) {
        event.stopPropagation();
        event.preventDefault();
        // this.authenticationService.logout();
    }
}
