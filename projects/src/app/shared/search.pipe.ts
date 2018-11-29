import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  /**
   * Look at the pipe code; the pipe takes two arguments, the first being the field to search, and the second the value
   *  to search. We use the JavaScript array's filter function to filter the record, doing a strict equality check.
   */
  transform(value: Array<any>, field: string, searchTerm: string): any {
    if (!field) { return []; }
    if (searchTerm == null) { return [...value]; }
    return value.filter((item) => item[field] === searchTerm);
  }
}
