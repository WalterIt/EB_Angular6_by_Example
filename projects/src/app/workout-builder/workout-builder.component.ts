import { Component, OnInit } from '@angular/core';

@Component({
  /**  INLINE TEMPLATE
   * We are removing the selector because WorkoutBuilderComponent will not be embedded in the application root,
   *  app.component.ts. Instead, it will be reached from app.routing-module.ts through routing. And while it will
   *  handle incoming routing requests from app.routes.ts, it will in turn be routing them to the other components
   *  contained in the Workout Builder feature.
   *
   * And those components will display their views using the <router-outlet> tag that we have just added to the
   *  WorkoutBuilder template. Given that the template for Workout BuilderComponent will be simple, we are using
   *  an inline template instead of a templateUrl.
   *
   * Typically, for a component's view we recommend using a templateUrl that points to a separate HTML template file.
   *  This is especially true when you anticipate that the view will involve more than a few lines of HTML. In that
   *  situation, it is much easier to work with a view inside its own HTML file.
   *
   * We are also adding an <abe-sub-nav-main> element that will be used to create a secondary top-level menu for navigating
   *  within the Workout Builder feature. We'll discuss that a little later in this chapter.
   */
  template: `<div class="container-fluid fixed-top mt-5">
                <div class="row mt-5">
                  <abe-sub-nav-main></abe-sub-nav-main>
                </div>
                <div class="row mt-3">
                  <div class="col-sm-12">
                    <router-outlet></router-outlet>
                  </div>
                </div>
              <div>`
})
export class WorkoutBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
