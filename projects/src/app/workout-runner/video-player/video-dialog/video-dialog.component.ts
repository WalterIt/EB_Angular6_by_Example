import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

/**
 * The VideoDialogContext class declared inside VideoDialogComponent has been created to pass the videoId of the
 *  YouTube video clicked to the dialog instance. The library uses this context class to pass data between the
 *  calling code and the modal dialog. The VideoDialogContext class inherits a configuration class that the dialog
 *  library uses to alter the behavior and UI of the modal dialog from BSModalContext.
 */
export class VideoDialogContext extends BSModalContext {
  constructor(public videoId: string) {
    super();
    this.size = 'lg';
  }
}

@Component({
  selector: 'abe-video-dialog',
  templateUrl: './video-dialog.component.html',
  styles:[]
})
/**
 * Coming back to the VideoDialogComponent implementation, the component implements the ModalComponent<VideoDialogContext>
 *  interface required by the modal library. Look at how the context (VideoDialogContext) to the dialog is passed to the
 *  constructor and how we extract and assign the videoId property from the context. Then it's just a matter of binding
 *  videoId property to the template view (see the HTML template) and rendering the YouTube player.
 */
export class VideoDialogComponent implements OnInit, ModalComponent<VideoDialogContext> {
  videoId: SafeResourceUrl;
  private youtubeUrlPrefix = '//www.youtube.com/embed/';
  constructor(public dialog: DialogRef<VideoDialogContext>, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoId = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + this.dialog.context.videoId);
  }

  ok() {
    this.dialog.close();
  }
}
