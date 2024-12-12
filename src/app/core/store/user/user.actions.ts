import { User } from '@app/shared/models';
import { IUserLoginRequest, IUserRegisterRequest } from './user.model';

export enum UserActionType {
    LOGIN = '[User] Login',
    LOGOUT = '[User] Logout',
    REGISTER = '[User] Register',
    GET_USER = '[User] GetUser',
    SET_USER = '[User] SetUser',
    UPDATE_USER = '[User] UpdateUser',
    DELETE_USER = '[User] DeleteUser',
}

export class Login {
    static readonly type = UserActionType.LOGIN;
    constructor(public payload: IUserLoginRequest) {}
}

export class Logout {
    static readonly type = UserActionType.LOGOUT;
    constructor() {}
}


export class Register {
    static readonly type = UserActionType.REGISTER;
    constructor(public payload: IUserRegisterRequest) {}
}

export class GetUser {
    static readonly type = UserActionType.GET_USER;
    constructor() {}
}

export class SetUser {
    static readonly type = UserActionType.SET_USER;
    constructor(public payload: User) {}
}

export class UpdateUser {
    static readonly type = UserActionType.UPDATE_USER;
    constructor(public payload: User) {}
}

export class DeleteUser {
    static readonly type = UserActionType.DELETE_USER;
    constructor() {}
}

export type UserActions =
    | Login
    | Logout
    | Register
    | GetUser
    | UpdateUser
    | DeleteUser;

