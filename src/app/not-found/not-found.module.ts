import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./not-found.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    NotFoundComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    // Ng2PaginationModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class NotFoundModule {

}
