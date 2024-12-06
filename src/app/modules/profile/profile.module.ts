import { NgModule } from '@angular/core';

import { ProfileResolver } from './resolvers';
import { SharedModule } from '@app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
//
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent, ProfileFavoritesComponent } from './components';

const COMPONENTS = [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
];

const RESOLVERS = [
    ProfileResolver,
];

@NgModule({
    imports: [
        SharedModule,
        ProfileRoutingModule
    ],
    declarations: [
        COMPONENTS
    ],
    providers: [
        RESOLVERS
    ]
})
export class ProfileModule { }
