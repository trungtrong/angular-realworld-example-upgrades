import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { FooterComponent, HeaderComponent } from './core/layout';

const COMPONENTS = [
    FooterComponent,
    HeaderComponent,
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        //
        AppRoutingModule,
        //
        COMPONENTS
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
