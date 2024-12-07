import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { FooterComponent, HeaderComponent } from './layout';
import { AppCommonModule } from '@app/common/common.module';
import { ErrorInterceptor, TokenInterceptor } from './interceptors';

const BASE_MODULES = [
    CommonModule,
    RouterModule,
    HttpClientModule
];

const COMPONENTS = [
    FooterComponent,
    HeaderComponent,
];

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        BASE_MODULES,
        AppCommonModule,
    ],
    exports: [
        BASE_MODULES,
        COMPONENTS
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ]
})
export class CoreModule { }
