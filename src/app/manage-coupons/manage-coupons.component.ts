
import { Component, OnInit } from '@angular/core';
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
  constructor(private obj: ActiveAdServices,
              private _nav: Router) { }

  ngOnInit() {
    this.SessionstoreName = localStorage.getItem('StoreName');
    this.obj.GetAllcoupons(this.SessionstoreName).subscribe(
      data => {
        this.Coupons = data;

      });

  }

verifProduct (abc: string) {

  this.Error2 = false;
  this.Error2 = false;

    this.Waitcall2 = true;



    this.obj.VerifyProductID(abc.substr(0, abc.length), this.SessionstoreName)
      .map(response => {
        alert('safsd');
        if (response.status === 302) {
          this.Waitcall2 = false;
          this.Right2 = true;


        } else {
          this.Waitcall2 = false;
          this.Error2 = true;
        }
      }).subscribe();




}
  updatePassword() {
    this.Error = false;
    this.Right  = false;
    this.Waitcall = true;
    this.obj.InsertDisCountcoupons(this.model['Qty'], this.model['Discount'], this.model['AuctionListing'],   this.SessionstoreName )
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
    localStorage.clear();
  }
}
