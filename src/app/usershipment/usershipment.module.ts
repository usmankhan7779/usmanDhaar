import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
// import {UserDetailComponent} from "./user-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import { UsershipmentComponent} from './usershipment.component';
import { MatDialog,MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const loginRoutes: Routes = [
  { path: '', component: UsershipmentComponent }
];


@NgModule({
  declarations: [
    UsershipmentComponent,
  ],

  imports: [
    CommonModule,
    HeaderModule,
    // Ng2PaginationModule,
    FormsModule,
    TextMaskModule,
    MatDialogModule,
    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ],
  
})

export class UserShipmentModule {

}
