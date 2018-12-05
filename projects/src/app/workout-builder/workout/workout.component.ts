import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkoutPlan, ExercisePlan } from '../../core/model';
import { WorkoutBuilderService } from '../builder-services/workout-builder.service';

@Component({
  selector: 'abe-workout',
  templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
  public workout: WorkoutPlan;
  public sub: any;
  /**
   * We do not have a way to explicitly change the touched state of our controls to untouched. Instead,
   *  we will resort to a little trickery to get the job done. We'll introduce a new property called
   *  submitted. Add it at the top of the Workout class definition and set its initial value to false, like so: ...
   */
  public submitted = false;

  public removeTouched = false;

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public workoutBuilderService: WorkoutBuilderService) { }

  durations = [{ title: '15 seconds', value: 15 },
      { title: '30 seconds', value: 30 },
      { title: '45 seconds', value: 45 },
      { title: '1 minute', value: 60 },
      { title: '1 minute 15 seconds', value: 75 },
      { title: '1 minute 30 seconds', value: 90 },
      { title: '1 minute 45 seconds', value: 105 },
      { title: '2 minutes', value: 120 },
      { title: '2 minutes 15 seconds', value: 135 },
      { title: '2 minutes 30 seconds', value: 150 },
      { title: '2 minutes 45 seconds', value: 165 },
      { title: '3 minutes', value: 180 },
      { title: '3 minutes 15 seconds', value: 195 },
      { title: '3 minutes 30 seconds', value: 210 },
      { title: '3 minutes 45 seconds', value: 225 },
      { title: '4 minutes', value: 240 },
      { title: '4 minutes 15 seconds', value: 255 },
      { title: '4 minutes 30 seconds', value: 270 },
      { title: '4 minutes 45 seconds', value: 285 },
      { title: '5 minutes', value: 300 }];


  ngOnInit() {
    /**
     * The method subscribes to the route and extracts the workout from the route.data. There is no need to check
     *  the workout exists because we have already done that in the WorkoutResolver.
     *
     * We are subscribing to the route.data because as an ActivatedRoute, the route exposes its data as an  Observable,
     *  which can change during the lifetime of the component. This gives us the ability to reuse the same component
     *  instance with different parameters, even though the OnInit life cycle event for that component is called only
     *  once. We'll cover Observables in detail in the next chapter.
     */
      this.sub = this.route.data
          .subscribe(
            (data: { workout: WorkoutPlan }) => {
              this.workout = data.workout;
            }
          );
  }

  addExercise(exercisePlan: ExercisePlan) {
      this.workoutBuilderService.addExercise(exercisePlan);
  }

  moveExerciseTo(exercisePlan: ExercisePlan, location: any) {
      this.workoutBuilderService.moveExerciseTo(exercisePlan, location);
  }

  /**  VALIDATION
   *
   * To fix this problem, we need an additional value to check when the state of the exercise list has been reduced to zero,
   *  except when the form is first loaded. The only way that situation can happen is if the user adds and then removes exercises
   *  from a workout to the point that there are no more exercises. So, we'll add another property to our component that we can use
   *  to track whether the remove method has been called. We call that value removeTouched and set its initial value to false:
   *
            removeTouched: boolean = false;
            Then, in the remove method we will set that value to true:
            removeExercise(exercisePlan: ExercisePlan) {
                this.removeTouched = true;
                this.workoutBuilderService.removeExercise(exercisePlan);
            }
   */
  removeExercise(exercisePlan: ExercisePlan) {
    this.removeTouched = true;
    this.workoutBuilderService.removeExercise(exercisePlan);
}

  /**
   * Before we look at NgForm in more detail, let's add the save method to Workout to save
   *  the workout when the Save button is clicked on. Add this code to the Workout component: ...
   *
   * We check the validation state of the form using its invalid property and then call the
   *  WorkoutBuilderService.save method if the form state is valid.
   */
  save(formWorkout: any) {
    /**
     * The variable will be set to true on the Save button click. Update the save implementation by
     *  adding the highlighted code:
     */
    this.submitted = true;
    if (!formWorkout.valid) { return; }
    this.workoutBuilderService.save();
    this.router.navigate(['/builder/workouts']);
  }

  cancel(formWorkout: any) {
    this.submitted = false;
    formWorkout.cancel();
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}
