import { NgModule } from '@angular/core';
/**  CommonModule
* The only thing that might look different here from the other modules that we have created is that we are
   importing CommonModule instead of BrowserModule. This avoids importing the whole of BrowserModule a second
   time, which would generate an error when we get to implementing lazy loading for this module.
 */
import { CommonModule } from '@angular/common';
/**
 * Reactive forms use three new form directives that we haven't discussed before: FormGroup, FormControl, and
 *  FormArray. These directives allow the form object that is constructed in code to be tied directly to the HTML
 *  markup in the template. The form controls that are created in the component class are then directly available
 *  in the form itself. Technically speaking, this means that we don't need to use ngModel (which is integral to
 *  template-driven forms) with reactive forms (although it can be used). The overall approach is a cleaner and less
 *  cluttered template with more focus on the code that drives the form. Let's get started with building a reactive form.
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkoutBuilderRoutingModule } from './workout-builder-routing.module';

import { WorkoutBuilderComponent } from './workout-builder.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsComponent } from './workouts/workouts.component';

import { LeftNavExercisesComponent } from './navigation/left-nav-exercises.component';
import { LeftNavMainComponent } from './navigation/left-nav-main.component';
import { SubNavMainComponent } from './navigation/sub-nav-main.component';
import { SharedModule } from '../shared/shared.module';

import { WorkoutBuilderService } from './builder-services/workout-builder.service';
import { WorkoutResolver } from './workout/workout.resolver';

import { ExerciseBuilderService } from './builder-services/exercise-builder.service';
import { ExerciseResolver } from './exercise/exercise.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutBuilderRoutingModule,
    SharedModule
  ],
  declarations: [
    WorkoutBuilderComponent,
    ExerciseComponent,
    ExercisesComponent,
    WorkoutComponent,
    WorkoutsComponent,
    LeftNavExercisesComponent,
    LeftNavMainComponent,
    SubNavMainComponent],
  providers: [
    /**
     * Adding WorkoutBuilderService as a provider here means that it will only be loaded when the Workout Builder feature is being
     *  accessed and it cannot be reached outside this module. This means that it can be evolved independently of
     *  other modules in the application and can be modified without affecting other parts of the application.
     */
    WorkoutBuilderService,
    WorkoutResolver,
    ExerciseBuilderService,
    ExerciseResolver
   ]
})
export class WorkoutBuilderModule { }
