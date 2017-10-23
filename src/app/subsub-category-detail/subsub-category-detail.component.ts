import { Component, OnInit } from '@angular/core';
import { CategoryServices } from '../category-detail/category-detail.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'app-subsub-category-detail',
  templateUrl: './subsub-category-detail.component.html',
  styleUrls: ['./subsub-category-detail.component.css']
})
export class SubsubCategoryDetailComponent implements OnInit {

  r: any;
  pageno: any;
  sub: any;
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media';
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
      this.Subcat = params['SubsubCat'];


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
        this.httpService.getAllSubSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.httpService.getAllSubSubWomenFashionProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Men\'s Fashion') {
        this.httpService.getAllSubSubMenFashionProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.httpService.getAllSubSubTVAudioVideoProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Computing & Laptops') {
        this.httpService.getAllSubSubComputingLaptopsProduct(1, this.Subcat).subscribe(
          data => {
            this.Trend = data;
          });
      } else if (this.CatName === 'Home Appliances') {
        this.httpService.getAllSubSubHomeAppliancesProduct(1, this.Subcat).subscribe(
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
      this.httpService.getAllSubSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubSubWomenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSubSubMenFashionProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubSubTVAudioVideoProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubSubComputingLaptopsProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubSubHomeAppliancesProduct(1, this.Subcat).subscribe(
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
      this.httpService.getAllSubSubPhoneAndTabletProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubSubWomenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSubSubMenFashionProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubSubTVAudioVideoProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubSubComputingLaptopsProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubSubHomeAppliancesProductType(1, this.Subcat, abc).subscribe(
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
      this.httpService.getAllSubSubPhoneAndTabletProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Women\'s Fashion') {
      // console.log('Women\'s Fashion')
      this.httpService.getAllSubSubWomenFashionProductPrice(1, this.Subcat,  pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Men\'s Fashion') {
      this.httpService.getAllSubSubMenFashionProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'TV, Audio & Video') {
      // console.log('TV, Audio & Video')
      this.httpService.getAllSubSubTVAudioVideoProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Computing & Laptops') {
      this.httpService.getAllSubSubComputingLaptopsProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    } else if (this.CatName === 'Home Appliances') {
      this.httpService.getAllSubSubHomeAppliancesProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
    }  else {

      this._nav.navigate(['/404']);
    }
  }
}
