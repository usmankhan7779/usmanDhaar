import { Component, OnInit, Renderer  } from '@angular/core';
import { LoginService } from '../log-in/log-in.services';
import { Router, ActivatedRoute } from '@angular/router';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css'],
  providers: [LoginService, BuyerDashboardServices ]
})
export class Checkout2Component implements OnInit {
  CartedProduct: any = [];
  Total: number;
  public mask = [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public phonemask = [ /\d/, /\d/, /\d/,  /\d/,  '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];


  model: any = {};
  mymodel: any = {};
  PicServrUrl = 'http://localhost:8000/media';
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
              private Profile: LoginService,
              private httpbuyerService: BuyerDashboardServices) {

  }


  ngOnInit() {

    this.CartedProduct = JSON.parse(sessionStorage.getItem('Cartdata'));

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

    for (const tmp of this.CartedProduct['products']) {


      if ( tmp.ProductID === Abc ) {
        console.log(tmp);
        this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
        sessionStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
      }

    }



  }

  ContinuetoCHeckout() {
    this.orderreview = false;
    if (this.Total > 0) {
      this.Profile.verify_tokenWithNoRedirict().subscribe((response) => {

             if (response) {

               this.LoggedIn = true;
               this.LoginName = sessionStorage.getItem('UserName');
               this.PaymentMethod = true;
               this.BillingMethod = true;
               this.user = sessionStorage.getItem('UserID');

             } else {

               this.CheckoutMethod = true;

             }
        },
        (err) => {
          console.log('ERROR:' + err);
          alert(err);
          // this._nav.navigate(['/login']);
        },
        () => {
        }
      );


      // this.model.LoginEMail;
      // this.Renderer123.selectRootElement('#LoginEmailAddress').focus();

    } else {
      alert('No sufficient Amount');
    }


  }

  ShippingDetails() {

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
          this.user = sessionStorage.getItem('UserID');

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
