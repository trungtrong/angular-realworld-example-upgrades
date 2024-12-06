import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//
import {
    AutoFocusDirective,
    UnlessDirective,
    ShowAuthedDirective
} from './directives';
import {
    FunctionPipe,
} from './pipes';

const DIRECTIVES = [
    AutoFocusDirective,
    UnlessDirective,
    ShowAuthedDirective
];

const PIPES = [
    FunctionPipe,
];

@NgModule({
    declarations: [
        DIRECTIVES,
        PIPES
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DIRECTIVES,
        PIPES
    ]
})
export class AppCommonModule { }
