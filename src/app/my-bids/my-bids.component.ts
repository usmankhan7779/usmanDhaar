import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-bidds',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {
  r: any;

  pageno: any;
  sub: any;
  PicServrUrl = 'https://apis.dhaar.pk/media/';

  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  successbid: any = [];
  CatName: any;
  SessionstoreName: any;
  errormessage = false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,

               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    if (isPlatformBrowser(this.platformId)){

    // alert("mobile")
    this.r = event;
    this.pageno = event;

    this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });
  }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
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
