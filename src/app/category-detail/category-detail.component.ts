import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {CategoryServices} from './category-detail.services';
import {Ng2PaginationModule} from 'ng2-pagination';

import {Router, RouterModule, ActivatedRoute} from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  r: any;
  pageno: any;
  CoverPix: any;
  sub: any;
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  Cart = false;
  View = false;
  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;
  Waitcall = false;
  errormessage = false;
  CatName: any;
  CartedProduct: any = [];
  Total: number;
  ProType = false;
  ProStatus = false;
  Price1: string;
  Price2: string;
  PriceStatus = false;
  BothCheck = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _nav: Router,
              private route: ActivatedRoute,
              private httpService: CategoryServices) {
  }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    // alert(this.pageno);
    this.httpService.getAllPhoneAndTabletProduct(this.pageno, this.CatName).subscribe(
      data => {
        this.Trend = data;
      });
  }

  ngOnInit() {
    this.Waitcall = true;
    this.errormessage = false;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.CatName = params['CatName'] || '0';

        if (this.CatName === 'Phones & Tablets') {
          this.CoverPix = 'PT';
        } else if (this.CatName === 'Women\'s Fashion') {
          this.CoverPix = 'WF';
        } else if (this.CatName === 'Men\'s Fashion') {
          this.CoverPix = 'MF';
        } else if (this.CatName === 'TV, Audio & Video') {
          this.CoverPix = 'TAV';
        } else if (this.CatName === 'Computing & Laptops') {
          this.CoverPix = 'CL';
        } else if (this.CatName === 'Home Appliances') {
          this.CoverPix = 'HA';
        } else if (this.CatName === 'Sports Goods') {
          this.CoverPix = 'SG';
        } else if (this.CatName === 'Baby & Kids') {
          this.CoverPix = 'BK';
        } else if (this.CatName === 'Health & Beauty') {
          this.CoverPix = 'HB';
        } else if (this.CatName === 'Vehicles & GPS') {
          this.CoverPix = 'VG';
        }


        // alert(this.CatName);
          //  console.log('Phones & Tablets')
          this.httpService.getAllPhoneAndTabletProduct(1,this.CatName).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['totalItems'] === 0) {
                this.errormessage = true;
              }
            });
        this.Waitcall = false;
      });
    if (this.CatName === '0') {
      this._nav.navigate(['/404']);
    }

    if (isPlatformBrowser(this.platformId)){
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
    }
    if (this.CartedProduct === null) {
      this.Cart = true;
    }
    this.Total = 0;
    if (this.CartedProduct !== null) {
    for (const tmp of this.CartedProduct['products']) {
      this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
    }
    }


    // this.httpService.GetphotoById().subscribe(resSlidersData => {
    //   this.GetPhotos = resSlidersData;
    //
    // });


  }


  listView() {
    this.View = true;
  }

  GridView() {
    this.View = false;
  }

  AllListingFuc() {
    this.AllListing = true;
    this.BuyItNow = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProduct(1,this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    this.Waitcall = false;

  }

  BuyItNowFuc() {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductBuyItNow(1,this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    this.Waitcall = false;

  }

  thisAuctionFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductAuction(1,this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    this.Waitcall = false;

  }


  TrashcartElement(Abc: any) {
    for (const tmp of this.CartedProduct['products']) {
      if (tmp.ProductID === Abc) {

        this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1);
        if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
        }
      }

    }
    if (isPlatformBrowser(this.platformId)) {
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
    }
    if (this.CartedProduct === null) {
      this.Cart = true;
    }
    this.Total = 0;
    for (const tmp of this.CartedProduct['products']) {
      this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
    }


  }


  ClickCheckOut() {

    this._nav.navigate(['/checkout2']);
  }

  BothAbove() {
    console.log('I am In Product Both Above');
    this.BothCheck = true;
    this.Waitcall = true;
    this.errormessage = false;
    if (this.PriceStatus === false) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProduct(1,this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    } else if(this.PriceStatus === true) {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithPrice(1, this.Price1, this.Price2,this.CatName).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['totalItems'] === 0) {
              this.errormessage = true;
            }
          });
    }
    this.Waitcall = false;
  }

  ProductType(abc: boolean) {
    console.log('I am In Product Type');
    this.ProType = true;
    this.ProStatus = abc;
    this.Waitcall = true;
    this.errormessage = false;
    if (this.PriceStatus === false) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithType(1, abc,this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.PriceStatus === true) {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithFilter(1, this.Price1,this.Price2,abc,this.CatName).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['totalItems'] === 0) {
              this.errormessage = true;
            }
          });
    }
    this.Waitcall = false;

  }


  ProductPrice(pk1: any, pk2: any) {
    console.log('I am In Product Price');
    if(this.BothCheck === true) {
      this.ProType = false;
    }
    if (pk1 === 'all' && pk2 ==='all') {
      this.PriceStatus = false;
      console.log('I am In Product Price All');
      if (this.ProType === true) {
        console.log('I am In Product Price Protype True');
        this.ProductType(this.ProStatus);
      } else {
        console.log('I am In Product Price Both Above');
        this.BothAbove();
      }
    } else {
    this.PriceStatus = true;
    this.Price1 = pk1;
    this.Price2 = pk2;
    this.errormessage = false;
    this.Waitcall = true;
    if (this.ProType === false){
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithPrice(1, pk1, pk2,this.CatName).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['totalItems'] === 0) {
              this.errormessage = true;
            }
          });
  } else if(this.ProType === true) {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithFilter(1, pk1, pk2,this.ProStatus,this.CatName).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['totalItems'] === 0) {
              this.errormessage = true;
            }
          });
    }
    this.Waitcall = false;
  }
  }

}
