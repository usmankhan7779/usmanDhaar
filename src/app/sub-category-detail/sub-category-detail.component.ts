import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CategoryServices } from '../category-detail/category-detail.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.css']
})
export class SubCategoryDetailComponent implements OnInit {
  r: any;
  pageno: any;
  sub: any;
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  CatName: any;
  Subcat: any;
  Waitcall = false;
  errormessage = false;
  CoverPix: any;
  CartedProduct: any = [];
  Total: number;
  View = false;
  Cart = false;

  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;


  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,

               private route: ActivatedRoute,
               private httpService: CategoryServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


    this.httpService.getAllPhoneAndTabletProduct(this.pageno).subscribe(
      data => {
        this.Trend = data;
      });
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sub = this.route.params.subscribe(params => {
        this.CatName = params['CatName'];
        this.Subcat = params['SubCat'];
        // alert(this.CatName);
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
        } else if (this.CatName === 'Online Services') {
          this.CoverPix = 'OS';
        }


        if (this.CatName === 'Phones & Tablets') {
          //  console.log('Phones & Tablets')
          this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Women\'s Fashion') {
          // console.log('Women\'s Fashion')
          this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;

              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Men\'s Fashion') {
          this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'TV, Audio & Video') {
          // console.log('TV, Audio & Video')
          this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Computing & Laptops') {
          this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Home Appliances') {
          this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else {

          this._nav.navigate(['/404']);
        }
        this.Waitcall = false;

      });
      if (this.CatName === '0') {
        this._nav.navigate(['/404']);
      }


      this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      if (this.CartedProduct === null) {
        this.Cart = true;
      }
      this.Total = 0;
      for (const tmp of this.CartedProduct['products']) {
        this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
      }


      // this.httpService.GetphotoById().subscribe(resSlidersData => {
      //   this.GetPhotos = resSlidersData;
      //
      // });
    }
  }

  message() {
    this.errormessage = !this.errormessage;
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
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }

    this.Waitcall = false;

  }

  BuyItNowFuc() {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }

    this.Waitcall = false;

  }

  thisAuctionFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }

    this.Waitcall = false;

  }

  AcceptOfferFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.thisAuction = false;
    this.AcceptOffer = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductoffer(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }

    this.Waitcall = false;

  }






  BothAbove() {

    this.Waitcall = true;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }
    this.Waitcall = false;
  }
  ProductType(abc: boolean) {
    this.Waitcall = true;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else {

      this._nav.navigate(['/404']);
    }
    this.Waitcall = false;

  }

  TrashcartElement(Abc: any) {
    if (isPlatformBrowser(this.platformId)) {
      for (const tmp of this.CartedProduct['products']) {
        if (tmp.ProductID === Abc) {

          this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1);
          localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));


        }

      }
      this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      if (this.CartedProduct === null) {
        this.Cart = true;
      }
      this.Total = 0;
      for (const tmp of this.CartedProduct['products']) {
        this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
      }

    }
  }

  ProductPrice(pk1: any, pk2: any) {
    this.Waitcall = true;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductWithPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductTypeWithPrice(1, this.Subcat,  pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductPriceWithPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    }  else {

      this._nav.navigate(['/404']);
    }
    this.Waitcall = false;
  }

}
