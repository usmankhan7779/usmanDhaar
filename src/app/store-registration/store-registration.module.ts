import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StoreRegistrationComponent} from "./store-registration.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: StoreRegistrationComponent }
];


@NgModule({
  declarations: [
    StoreRegistrationComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    // Ng2PaginationModule,
    FormsModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class StoreRegistrationModule {

}
