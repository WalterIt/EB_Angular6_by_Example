import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WorkoutRunnerModule } from './workout-runner/workout-runner.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { FinishComponent } from './finish/finish.component';
import { WorkoutHistoryComponent } from './workout-history/workout-history.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent,
    WorkoutHistoryComponent
  ],
  imports: [
    BrowserModule,
    WorkoutRunnerModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
