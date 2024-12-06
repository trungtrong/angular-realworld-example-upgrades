import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@app/core/services';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
    constructor(
        private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.isAuthenticated.pipe(take(1));

    }
}
