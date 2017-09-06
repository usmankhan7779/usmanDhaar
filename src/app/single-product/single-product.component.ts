import { Component, OnInit, EventEmitter } from '@angular/core';
// import './single-product.js';
import { Router, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';
import { LoginService } from '../log-in/log-in.services';



@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],

})
export class SingleProductComponent implements OnInit {
  private sub: any;
  model: any = {};
  GetallPhoneProduct: any = [];
  element: HTMLElement;
  LoginID:  Boolean = false;
  login_error:  Boolean = false;
  ProID: string;
  PicServrUrl = 'http://127.0.0.1:8000/media';
  Getphoto: any = [];
  NewBidInserted = false ;
  NewCart = false ;
  Timeclose = false ;
  AuctionTest = true;
  AuctionProductPrice: number;

  istimer=true;

  resultProduct: any = [];
  // onePeoduct: Productlist[];
  onePeoduct: any = [];
  products: any = {'products': []};
  TmpresultProduct: any = {'products': []};
  GeProductBiding: any = [];
  ProductPrice: any = [];
  CatName: string;
  starp: any;
  starq: any;
  starv: any;
  DbDate: string;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  AuctionDayDB: string;
  constructor( private route: ActivatedRoute,
               private GetAdd: HomeService,
               private LOginObj: LoginService,
               private router: Router) { }
  ngOnInit() {
    setInterval(() => {this.timer(this.element); }, 1000);
    // window.setInterval(function () {
    //
    //
    // }, 1000);


    if (sessionStorage.getItem('UserID') !== null) {
      this.LoginID = true;
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
        this.CatName = params['CatName'] || '0' ;
        this.ProID  = params['ProID'] || '0';

      });
    this.GetAdd.GetphotoById().subscribe(resSlidersData => {
      this.Getphoto = resSlidersData;
    });

    if (this.CatName === '0') {
      this.router.navigate(['/login']);
    } else {
      if (this.CatName === 'Phones & Tablets') {
        console.log('Phones & Tablets');

        this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData => {
          this.resultProduct = resSlidersData;

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
          this.minutes = Math.floor( x % 60);
          x /= 60;
         this.hours = Math.floor( x % 24);
          x /= 24;
          this.days = Math.floor(x);


        });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);


      } else if (this.CatName === 'Men\'s Fashion') {
        this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Computing & Laptops') {
        this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Home Appliances') {
        this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      }
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
  InsertBid(startingPrice: number ) {
    this.GetAdd.InsertUserBid(sessionStorage.getItem('UserID'), this.ProID, this.model.UserPriceBid).subscribe(resSlidersData => {
      this.GeProductBiding = resSlidersData;
      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      } else {
        if (this.CatName === 'Phones & Tablets') {
          this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Women\'s Fashion') {
          // console.log('Women\'s Fashion')
          this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Men\'s Fashion') {
          this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'TV, Audio & Video') {
          // console.log('TV, Audio & Video')
          this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Computing & Laptops') {
          this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Home Appliances') {
          this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        }
      }

    });
     console.log(this.GeProductBiding);
    // this.someMethod(true, this.ProID, startingPrice );
    console.log('BIdding');
    this.NewBidInserted = true;
    //UPdate QUery
    console.log('Checking if else');



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

    if (Abc === '') {
    alert('Please Select Product Quantity first');
    } else {



      try {


        // this.TmpresultProduct = JSON.parse(sessionStorage.getItem('Cartdata'));
        // alert(this.TmpresultProduct['products']);

        if (sessionStorage.getItem('Cartdata') !== null ) {

          this.TmpresultProduct = JSON.parse(sessionStorage.getItem('Cartdata'));
          for (const ABCC of this.TmpresultProduct['products']) {

            if (ABCC.ProductID === this.ProID) {
              this.NewCart = true;

            }
          }
          if (this.NewCart === false) {

            this.resultProduct[0].itemsqty = +Abc;
            this.TmpresultProduct = JSON.parse(sessionStorage.getItem('Cartdata'));
            this.TmpresultProduct['products'].push(this.resultProduct[0]);
            sessionStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
            // console.log(this.products);
            this.router.navigate(['/checkout2']);
          } else {
            this.router.navigate(['/checkout2']);
          }
        } else {

          this.resultProduct[0].itemsqty = +Abc;
          this.TmpresultProduct['products'].push(this.resultProduct[0]);
          sessionStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
          // console.log(this.products);
          this.router.navigate(['/checkout2']);
        }
      } catch  (e) {
        this.resultProduct[0].itemsqty = +Abc;
         this.TmpresultProduct['products'].push(this.resultProduct[0]);
           sessionStorage.setItem('Cartdata', JSON.stringify(this.TmpresultProduct));
      // console.log(this.products);
            this.router.navigate(['/checkout2']);
      }

      }

  }

  ClearSession() {
    sessionStorage.clear();
    alert('clear');
  }


  timer(element: HTMLElement) {

  this.seconds -= 1;
  if (this.seconds === 0) {
    this.seconds = 59;
    this.minutes -= 1;
     if (this.minutes === 0) {
       this.minutes = 59;
       this.hours -= 1;
        if ( this.hours === 0 ) {
          this.hours = 23;
          this.days -= 1;
           if (this.days === 0) {
              this.Timeclose = true;
           }

        }
     }

  }

  }

}
