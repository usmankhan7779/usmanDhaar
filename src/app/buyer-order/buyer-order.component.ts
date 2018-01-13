<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyer-order',
  templateUrl: './buyer-order.component.html',
  styleUrls: ['./buyer-order.component.css']
})
export class BuyerOrderComponent implements OnInit {

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

<<<<<<< HEAD
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
=======
  constructor( private _nav: Router,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
               private route: ActivatedRoute,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
    this.httpService.GetallInvoiceIDByUser(localStorage.getItem('UserID')).subscribe(
=======

    this.httpService.GetallInvoiceIDByUser(sessionStorage.getItem('UserID')).subscribe(
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
      });
<<<<<<< HEAD
    }
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    sessionStorage.clear();
    }
=======
  }
  clearSessionstoreage() {
    sessionStorage.clear();
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
}
