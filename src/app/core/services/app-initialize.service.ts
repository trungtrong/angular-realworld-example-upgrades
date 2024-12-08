import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
//
import { JwtService } from './jwt.service';
import { UserService } from './user.service';
import { User } from '@app/shared/models';


@Injectable({ providedIn: 'root' })
export class AppInitializeService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    initApp(): Promise<boolean> {
        return this.jwtService.getToken() ? this._getAPIsInitialized() : Promise.resolve(true);
    }

    private _getAPIsInitialized(params?: { navigateToUrl?: string }): Promise<boolean> {
        return this.userService.getCurrentUser().toPromise()
            .then(() => true)
            .catch(() => Promise.resolve(true));
    }
}
