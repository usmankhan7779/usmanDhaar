import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActiveAdServices} from '../active-ad/active-ad.services';
import {Router} from '@angular/router';
import {AdService} from '../post-ad/ad.services';
import swal from 'sweetalert2';
import { CategoryServices } from '../category-detail/category-detail.services';
import { StoredetailsService } from '../store-all-details/storedetails.service';

@Component({
  selector: 'app-seller-product-setting-store',
  templateUrl: './seller-product-setting-store.component.html',
  styleUrls: ['./seller-product-setting-store.component.scss']
})
export class SellerProductSettingStoreComponent implements OnInit {

 
  GetALLBuyNowProductss: any = [];
  storename: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private GetProducts: StoredetailsService,
              private GetCat:AdService,
              private Category: CategoryServices,
              private GetWatch:ActiveAdServices) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.GetProducts.GetAllStoreByStorenames().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData;
        
        console.log(this.GetALLBuyNowProductss,'get store')
      });
      // this.storename=localStorage.getItem("StoreName");
      // console.log(this.storename)
    }
  }


}
