import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {UploadItemService} from '../file-uploads/upload-item-service';
const loginRoutes: Routes = [
  { path: '', component: DashboardComponent }
];


@NgModule({
  declarations: [
    DashboardComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    Ng2PaginationModule,
    FormsModule,
    // TextMaskModule,

    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [UploadItemService],
  exports: []
})

export class DashboardModule {

}
