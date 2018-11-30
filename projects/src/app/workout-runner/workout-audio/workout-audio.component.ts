import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAudioDirective } from '../../shared/my-audio.directive';
import { ExerciseProgressEvent, ExerciseChangedEvent } from '../model';

@Component({
  selector: 'abe-workout-audio',
  templateUrl: './workout-audio.component.html',
  styles: []
})
export class WorkoutAudioComponent implements OnInit {
  /**
   * The interesting bit in this outline is the @ViewChild decorator against the five properties. The @ViewChild decorator
   *  allows us to inject a child component/directive/element reference into its parent. The parameter passed to the decorator
   *  is the template variable name, which helps DI match the element/directive to inject. When Angular instantiates the main
   *  WorkoutAudioComponent, it injects the corresponding audio directives based on the @ViewChild decorator and the template
   *  reference variable name passed.
   *
   * The @ViewChild decorator instructs the Angular DI framework to search for some specific child component/directive/element
   *  in the component tree and inject it into the parent. This allows the parent component to interact with child components/element
   *  using the reference to the child, a new communication pattern!
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
