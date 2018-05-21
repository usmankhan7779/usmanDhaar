import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import {HostListener} from '@angular/core';
import { AdService } from '../post-ad/ad.services';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { LoginService } from '../log-in/log-in.services';
import {CategoryServices} from "../category-detail/category-detail.services";

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Trend: any = [];
  query: any;
  Courses: any;
  opSearch: number = 0;
  model: any = {};
  GetallCat: any = [];
  jwtHelper: JwtHelper = new JwtHelper();
  ValueRec: Boolean = false;
  GetUSerDOne: any [];
  CartedProduct: any = [];
  ItemInCart: any ;
  public filteredList = [];
  fname:any;
  public elementRef;
  Searchres = false;
  ProNav = false;
  GetallSubCat: any=[];
  GetallSubSubCat: any=[];
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private PostAdd: AdService,
              private _nav: Router,
              private httpService: CategoryServices) { }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log('Back button pressed');
  //   if (window.location.pathname === '/home') {
  //     window.location.reload();
  //   }
  // }
  go() {
    if (isPlatformBrowser(this.platformId)){
    window.location.href = '/home';
    }
  }
  TextChange(val) {
    // alert(val);
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    // console.log('fdsfsdfdsgj' + localStorage.getItem('UserID'));
    if (localStorage.getItem('UserID') !== null) {
      this.ValueRec = true;
      this.obj.verify_tokenWithNoRedirict().subscribe((response) => {

          if (response) {

            this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
              this.GetUSerDOne = resSlidersData;
              this.fname= this.GetUSerDOne['Fname'];
              this.ValueRec = true;

              //  console.log('saqib hanif');
              // console.log(  this.GetUSerDOne);
            });

          } else {



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


     }

    // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
    //
    // if (this.CartedProduct) {
    //
    //   this.ItemInCart = this.CartedProduct['products'].length;
    //
    // } else {
    //   this.ItemInCart = 0;
    //
    // }


    this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);
    this.PostAdd.GetAllSubCategories().subscribe(resSlidersData => this.GetallSubCat = resSlidersData);
    this.PostAdd.GetAllSubSubCategories().subscribe(resSlidersData => this.GetallSubSubCat = resSlidersData);

  }
  }

  Phone() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Phones & Tablets'}})
  }
  Women() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Women\'s Fashion'}})
  }
  Men() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Men\'s Fashion'}})
  }
  TV() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'TV, Audio & Video'}})
  }
  Computing() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Computing & Laptops'}})
  }
  Home() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Home Appliances'}})
  }
  Sports() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Sports Goods'}})
  }
  Baby() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Baby & Kids'}})
  }
  Vehicles() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Vehicles & GPS'}})
  }
  Health() {
    this._nav.navigate(['/sameurl'], {queryParams: {CatName:'Health & Beauty'}})
  }

  cartProduct() {
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));

    if (this.CartedProduct) {

      return this.CartedProduct['products'].length;

    } else {
      return 0
    }
  }

  closeSearch1(event) {
    // console.log('Event is: ', event)
    if(event.key === "Escape") {
      if (this.opSearch === 1) {
        this.opSearch = 0;
        this.query = '';
        this.Trend = '';
        $('#wrapper').removeClass('search-active');
      }
    }
  }
  closeSearch() {
      if (this.opSearch === 1) {
        this.opSearch = 0;
        this.query = '';
        this.Trend = '';
        $('#wrapper').removeClass('search-active');
      }
  }

  ProductNav() {
    this.ProNav = !this.ProNav;
  }
  openSearch() {
    if (isPlatformBrowser(this.platformId)){
      window.scroll(0,0);
      this.opSearch = 1;
      $('#wrapper').addClass('search-active');
      setTimeout(function () {
        $('#textsearch1').focus();
      },200);
    }
  }

  ValueReset() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    this.obj.loged_out();
    this.ValueRec = false;
    this._nav.navigate(['/login']);
    }
  }

  loginCheck() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('UserID')) {
        return true
      } else {
        return false
      }
    }
  }


  gotodashboard() {
    if (isPlatformBrowser(this.platformId)){

    this.obj.GetUSerdetailsByUserId(this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id']).subscribe(resSlidersData => {

        if ( resSlidersData['Vendor'] === true) {
          this._nav.navigate(['/dashboard']);
        } else {


          this._nav.navigate(['/buyer-dashboard']);
        }
      }
    );
    }
  }


  navigate(search) {

    if(search) {

      console.log('search value is', search)
      this.Searchres = true;
      this.httpService.getAllSearchProducts(1, search).subscribe(
        data => {
          this.Trend = data;
        });
    } else {
      this.Trend.results = null;
      this.Trend.totalItems = 0;
      this.Searchres = false;
    }
    //
    // if (action==1) {
    //   if (event.key === "Enter") {
    //     this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
      // }
    // } else {
      // this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
    // }
  }



}
