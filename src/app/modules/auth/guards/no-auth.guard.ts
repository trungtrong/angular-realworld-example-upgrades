import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
//
import { CanActivateFn } from '@angular/router';
import { UserSelectors } from '@app/core/store/user/user.selectors';

export const NoAuthGuard: CanActivateFn = () => {
    const _store = inject(Store);
    return _store.select(UserSelectors.isLoggedIn).pipe(take(1), map(isLoggedIn => !isLoggedIn));
};
