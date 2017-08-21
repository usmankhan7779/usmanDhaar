import { Component, OnInit } from '@angular/core';
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

  pageno: any;
  sub: any;
  PicServrUrl = 'https://sample-175508.appspot.com/media';
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;

  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.GetAllActiveproductsBYUserID(this.pageno, sessionStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }
  ngOnInit() {

    if (sessionStorage.getItem('UserID') === null) {

      this._nav.navigate(['/login']);
    } else {

      this.httpService.GetallProductdBids(1, sessionStorage.getItem('UserID')).subscribe(
        data => {
          this.ActiveProduct = data;
          console.log(this.ActiveProduct);
        });
    }
  }

}
