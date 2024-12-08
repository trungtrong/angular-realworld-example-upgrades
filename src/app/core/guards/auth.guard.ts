import { inject } from '@angular/core';
import { take } from 'rxjs/operators';
//
import { UserService } from '@app/core/services';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    return userService.isAuthenticated.pipe(take(1));
};
