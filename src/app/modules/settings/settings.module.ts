import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
//
import { ListErrorsComponent } from '@app/shared/components';

@NgModule({
    imports: [
        SharedModule,
        SettingsRoutingModule,
        //
        ListErrorsComponent
    ],
    declarations: [
        SettingsComponent
    ]
})
export class SettingsModule { }
