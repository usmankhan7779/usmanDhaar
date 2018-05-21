import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
import {SameurlComponent} from './sameurl.component';
const loginRoutes: Routes = [
  { path: '', component: SameurlComponent }
];


@NgModule({
  declarations: [
    SameurlComponent
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

export class SameurlModule {

}
