import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-bids-buyer',
  templateUrl: './my-bids-buyer.component.html',
  styleUrls: ['./my-bids-buyer.component.css']
})
export class MyBidsBuyerComponent implements OnInit {
  r: any;
  errormessage = false;
  pageno: any;
  sub: any;

  PicServrUrl = 'https://apis.dhaar.pk/media/';
  modelNo: any;
  ActiveProduct: any = [];
  successbid: any = [];
  GetPhotos: any = [];
  CatName: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){

    this.httpService.GetallProductdBids(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        if (this.ActiveProduct['totalItems'] === 0) {
          this.errormessage = true;
        }
      });
    this.httpService.GetSuccessfulBids(1, localStorage.getItem('UserID')).subscribe( data => {
      this.successbid = data;
      if (this.successbid['totalItems'] === 0) {
        this.errormessage = true;
      }
    });
  }
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }
}
