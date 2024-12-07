import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
    apiUrl = 'https://real-world-app-39656dff2ddc.herokuapp.com/api';
    constructor(
        private http: HttpClient
    ) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put<T>(path: string, body: object = {}): Observable<T> {
        return this.http.put<T>(
            `${this.apiUrl}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    post<T>(path: string, body: object = {}): Observable<T> {
        return this.http.post<T>(
            `${this.apiUrl}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(
            `${this.apiUrl}${path}`
        ).pipe(catchError(this.formatErrors));
    }
}
