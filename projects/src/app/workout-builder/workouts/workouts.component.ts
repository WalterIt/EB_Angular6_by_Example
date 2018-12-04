import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutPlan } from '../../core/model';
import { WorkoutService } from '../../core/workout.service';

@Component({
  selector: 'abe-workouts',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
  workoutList: Array<WorkoutPlan> = [];

  constructor(
      public router: Router,
      public workoutService: WorkoutService) {}

  ngOnInit() {
      this.workoutList = this.workoutService.getWorkouts();
  }

  /**
   * How do we know that this workout name is the right parameter for the ID? As you recall, when we set up the
   *  event for handling a click on the Workout tiles on the Workouts screen that takes us to the Workout screen,
   *  we designated the workout name as the parameter for the ID, like so:
   */
  onSelect(workout: WorkoutPlan) {
      /**
       * The router.navigate method accepts an array. This is called the link parameters array. The first item in
       *  the array is the path of the route, and the second is a route parameter that specifies the ID of the workout.
       *  In this case, we set the id parameter to the workout name. From our discussion of routing in the previous chapter,
       *  we know that we can also construct the same type of URL as part of a router link or simply enter it in the browser
       *  to get to the Workouts screen and edit a particular workout.
       *
       * The other of the two routes ends with /new. Since this route does not have a token parameter, the router will simply
       *  pass the URL unmodified to the WorkoutComponent. The WorkoutComponent will then need to parse the incoming URL to
       *  identify that it should be creating a new component.
       */
      this.router.navigate( ['./builder/workout', workout.name] );
  }
}
