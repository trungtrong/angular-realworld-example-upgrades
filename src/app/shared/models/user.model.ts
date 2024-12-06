export class User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
