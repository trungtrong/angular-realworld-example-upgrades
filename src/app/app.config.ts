import { APP_INITIALIZER, ApplicationConfig, EnvironmentProviders, importProvidersFrom, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideStore } from '@ngxs/store';
//
import {
    ErrorInterceptor,
    HttpTokenInterceptor
} from '@app/core/interceptors';
import { AppInitializeService } from './core/services';
import { APP_ROUTES } from './app.routes';
//
import { UserState } from '@app/core/store/user/user.state';
import { environment } from '@environment';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';

const initializeAppFactory = (injector: Injector) => {
    const _appInitService = injector.get(AppInitializeService);
    return (): Promise<boolean> => _appInitService.initApp();
};

const BASE_MODULES = [];

const NGXS_PROVIDERS: EnvironmentProviders[] = [
    provideStore([
        UserState
    ], {
        developmentMode: !environment.production,
    }),
    withNgxsReduxDevtoolsPlugin({
        disabled: environment.production,
    }),
];

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
        ...NGXS_PROVIDERS,
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
