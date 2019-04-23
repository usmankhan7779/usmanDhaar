import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
// import {UserDetailComponent} from "./user-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
// import { UsershipmentComponent } from './usershipment.component';
import { UsershipmentupdateComponent } from './usershipmentupdate.component';
const loginRoutes: Routes = [
  { path: '', component: UsershipmentupdateComponent }
];


@NgModule({
  declarations: [
    UsershipmentupdateComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,

    FormsModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class UserShipmentUpdateModule {

}
