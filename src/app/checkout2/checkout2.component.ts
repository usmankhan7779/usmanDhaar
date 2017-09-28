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
  private sub: any;

  model: any = {};
  GetUSerDOne: any = [];
  mymodel: any = {};
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  LoginName: string;
  login: string;
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
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: LoginService,
              private Profile: LoginService,
              private httpbuyerService: BuyerDashboardServices) {

  }


  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.login = params['login'] || '0' ;

        if ( this.login === 'yes' ) {
          this.orderreview = false;
          this.LoginName = localStorage.getItem('UserName');
          this.LoggedIn = true;
          this.PaymentMethod = true;
                this.BillingMethod = true;
                this.user = localStorage.getItem('UserID');
                this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
                  this.GetUSerDOne = resSlidersData;

                });
        }

      });
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));

    this.Total = 0;
    for (let tmp of this.CartedProduct['products']) {

      this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
    }
    this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;

    });

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
        localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
      }

    }



  }

  ContinuetoCHeckout() {
    this.orderreview = false;
    if (this.Total > 0) {

      this.Profile.verify_tokenWithNoRedirict().subscribe((response) => {

             if (response) {

               this.LoggedIn = true;
               this.LoginName = localStorage.getItem('UserName');
               this.PaymentMethod = true;
               this.BillingMethod = true;
               this.user = localStorage.getItem('UserID');
               this.LoginName = localStorage.getItem('UserName');
               this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
                 this.GetUSerDOne = resSlidersData;


               });

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
        // console.log( this.CartedProduct['products']);
        for (const item of this.CartedProduct['products']) {
          this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty).subscribe(
            data => {
            }, (err) => {

              alert(err);
              this.status = 2;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
          );
        }
        this.httpbuyerService.CustomerInvoiceShippingAddress(localStorage.getItem('InvoiceID'), this.GetUSerDOne['Fname'],  this.GetUSerDOne['Lname'], this.GetUSerDOne['user_id'], this.GetUSerDOne['State'], this.GetUSerDOne['State'], this.GetUSerDOne['City'], this.GetUSerDOne['Zip'], this.GetUSerDOne['Address'], this.GetUSerDOne['Mobile'], '01').subscribe(
          data => {

           this.OrderPlaced  = true;

            this.InvoiceIDSet =  localStorage.getItem('InvoiceID');


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

    this._nav.navigate(['/login'], {queryParams: { checkout:  'yes' } });

    // this.LoginName = this.model.username;
    //
    // this.httpService.loged_No_redirect(this.mymodel.username, this.mymodel.Loginpassword).subscribe(
    //   data => {
    //     const User = (localStorage.getItem('UserID')) || 0;
    //     if (User ) {
    //
    //       this.LoggedIn = true;
    //       this.PaymentMethod = true;
    //       this.BillingMethod = true;
    //       this.user = localStorage.getItem('UserID');
    //       this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
    //         this.GetUSerDOne = resSlidersData;
    //
    //       });
    //
    //     } else {
    //       this.LoggedIn = false;
    //
    //
    //     }
    //
    //   }, (err) => {
    //
    //     this.status = 2;
    //     alert('wrong');
    //     /* this function is executed when there's an ERROR */
    //     //   console.log("ERROR: "+err);
    //   },
    // );

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
