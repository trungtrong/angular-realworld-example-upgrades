import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutoFocusDirective {
    @Input() enable = true;
    @Input() timeout: number = 1000;

    constructor(el: ElementRef) {
        if (!this.enable) {
            return;
        }
        //
        setTimeout(() => {
            const inputs = el.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea, select');
            if (!inputs.length) {
                return;
            }
            //
            inputs[0].focus();
        }, this.timeout);
    }
}
