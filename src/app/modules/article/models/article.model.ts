import { Profile } from '@app/modules/profile/models';

export class Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;

    constructor(init?: Partial<Article>) {
        Object.assign(this, init);
    }
}
