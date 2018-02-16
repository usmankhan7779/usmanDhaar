import { Component, OnInit, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImageZoomModule } from 'angular2-image-zoom';
// import './single-product.js';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { HomeService } from '../home/home.services';
import { LoginService } from '../log-in/log-in.services';
import swal from 'sweetalert2';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],

})
export class SingleProductComponent implements OnInit {
  private sub: any;

  model: any = {};
  GetallPhoneProduct: any = [];
  GetallProductReview: any = [];
  element: HTMLElement;
  LoginID:  Boolean = false;
  login_error:  Boolean = false;
  ProID: string;
  PicServrUrl = 'https://apis.dhaar.pk/media/';
  Getphoto: any = [];
  NewBidInserted = false ;
  NewCart = false ;
  Timeclose = false ;
  MinBidPrice = false ;
  amountoffer = false ;
  AuctionTest = true;
  noreview = false;
  Solddd = false;
  soldfix = false;
  WatchStatus = false;
  minOffer = false;
  openreviews = true;
  ourproduct = false;
  minOfferDone = false;
  AuctionProductPrice: number;

  istimer = true;

  resultProduct: any = [];
  BidingProduct: any[] = [];
  // onePeoduct: Productlist[];
  onePeoduct: any = [];
  products: any = {'products': []};

