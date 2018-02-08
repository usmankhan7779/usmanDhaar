import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResetPasswordComponent} from "./reset-password.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: ResetPasswordComponent }
];


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],

  imports: [
    CommonModule,
    Ng2PaginationModule,
    FormsModule,
    HeaderModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class ResetPasswordModule {

}
