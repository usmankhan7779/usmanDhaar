import { Component, OnInit, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImageZoomModule } from 'angular2-image-zoom';
// import './single-product.js';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { HomeService } from '../home/home.services';
import { LoginService } from '../log-in/log-in.services';
import swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';
import {ImageViewerModule, ImageViewerConfig, CustomEvent} from 'ngx-image-viewer';
import { SharedData } from '../shared-service';
import { StoredetailsService } from '../store-all-details/storedetails.service';
declare const $: any;

@Component({
  selector: 'app-seller-store-setting-update',
  templateUrl: './seller-store-setting-update.component.html',
  styleUrls: ['./seller-store-setting-update.component.scss']
})
export class SellerStoreSettingUpdateComponent implements OnInit {

  private sub: any;
  GetALLBuyNowProductss: any = [];
  storename: any;
  storeid: any;
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private route: ActivatedRoute,
               private GetProducts: StoredetailsService,
               public _shareData: SharedData,
               private router: Router) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.sub = this.route
      .queryParams
      .subscribe(params => {
      this.GetProducts.GetAllStoreByStorenames().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData;
        
        console.log(this.GetALLBuyNowProductss,'get store')
      });
     
        // Defaults to 0 if no query param provided.
        this.storeid = params['StoreId'] || '0';

        console.log(this.storeid)
      });
      // this.storename=localStorage.getItem("StoreName");
      // console.log(this.storename)
    }
  }

}
