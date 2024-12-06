import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'function',
})
// NOTE: Use Arrow Function Expression when applying function pipe
export class FunctionPipe implements PipeTransform {
    transform(value: any, handler: (...args: any[]) => any, ...args: any[]): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return handler(value, ...args);
    }
}
