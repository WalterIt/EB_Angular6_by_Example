import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, catchError } from 'rxjs/operators';

import {Exercise, ExercisePlan, WorkoutPlan } from './model';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule
})
export class WorkoutService {
    workouts: Array<WorkoutPlan> = [];
    exercises: Array<Exercise> = [];
    workout: WorkoutPlan;
    collectionsUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    params = '?apiKey=' + this.apiKey;

    constructor(public http: HttpClient) {
    }

    getExercises(): Observable<Exercise[]> {
      /**  Use the HTTPClient module and RxJS
       * that the http.get method returns an Observable from the RxJS library. Notice that we are also setting the response
       *  to be of type <ExercisePlan> to make explicit to our upstream callers what type of Observable is being returned from
       *  our HTTP GET call.
       */
      return this.http.get<Exercise[]>(this.collectionsUrl + '/exercises' + this.params)
      /**
       * Notice that we are using a pipe method to add a catchError operator. This operator accepts a method, handleError,
       *  for handling a failed response. The handleError method takes the failed response as a parameter. We log the error
       *  to the console and use Observable.throw to return the error to the consumer:
       */
      .pipe(catchError(this.handleError('getExercises', [])));
    }

    getExercise (exerciseName: string): Observable<Exercise> {
        return this.http.get<Exercise>(this.collectionsUrl + '/exercises/' + exerciseName  + this.params)
            .pipe(catchError(this.handleError<Exercise>(`getHero id=${exerciseName}`)));
    }

