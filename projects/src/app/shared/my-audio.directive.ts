import { Directive, ElementRef } from '@angular/core';
/**
 * For the audio element too, the access pattern should be Angularish. In Angular, the only place where direct
 *  DOM manipulation is acceptable and practiced is inside directives.
 */
@Directive({
  /**
   * The preceding selector property allows the framework to identify where to apply the directive. We have replaced
   *  the generated [abeMyAudioDirective] attribute selector with just audio. Using audio as the selector makes our
   *  directive load for every <audio> tag used in HTML. The new selector works as an element selector.
   */
  selector: 'audio',
  exportAs: 'MyAudio' // The use of exportAs becomes clear when we use this directive in view templates.
})
export class MyAudioDirective {

  private audioPlayer: HTMLAudioElement;
  /**
   * The ElementRef object injected in the constructor is the Angular element (audio in this case) for which the
   *  directive is loaded. Angular creates the ElementRef instance for every component and directive when it compiles
   *  and executes the HTML template. When requested in the constructor, the DI framework locates the corresponding
   *  ElementRef and injects it. We use ElementRef to get hold of the underlying audio element in the code (the instance
   *  of HTMLAudioElement). The audioPlayer property holds this reference.
   */
  constructor(element: ElementRef) {
    this.audioPlayer = element.nativeElement;
  }

  stop() {
    this.audioPlayer.pause();
  }
  start() {
    this.audioPlayer.play();
  }
  get currentTime(): number {
    return this.audioPlayer.currentTime;
  }
  get duration(): number {
    return this.audioPlayer.duration;
  }
  get playbackComplete() {
    return this.duration == this.currentTime;
  }


}
