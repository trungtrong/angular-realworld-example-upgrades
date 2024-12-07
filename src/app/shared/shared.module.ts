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
} from './components';
import { AppCommonModule } from '@app/common/common.module';

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
];

@NgModule({
    declarations: [
        FEATURES,
        COMPONENT,
    ],
    imports: [
        BASE_MODULES,
        AppCommonModule,
    ],
    exports: [
        BASE_MODULES,
        //
        FEATURES,
        COMPONENT,
    ]
})
export class SharedModule { }
