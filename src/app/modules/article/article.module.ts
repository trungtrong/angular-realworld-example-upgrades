import { NgModule } from '@angular/core';
//
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '@app/shared/shared.module';
//
import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './components';
import { MarkdownPipe } from './pipes';
import { ArticleResolver } from './resolver';

const COMPONENTS = [
    ArticleComponent,
    ArticleCommentComponent,
];

const PIPES = [
    MarkdownPipe,
];

const RESOLVERS = [
    ArticleResolver,
];

@NgModule({
    declarations: [
        COMPONENTS,
        PIPES
    ],
    imports: [
        SharedModule,
        ArticleRoutingModule
    ],
    providers: [
        RESOLVERS
    ]
})
export class ArticleModule { }
