import { Component, OnInit } from '@angular/core';
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
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;

  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


    this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }
  ngOnInit() {

    this.httpService.GetAllActiveproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });

    this.SessionstoreName = localStorage.getItem('StoreName');
  }

  clearSessionstoreage() {
    localStorage.clear();
  }

}
