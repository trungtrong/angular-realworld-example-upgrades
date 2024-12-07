import { Profile } from './profile.model';

export class Comment {
    id: number;
    body: string;
    createdAt: string;
    author: Profile;

    constructor(init?: Partial<Comment>) {
        Object.assign(this, init);
    }
}
