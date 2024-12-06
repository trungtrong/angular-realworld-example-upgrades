import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//
import { Profile } from '@app/shared/models/profile.model';
import { ProfilesService } from '@app/core/services';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
    constructor(
        private profilesService: ProfilesService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<any> {
        return this.profilesService.get(route.params['username'] as string)
            .pipe(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                catchError(() => this.router.navigateByUrl('/'))
            );

    }
}
