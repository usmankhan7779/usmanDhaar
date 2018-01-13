import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveAdServices } from './active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';

@Component({
  selector: 'app-active-ad',
  templateUrl: './active-ad.component.html',
  styleUrls: ['./active-ad.component.css']
})
export class ActiveAdComponent implements OnInit {
  r: any;
  pageno: any;
  sub: any;
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media/';
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    if (isPlatformBrowser(this.platformId)){
      this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });
    }
  }
  ngOnInit() {

    this.httpService.GetAllActiveproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
  }

}
