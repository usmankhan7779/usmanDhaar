import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActiveAdServices} from '../active-ad/active-ad.services';
import {Router} from '@angular/router';
import {AdService} from '../post-ad/ad.services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seller-product-setting',
  templateUrl: './seller-product-setting.component.html',
  styleUrls: ['./seller-product-setting.component.scss']
})
export class SellerProductSettingComponent implements OnInit {

  ActiveProduct: any = [];
  GetallCat: any = [];
  GetAllSubCat: any = [];
  GetAllSubSubCat: any = [];
  model: any ={};
  r: any;
  pageno: any;
  SessionstoreName: any;
  CatId: any;
  ReservePrice = false;
  ManCatID: any;
  SubCatID: any;
  currentindex: any;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _nav:Router,
              private ad:ActiveAdServices,
              private PostAdd: AdService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.SessionstoreName = localStorage.getItem('StoreName');
      if(this.SessionstoreName) {
        this.ad.getAll_ProductBYStoreName(1,localStorage.getItem('StoreName')).subscribe(data => {
          this.ActiveProduct = data;
          console.log('Active Products are:::', this.ActiveProduct);
        });
      } else {
        this._nav.navigate(['/']);
      }
      this.PostAdd.GetAllCategories().subscribe(resSlidersData => {
        this.GetallCat = resSlidersData
      });

    }
  }
  pageTrendChanged(event) {
    if (isPlatformBrowser(this.platformId)){
      this.r = event;
      this.pageno = event;

      alert(this.pageno);
      this.ad.getAll_ProductBYStoreName(this.pageno, localStorage.getItem('StoreName')).subscribe(
        data => {
          this.ActiveProduct = data;
        });
    }
  }

  SaveProduct(product, index) {
    this.currentindex = index;
    this.model = product;
    for(const itm of this.GetallCat) {
      if(itm.Cat_Name === this.model.Cat_Name) {
        this.CatId = itm.id;
        console.log('ID is:', this.CatId);
      }
    }

    this.PostAdd.GetAllSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => {
      this.GetAllSubCat = resSlidersData
    });

    this.PostAdd.GetAllSubSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
    console.log('Attributes are:', this.model);
    console.log('Index are:', index);
  }

  EditProduct() {
    this.model.MaxQuantity = this.model.Quantity;
    console.log('Final Attributes are:', this.model);

    this.PostAdd.Edit_PhoneAndTabletProduct_Product(this.model).subscribe(response => {
      swal('Changes has been Saved','','success');
    })

  }

  MainCatSel(id) {
    console.log('Cat ID issssssssss:', id);
    for(const itm of this.GetallCat) {
      if(itm.Cat_Name === id) {
        this.ManCatID = itm.id;
      }
    }
    this.PostAdd.GetAllSubCategoriesByCatID(this.ManCatID).subscribe(resSlidersData => {
      this.GetAllSubCat = resSlidersData;
      this.model.Sub_Cat_Name = this.GetAllSubCat[0].Sub_Cat_Name;
      for(const itm1 of this.GetAllSubCat) {
        if(itm1.Sub_Cat_Name === this.model.Sub_Cat_Name) {
          this.SubCatID = itm1.id;
        }
      }
      this.GetSubsubCat();
    });
  }

  GetSubsubCat() {

    this.PostAdd.GetAllSubSubCategoriesBySubCatID(this.SubCatID).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
  }

  SubCatSel(id) {

    console.log('Sub-Cat ID issssssssss:', id);
    for(const itm of this.GetAllSubCat) {
      if(itm.Sub_Cat_Name === id) {
        this.SubCatID = itm.id;
      }
    }
    this.PostAdd.GetAllSubSubCategoriesBySubCatID(this.SubCatID).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
  }

  EnableAuction(Auction) {
      this.model.Auction = Auction;
  }

  EnableFixd(Auction) {
      this.model.Auction = Auction;
  }

  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
