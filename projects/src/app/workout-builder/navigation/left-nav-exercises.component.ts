import {Component, OnInit} from '@angular/core';

import { WorkoutService } from '../../core/workout.service';
import { Exercise, ExercisePlan } from '../../core/model';
import { WorkoutBuilderService } from '../builder-services/workout-builder.service';

@Component({
    selector: 'abe-left-nav-exercises',
    templateUrl: './left-nav-exercises.component.html'
})
export class LeftNavExercisesComponent implements OnInit {
    exerciseList: Array<Exercise> = [];


    /**
     * To add exercises to the workout we are building, we just need to import WorkoutBuilderService and
     *  ExercisePlan, inject WorkoutBuilderService into the LeftNavExercisesComponent, and call its addExercise
     *  method, passing the selected exercise as a parameter:
     *
     * Internally, WorkoutBuilderService.addExercise updates the buildingWorkout model data with the new exercise.
     */
    constructor(
      public workoutService: WorkoutService,
      public workoutBuilderService: WorkoutBuilderService) {}

    ngOnInit() {
        this.exerciseList = this.workoutService.getExercises();
    }

    /**
     * The preceding implementation is a classic case of sharing data between independent components. The shared
     *  service exposes the data in a controlled manner to any component that requests it. While sharing data, it
     *  is always a good practice to expose the state/data using methods instead of directly exposing the data object.
     *  We can see that in our component and service implementations too. LeftNavExercisesComponent does not update the
     *  workout data directly; in fact, it does not have direct access to the workout being built. Instead, it relies upon
     *  the service method, addExercise, to change the current workout's exercise list.
     */
    addExercise(exercise: Exercise) {
      this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
    }
}
