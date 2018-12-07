
/**
 * Custom validators
 * Now, we'll take a look at one more thing before we conclude this chapter. As anyone who has worked on
 *  building web forms (either in Angular or any other web technology) knows, we are often called on to
 *  create validations that are unique to the application we are building. Angular provides us with the
 *  flexibility to enhance our reactive form validation by building custom validators.
 *
 * In building our exercise form, we need to be sure about what is entered, as a name contains only alphanumeric
 *  characters and no spaces. This is because when we get to storing the exercises in a remote data store, we are
 *  going to use the name of the exercise as its key. So, in addition to the standard required field validator,
 *  let's build another validator that checks to make sure that the name entered is in alphanumeric form only.
 *
 * Creating a custom control is quite straightforward. In its simplest form, an Angular custom validator is a
 *  function that takes a control as an input parameter, runs the validation check, and returns true or false.
 *  So, let's start by adding a TypeScript file with the name alphanumeric-validator.ts. In that file, first import
 *  FormControl from @angular/forms, then add the following class to that file:
 */
import { FormControl } from '@angular/forms';

export class AlphaNumericValidator {
    static invalidAlphaNumeric(control: FormControl): { [key: string]: boolean } {
        /**
         * The code follows the pattern for creating a validator that we just mentioned. The only thing
         *  that may be a little surprising is that it returns true when the validation fails! As long as
         *  you are clear on this one quirk, you should have no problem writing your own custom validator.
         */
        if ( control.value.length && !control.value.match(/^[a-z0-9]+$/i) ) {
            return {invalidAlphaNumeric: true };
        }
        return null;
    }
}
