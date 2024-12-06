import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { AuthGuard } from '@app/core/guards';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './resolvers/editable-article.resolver';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':slug',
        component: EditorComponent,
        canActivate: [AuthGuard],
        resolve: {
            article: EditableArticleResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRoutingModule { }
