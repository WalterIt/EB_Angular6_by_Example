/**
 * Implementing the resolve route guard
 *
 * The Resolve guard allows us to prefetch the data for a workout. In our case, what we want to do is use Resolve
 *  to check the validity of any ID that is passed for an existing workout. Specifically, we will run a check on that
 *  ID by making a call to the WorkoutBuilderService to retrieve the Workout Plan and see if it exists. If it exists,
 *  we will load the data associated with the Workout Plan so that it is available to the WorkoutComponent; if not we
 *  will redirect back to the Workouts screen.
 *
 * The resolve method can return a Promise , an Observable, or a synchronous value. If we return an Observable,  we will
 *  need to make sure that the Observable completes before proceeding with navigation. In this case, however, we are making
 *  a synchronous call to a local in-memory data store, so we are just returning a value.
 */
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WorkoutPlan } from '../../core/model';
import { WorkoutBuilderService } from '../builder-services/workout-builder.service';

/**
 * As you can see, the WorkoutResolver is an injectable class that implements the Resolve interface.  The code injects
 *  the WorkoutBuilderService and Router into the class and implements the interface with the resolve method.
 */
@Injectable()
export class WorkoutResolver implements Resolve<WorkoutPlan> {
  public workout: WorkoutPlan;

  constructor(
    public workoutBuilderService: WorkoutBuilderService,
    public router: Router) {}

  /**
   * The resolve method accepts two parameters; ActivatedRouteSnapshot and RouterStateSnapshot. In this case, we are
   *  only interested in the first of these two parameters, ActivatedRouteSnapshot.  It contains a paramMap from which
   *  we extract the ID parameter for the route.
   *
   * The resolve method can return a Promise , an Observable, or a synchronous value. If we return an Observable,  we will
   *  need to make sure that the Observable completes before proceeding with navigation. In this case, however, we are making
   *  a synchronous call to a local in-memory data store, so we are just returning a value.
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): WorkoutPlan {
    let workoutName = route.paramMap.get('id');

    if (!workoutName) {
        workoutName = '';
    }

    /**
     * The resolve method then calls the startBuilding method of WorkoutBuildingService using the parameter supplied
     *  in the route.
     */
    this.workout = this.workoutBuilderService.startBuilding(workoutName);

    /**
     *  If the workout exists, then resolve returns the data and the navigation proceeds; if not, it re-routes the user
     *  to the workouts page and returns false.
     */
    if (this.workout) {
        return this.workout;
    } else { // workoutName not found
        /**
         * If new is passed as an ID, WorkoutBuilderService will load a new workout and the Resolve guard will allow
         *  navigation to proceed to the WorkoutComponent.
         */
        this.router.navigate(['/builder/workouts']);
        return null;
    }
  }
}
