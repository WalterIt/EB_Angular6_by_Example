import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {
  /**
   *   In an Angular pipe, the implementation logic goes into the transform function. Defined as part of the
   *  PipeTransform interface, the preceding transform function transforms the input seconds value into an hh:mm:ss
   *  string. The first parameter to the transform function is the pipe input. The subsequent parameters, if provided,
   *  are the arguments to the pipe, passed using a colon separator (pipe:argument1:arugment2..) from the view.
  */

  transform(value: number): any {
    if (!isNaN(value)) {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value - (hours * 3600)) / 60);
      const seconds = value - (hours * 3600) - (minutes * 60);

      /**
       * The pipe implementation is quite straightforward, as we convert seconds into hours, minutes, and seconds. Then,
       *  we concatenate the result into a string value and return the value. The addition of 0 on the left for each of
       *  the hours, minutes, and seconds variables is done to format the value with a leading 0 in case the calculated
       *  value for hours, minutes, or seconds is less than 10.
       */

      return ('0' + hours).substr(-2) + ':'
        + ('0' + minutes).substr(-2) + ':'
        + ('0' + seconds).substr(-2);
    }
    return;
  }
}
