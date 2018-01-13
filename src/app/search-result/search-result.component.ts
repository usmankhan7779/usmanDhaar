<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { CategoryServices } from '../category-detail/category-detail.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  r: any;
  pageno: any;
  CoverPix: any;
  sub: any;
<<<<<<< HEAD
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media/';
=======
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  Cart = false;
  CatName: any;
  SearchResults: any;
  CartedProduct: any = [];
  Total: number;

<<<<<<< HEAD
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
=======
  constructor( private _nav: Router,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
               private route: ActivatedRoute,
               private httpService: CategoryServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


<<<<<<< HEAD
    this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
=======
    this.httpService.getAllSearchProducts(this.pageno,this.SearchResults).subscribe(
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
      data => {
        this.Trend = data;
      });
  }
  ngOnInit() {

<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){

=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.SearchResults = params['Search'] || '0' ;

          this.CoverPix = 'PT';


<<<<<<< HEAD
        this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
=======
        this.httpService.getAllSearchProducts(this.pageno,this.SearchResults).subscribe(
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
          data => {
            this.Trend = data;
          });


      });
    if (this.SearchResults === '0') {
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
<<<<<<< HEAD
    }
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
=======

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


>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }


  ClickCheckOut() {

    this._nav.navigate(['/checkout2']);
  }

  BothAbove() {

    this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
      data => {
        this.Trend = data;
      });
  }
  ProductType(abc: boolean) {


    this.httpService.getAllSearchProductsType(this.pageno, this.SearchResults, abc).subscribe(
      data => {
        this.Trend = data;
      });


  }


<<<<<<< HEAD
  ProductPrice(pk1: any, pk2: any) {
=======
  ProductPrice(pk1: string, pk2: string) {
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

    this.httpService.getAllSearchProductsPrice(this.pageno, this.SearchResults, pk1, pk2).subscribe(
      data => {
        this.Trend = data;
      });
  }



}
