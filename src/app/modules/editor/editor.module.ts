import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';

import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './resolvers';

const COMPONENTS = [
    EditorComponent
];
const RESOLVERS = [
    EditableArticleResolver,
];
@NgModule({
    imports: [
        SharedModule,
        EditorRoutingModule
    ],
    declarations: [COMPONENTS],
    providers: [RESOLVERS]
})
export class EditorModule { }
