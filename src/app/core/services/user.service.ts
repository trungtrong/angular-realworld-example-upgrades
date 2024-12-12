import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { JwtService } from './jwt.service';
import { tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '@app/shared/models';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import * as UserActions from './../store/user/user.actions';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private readonly router: Router,
        private readonly http: HttpClient,
        private readonly _store: Store,
        private apiService: ApiService,
        private readonly jwtService: JwtService,
    ) {
    }

    login(credentials: { email: string; password: string }): Observable<{ user: User }> {
        return this.apiService.post<{ user: User }>('/users/login', { user: credentials })
            .pipe(tap(({ user }) => this._store.dispatch(new UserActions.SetUser(user))));
    }

    register(credentials: { username: string; email: string; password: string }): Observable<{ user: User }> {
        return this.apiService.post<{ user: User }>('/users', { user: credentials })
            .pipe(tap(({ user }) => this._store.dispatch(new UserActions.SetUser(user))));
    }

    getCurrentUser(): Observable<{ user: User }> {
        return this.apiService.get<{ user: User }>('/user').pipe(
            tap({
                next: ({ user }) => this._store.dispatch(new UserActions.SetUser(user)),
                error: () => this._store.dispatch(new UserActions.DeleteUser())
            }
            ),
            shareReplay(1)
        );
    }

    update(user: Partial<User>): Observable<{ user: User }> {
        return this.apiService.put<{ user: User }>('/user', { user })
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .pipe(tap(({ user }) => {
                this._store.dispatch(new UserActions.UpdateUser(user));
            }));
    }
}
