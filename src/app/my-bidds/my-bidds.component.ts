<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-bidds',
  templateUrl: './my-bidds.component.html',
  styleUrls: ['./my-bidds.component.css']
})
export class MyBiddsComponent implements OnInit {
  r: any;

  pageno: any;
  sub: any;
<<<<<<< HEAD
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media/';
=======
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;
<<<<<<< HEAD
  errormessage = false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
=======

  constructor( private _nav: Router,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });

<<<<<<< HEAD
  }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
    this.httpService.GetallProductdBids(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        if (this.ActiveProduct['totalItems'] ===0 ) {
          this.errormessage = true;
        }
        console.log(this.ActiveProduct);
      });
  }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
=======

  }
  ngOnInit() {
    this.SessionstoreName = localStorage.getItem('StoreName');
    this.httpService.GetallProductdBids(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
      });
  }

  clearSessionstoreage() {
    localStorage.clear();
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
}
