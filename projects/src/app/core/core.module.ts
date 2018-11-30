import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
/**
 * While ngx-modialog has a number of predefined templates for standard dialogs, such as alert, prompt, and confirm,
 *  these dialogs provide little customization in terms of look and feel. To have better control over the dialog UI,
 *  we need to create a custom dialog, which thankfully the library supports.
 */
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule { }
