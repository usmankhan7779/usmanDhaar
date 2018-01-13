import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import {HostListener} from '@angular/core';
import { AdService } from '../post-ad/ad.services';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {};
  GetallCat: any = [];
  jwtHelper: JwtHelper = new JwtHelper();
  ValueRec: Boolean = false;
  GetUSerDOne: any [];
  CartedProduct: any = [];
  ItemInCart: any ;

  public filteredList = [];
  public elementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private PostAdd: AdService,
              private _nav: Router) { }

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
      this.obj.verify_tokenWithNoRedirict().subscribe((response) => {

          if (response) {

            this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
              this.GetUSerDOne = resSlidersData;
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

    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));

    if (this.CartedProduct) {

      this.ItemInCart = this.CartedProduct['products'].length;

    } else {
      this.ItemInCart = 0;

    }


    this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);

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


  navigate(event, search, action) {
    //
    if (action==1) {
      if (event.key === "Enter") {
        this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
      }
    } else {
      this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
    }

  }



}
