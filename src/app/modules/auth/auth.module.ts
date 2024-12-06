import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './guards';

const GUARDS = [
    NoAuthGuard,
];

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent
    ],
    providers: [
        GUARDS
    ]
})
export class AuthModule { }
