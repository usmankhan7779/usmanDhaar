import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveAdServices} from "../active-ad/active-ad.services";

@Component({
  selector: 'app-watch-product',
  templateUrl: './watch-product.component.html',
  styleUrls: ['./watch-product.component.scss']
})
export class WatchProductComponent implements OnInit {

  ActiveProduct: any = [];
  PicServrUrl = 'https://apis.dhaar.pk/media/';
  errormessage = false;
  SessionstoreName: any;
  seller = false;
  r: any;
  pageno: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: ActiveAdServices) {
  }
  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.GetallWatchProducts(this.pageno, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.SessionstoreName= localStorage.getItem('StoreName');
      if (this.SessionstoreName === null) {
        this.seller = false;
      } else {
        this.seller = true;
      }
      if (localStorage.getItem('UserID') === null) {

        this._nav.navigate(['/login']);
      }
      this.httpService.GetallWatchProducts(1, localStorage.getItem('UserID')).subscribe(data => {
        this.ActiveProduct = data;
        if (this.ActiveProduct['totalItems'] === 0) {
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
