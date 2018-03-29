import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LogInComponent} from "./log-in.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HeaderModule} from "../header/header.module";
import {RecaptchaModule} from 'ng-recaptcha';
const loginRoutes: Routes = [
  { path: '', component: LogInComponent }
];

@NgModule({
  declarations: [
    LogInComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    // HeaderModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class LoginModule {

}
