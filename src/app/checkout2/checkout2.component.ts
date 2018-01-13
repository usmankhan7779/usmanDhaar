<<<<<<< HEAD
import { Component, OnInit, Renderer, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit, Renderer  } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { LoginService } from '../log-in/log-in.services';
import { ActiveAdServices } from '../active-ad/active-ad.services';
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
  TotalDiscount: number;
  public mask = [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public phonemask = [ /\d/, /\d/, /\d/,  /\d/,  '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  private sub: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  model: any = {};
  GetUSerDOne: any = [];
  GetUSallerCoupon: any = [];
  mymodel: any = {};
<<<<<<< HEAD
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media/';
=======
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
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


<<<<<<< HEAD
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private Renderer123: Renderer,
=======
  constructor(private Renderer123: Renderer,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: LoginService,
              private httpServiceads: ActiveAdServices,
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
<<<<<<< HEAD
          if (isPlatformBrowser(this.platformId)) {
          this.LoginName = localStorage.getItem('UserName');
          }
          this.LoggedIn = true;
          this.PaymentMethod = true;
                this.BillingMethod = true;
                if (isPlatformBrowser(this.platformId)) {
                  this.user = localStorage.getItem('UserID');
=======
          this.LoginName = localStorage.getItem('UserName');
          this.LoggedIn = true;
          this.PaymentMethod = true;
                this.BillingMethod = true;
                this.user = localStorage.getItem('UserID');
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
                this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
                  this.GetUSerDOne = resSlidersData;
                  if ( this.GetUSerDOne['Complete'] === false) {
                    this._nav.navigate(['/user-detail'], {queryParams: {Inc: 'true'}});
                  }
                });
<<<<<<< HEAD
                }
        }
      });
    if (isPlatformBrowser(this.platformId)) {
      this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
    }
=======
        }
      });
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

    this.Total = 0;
    for (const tmp of this.CartedProduct['products']) {

      this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
    }
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;

    });
<<<<<<< HEAD
    }
=======

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
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
<<<<<<< HEAD
        if (isPlatformBrowser(this.platformId)){
        localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
        }
=======
        localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
      }
    }



  }

  Applycoupon (abc: string) {

    if ( this.CartedProduct['products'] ) {
      console.log(this.CartedProduct['products']);
      this.httpServiceads.GetOnecouponsByID(this.CartedProduct['products'][0]['StoreName'], abc).subscribe(resSlidersData => {
        this.GetUSallerCoupon = resSlidersData;

        const auctiondays = +this.GetUSallerCoupon[0]['Day'] * 86400000;
        const time0 = new Date(); //86400000
        const time1 = new Date(this.GetUSallerCoupon[0].CreatedDate);
        const time3 = ((time1.getTime() - time0.getTime()) + auctiondays);
        // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
        let x = time3 / 1000;
        this.seconds = Math.floor(x % 60);
        x /= 60;
        this.minutes = Math.floor(x % 60);
        x /= 60;
        this.hours = Math.floor(x % 24);
        x /= 24;
        this.days = Math.floor(x);

        if ( this.days > 0 ) {


         const pid = this.GetUSallerCoupon[0]['ProductID'];

          if (pid === '') {


            const Discountperc = +this.GetUSallerCoupon[0]['Discount'];
            // alert(Discountperc)
            // alert(this.Total)

            const disamount  =  this.Total * Discountperc;
            // alert(disamount);
            this.TotalDiscount  =   disamount / 100;

            // alert(disamount1)
            this.Total = this.Total - this.TotalDiscount ;


          } else {
            const Discountperc = +this.GetUSallerCoupon[0]['Discount'];


            for ( const abc of this.CartedProduct['products'] )
            {

<<<<<<< HEAD
              if (abc.ProductID === pid )
=======
              if(abc.ProductID === pid )
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
              {
                const disamount  =  abc.FixedPrice * Discountperc;
                this.TotalDiscount  =   disamount / 100;

                // alert(disamount1)
                abc.FixedPrice = abc.FixedPrice - this.TotalDiscount ;

              }


            }



          }

        }



      });
    }

  }



  ContinuetoCHeckout() {
<<<<<<< HEAD
    // console.log('itemsqty',this.CartedProduct['products'][0]['itemsqty']);
    // console.log('Quantity',this.CartedProduct['products'][0]['Quantity']);

    if (this.CartedProduct['products'][0]['itemsqty'] > this.CartedProduct['products'][0]['Quantity']){
      alert('You are exceding from Maximum Quantity of product available');
    } else {
      this.orderreview = false;
      if (this.Total > 0) {

        this.Profile.verify_tokenWithNoRedirict().subscribe((response) => {

            if (response) {
              if (isPlatformBrowser(this.platformId)){

              this.LoggedIn = true;
              this.LoginName = localStorage.getItem('UserName');
              this.PaymentMethod = true;
              this.BillingMethod = true;
              this.user = localStorage.getItem('UserID');
              this.LoginName = localStorage.getItem('UserName');
              this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
                this.GetUSerDOne = resSlidersData;

                if (this.GetUSerDOne['Complete'] === false) {
                  this._nav.navigate(['/user-detail'], {queryParams: {Inc: 'true'}});
                }

              });
              }

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
=======
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

                 if ( this.GetUSerDOne['Complete'] === false) {
                   this._nav.navigate(['/user-detail'], {queryParams: {Inc: 'true'}});
                 }

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


>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }

  ShippingDetails() {

<<<<<<< HEAD
    for (const itm of this.CartedProduct['products']) {

      if (itm.Cat_Name === 'Phones & Tablets') {

        this.httpbuyerService.PhoneAndTabletQuantity(itm.ProductID, itm.itemsqty).subscribe();

      } else if (itm.Cat_Name === 'Women\'s Fashion') {

        this.httpbuyerService.WomenFashionQuantity(itm.ProductID, itm.itemsqty).subscribe();

      } else if (itm.Cat_Name === 'Men\'s Fashion') {

        this.httpbuyerService.MenFashionQuantity(itm.ProductID, itm.itemsqty).subscribe();

      } else if (itm.Cat_Name === 'TV, Audio & Video') {

        this.httpbuyerService.TVAudioVideoQuantity(itm.ProductID, itm.itemsqty).subscribe();

      } else if (itm.Cat_Name === 'Computing & Laptops') {

        this.httpbuyerService.ComputingLaptopsQuantity(itm.ProductID, itm.itemsqty).subscribe();

      } else if (itm.Cat_Name === 'Home Appliances') {

        this.httpbuyerService.HomeAppliancesQuantity(itm.ProductID, itm.itemsqty).subscribe();
      }
    }

=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    // console.log(this.model);
    this.httpbuyerService.Invoice(this.id, this.Total, false, true, this.user).subscribe(
      data => {
        // console.log( this.CartedProduct['products']);
        for (const item of this.CartedProduct['products']) {
<<<<<<< HEAD
          if (isPlatformBrowser(this.platformId)){
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
          this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty).subscribe(
            data => {

            }, (err) => {

              alert(err);
              this.status = 2;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
          );
<<<<<<< HEAD
          }
        }
        if (isPlatformBrowser(this.platformId)){
=======
        }
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
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
<<<<<<< HEAD
        }
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

      }, (err) => {

        alert('false');
        this.status = 2;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
    );

<<<<<<< HEAD
    // for (const tmp of this.CartedProduct['products']) {
    //     console.log(tmp);
    //     this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), this.CartedProduct['products'].length );
    //     localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
    // }
    if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('Cartdata');
    }



=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

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