  TmpresultProduct: any = {'products': []};
  GeProductBiding: any = [];
  ProductPrice: any = [];
  ProductPictures: any = [];
  invoice: any = [];
  CatName: string;
  starp: any = 0;
  starq: any;
  starv: any;
  DbDate: string;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  user: any;
  product:any;
  RedirectFromlogin: string;
  LocalStoreName: any;
  MinimumbestOffer: any;
  AuctionDayDB: string;
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private route: ActivatedRoute,
               private GetAdd: HomeService,
               private LOginObj: LoginService,
               private httpService: BuyerDashboardServices,
               private router: Router) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.timer(this.element);
      }, 1000);
      // window.setInterval(function () {
      //
      //
      // }, 1000);


      if (localStorage.getItem('UserID') !== null) {
        this.LoginID = true;
        this.WatchObserver();
      } else {
        this.LoginID = false;
      }


      this.GetAdd.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
        this.GetallPhoneProduct = resSlidersData;
      });

      window.scrollTo(0, 0);
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.CatName = params['CatName'] || '0';
          this.ProID = params['ProID'] || '0';
          this.RedirectFromlogin = params['Redirect'] || null;
          if (this.RedirectFromlogin !== null) {
            if (this.RedirectFromlogin === 'MakeOffer') {
              this.amountoffer = true;
            }
          }


          this.httpService.GetallIDByUser(this.ProID, localStorage.getItem('UserID')).subscribe(
            data => {
              this.invoice = data;
              // if ( this.invoice['0']['id'] !== null ) {
              //   this.openreviews = true;
              // }
            });

          if (this.ProID !== '0') {
            this.GetAdd.GetAllProductPicture(this.ProID).subscribe(resSlidersData => {
              this.ProductPictures = resSlidersData;
            });
          }

          this.GetAdd.GetallUserReviewsBYProductId(this.ProID).subscribe(resSlidersData => {
            this.GetallProductReview = resSlidersData;


            if (this.GetallProductReview.length === 0) {
              this.noreview = true;

            }
          });

          this.GetAdd.GetallBidsProductdbyProductID(this.ProID).subscribe(resSlidersData => {

            this.BidingProduct = resSlidersData;
            // console.log('Bidding Products are:', this.BidingProduct[0].Price);


            this.BidingProduct.sort(function (a, b) {
              // alert('first')
              if (a.Price > b.Price) {
                return -1;
              } else if (a.Price < b.Price) {
                return 1;
              } else {
                return 0;
              }
            });
            console.log('Bidding Products are:', this.BidingProduct[0]['Price']);
          });
        });
      this.GetAdd.GetphotoById().subscribe(resSlidersData => {
        this.Getphoto = resSlidersData;
      });

      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      } else {
        if (this.CatName === 'Phones & Tablets') {

          this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;

            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            console.log('Product attributes', this.resultProduct[0]);
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              console.log('Auction days:', auctiondays);
              const time0 = new Date();
              console.log('time0:', time0);
              const time1 = new Date(this.DbDate);
              console.log('time1:',time1);
              const time3 = ((time1.getTime() - time0.getTime()) + auctiondays);
              console.log('time3:',time3);
              if(time3<=0){
                console.log('This Bidder wins:', this.BidingProduct[0]);
                this.user=this.BidingProduct[0]['User_Id']
                this.product=this.BidingProduct[0]['Product_Id']
                this.GetAdd.InsertwinnerBid(this.user, this.product).subscribe();
              }
              // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
              let x = time3 / 1000;
              this.seconds = Math.floor(x % 60);
              x /= 60;
              this.minutes = Math.floor(x % 60);
              x /= 60;
              this.hours = Math.floor(x % 24);
              x /= 24;
              this.days = Math.floor(x);


            }

          });
        } else if (this.CatName === 'Women\'s Fashion') {
          // console.log('Women\'s Fashion')
          this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;
            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              const time0 = new Date(); //86400000
              const time1 = new Date(this.DbDate);
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
            }
          });


        } else if (this.CatName === 'Men\'s Fashion') {
          this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;
            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              const time0 = new Date(); //86400000
              const time1 = new Date(this.DbDate);
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
            }
          });
        } else if (this.CatName === 'TV, Audio & Video') {
          // console.log('TV, Audio & Video')
          this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;
            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              const time0 = new Date(); //86400000
              const time1 = new Date(this.DbDate);
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
            }
          });
        } else if (this.CatName === 'Computing & Laptops') {
          this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;
            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              const time0 = new Date(); //86400000
              const time1 = new Date(this.DbDate);
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
            }
          });
        } else if (this.CatName === 'Home Appliances') {
          this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData => {
            this.resultProduct = resSlidersData;
            if (this.resultProduct['0']['StoreName'] === localStorage.getItem('StoreName')) {
              this.ourproduct = true;

            }
            if (this.resultProduct[0].Quantity <= 0) {
              this.soldfix = true;
            }
            this.LocalStoreName = this.resultProduct[0].StoreName;
            this.MinimumbestOffer = this.resultProduct[0].Addbestoffer;
            if (this.resultProduct[0].Auction) {
              this.DbDate = this.resultProduct[0].CreatedDate;
              this.AuctionDayDB = this.resultProduct[0].AuctionListing;
              const auctiondays = +this.AuctionDayDB * 86400000;
              const time0 = new Date(); //86400000
              const time1 = new Date(this.DbDate);
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
            }
          });

        }

      }
    }

  }

  WatchObserver() {
    if (isPlatformBrowser(this.platformId)) {
    this.httpService.WatchStatus(this.ProID, localStorage.getItem('UserID')).subscribe( data => {
      console.log('checkkkkkkkkkkk  ',data);
      this.WatchStatus=data.Res
    });
    }
  }

  WatchProduct() {
    if (isPlatformBrowser(this.platformId)) {
      this.GetAdd.WatchProduct(
        this.resultProduct[0]['ProductID'],
        localStorage.getItem('UserID'),
        this.resultProduct[0]['Cat_Name'],
      ).subscribe(data => {
          // console.log(data);
          // this.WatchStatus=false;
          this.WatchObserver();
        },
        error => {
          // console.log(error);
          // this.WatchStatus=true;
        });
    }
  }
  UnwatchProduct() {
    if (isPlatformBrowser(this.platformId)) {
      this.GetAdd.UnwatchProduct(
        this.resultProduct[0]['ProductID'],
        localStorage.getItem('UserID'),
      ).subscribe(data => {
          // console.log(data);
          // this.WatchStatus=false;
          this.WatchObserver();
        },
        error => {
          // console.log(error);
          // this.WatchStatus=true;
        });
    }
  }
  getValueq(event) {
    // //alert(event)
    this.starp = event;
    // //alert(this.star)
  }
  getValuep(event) {
    // //alert(event)
    this.starq = event;
    // //alert(this.star)
  }
  getValuev(event) {
    // //alert(event)
    this.starv = event;
    // //alert(this.star)
  }


  InsertBid(startingPrice: number, MaxPrice: number ) {

    console.log('max', this.resultProduct[0]);
    console.log('start', startingPrice);
    // console.log('UserId is ',this.resultProduct[0]['User_ID']);
    if (localStorage.getItem('UserID')) {
      if (this.model.UserPriceBid > MaxPrice) {
        this.MinBidPrice = false;
        if (this.resultProduct[0]['Cat_Name'] === null) {
          this.router.navigate(['/login']);
        } else if (this.resultProduct[0]['Cat_Name'] === 'Phones & Tablets') {
          this.httpService.InsertPhoneMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        } else if (this.resultProduct[0]['Cat_Name'] === 'Women\'s Fashion') {
          this.httpService.InsertWomenMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        } else if (this.resultProduct[0]['Cat_Name'] === 'Men\'s Fashion') {
          this.httpService.InsertMenMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        } else if (this.resultProduct[0]['Cat_Name'] === 'TV, Audio & Video') {
          this.httpService.InsertTVMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        } else if (this.resultProduct[0]['Cat_Name'] === 'Computing & Laptops') {
          this.httpService.InsertComputingMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        } else if (this.resultProduct[0]['Cat_Name'] === 'Home Appliances') {
          this.httpService.InsertHomeMaxBid(this.resultProduct[0]['ProductID'], this.model.UserPriceBid).subscribe();
        }

        this.GetAdd.InsertUserBid(localStorage.getItem('UserID'), this.ProID, this.model.UserPriceBid).subscribe();

        // this.GetAdd.InsertUserBid(localStorage.getItem('UserID'), this.ProID, this.model.UserPriceBid).subscribe(resSlidersData => {
        //   this.GeProductBiding = resSlidersData;
        //   if (this.CatName === '0') {
        //     this.router.navigate(['/login']);
        //   } else {
        //     if (this.CatName === 'Phones & Tablets') {
        //       this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     } else if (this.CatName === 'Women\'s Fashion') {
        //       // console.log('Women\'s Fashion')
        //       this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     } else if (this.CatName === 'Men\'s Fashion') {
        //       this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     } else if (this.CatName === 'TV, Audio & Video') {
        //       // console.log('TV, Audio & Video')
        //       this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     } else if (this.CatName === 'Computing & Laptops') {
        //       this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     } else if (this.CatName === 'Home Appliances') {
        //       this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        //     }
        //   }
        //
        // });
        console.log(this.GeProductBiding);
        // this.someMethod(true, this.ProID, startingPrice );
        this.NewBidInserted = true;

      } else {
        this.MinBidPrice = true;
      }
    } else {
      swal('Login Required','','error')
    }


  }
  RefreshBids() {
    this.GetAdd.GetallBidsProductdbyProductID(this.ProID).subscribe(resSlidersData => {

      this.BidingProduct = resSlidersData;

      this.BidingProduct.sort(function(a, b) {

        if (a.Price > b.Price) {
          return -1;
        } else if (a.Price < b.Price) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  LoginUser() {

    this.LOginObj.loged_No_redirect(this.model.Username, this.model.Password).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
        this.LoginID = true;
        this.login_error = false;
      },
      (err) => {
        this.login_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }

  Addtocart(Abc: any) {
    if (isPlatformBrowser(this.platformId)) {
      // alert('Message of error');
      // console.log(Abc);
      // console.log('esssssssssss  ', this.resultProduct[0].Quantity);
      // console.log(this.resultProduct['Quantity']);

      if (Abc === '') {
        swal('Please Select Product Quantity first','','error');
      } else if (Abc > this.resultProduct[0].Quantity) {
        swal('You are exceding from Maximum Quantity of product available','','error');
      } else {


        try {


          // this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
          // alert(this.TmpresultProduct['products']);

          if (localStorage.getItem('Cartdata') !== null) {

            this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
            for (const ABCC of this.TmpresultProduct['products']) {

              if (ABCC.ProductID === this.ProID) {  // Checking if the same product also present in cart.
                this.NewCart = true;

              }
            }
            if (this.NewCart === false) {

              // console.log('eeeeeeeee',this.resultProduct[0]);
              this.resultProduct[0].itemsqty = +Abc;
              this.TmpresultProduct = JSON.parse(localStorage.getItem('Cartdata'));
              this.TmpresultProduct['products'].push(this.resultProduct[0]);
              localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));

              // console.log(this.products);
              this.router.navigate(['/checkout2']);
            } else {
              this.router.navigate(['/checkout2']);
            }
          } else {

            this.resultProduct[0].itemsqty = +Abc;
            this.TmpresultProduct['products'].push(this.resultProduct[0]);
            localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
            // console.log(this.products);
            this.router.navigate(['/checkout2']);
          }
        } catch (e) {
          this.resultProduct[0].itemsqty = +Abc;
          this.TmpresultProduct['products'].push(this.resultProduct[0]);
          localStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
          // console.log(this.products);
          this.router.navigate(['/checkout2']);
        }

      }
    }
  }

  ClearSession() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.clear();
    alert('clear');
    }
  }

  CancelOffer() {
   this.amountoffer=false;
  }
  MakeAnOffer() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('Authorization') !== null) {
        this.LOginObj.verify_tokenWithNoRedirict().subscribe((response) => {

            if (response) {

              this.amountoffer = true;
            } else {


              this.router.navigate(['/login'], {queryParams: {CatName: this.CatName, ProID: this.ProID}});

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


      } else {

        this.router.navigate(['/login'], {queryParams: {CatName: this.CatName, ProID: this.ProID}});
      }
    }
  }


  SubmitOffer() {
    this.minOfferDone = false;
    this.minOffer = false;
    // console.log('offer amount is', this.model.OfferAmount);
    // console.log('offer Quantity is', this.model.QuantityProduct);
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

       this.GetAdd.ProductOffers(this.ProID, this.LocalStoreName,this.resultProduct[0]['P_Title'], this.CatName, this.model).subscribe((response) => {
           /* this function is executed every time there's a new output */
           // console.log("VALUE RECEIVED: "+response);
         // alert('inserted');
           swal('Your offer has been sent to the seller. Please wait for the seller to respond.','','success');
           this.minOfferDone = true;
         },
         (err) => {
           //erro
         },
         () => {
           /* this function is executed when the observable ends (completes) its stream */
           //   console.log("COMPLETED");
         }
       );
     } else {
      swal('Please Enter both Fields, Quantiy and Price per Quantity','','error');

    }

  }
  timer(element: HTMLElement) {

     if (!this.Timeclose) {
    //   alert(this.Timeclose)
      this.seconds -= 1;
      if (this.seconds <= 0) {
        this.seconds = 59;
        this.minutes -= 1;
        if (this.minutes <= 0) {
          this.minutes = 59;
          this.hours -= 1;
          if (this.hours <= 0) {
            this.hours = 23;
            this.days -= 1;
            if (this.days <= 0) {
              this.Timeclose = true;
              this.Solddd = true;

              this.seconds = 0;
              this.minutes = 0;
              this.hours = 0;
              this.days = 0;
            }

          }
        }

      }

    }
  }

  SubmitReview() {
    console.log('Store Name is', this.resultProduct[0]['StoreName']);
    this.GetAdd.InsertProductReviews(this.model.YourName, this.model.YourEmail, this.model.YourReview, this.ProID, this.starp, this.resultProduct[0]['StoreName']).subscribe(resSlidersData => {
        swal('Your Review has been submitted','','success');
      },
      (err) => {
        alert('Error');
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }

}
