import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
// import {SellerPurchasingComponent} from "./seller-purchasing.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
import { SellerReceiveOrderComponent } from './seller-receive-order.component';
const loginRoutes: Routes = [
  { path: '', component: SellerReceiveOrderComponent }
];


@NgModule({
  declarations: [
    SellerReceiveOrderComponent
  ],

  imports: [
    CommonModule,
    Ng2PaginationModule,
    HeaderModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SellerReceiveorderModule {

}
