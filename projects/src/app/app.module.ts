import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WorkoutRunnerModule } from './workout-runner/workout-runner.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { FinishComponent } from './finish/finish.component';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent
  ],
  imports: [
    BrowserModule,
    WorkoutRunnerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
