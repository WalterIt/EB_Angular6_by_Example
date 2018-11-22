import { ExercisePlan } from '../workout-runner/model';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CoreModule } from './core.module';

@Injectable({
  /**
   * The providedIn:'root' property on Injectable instructs Angular to create a provider with the root injector.
   *  The sole job of this provider is to create the WorkoutHistoryTrackerService service and return it when Angular's
   *  DI injector desires. Any service that we create/use needs to be registered on an injector. As the Angular documentation
   *   on providers describes,
   * Providers tell the injector how to create the service. Without a provider, the injector would not know that it is
   *  responsible for injecting the service nor be able to create the service.
   */
  providedIn: CoreModule
})
export class WorkoutHistoryTrackerService {
  /**
   *  maxHistoryItems allows us to configure the maximum number of items to store in the workoutHistory array, the array
   *  that contains the historical data.
   */
  private maxHistoryItems = 20;   // We only track for last 20 exercise
  private currentWorkoutLog: WorkoutLogEntry = null;
  private workoutHistory: Array<WorkoutLogEntry> = [];
  private workoutTracked: boolean;
  private storageKey = 'workouts';

  constructor(private storage: LocalStorageService) {
    this.workoutHistory = (storage.getItem<Array<WorkoutLogEntry>>(this.storageKey) || [])
      .map((item: WorkoutLogEntry) => {
        item.startedOn = new Date(item.startedOn.toString());
        item.endedOn = item.endedOn == null ? null : new Date(item.endedOn.toString());
        return item;
      });
  }

  /**
   *  The get tracking() method defines a getter property for workoutTracked in TypeScript. workoutTracked is set to
   *  true during workout execution.
   */
  get tracking(): boolean {
    return this.workoutTracked;
  }

  /**
   * The startTracking function creates a WorkoutLogEntry and adds it to the workoutHistory array. By setting
   *  the currentWorkoutLog to the newly created log entry, we can manipulate it later during workout execution.
   */
  startTracking() {
    this.workoutTracked = true;
    this.currentWorkoutLog = new WorkoutLogEntry(new Date());
    if (this.workoutHistory.length >= this.maxHistoryItems) {
      this.workoutHistory.shift();
    }
    this.workoutHistory.push(this.currentWorkoutLog);
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  // The exerciseComplete function should be called on completion of each exercise that is part of the workout.
  exerciseComplete(exercise: ExercisePlan) {
    this.currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this.currentWorkoutLog.exercisesDone;
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  /**
   * The endTracking function and the exerciseComplete function just alter currentWorkoutLog.
   */
  endTracking(completed: boolean) {
    this.currentWorkoutLog.completed = completed;
    this.currentWorkoutLog.endedOn = new Date();
    this.currentWorkoutLog = null;
    this.workoutTracked = false;
    this.storage.setItem(this.storageKey, this.workoutHistory);
  }

  getHistory(): Array<WorkoutLogEntry> {
    return this.workoutHistory;
  }
}

/**
 *  As the name suggests, WorkoutLogEntry defines log data for one workout execution.
 */
export class WorkoutLogEntry {
  constructor(
    public startedOn: Date,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: Date) { }
}
