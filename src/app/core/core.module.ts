import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { FooterComponent, HeaderComponent } from './layout';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@app/common/common.module';

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
        }
    ]
})
export class CoreModule { }
