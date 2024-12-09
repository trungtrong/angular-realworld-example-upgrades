export class ArticleListConfig {
    type: string;

    filters: {
        tag?: string;
        author?: string;
        favorited?: string;
        limit?: number;
        offset?: number;
    };

    constructor(init?: Partial<ArticleListConfig>) {
        Object.assign(this, init);
    }
}
