import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
//
import * as UserActions from './user.actions';
import { Router } from '@angular/router';
import { JwtService } from '@app/core/services';
import { IUserState } from './user.model';
import { AppFeatureKeys } from '../app-feature-key.enums';
import { User } from '@app/shared/models/user.model';

const INIT_STATE: IUserState = {
    user: null,
    errors: []
};

@State<IUserState>({
    name: AppFeatureKeys.UserLoggedIn,
    defaults: INIT_STATE
})

@Injectable()
export class UserState {
    constructor(private _router: Router,
                private _jwtService: JwtService
    ) {
    }

    @Action(UserActions.UpdateUser)
    setUser(context: StateContext<IUserState>, { payload }: UserActions.UpdateUser) {
        this._jwtService.saveToken(payload?.token);
        context.patchState({
            user: payload
        });
    }

    @Action(UserActions.UpdateUser)
    updateUser(context: StateContext<IUserState>, { payload }: UserActions.UpdateUser) {
        const state = context.getState();
        context.patchState({
            user: cloneDeep(new User({
                ...state.user,
                ...payload,
            }))
        });
    }

    @Action(UserActions.DeleteUser)
    deleteUser(context: StateContext<IUserState>) {
        this._jwtService.destroyToken();
        context.patchState({
            user: null,
            errors: []
        });
    }

    @Action(UserActions.Logout)
    logout(context: StateContext<IUserState>) {
        this._jwtService.destroyToken();
        context.patchState({
            user: null,
            errors: []
        });
        void this._router.navigateByUrl('/');
    }
}
