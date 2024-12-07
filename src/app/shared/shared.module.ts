import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


const BASE_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
];

@NgModule({
    declarations: [
    ],
    imports: [
        BASE_MODULES,
    ],
    exports: [
        BASE_MODULES
    ]
})
export class SharedModule { }
