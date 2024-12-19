import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivateFn } from '@angular/router';
import { UserSelectors } from '../store/user/user.selectors';

export const AuthGuard: CanActivateFn = () => {
    const _store = inject(Store);
    return _store.select(UserSelectors.isLoggedIn);
};
