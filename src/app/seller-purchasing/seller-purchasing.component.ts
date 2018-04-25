import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seller-purchasing',
  templateUrl: './seller-purchasing.component.html',
  styleUrls: ['./seller-purchasing.component.css']
})
export class SellerPurchasingComponent implements OnInit {
  r: any;

  pageno: any;
  sub: any;
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    this.SessionstoreName = localStorage.getItem('StoreName');
    this.httpService.GetallInvoiceIDByUser(localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
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
