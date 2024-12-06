import { Pipe, PipeTransform } from '@angular/core';
//
import { isNullOrUndefined } from '@app/helpers';
import { ListItemModel } from '@app/shared/models';

@Pipe({
    name: 'lookupValue',
})
export class LookupValuePipe implements PipeTransform {
    transform(key: string | number,
        lookup: Partial<ListItemModel<string | number, string>[]> | any[],
        valueExpr: string = 'key',
        displayExpr: string = 'value',
        emptyMessage: string = '-',
        valueExprNotFound: string): any {
        if (!key) {
            return emptyMessage;
        }
        //
        if (!Array.isArray(lookup)) {
            return `${key}`;
        }
        //
        if (!lookup?.length) {
            return !isNullOrUndefined(valueExprNotFound) ? valueExprNotFound : `${key}`;
        }
        //
        const selectedItemIndex: number = lookup.findIndex(_ => _[valueExpr] === key);
        return selectedItemIndex > -1
            ? lookup[selectedItemIndex][displayExpr]
            : !isNullOrUndefined(valueExprNotFound)
                ? `${valueExprNotFound}`
                : `${key}`;
    }
}

@Pipe({
    name: 'lookupItem'
})
export class LookupItemPipe implements PipeTransform {
    transform(
        key: string | number,
        params: {
            lookup: Partial<ListItemModel<string | number, string>[]> | any[];
            valueExpr?: string;
            emptyMessage?: string;
            valueExprNotFound?: string;
        }): any {
        if (!key) {
            return params.emptyMessage ?? '-';
        }
        //
        if (!Array.isArray(params.lookup)) {
            return `${key}`;
        }
        //
        if (!params.lookup || params.lookup.length === 0) {
            return !isNullOrUndefined(params.valueExprNotFound) ? params.valueExprNotFound : `${key}`;
        }
        //
        const selectedItemIndex: number = params.lookup.findIndex(_ => _[params.valueExpr ?? 'key'] === key);
        return selectedItemIndex > -1
            ? params.lookup[selectedItemIndex]
            : !isNullOrUndefined(params.valueExprNotFound)
                ? `${params.valueExprNotFound}`
                : `${key}`;
    }
}
