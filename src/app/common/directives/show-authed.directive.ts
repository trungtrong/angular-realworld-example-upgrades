import {
    DestroyRef,
    Directive,
    inject,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { UserSelectors } from '@app/core/store/user/user.selectors';

@Directive({
    selector: '[appShowAuthed]',
    standalone: true
})
export class ShowAuthedDirective implements OnInit {
    private _isLoggedIn$ = this._store.select(UserSelectors.isLoggedIn);

    destroyRef = inject(DestroyRef);

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private readonly _store: Store,
    ) { }

    condition: boolean;

    ngOnInit() {
        this._isLoggedIn$
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(
                (isAuthenticated: boolean) => {
                    if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                }
            );
    }

    @Input() set appShowAuthed(condition: boolean) {
        this.condition = condition;
    }

}
