import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-my-bidds',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {
  r: any;

  pageno: any;
  sub: any;

  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  successbid: any = [];
  CatName: any;
  SessionstoreName: any;
  errormessagefirst = false;
  errormessage=false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,

               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }


               
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      // alert(localStorage.getItem('UserID'))
      this.SessionstoreName = localStorage.getItem('StoreName');
      this.httpService.GetallProductdBids( localStorage.getItem('UserID')).subscribe(
        data => {
          this.ActiveProduct = data.results;
          console.log(this.ActiveProduct)
          if (this.ActiveProduct['totalItems'] === 0) {
            this.errormessagefirst = true;
          }
        });
      this.httpService.GetSuccessfulBids(localStorage.getItem('UserID')).subscribe( data => {
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
      swal('You have been successfully signed out from Dhaar.','','success');
    }

  }
}
