import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//
import { ArticlesService, UserService } from '@app/core/services';
import { Article } from '@app/shared/models/article.model';

@Injectable()
export class EditableArticleResolver implements Resolve<Article> {
    constructor(
        private articlesService: ArticlesService,
        private router: Router,
        private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        return this.articlesService.get(route.params['slug'] as string)
            .pipe(
                map(
                    article => {
                        if (this.userService.currentUserData.username === article.author.username) {
                            return article;
                        } else {
                            return this.router.navigateByUrl('/');
                        }
                    }
                ),
                catchError(err => this.router.navigateByUrl('/'))
            );
    }
}
