import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
//

@Directive({
    selector: '[appUnless]',
    standalone: true
})
export class UnlessDirective {
    /*
      * 1 - it does the opposite to *NgIf directive
          + condition = false -> render embedded view
      */
    @Input() set appUnless(condition: boolean) {
        if (!condition && !this._hasView) {
            this._viewContainer.createEmbeddedView(this._templateRef);
            this._hasView = true;
        } else if (condition && this._hasView) {
            this._viewContainer.clear();
            this._hasView = false;
        }
    }

    private _hasView: boolean = false;

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef
    ) { }
}
