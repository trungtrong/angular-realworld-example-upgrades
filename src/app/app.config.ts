import { ApplicationConfig, importProvidersFrom, Injector, inject, provideAppInitializer } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
//
import {
    ErrorInterceptor,
    HttpTokenInterceptor
} from '@app/core/interceptors';
import { AppInitializeService } from './core/services';
import { APP_ROUTES } from './app.routes';

const initializeAppFactory = (injector: Injector) => {
    const _appInitService = injector.get(AppInitializeService);
    return (): Promise<boolean> => _appInitService.initApp();
};

const BASE_MODULES = [];

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        importProvidersFrom(
            BASE_MODULES
        ),
        provideRouter(
            APP_ROUTES,
            withPreloading(PreloadAllModules)
        ),
        provideAppInitializer(() => {
            const initializerFn = (initializeAppFactory)(inject(Injector));
            return initializerFn();
        }),
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
