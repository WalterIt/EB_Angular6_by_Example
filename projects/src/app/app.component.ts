import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'Guess the Number';
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;
  msgLess: boolean;
  msgHigher: boolean;
  msgSuccess: boolean;
  msgFail: boolean;
  noMatch = 0;
  noWin = 0 ;
  noFail = 0;
  

  constructor() {
  /**
   * In our example, the constructor does only one thing when the class is created; it calls another method in our class,
   * called initializeGame().
   * The initializeGame() method sets the starting values of the four properties in the class using the assignment operator =.
   */
      this.initializeGame();
      
  }
  initializeGame() {
      this.noOfTries = 5;
      this.original = Math.floor((Math.random() * 1000) + 1);
      this.guess = null;
      this.deviation = null;
      this.noMatch += 1;
      
  }

  /**
   * The class holds one more method called verifyGuess(), which updates the deviation and noOfTries properties. This method is not
   * being called from within the component class; instead, it will be called from the view, as we will see when we examine the view
   *  more closely later. You'll also notice that our methods refer to properties in the same class by prepending this to them.
   */
  verifyGuess() {
      this.deviation = this.original - this.guess;
      this.noOfTries = this.noOfTries - 1;

      /*
      while ( this.noOfTries >= 0 ) {        
        if (this.deviation < 0 ) {
        this.msgLess = true;
        }

        if (this.deviation  > 0 ) {
          this.msgHigher = true;
        }

        if (this.deviation === 0 ) {
          this.msgSuccess = true;
        }

        if (this.deviation === 0 ) {
          this.msgFail = true;
        }
      }
      */
  }


}
