import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { VideoDialogComponent, VideoDialogContext } from './video-dialog/video-dialog.component';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
  selector: 'abe-video-player',
  templateUrl: './video-player.component.html',
  styles: [],
})
export class VideoPlayerComponent implements OnInit {

  @Input() videos: Array<string>;
  @Output() playbackStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() playbackEnded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modal: Modal) { }

  ngOnInit() {
  }

  /**
   * The playVideo function calls the Modal class' open function, passing in the dialog component to open and a new instance
   *  of the VideoDialogContext class with the videoId of the YouTube video.
   */
  playVideo(videoId: string) {
    this.playbackStarted.emit(null);
    var dialog = this.modal.open(VideoDialogComponent, overlayConfigFactory(new VideoDialogContext(videoId)));
    dialog.result
      .then(() => { this.playbackEnded.emit(null); }, (error) => { this.playbackEnded.emit(null); });
  };
}
