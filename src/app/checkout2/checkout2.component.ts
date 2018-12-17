import { Component, OnInit, Renderer, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { LoginService } from '../log-in/log-in.services';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Router, ActivatedRoute } from '@angular/router';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import swal from 'sweetalert2';
import { HomeService } from '../home/home.services';

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
  LoginName: string;
  login: string;
  CheckoutMethod = false;
  BillingMethod = false;
  GuestBillingMethod = false;

  PaymentMethod = false;
  status= 1;
  orderreview = true;
  LoggedIn = false;
  user: any;
  BillingMethodButton= true;
  GuestButton = false;
  PaymentatHme = false;
  OrderPlaced = false;
  GuestOrderPlaced = false;

  InvoiceIDSet: any;
  id: any;
  ProPics: any=[];


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private Renderer123: Renderer,
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: LoginService,
              private httpServiceads: ActiveAdServices,
              private Profile: LoginService,
              private GetAdd: HomeService,
              private httpbuyerService: BuyerDashboardServices) {

  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {


      console.log('Yahoooo', this.OrderPlaced);
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.login = params['login'] || '0' ;
        console.log('Yahoooo', this.login);

        if ( this.login === 'yes' ) {
          this.orderreview = false;
          this.LoginName = localStorage.getItem('UserName');

          this.LoggedIn = true;
          this.PaymentMethod = true;
                this.BillingMethod = true;
                  this.user = localStorage.getItem('UserID');
                this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
                  this.GetUSerDOne = resSlidersData;
                  console.log('User done info are:', this.GetUSerDOne);
                  if ( this.GetUSerDOne['Complete'] === false) {
                    this._nav.navigate(['/user-detail'], {queryParams: {Inc: 'true'}});
                  }
                });

        }
      });
  //  GetAllProductcart(pk: string) {
    this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

        this.CartedProduct = resSlidersData;
        console.log(this.CartedProduct.Results,'cart')

   
      // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      console.log('Carted products are:', this.CartedProduct);
      for (const tmp1 of this.CartedProduct.Results) {
        console.log('Temp1 is:', tmp1);
        console.log('Values are:',tmp1.Pic);
        this.ProPics.push(tmp1.Pic.split(',')[0]);
      }
      console.log('Pics are are:', this.ProPics);


    this.Total = 0;
    for (const tmp of this.CartedProduct.Results) {

      this.Total = this.Total + (tmp.FixedPrice * tmp.Quantity);
      console.log(tmp.FixedPrice,'total')
    }
  });
    this.httpService.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;

    });

    // for (const {item,index} of this.CartedProduct['products'].map((item,index) => ({item,index}))) {
    //   if(index === this.CartedProduct['products'].length-1) {
    //     console.log('item is:  ', item, '  Index is:  ', index);
    //   }
    // }

    }
  }

  onChange(qty: string, Abc: any) {

    for (const tmp of this.CartedProduct.Results) {
      if (tmp.ProductID === Abc) {
        tmp.Quantity = qty;
      }

    }
    this.Total = 0;
    for (const tmp of this.CartedProduct.Results) {
      this.Total = this.Total + (tmp.FixedPrice * tmp.Quantity);
    }
  }


  TrashcartElement(Abc: any) {

    if (isPlatformBrowser(this.platformId)){

    for (const tmp of this.CartedProduct.Results) {
      if ( tmp.id === Abc ) {
        console.log(tmp.id);
        this.GetAdd.DeleteTodoList(tmp.id).subscribe(data => {
          alert(tmp.id)
          swal('Your offer has been Deleted.','','success');
          this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

            this.CartedProduct = resSlidersData;
            console.log(this.CartedProduct.Results,'cart')
          });

        });
      //  this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
        //localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
        }
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

              if (abc.ProductID === pid )
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

    if (isPlatformBrowser(this.platformId)) {
      // console.log('itemsqty',this.CartedProduct['products'][0]['itemsqty']);
      // console.log('Quantity',this.CartedProduct['products'][0]['Quantity']);

      if (this.CartedProduct['products'][0]['itemsqty'] > this.CartedProduct['products'][0]['Quantity']) {
        alert('You are exceding from Maximum Quantity of product available');
      } else {
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

                  if (this.GetUSerDOne['Complete'] === false) {
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

      }
    }
  }

  GuestShippingDetails() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.model);
      console.log('id value is:', this.id);
      this.httpbuyerService.Invoice(this.id, this.Total, false, true, 'Guest').subscribe(
        data => {
          // console.log( this.CartedProduct['products']);
          for (const item of this.CartedProduct['products']) {
            this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty, 'Guest').subscribe(
              data => {

              }, (err) => {

                alert(err);
                this.status = 2;
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
            );
          }
          this.httpbuyerService.CustomerInvoiceShippingAddress(localStorage.getItem('InvoiceID'),this.model.fname,this.model.lname,this.model.email,this.model.state,this.model.country,this.model.city, this.model.zip, this.model.address, this.model.mobile, '01').subscribe(
            data => {

              this.GuestOrderPlaced  = true;

              this.InvoiceIDSet =  localStorage.getItem('InvoiceID');



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

      // for (const tmp of this.CartedProduct['products']) {
      //     console.log(tmp);
      //     this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), this.CartedProduct['products'].length );
      //     localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
      // }
      localStorage.removeItem('Cartdata');

    }
  }

  ShippingDetails() {

    if (isPlatformBrowser(this.platformId)) {
    console.log(this.model);
    console.log('id value is:', this.id);
    this.httpbuyerService.Invoice(this.id, this.Total, false, true, this.user).subscribe(
      data => {
        // console.log( this.CartedProduct['products']);
        for (const {item,index} of this.CartedProduct['products'].map((item,index) => ({item,index}))) {
          if (index === this.CartedProduct['products'].length - 1) {
            console.log('item is:  ', item, '  Index is:  ', index);
            this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty, localStorage.getItem('UserID')).subscribe(
              data => {
                this.httpbuyerService.SendEmail(localStorage.getItem('InvoiceID')).subscribe(data => {
                  console.log('Email Successssssssss');
                });
              }, (err) => {

                alert(err);
                this.status = 2;
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
            );
          } else {
            console.log('item is:  ', item, '  Index is:  ', index);
            this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty, localStorage.getItem('UserID')).subscribe(
              data => {

              }, (err) => {

                alert(err);
                this.status = 2;
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
            );
          }
        }
        this.httpbuyerService.CustomerInvoiceShippingAddress(localStorage.getItem('InvoiceID'), this.GetUSerDOne['Fname'],  this.GetUSerDOne['Lname'], this.GetUSerDOne['user_id'], this.GetUSerDOne['State'], this.GetUSerDOne['State'], this.GetUSerDOne['City'], this.GetUSerDOne['Zip'], this.GetUSerDOne['Address'], this.GetUSerDOne['Mobile'], '01').subscribe(
          data => {

           this.OrderPlaced  = true;
           swal('Your Order Has Been Placed','','success');

            this.InvoiceIDSet =  localStorage.getItem('InvoiceID');



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

    // for (const tmp of this.CartedProduct['products']) {
    //     console.log(tmp);
    //     this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), this.CartedProduct['products'].length );
    //     localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
    // }
    localStorage.removeItem('Cartdata');

    }
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

  GuestCheck() {
    this.GuestBillingMethod = true;
  }

  RegisterOrGuest(Guest: boolean, Register: boolean) {

    if ( Guest === false && Register === false ) {
      alert('Please select an option first');
    } else {
      if ( Guest === true) {

        this.GuestButton = true;
        // this.GuestBillingMethod =  true;
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
