import { Directive, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[abeBusyIndicator][ngModel]'
})
export class BusyIndicatorDirective {
  private get validating(): boolean {
    return this.model.control != null && this.model.control.pending;
  }
  /**
   * Property binding using @HostBinding
   *
   * Use host property binding to bind a directive property to a host element property. Any changes
   *  to the directive property will be synced with the linked host property during the change detection phase.
   *
   * Attribute binding
   *
   * Attribute binding binds a directive property to a host component attribute. For example, consider a
   *  directive with binding like the following:
    * @HostBinding("attr.disabled") get canEdit(): string
    *   { return !this.isAdmin ? "disabled" : null };
   */
  @HostBinding('style.borderWidth') get controlBorderWidth():
    string { return this.validating ? '3px' : null; }
  @HostBinding('style.borderColor') get controlBorderColor():
    string { return this.validating ? 'gray' : null; }

  constructor(
    /**
     * This instructs Angular to inject the NgModel instance of the element on which the directive is
     *  declared. Remember that the NgModel directive is already present on input (workoutname):
     */
    private model: NgModel
    ) { }
}
