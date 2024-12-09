import { APP_INITIALIZER, importProvidersFrom, Injector } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { ApplicationConfig } from '@angular/platform-browser';
//
import {
    ErrorInterceptor,
    HttpTokenInterceptor
} from '@app/core/interceptors';
import { AppInitializeService } from './core/services';
import { APP_ROUTES } from './app.routes';

const initializeAppFactory = (injector: Injector) => {
    // because DI framework is set up after bootstrap app - APP initialize
    const _appInitService = injector.get(AppInitializeService);
    return (): Promise<boolean> => _appInitService.initApp();
};

const BASE_MODULES = [
    HttpClientModule
];

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            BASE_MODULES
        ),
        provideRouter(
            APP_ROUTES,
            withPreloading(PreloadAllModules)
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [Injector],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: HttpTokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: ErrorInterceptor,
            multi: true
        },
    ],
};
