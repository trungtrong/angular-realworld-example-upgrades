import { User } from '@app/shared/models';

export interface IUserState {
    user: User;
    errors: string[];
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserRegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface IUserRegisterResponse {
    user: User;
}
