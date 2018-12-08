/**
 * Building a remote validator directive
 *
 * Async validators are similar to standard custom validators, except that instead of returning a key-value
 *  object map or null, the return value of a validation check is a promise. This promise is eventually resolved
 *  with the validation state being set (if there is an error), or null otherwise (on validation success).
 */
import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[abeRemoteValidator][ngModel]',
  /**
   * Since we are registering the validator as a directive instead of registering using a FormControl
   *  instance (generally used when building forms with a reactive approach), we need the extra provider
   *  configuration setting (added in the preceding @Directive metadata) by using this syntax:
   */
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: RemoteValidatorDirective, multi: true }]
})
export class RemoteValidatorDirective {

  @Input() abeRemoteValidator: string;
  @Input() validateFunction: (value: string) => Promise<boolean>;

  validate(control: FormControl): { [key: string]: any } {
    const value: string = control.value;
    return this.validateFunction(value).then((result: boolean) => {
      if (result) {
        return null;
      }
      else {
        const error: any = {};
        error[this.abeRemoteValidator] = true;
        return error;
      }
    });
  }

}
