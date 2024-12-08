import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '@app/shared/models';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CommentsService {
    constructor(
        private apiService: ApiService
    ) { }

    add(slug: string, payload): Observable<Comment> {
        return this.apiService
            .post<{comment: Comment}>(
            `/articles/${slug}/comments`,
            { comment: { body: payload } }
        ).pipe(map(data => data.comment));
    }

    getAll(slug: string): Observable<Comment[]> {
        return this.apiService.get<{comments: Comment[]}>(`/articles/${slug}/comments`)
            .pipe(map(data => data.comments));
    }

    delete(commentId: string, articleSlug: string) {
        return this.apiService
            .delete(`/articles/${articleSlug}/comments/${commentId}`);
    }

}