    updateExercise(exercise: Exercise) {
        for (let i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exercise.name) {
                this.exercises[i] = exercise;
            }
        }
        return exercise;
    }

    addExercise(exercise: Exercise) {
        if (exercise.name) {
            this.exercises.push(exercise);
            return exercise;
        }
    }

    deleteExercise(exerciseName: string) {
        let exerciseIndex: number;
        for (let i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exerciseName) {
                exerciseIndex = i;
            }
        }
        if (exerciseIndex >= 0) { this.exercises.splice(exerciseIndex, 1); }
    }

    /**
     * Again we are specifying the type of Observable—in this case <WorkoutPlan[]>—that will be returned by our
     *  HTTP GET call and using pipe to add a catchError operator.
     */
    getWorkouts(): Observable<WorkoutPlan[]> {
        return this.http.get<WorkoutPlan[]>(this.collectionsUrl + '/workouts' + this.params)
            .pipe(
                /** Map Operator
                 * The nice thing is that the pipe method that we used to add error handling also allows us to add additional
                 *  operators that we can use to transform the JavaScript object into the WorkoutPlan type in our model.
                 *
                 * We have added a  map operator that transforms this Observable into one made up of WorkoutPlan objects. Each
                 *  WorkoutPlan object (we have only one at the moment) will then have the totalWorkoutDuration method that we need.
                 *
                 * Looking at the code you can see that we operate on the JSON results HTTPClient response, which is why we are
                 *  using the <any> type. And then we create a typed array of WorkoutPlans and iterate through the first array
                 *  using a fat arrow forEach function, assigning each JavaScript object to a WorkoutPlan object.
                 */
                map((workouts: Array<any>) => {
                  const result: Array<WorkoutPlan> = [];
                  if (workouts) {
                      workouts.forEach((workout) => {
                          result.push(
                              new WorkoutPlan(
                                  workout.name,
                                  workout.title,
                                  workout.restBetweenExercise,
                                  workout.exercises,
                                  workout.description
                              ));
                      });
                  }
                  return result;
                }),
                /**
                 * We return the results of these mappings to the callers that subscribe to them, workouts.component.ts in this case.
                 *  We have also updated the catchError operator with a new handleError method which you can find in Checkpoint 5.2.
                 *  The callers do not need to make any changes to the code they use to subscribe to our workouts Observable. Instead,
                 *  the model mapping can take place at one spot in the application and then be used throughout it.
                 *
                 * If you rerun the application, you will see that the total number of seconds now displays properly:
                 */
                catchError(this.handleError<WorkoutPlan[]>('getWorkouts', []))
            );
    }

    getWorkout(workoutName: string): Observable<WorkoutPlan> {
      /**   FORKJOIN
       *
       * The getWorkout method uses Observable and its forkJoin operator to return two Observable objects: one that
       *  retrieves the Workout and another that retrieves a list of all the Exercises. What is interesting about the
       *  forkJoin operator is that not only does it allow us to return multiple Observable streams, but it also waits
       *  until both Observable streams have retrieved their data before further processing the results. In other words,
       *  it enables us to stream the responses from multiple concurrent HTTP requests and then operate on the combined results.
       *
       * Once we have the Workout details and the complete list of exercises, we then pipe the results to the map operator
       *  (which we saw previously with the code for the Workouts list), which we use to change the exercises array of the
       *  workout to the correct Exercise class object. We do this by searching the allExercises Observable for the name of
       *  the exercise in the workout.exercises array returned from the server, and then assigning the matching exercise to
       *  the workout services array. The end result is that we have a complete WorkoutPlan object with the exercises array
       *  set up correctly.
       */
      return forkJoin (
          this.http.get(this.collectionsUrl + '/exercises' + this.params),
          this.http.get(this.collectionsUrl + '/workouts/' + workoutName + this.params))
          .pipe(
               map(
                  (data: any) => {
                      const allExercises = data[0];
                      const workout = new WorkoutPlan(
                          data[1].name,
                          data[1].title,
                          data[1].restBetweenExercise,
                          data[1].exercises,
                          data[1].description
                      );
                      workout.exercises.forEach(
                          (exercisePlan: any) => exercisePlan.exercise = allExercises.find(
                              (x: any) => x.name === exercisePlan.name
                          )
                      );
                      return workout;
                  }
              ),
              catchError(this.handleError<WorkoutPlan>(`getWorkout id=${workoutName}`))
        );
      }

    addWorkout(workout: WorkoutPlan) {
      /**
       * In getWorkout, we had to map data from the server model to our client model; the reverse has to be done here.
       *  First, we create a new array for the exercises, workoutExercises, and then add to that array a version of the
       *  exercises that is more compact for server storage. We only want to store the exercise name and duration in the
       *  exercises array on the server (this array is of type any because in its compact format it does not conform to the
       *  ExercisePlan type).
       */
      const workoutExercises: any = [];
      workout.exercises.forEach(
          (exercisePlan: any) => {
              workoutExercises.push({name: exercisePlan.exercise.name, duration: exercisePlan.duration});
          }
      );

      const body = {
          '_id': workout.name,
          'exercises': workoutExercises,
          'name': workout.name,
          'title': workout.title,
          'description': workout.description,
          'restBetweenExercise': workout.restBetweenExercise
      };

      return this.http.post(this.collectionsUrl + '/workouts' + this.params, body)
        .pipe(
          catchError(this.handleError<WorkoutPlan>())
        );

    }

    updateWorkout(workout: WorkoutPlan) {
      const workoutExercises: any = [];
      workout.exercises.forEach(
          (exercisePlan: any) => {
              workoutExercises.push({name: exercisePlan.exercise.name, duration: exercisePlan.duration});
          }
      );

      const body = {
          '_id': workout.name,
          'exercises': workoutExercises,
          'name': workout.name,
          'title': workout.title,
          'description': workout.description,
          'restBetweenExercise': workout.restBetweenExercise
      };

      return this.http.put(this.collectionsUrl + '/workouts/' + workout.name + this.params, body)
        .pipe(
          catchError(this.handleError<WorkoutPlan>())
        );
    }

    deleteWorkout(workoutName: string) {
        return this.http.delete(this.collectionsUrl + '/workouts/' + workoutName + this.params)
          .pipe(
            catchError(this.handleError<WorkoutPlan>())
          );
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: HttpErrorResponse): Observable<T> => {
        if (error.status === 404) {
          console.log('HTTP 404 Not found error');
          return of(result as T);
        } else {
          console.error(error);
          return _throw('An error occurred:', error.error.message);
        }
      };
    }
}
