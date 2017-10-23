import {Component, OnInit} from '@angular/core';
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
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media';
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

  constructor(private _nav: Router,
              private route: ActivatedRoute,
              private httpService: CategoryServices) {
  }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.getAllPhoneAndTabletProduct(this.pageno).subscribe(
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
        } else if (this.CatName === 'Online Services') {
          this.CoverPix = 'OS';
        }


        // alert(this.CatName);
        if (this.CatName === 'Phones & Tablets') {
          //  console.log('Phones & Tablets')
          this.httpService.getAllPhoneAndTabletProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Women\'s Fashion') {
          // console.log('Women\'s Fashion')
          this.httpService.getAllWomenFashionProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Men\'s Fashion') {
          this.httpService.getAllMenFashionProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'TV, Audio & Video') {
          // console.log('TV, Audio & Video')
          this.httpService.getAllTVAudioVideoProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Computing & Laptops') {
          this.httpService.getAllComputingLaptopsProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Home Appliances') {
          this.httpService.getAllHomeAppliancesProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = true;
              }
            });
        } else if (this.CatName === 'Online Services') {
          this.httpService.getAllHomeAppliancesProduct(1).subscribe(
            data => {
              this.Trend = data;
              if (this.Trend['results'].length === 0) {
                this.errormessage = false;
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


    this.httpService.GetphotoById().subscribe(resSlidersData => {
      this.GetPhotos = resSlidersData;

    });


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
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Online Services') {
      this.httpService.getAllHomeAppliancesProduct(1).subscribe(
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

  BuyItNowFuc() {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductBuyItNow(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProductbuy(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProductbuy(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProductbuy(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProductbuy(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProductbuy(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Online Services') {
      this.httpService.getAllHomeAppliancesProductbuy(1).subscribe(
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

  thisAuctionFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductAuction(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProductAuction(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProductauction(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProductAuction(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProductaucion(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProductauction(1).subscribe(
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

  AcceptOfferFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.thisAuction = false;
    this.errormessage = false;
    this.AcceptOffer = true;
    this.Waitcall = true;

    // alert(this.CatName);
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductoffer(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProductoffer(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProductoffer(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProductoffer(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProductoffer(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProductoffer(1).subscribe(
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


  ClickCheckOut() {

    this._nav.navigate(['/checkout2']);
  }

  BothAbove() {
    this.Waitcall = true;
    this.errormessage = false;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProduct(1).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Online Services') {
      this.httpService.getAllHomeAppliancesProduct(1).subscribe(
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

  ProductType(abc: boolean) {
    this.Waitcall = true;
    this.errormessage = false;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithType(1, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProductWithType(1, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProductWithType(1, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProductWithType(1, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProductWithType(1, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProductWithType(1, abc).subscribe(
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


  ProductPrice(pk1: string, pk2: string) {
    this.errormessage = false;
    this.Waitcall = true;
    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithPrice(1, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllWomenFashionProductWithPrice(1, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllMenFashionProductWithPrice(1, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllTVAudioVideoProductWithPrice(1, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllComputingLaptopsProductWithPrice(1, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllHomeAppliancesProductWithPrice(1, pk1, pk2).subscribe(
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

}
