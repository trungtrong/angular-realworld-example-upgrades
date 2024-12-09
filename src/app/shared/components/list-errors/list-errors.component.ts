import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
//
import { Errors } from '@app/shared/models';

@Component({
    selector: 'app-list-errors',
    templateUrl: './list-errors.component.html',
    imports: [
        NgIf,
        NgForOf
    ]
})
export class ListErrorsComponent {
    errorList: string[] = [];

    @Input() set errors(errorList: Errors | null) {
        this.errorList = errorList ? Object.keys(errorList.errors || {})
            .map(key => `${key} ${errorList.errors[key]}`) : [];
    }
}
