import { Component, OnInit } from '@angular/core';
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
    this.SessionstoreName = localStorage.getItem('StoreName');
    this.httpService.GetallProductdBids(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
      });
  }

  clearSessionstoreage() {
    localStorage.clear();
  }
}
