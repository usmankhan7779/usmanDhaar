import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from './sign-up.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: SignUpComponent }
];


@NgModule({
  declarations: [
    SignUpComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    TextMaskModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SignUpModule {

}
