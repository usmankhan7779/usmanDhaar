import { Component, OnInit } from '@angular/core';
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
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  CatName: any;
  Subcat: any;
  CoverPix: any;
  CartedProduct: any = [];
  Total: number;
  Cart = false;


  constructor( private _nav: Router,
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
          });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Men\'s Fashion') {
        this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Computing & Laptops') {
        this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Home Appliances') {
        this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      }  else {

        this._nav.navigate(['/404']);
      }

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


  BothAbove() {


    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    }  else {

      this._nav.navigate(['/404']);
    }

  }
  ProductType(abc: boolean) {

    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else {

      this._nav.navigate(['/404']);
    }

  }

  TrashcartElement(Abc: any) {
    for (const tmp of this.CartedProduct['products']) {
      if ( tmp.ProductID === Abc ) {

        this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
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
  ProductPrice(pk1: string, pk2: string) {

    if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductWithPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubWomenFashionProductTypeWithPrice(1, this.Subcat,  pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSublMenFashionProductPriceWithPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubTVAudioVideoProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubComputingLaptopsProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubHomeAppliancesProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    }  else {

      this._nav.navigate(['/404']);
    }
  }

}
