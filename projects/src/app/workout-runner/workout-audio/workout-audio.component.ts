import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAudioDirective } from '../../shared/my-audio.directive';
import { ExerciseProgressEvent, ExerciseChangedEvent } from '../../core/model';

@Component({
  selector: 'abe-workout-audio',
  templateUrl: './workout-audio.component.html',
  styles: []
})
export class WorkoutAudioComponent implements OnInit {
  /**
   * The directive (MyAudioDirective) associated with the audio tag was injected into the WorkoutAudio implementation
   *  using the @ViewChild decorator. The parameters passed to @ViewChild are the template variable names (such as tick)
   *  used to locate the element in the view definition. The WorkoutAudio component then used these audio directives to
   *  control the audio playback for 7 Minute Workout.
   */
  @ViewChild('ticks') private ticks: MyAudioDirective;
  @ViewChild('nextUp') private nextUp: MyAudioDirective;
  @ViewChild('nextUpExercise') private nextUpExercise: MyAudioDirective;
  @ViewChild('halfway') private halfway: MyAudioDirective;
  @ViewChild('aboutToComplete') private aboutToComplete: MyAudioDirective;
  private nextupSound: string;

  constructor() { }

  ngOnInit() {
  }

  stop() {
    this.ticks.stop();
    this.nextUp.stop();
    this.halfway.stop();
    this.aboutToComplete.stop();
    this.nextUpExercise.stop();
  }
  resume() {
    this.ticks.start();
    if (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete) { this.nextUp.start(); }
    else if (this.nextUpExercise.currentTime > 0 && !this.nextUpExercise.playbackComplete) { this.nextUpExercise.start(); }
    else if (this.halfway.currentTime > 0 && !this.halfway.playbackComplete) { this.halfway.start(); }
    else if (this.aboutToComplete.currentTime > 0 && !this.aboutToComplete.playbackComplete) { this.aboutToComplete.start(); }
  }

  onExerciseProgress(progress: ExerciseProgressEvent) {
    if (progress.runningFor === Math.floor(progress.exercise.duration / 2)
      && progress.exercise.exercise.name !== 'rest') {
      this.halfway.start();
    }
    else if (progress.timeRemaining === 3) {
      this.aboutToComplete.start();
    }
  }

  onExerciseChanged(state: ExerciseChangedEvent) {
    if (state.current.exercise.name === 'rest') {
      this.nextupSound = state.next.exercise.nameSound;
      setTimeout(() => this.nextUp.start(), 2000);
      setTimeout(() => this.nextUpExercise.start(), 3000);
    }
  }
}
