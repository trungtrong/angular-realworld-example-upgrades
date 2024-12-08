import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { JwtService } from './jwt.service';
import { map, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '@app/shared/models';
import { Router } from '@angular/router';
import { ApiService } from './api.service';


@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    get currentUserData() {
        return this.currentUserSubject.value;
    }

    public isAuthenticated = this.currentUser.pipe(map(user => !!user));

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient,
        private apiService: ApiService,
        private readonly jwtService: JwtService,
    ) {
    }

    login(credentials: { email: string; password: string }): Observable<{ user: User }> {
        return this.apiService.post<{ user: User }>('/users/login', { user: credentials })
            .pipe(tap(({ user }) => this.setAuth(user)));
    }

    register(credentials: { username: string; email: string; password: string }): Observable<{ user: User }> {
        return this.apiService.post<{ user: User }>('/users', { user: credentials })
            .pipe(tap(({ user }) => this.setAuth(user)));
    }

    logout(): void {
        this.purgeAuth();
        void this.router.navigateByUrl('/');
    }

    getCurrentUser(): Observable<{ user: User }> {
        return this.apiService.get<{ user: User }>('/user').pipe(
            tap({
                next: ({ user }) => this.setAuth(user),
                error: () => this.purgeAuth()
            }
            ),
            shareReplay(1)
        );
    }

    update(user: Partial<User>): Observable<{ user: User }> {
        return this.apiService.put<{ user: User }>('/user', { user })
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .pipe(tap(({ user }) => {
                this.currentUserSubject.next(user);
            }));
    }

    setAuth(user: User): void {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
    }

    purgeAuth(): void {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(null);
    }

}
