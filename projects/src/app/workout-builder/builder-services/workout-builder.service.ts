import { Injectable } from '@angular/core';
import { WorkoutPlan, ExercisePlan } from '../../core/model';
import { WorkoutService } from '../../core/workout.service';


@Injectable()
export class WorkoutBuilderService {
    buildingWorkout: WorkoutPlan;
    newWorkout: boolean;
    firstExercise = true;

    constructor(
      /**
       * WorkoutBuilderService has a dependency on WorkoutService to provide persistence and querying capabilities.
       *  We resolve this dependency by injecting WorkoutService into the constructor for WorkoutBuilderService:
       */
      public workoutService: WorkoutService
      ) {}

    /**
     * WorkoutBuilderService also needs to track the workout being built. We use the buildingWorkout property for this.
     *  The tracking starts when we call the startBuilding method on the service:
     *
     * The basic idea behind this tracking function is to set up a WorkoutPlan object (buildingWorkout) that will be made
     *  available to components to manipulate the workout details. The startBuilding method takes the workout name as a
     *  parameter. If the name is not provided, it implies we are creating a new workout, and hence a new WorkoutPlan object
     *  is created and assigned; if not, we load the workout details by calling WorkoutService.getWorkout(name). In any case,
     *  the buildingWorkout object has the workout being worked on.
     */
    startBuilding(name: string) {
        if (name) {
            this.buildingWorkout = this.workoutService.getWorkout(name);
            /**
             * The newWorkout object signifies whether the workout is new or an existing one. It is used to differentiate
             *  between save and update situations when the save method on this service is called.
             */
            this.newWorkout = false;
        } else {
            const exerciseArray: ExercisePlan[] = [];
            this.buildingWorkout = new WorkoutPlan('', '', 30, []);
            this.newWorkout = true;
        }
        return this.buildingWorkout;
    }

    removeExercise(exercise: ExercisePlan) {
        const currentIndex = this.buildingWorkout.exercises.map(function(e) { return e.exercise.name; }).indexOf(exercise.exercise.name);
        this.buildingWorkout.exercises.splice(currentIndex, 1);
    }

    addExercise(exercisePlan: ExercisePlan) {
        if (this.newWorkout && this.firstExercise) {
            this.buildingWorkout.exercises.splice(0, 1);
            this.firstExercise = false;
        }
        this.buildingWorkout.exercises.push(exercisePlan);
    }

    moveExerciseTo(exercise: ExercisePlan, toIndex: number ) {
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length) { return; }
        const currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    }

    save() {
      const workout = this.newWorkout ?
          this.workoutService.addWorkout(this.buildingWorkout) :
          this.workoutService.updateWorkout(this.buildingWorkout);
      this.newWorkout = false;
      return workout;
  }
}
