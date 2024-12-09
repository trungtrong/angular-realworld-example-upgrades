import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

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

    private _getAPIsInitialized(): Promise<boolean> {
        return this.userService.getCurrentUser().toPromise()
            .then(() => true)
            .catch(() => Promise.resolve(true));
    }
}
