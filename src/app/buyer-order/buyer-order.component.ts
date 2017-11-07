import { Component, OnInit } from '@angular/core';
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
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;

  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {

    this.httpService.GetallInvoiceIDByUser(sessionStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
      });
  }
  clearSessionstoreage() {
    sessionStorage.clear();
  }
}
