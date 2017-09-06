import { Component, OnInit, Renderer  } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../log-in/log-in.services';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css'],
  providers: [LoginService, BuyerDashboardServices ]
})
export class Checkout2Component implements OnInit {
  CartedProduct: any = [];
  public mask = [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public phonemask = [ /\d/, /\d/, /\d/,  /\d/,  '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  Total: number;
  model: any = {};
  mymodel: any = {};
  PicServrUrl = 'http://127.0.0.1:8000/media';
  LoginName: string;
  CheckoutMethod = false;
  BillingMethod = false;

  PaymentMethod = false;
  status= 1;
  orderreview = true;
  LoggedIn = false;
  user: any;
  BillingMethodButton= true;
  GuestButton = true;
  PaymentatHme = false;
  OrderPlaced = false;
  InvoiceIDSet: any;
  id: any;


  constructor(private Renderer123: Renderer,
              private _nav: Router,
              private httpService: LoginService,
              private httpbuyerService: BuyerDashboardServices) {

  }


  ngOnInit() {
    this.id = Math.floor((Math.random()  * 10000) );
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



  }

  ContinuetoCHeckout() {
    if (this.Total > 0) {
      this.CheckoutMethod = true;
      this.orderreview = false;
      // this.model.LoginEMail;
      // this.Renderer123.selectRootElement('#LoginEmailAddress').focus();

    } else {
      alert('No sufficient Amount');
    }


  }

  ShippingDetails()
  {

    console.log(this.model);
    this.httpbuyerService.Invoice(this.id, this.Total, false, true, this.user).subscribe(
      data => {



        console.log( this.CartedProduct['products']);
        for (const item of this.CartedProduct['products']) {
          this.httpbuyerService.InvoiceProducts(sessionStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty).subscribe(
            data => {




            }, (err) => {

              alert(err);
              this.status = 2;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
          );
        }
        this.httpbuyerService.CustomerInvoiceShippingAddress(sessionStorage.getItem('InvoiceID'), this.model.first_name, this.model.last_name, this.model.email_address, this.model.state, this.model.Country, this.model.City, this.model.Zip, this.model.Address, this.model.telephone, this.model.fax).subscribe(
          data => {

           this.OrderPlaced  = true;

            this.InvoiceIDSet =  sessionStorage.getItem('InvoiceID');


          }, (err) => {

            alert(err);
            this.status = 2;
            /* this function is executed when there's an ERROR */
            //   console.log("ERROR: "+err);
          },
        );

      }, (err) => {

        alert('false');
        this.status = 2;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
    );


  }

  LoginUser() {

    this.LoginName = this.model.username;

    this.httpService.loged_No_redirect(this.mymodel.username, this.mymodel.Loginpassword).subscribe(
      data => {
        const User = (sessionStorage.getItem('UserID')) || 0;
        if (User ) {

          this.LoggedIn = true;
          this.PaymentMethod = true;
          this.BillingMethod = true;
          this.user = User;

        } else {
          this.LoggedIn = false;


        }

      }, (err) => {

        this.status = 2;
        alert('wrong');
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
    );

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
