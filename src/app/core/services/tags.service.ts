import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TagsService {
    constructor(
        private apiService: ApiService
    ) { }

    getAll(): Observable<string[]> {
        return this.apiService.get<{tags: string[]}>('/tags')
            .pipe(map(data => data.tags));
    }

}
