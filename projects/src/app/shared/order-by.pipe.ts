import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  /**
   * The preceding field variable receives the field on which sorting is required. If the field has a - prefix, we truncate
   *  the prefix before sorting the array in descending order.
   * The pipe also uses the spread operator, [...], which may be new to you. Learn more about the spread operator on MDN at
   *  http://bit.ly/js-spread.
   */
  transform(value: Array<any>, field: string): any {
    if (value == null || value.length <= 1) {
      return value;
    }
    if (field.startsWith('-')) {
      field = field.substring(1);
      if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
        return [...value].sort((a, b) => b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => b[field] - a[field]);
    }
    else {
      if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
        return [...value].sort((a, b) => -b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => a[field] - b[field]);
    }
  }

}
