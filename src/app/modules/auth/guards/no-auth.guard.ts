import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
//
import { UserService } from '@app/core/services';
import { CanActivateFn } from '@angular/router';

export const NoAuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    return userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
};
