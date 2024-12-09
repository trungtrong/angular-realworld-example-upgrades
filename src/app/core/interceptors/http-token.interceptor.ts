import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services';

export const HttpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const jwtService = inject(JwtService);
    const headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    const token = jwtService.getToken();

    if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next(request);
};

