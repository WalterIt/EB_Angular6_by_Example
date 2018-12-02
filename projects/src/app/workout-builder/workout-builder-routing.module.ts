import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutBuilderComponent } from './workout-builder.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutResolver } from './workout/workout.resolver';
import { ExerciseResolver } from './exercise/exercise.resolver';

/**
 * As you can see, we are importing the components we just mentioned; they will be part of our Workout
 *  Builder (exercise, exercises, workout, and workouts). Along with those imports, we are also importing
 *  NgModule from the Angular core module and Routes and RouterModule from the Angular router module. These
 *  imports will give us the ability to add and export child routes.
 */
const routes: Routes = [
  {
    path: '',
    component: WorkoutBuilderComponent,
    children: [
        /**
         * One thing to note here is that we have set up Workouts as the default for the child routes with the
         *  following configuration:
                {path:'', pathMatch: 'full', redirectTo: 'workouts'},

            This configuration indicates that if someone navigates to builder, they will be redirected to the
             builder/workouts route. The pathMatch: 'full' setting means that the match will only be made if the
              path after workout/builder is an empty string. This prevents the redirection from happening if the
               routes are something else, such as workout/builder/exercises or any of the other routes we have
                configured within this file.
         */
         {path: '', pathMatch: 'full', redirectTo: 'workouts'},
         {path: 'workouts', component: WorkoutsComponent },
         {path: 'workout/new',  component: WorkoutComponent, resolve: { workout: WorkoutResolver} },
         {path: 'workout/:id', component: WorkoutComponent, resolve: { workout: WorkoutResolver} },
         {path: 'exercises', component: ExercisesComponent},
         {path: 'exercise/new', component: ExerciseComponent, resolve: { exercise: ExerciseResolver} },
         {path: 'exercise/:id', component: ExerciseComponent, resolve: { exercise: ExerciseResolver} }
    ]
  },
];

@NgModule({
  /**
   * This import is very similar to the one in app.routing-module.ts, with one difference: instead of RouterModule.forRoot,
   *  we are using RouterModule.forChild. The reason for the difference may seem self-explanatory: we are creating child
   *  routes, not the routes in the root of the application, and this is how we signify that. Under the hood, however, there
   *  is a significant difference. This is because we cannot have more than one router service active in our application.
   *  forRoot creates the router service but forChild does not.
   */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutBuilderRoutingModule { }
