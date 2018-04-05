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
  message(){
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

  // AcceptOfferFuc() {
  //   this.AllListing = false;
  //   this.BuyItNow = false;
  //   this.thisAuction = false;
  //   this.errormessage = false;
  //   this.AcceptOffer = true;
  //   this.Waitcall = true;
  //
  //   // alert(this.CatName);
  //   if (this.CatName === 'Phones & Tablets') {
  //     //  console.log('Phones & Tablets')
  //     this.httpService.getAllPhoneAndTabletProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.CatName === 'Women\'s Fashion') {
  //     // console.log('Women\'s Fashion')
  //     this.httpService.getAllWomenFashionProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.CatName === 'Men\'s Fashion') {
  //     this.httpService.getAllMenFashionProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.CatName === 'TV, Audio & Video') {
  //     // console.log('TV, Audio & Video')
  //     this.httpService.getAllTVAudioVideoProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.CatName === 'Computing & Laptops') {
  //     this.httpService.getAllComputingLaptopsProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.CatName === 'Home Appliances') {
  //     this.httpService.getAllHomeAppliancesProductoffer(1).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['results'].length === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else {
  //
  //     this._nav.navigate(['/404']);
  //   }
  //   this.Waitcall = false;
  //
  // }


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
    } else if(this.PriceStatus === true) {
      if (this.CatName === 'Phones & Tablets') {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.httpService.getAllWomenFashionProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Men\'s Fashion') {
        this.httpService.getAllMenFashionProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.httpService.getAllTVAudioVideoProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Computing & Laptops') {
        this.httpService.getAllComputingLaptopsProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Home Appliances') {
        this.httpService.getAllHomeAppliancesProductWithPrice(1, this.Price1, this.Price2).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else {

        this._nav.navigate(['/404']);
      }
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
    } else if (this.PriceStatus === true) {
      if (this.CatName === 'Phones & Tablets') {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.httpService.getAllWomenFashionProductFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Men\'s Fashion') {
        this.httpService.getAllMenFashionProductFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.httpService.getAllTVAudioVideoProductFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Computing & Laptops') {
        this.httpService.getAllComputingLaptopsProductFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Home Appliances') {
        this.httpService.getAllHomeAppliancesProductFilter(1, this.Price1,this.Price2,abc).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else {

        this._nav.navigate(['/404']);
      }
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
  } else if(this.ProType === true) {
      if (this.CatName === 'Phones & Tablets') {
        //  console.log('Phones & Tablets')
        this.httpService.getAllPhoneAndTabletProductWithFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.httpService.getAllWomenFashionProductFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Men\'s Fashion') {
        this.httpService.getAllMenFashionProductFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.httpService.getAllTVAudioVideoProductFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Computing & Laptops') {
        this.httpService.getAllComputingLaptopsProductFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else if (this.CatName === 'Home Appliances') {
        this.httpService.getAllHomeAppliancesProductFilter(1, pk1, pk2,this.ProStatus).subscribe(
          data => {
            this.Trend = data;
            if (this.Trend['results'].length === 0) {
              this.errormessage = true;
            }
          });
      } else {

        this._nav.navigate(['/404']);
      }
    }
    this.Waitcall = false;
  }
  }

}
