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
      <input type="number" [value]="guess" (input)="guess = $event.target.value" />
      <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>
      <button (click)="initializeGame()" class="btn btn-warning btn-sm">Restart</button>
    </div>
    <div>
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
