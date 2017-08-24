import { Component, OnInit, Renderer  } from '@angular/core';
import {fakeAsync} from '@angular/core/testing';
import {Alert} from 'selenium-webdriver';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css']
})
export class Checkout2Component implements OnInit {
  CartedProduct: any = [];
  Total: number;
  model: any = {};
  PicServrUrl = 'http://localhost:8000/media';
  LoginName: string;
  CheckoutMethod = false;
  BillingMethod = false;
  PaymentMethod = false;
  orderreview = true;
  LoggedIn = false;
  BillingMethodButton= true;
  GuestButton = true;
  PaymentatHme = false;

  constructor(private Renderer123: Renderer,
              private _nav: Router) {

  }

  ngOnInit() {
   this.CartedProduct = JSON.parse(sessionStorage.getItem('Cartdata'));

  console.log(this.CartedProduct['products']);
  this.Total = 0;
  for (const tmp of this.CartedProduct['products']) {
    this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
  }

  }

  onChange(qty: string, Abc: any) {

    for (const tmp of this.CartedProduct['products']) {
      if (tmp.ProductID === Abc) {
        tmp.itemsqty = qty;
    }

    }
    this.Total = 0;
    for (const tmp of this.CartedProduct['products']) {
      this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
    }
  }


  TrashcartElement(Abc: any) {
    alert(Abc);
    for (const tmp of this.CartedProduct['products']) {


      if ( tmp.ProductID === Abc ) {
         console.log(tmp);
         this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
         sessionStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
      }

    }



  }s

  ContinuetoCHeckout() {
    if (this.Total > 0) {
      this.CheckoutMethod = true;
      this.orderreview = false;
      this.model.LoginEMail.
      this.Renderer123.selectRootElement('#LoginEmailAddress').focus();

    } else {
       alert('No sufficient Amount');
    }


  }

  LoginUser() {
  this.LoggedIn = true;
    this.LoginName = 'Saqib';
    if (this.LoggedIn === true) {
        this.PaymentMethod = true;
    } else {
      this.BillingMethod = true;
    }

  }

  RegisterOrGuest(Guest: boolean, Register: boolean) {

   if ( Guest === false && Register === false ) {
   alert('Please select an option first');
   } else {
  if ( Guest === true) {

    this.GuestButton = false;
    this.BillingMethod =  true;
  } else {
    this._nav.navigate(['/sign-up']);

  }
   }

  }

  BillingInfo() {
    this.PaymentMethod = true;
    this.BillingMethodButton = false;
  }
  Paymentdisplay(Home: boolean, Online: boolean) {


    if ( Home === false) {
      this.PaymentatHme = false;

       } else {
      this.PaymentatHme = true;

    }
  }



}
