import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CategoryDetailComponent} from "./category-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
import {NewModule} from '../home/new.module';
import {PreloaderFullModule} from '../components/preloader-full/preloader-full.module';
const loginRoutes: Routes = [
  { path: '', component: CategoryDetailComponent }
];


@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    Ng2PaginationModule,
    HeaderModule,
    NewModule,
    PreloaderFullModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class CategoryDetailModule {

}
