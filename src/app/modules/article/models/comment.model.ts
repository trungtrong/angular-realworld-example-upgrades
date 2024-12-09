import { Profile } from '@app/modules/profile/models';

export class Comment {
    id: string;
    body: string;
    createdAt: string;
    author: Profile;

    constructor(init?: Partial<Comment>) {
        Object.assign(this, init);
    }
}
