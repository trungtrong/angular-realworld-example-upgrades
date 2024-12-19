import { Selector } from '@ngxs/store';
//
import { UserState } from './user.state';
import { IUserState } from './user.model';
import { User } from '@app/shared/models';

export class UserSelectors {
    @Selector([UserState])
    public static user(state: IUserState): User {
        return state?.user ?? null;
    }

    @Selector([UserState])
    public static userName(state: IUserState): string {
        return state?.user?.username ?? '';
    }

    @Selector([UserState])
    public static token(state: IUserState): string {
        return state?.user?.token ?? '';
    }

    @Selector([UserState])
    public static isLoggedIn(state: IUserState): boolean {
        return !!state?.user;
    }
}
