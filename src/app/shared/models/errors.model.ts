export class Errors {
    errors: { [key: string]: string };

    constructor(init?: Partial<Errors>) {
        Object.assign(this, init);
    }}
