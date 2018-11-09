import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h2>Guess the Number !</h2>
    <div class="card bg-light mb-3">
        <div class="card-body">
          <p class="card-text">Guess the computer generated random number between 1 and 1000.</p>
        </div>
    </div>
    <div>
      <label>Your Guess: </label>
      <!--  we will see several places where square brackets [ ] are used. These are property bindings.
          This binding works by linking the value of the guess property in our component class to the value of the input
          field in the view. The binding is dynamic; so, as the value of the guess property changes, the value of the input field
          will be synchronized to the same value;       and we do not have to write any code to do that.
      -->
      <!-- Event binding: we find several places where parentheses ( ) appear. These are event bindings.
          In this case, the input event of the input element is bound to an expression. The expression sets the guess property
          in our component class to $event.target.value, which is the value being entered by the user. Behind the scenes, when
          we use this syntax, Angular sets up an event handler for the event that we are binding to. In this case, the handler
          updates the guess property in our component class whenever the user enters a number in the input field.
      -->
      <input type="number" [value]="guess" (input)="guess = $event.target.value" />&nbsp;
      <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>&nbsp;
      <button (click)="initializeGame()" class="btn btn-warning btn-sm">Restart</button>
    </div>
    <div>
      <!--  Structural directives: *ngIf inside the <p> tags is the NgIf structural directive. Structural directives allow us to
            manipulate the structure of DOM elements. The NgIf directive removes or adds DOM elements based on the result of an expression
            that is assigned to it.
            In this case we are using NgIf with a simple expression, similar to the types of expression we saw with interpolation. The
            expression resolves to either true or false based on the value of the guess being made and its relation (higher, lower, or
            equal) to the correct number. It then assigns that result to NgIf, which will either add the DOM element if the result is true
            or remove it if it is false.
      -->
      <p *ngIf="deviation<0" class="alert alert-warning">Your guess is higher.</p>
      <p *ngIf="deviation>0" class="alert alert-warning">Your guess is lower.</p>
      <p *ngIf="deviation===0" class="alert alert-success">Yes! That's it.</p>
    </div>
    <p class="text-info">No of guesses :
      <span class="badge">{{noOfTries}}</span>
    </p>
  </div>
  `
})
export class AppComponent {
  title = 'Guess the Number';
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;

  constructor() {
  /**
   * In our example, the constructor does only one thing when the class is created; it calls another method in our class,
   * called initializeGame().
   * The initializeGame() method sets the starting values of the four properties in the class using the assignment operator =.
   */
      this.initializeGame();
  }
  initializeGame() {
      this.noOfTries = 0;
      this.original = Math.floor((Math.random() * 1000) + 1);
      this.guess = null;
      this.deviation = null;
  }

  /**
   * The class holds one more method called verifyGuess(), which updates the deviation and noOfTries properties. This method is not
   * being called from within the component class; instead, it will be called from the view, as we will see when we examine the view
   *  more closely later. You'll also notice that our methods refer to properties in the same class by prepending this to them.
   */
  verifyGuess() {
      this.deviation = this.original - this.guess;
      this.noOfTries = this.noOfTries + 1;
  }
}
