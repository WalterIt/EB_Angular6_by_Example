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
         /**
          * The WorkoutComponent is associated with two routes, namely /builder/workout/new and /builder/workout/:id.
          *  The difference in these two routes lies in what is at the end of these routes; in one case, it is /new,
          *  and in the other, /:id. These are called route parameters. The :id in the second route is a token for a
          *  route parameter. The router will convert the token to the ID for the workout component. As we saw earlier,
          *  this means that the URL that will be passed to the component in the case of 7 Minute Workout will be /builder
          *  /workout/7MinuteWorkout.
          */
         {path: 'workouts', component: WorkoutsComponent },
         /**
          * Route guards - RESOLVE
          *
          * But before the link takes the user to the WorkoutComponent, there is another step along the way that we need
          *  to consider. The possibility always exists that the ID that is passed in the URL for editing a workout could
          *  be incorrect or missing. In those cases, we do not want the component to load, but instead we want to have the
          *  user redirected to another page or back to where they came from.
          *
          * Angular offers a way to accomplish this result with route guards. As the name implies, route guards provide a
          *  way to prevent navigation to a route. A route guard can be used to inject custom logic that can do things such
          *  as check authorization, load data, and make other verifications to determine whether the navigation to the
          *  component needs to be canceled or not. And all of this is done before the component loads so it is never seen if
          *  the routing is canceled.
          *
          * Angular offers several route guards, including CanActivate, CanActivateChild, CanDeActivate, Resolve, and CanLoad.
          *  At this point, we are interested in the Resolve route guard. The Resolve guard will allow us not only to check
          *  for the existence of a workout, but also to load the data associated with a workout before loading the
          *  WorkoutComponent. The advantage of doing the latter is that we avoid the necessity of checking to make sure the
          *  data is loaded in the WorkoutComponent and it eliminates adding conditional logic throughout its component
          *  template to make sure that the data is there when it is rendered.  This will be especially useful when in the next
          *  chapter when we start using observables where we must wait for the observable to complete before we are guaranteed
          *  of having the data that it will provide. The Resolve guard will handle waiting for the observable to complete,
          *  which means that the WorkoutComponent will be guaranteed to have the data that it needs before it loads.
          *
          * As you can see, we add WorkoutResolver to the routing module's imports. Then, we add resolve { workout:
          * WorkoutResolver } to the end of the route configuration for workout/new and workout/:id . This instructs the
          *  router to use the WorkoutResolver resolve method and assign its return value to workout in the route's data.
          *  This configuration means that WorkoutResolver will be called prior to the router navigating to WorkoutComponent
          *  and that the workout data will be available to the WorkoutComponent when it loads. We'll see how to extract this
          *  data in the WorkoutComponent in the next section.
          */
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
