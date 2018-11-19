import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'abe-video-player',
  templateUrl: './video-player.component.html',
  styles:[]
})
export class VideoPlayerComponent implements OnInit, OnChanges {

  private youtubeUrlPrefix = '//www.youtube.com/embed/';

  /**
   * The videos input property here takes an array of strings (YouTube video codes). While we take the videos array as input,
   *  we do not use this array directly in video player view; instead, we transform the input array into a new array of safeVideoUrls
   *  and bind it.
   */
  @Input() videos: Array<string>;
  safeVideoUrls: Array<SafeResourceUrl>;

  constructor(private sanitizer: DomSanitizer) { }

  /**
   * The OnChanges life cycle event is triggered whenever the component's input(s) change. In the case of
   *  VideoPlayerComponent, it is the videos array input property that changes whenever a new exercise is
   *  loaded. We use this life cycle event to recreate the safeVideoUrls array and re-bind it to the view
   */
  ngOnChanges() {
    this.safeVideoUrls = this.videos ?
    /**
     * To let Angular know that the content being bound is safe, we use DomSanitizer and call the appropriate method
     *  based on the security contexts just described. The available functions are as follows:
            bypassSecurityTrustHtml
            bypassSecurityTrustScript
            bypassSecurityTrustStyle
            bypassSecurityTrustUrl
            bypassSecurityTrustResourceUrl
     */
      /** The map method transforms the videos array into a collection of SafeResourceUrl objects and assigns it to safeVideoUrls. */
      this.videos.map(v => this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + v))
      : this.videos;
  }

  ngOnInit() {
  }

}
