import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//
import { FooterComponent, HeaderComponent } from './core/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        //
        FooterComponent,
        HeaderComponent,
    ]
})
export class AppComponent {
    constructor() { }
}
