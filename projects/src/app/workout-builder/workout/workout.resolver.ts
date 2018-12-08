import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';

import { WorkoutBuilderService } from '../builder-services/workout-builder.service';
import { WorkoutPlan } from '../../core/model';

@Injectable()
export class WorkoutResolver implements Resolve<WorkoutPlan> {
  public workout: WorkoutPlan;
  private isExistingWorkout = false;

  constructor(
    public workoutBuilderService: WorkoutBuilderService,
    public router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<WorkoutPlan> {
    const workoutName = route.paramMap.get('id');

    /**
     * As you can see, we have split out the behavior for a new workout (one where there is no workout name being passed
     *  as a parameter in the URL) and that for an existing workout. In the former case, we call
     * workoutBuilderService.startBuildingExisting, which will return a new WorkoutPlan. In the latter case, we call
     * workoutBuilderService.startBuildingExisting and pipe the results and then map them to return the workout unless
     *  it is not found, in which case we route the user back to the Workouts screen.
     */
    if (!workoutName) {
        return this.workoutBuilderService.startBuildingNew();
    } else {
        this.isExistingWorkout = true;
        return this.workoutBuilderService.startBuildingExisting(workoutName)
        .pipe(
          map(workout => {
            if (workout) {
              this.workoutBuilderService.buildingWorkout = workout;
              return workout;
            } else {
              this.router.navigate(['/builder/workouts/workout-not-found']);
              return null;
            }
          }),
          catchError(error => {
            console.log('An error occurred!');
            this.router.navigate(['/builder/workouts']);
            return of(null);
          })
        );
    }
  }
}
