import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent
} from './features';
import {
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
} from './components';

const BASE_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
];

const FEATURES = [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
];

const COMPONENT = [
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
];

@NgModule({
    declarations: [
        FEATURES,
    ],
    imports: [
        BASE_MODULES,
        COMPONENT,
    ],
    exports: [
        BASE_MODULES,
        //
        FEATURES,
        COMPONENT,
    ]
})
export class SharedModule { }
