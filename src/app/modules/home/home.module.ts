import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './resolvers';
import { AppCommonModule } from '@app/common/common.module';

const COMPONENTS = [
    HomeComponent,
];

const RESOLVERS = [
    HomeAuthResolver,
];

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        AppCommonModule
    ],
    declarations: [
        COMPONENTS
    ],
    providers: [
        RESOLVERS
    ]
})
export class HomeModule { }
