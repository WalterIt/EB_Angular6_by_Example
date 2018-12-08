/**
 * Building an Ajax button component
 *
 * When we save/update an exercise or workout, there is always the possibility of duplicate submission
 *  (or duplicate POST requests). The current implementation does not provide any feedback as to when
 *  the save/update operation started and when it is  completed. The user of an app can knowingly or
 *  unknowingly click on the Save button multiple times due to the lack of visual clues.
 *
 * Let's try to solve this problem by creating a specialized button—an Ajax button that gives some visual
 *  clues when clicked on and also stops duplicate Ajax submissions.
 *
 * The button component will work on these lines. It takes a function as input. This input function
 *  (input parameter) should return a promise pertaining to the remote request. On clicking on the button,
 *  the button internally makes the remote call (using the input function), tracks the underlying promise,
 *  waits for it to complete, and shows some busy clues during this activity. Also, the button remains disabled
 *  until the remote invocation completes to avoid duplicate submission.
 */
import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'abe-ajax-button',
  templateUrl: './ajax-button.component.html',
  styleUrls: []
})
export class AjaxButtonComponent implements OnInit {
  busy: boolean = null;
  @Input() execute: any;
  @Input() parameter: any;

  constructor() { }

  /**
   * The component (AjaxButtonComponent) takes two property bindings, execute and parameter. The execute
   *  property points to the function that is invoked on the Ajax button click. The parameter is the data
   *  that can be passed to this function.
   *
   * Look at the usage of the busy flag in the view. We disable the button and show the spinner when the
   *  busy flag is set. Let's add the implementation that makes everything work. Add this code to the
   *  AjaxButtonComponent class:
   */
  @HostListener('click', ['$event'])
  // The onClick implementation calls the input function with a lone parameter as parameter. The result of the invocation is
  //   stored in the result variable.
  onClick(event: any) {
    const result: any = this.execute(this.parameter);
    /**
     * The if condition checks whether the result is a Promise object. If yes, the busy indicator is set to true.
     *  The button then waits for the promise to get resolved, using the then function. Irrespective of whether the
     *  promise is resolved with success or error, the busy flag is set to null.
     */
    if (result instanceof Promise) {
      this.busy = true;
      result.then(
        () => { this.busy = null; },
        (error: any) => { this.busy = null; });
    }
  }

  ngOnInit() {
  }

}
