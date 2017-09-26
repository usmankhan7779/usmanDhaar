import { Component, OnInit } from '@angular/core';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';

@Component({
  selector: 'app-pending-ad',
  templateUrl: './pending-ad.component.html',
  styleUrls: ['./pending-ad.component.css']
})
export class PendingAdComponent implements OnInit {
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

    alert(this.pageno);
    this.httpService.GetAllPendingproductsBYUserID(this.pageno, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }
  ngOnInit() {

    // console.log('asdada' + localStorage.getItem('UserID'));

    this.httpService.GetAllPendingproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


    this.SessionstoreName = localStorage.getItem('StoreName');
  }
  clearSessionstoreage() {
    localStorage.clear();
  }

}
