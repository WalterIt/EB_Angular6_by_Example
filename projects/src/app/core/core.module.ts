/**
 * The role of the core module is to host services that are available across the application. It is also
 *  a good place to add single-use components that are required when the application starts. A nav bar and
 *  busy indicator are good examples of such components.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule { }
