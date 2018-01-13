import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { JwtHelper } from 'angular2-jwt';
import {tryCatch} from 'rxjs/util/tryCatch';


@Component({
  selector: 'app-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.css']
})
export class ManageCouponsComponent implements OnInit {
  model: any = {};
  jwtHelper: JwtHelper = new JwtHelper();
  match = true;
  Right = false;
  Right2 = false;
  Error = false;
  Error2 = false;
  AllProduct = false;
  AllProductSale = true;
  oneProduct = false;
  notsame = false;
  Waitcall = false;
  Waitcall2 = false;
  USerNameID: any;
  Coupons: any = [];
  MyProduct: any = [];
  SessionstoreName: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: ActiveAdServices,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
    this.obj.GetAllcoupons(this.SessionstoreName).subscribe(
      data => {
        this.Coupons = data;

      });

  }
  }

verifProduct (abc: string) {

  this.Error2 = false;
  this.Right2 = false;

    this.Waitcall2 = true;

  this.obj.VerifyProductID(abc, this.SessionstoreName )
    .subscribe(
      data => {
        this.MyProduct = data;

        console.log(this.MyProduct['results']['0']);
        if (this.MyProduct['results']['0']) {
          console.log('Yahoooo111111', this.model['Qty'], this.model['Discount'], this.model['AuctionListing']);
          this.obj.InsertDisCountcoupons(this.model['Qty'], this.model['Discount'], this.model['AuctionListing'],   this.SessionstoreName, abc )
            .subscribe(
              data => {
                this.Waitcall2 = false;
                this.Waitcall = false;
                // this.alertService.success('Registration successful', true);
                this.Right  = true;
                // alert('success')
              },
              error => {
                this.Waitcall2 = false;
                this.Waitcall = false;
                this.Error = true;
                // this.alertService.error(error);
                // this.loading = false;
                // alert(error);
              });

        } else {
          this.Waitcall2 = false;
          this.Error2 = true;
        }
      },
      error => {
        this.Waitcall2 = false;
        this.Error2 = true;
        // this.alertService.error(error);
        // this.loading = false;
        // alert(error);
      });





}
  updatePassword() {
    this.Error = false;
    this.Error2 = false;
    this.Right  = false;
    this.Right2  = false;
    this.Waitcall = true;
    this.Waitcall2 = false;
    this.obj.InsertDisCountcoupons(this.model['Qty'], this.model['Discount'], this.model['AuctionListing'],   this.SessionstoreName, "" )
      .subscribe(
        data => {
          this.Waitcall = false;
          // this.alertService.success('Registration successful', true);
          this.Right  = true;
          // alert('success')
        },
        error => {
          this.Waitcall = false;
          this.Error = true;
          // this.alertService.error(error);
          // this.loading = false;
          // alert(error);
        });


  }

  AllProductfuc() {
      this.AllProduct = true;
      this.AllProductSale = false;
      }
  AllProductsale() {
    this.AllProduct = false;
    this.AllProductSale = true;
  }
  verifyproductfromDB(abc: string) {

  }


  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
  }
}
