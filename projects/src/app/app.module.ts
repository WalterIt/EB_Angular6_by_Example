import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WorkoutRunnerModule } from './workout-runner/workout-runner.module';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { WorkoutHistoryComponent } from './workout-history/workout-history.component';
import { FinishComponent } from './finish/finish.component';

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
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

