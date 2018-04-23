import {Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { AdService } from '../post-ad/ad.services';
import { HomeService } from '../home/home.services';
import { Ng2PaginationModule } from 'ng2-pagination';
import * as jsPDF from 'jspdf';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seller-purchasing-invoice',
  templateUrl: './seller-purchasing-invoice.component.html',
  styleUrls: ['./seller-purchasing-invoice.component.css']
})
export class SellerPurchasingInvoiceComponent implements OnInit {

  r: any;

  pageno: any;
  sub: any;
  PicServrUrl = 'https://apis.dhaar.pk/media/';

  modelNo: any;
  ShipingInvoice: any = [];
  InvoiceData: any = [];

  ProductsID: any = [];
  AllCategories: any = [];
  resultProduct: any = [];
  GetPhotos: any = [];
  InvoicesID: any;
  Str: string;
  TMpStr: string;
  TableName: string;
  SessionstoreName: string;

  Allproducts: any = {'products': []};
  GetAllproducts = [];

  @ViewChild('content') content:ElementRef;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private CatServices: AdService,
               private GetOneProduct: HomeService,
               private httpService: BuyerDashboardServices) { }



  public downloadPDF() {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element,renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15,15,{
      'width': 190,
      'elementHandlers': specialElementHandlers
    },function(bla){
      doc.save('OrderSlip.pdf');
    });
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    this.SessionstoreName = localStorage.getItem('StoreName');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.InvoicesID = params['InvoicesID'] || '0' ;
      });

    if (localStorage.getItem('UserID') === null) {

      this._nav.navigate(['/login']);
    } else {

      //Gets all Shi[pping detail of user
      this.httpService.GetShippingByInvoiceId( this.InvoicesID).subscribe(
        data => {
          this.ShipingInvoice = data;
        });

      this.CatServices.GetAllCategories().subscribe(
        data => {
          this.AllCategories = data;
        });

      //Gets all invoice details e.g. payment, guest, balance, userID
      this.httpService.GetInvoiceByInvoiceID( this.InvoicesID).subscribe(
        data => {
          this.InvoiceData = data;
        });

      this.httpService.GetAllProductBYInvoiceId( this.InvoicesID).subscribe(
        data => {
          this.ProductsID = data;
          console.log('Products are:::', this.ProductsID);

          for (const itm of this.ProductsID) {
            this.GetOneProduct.get_AnyProduct_ProductById(itm.ProductID).subscribe(data => {
              // this.GetAllproducts.Qty = itm.Qty;
              data['Qty']=itm.Qty;
              this.GetAllproducts.push(data);
            });
          }
          console.log('Products details are', this.GetAllproducts);

          // for (const tmp of   this.ProductsID) {
          //   this.Str = tmp.ProductID.substr(0, 2);
          //   for (const getpr of this.AllCategories) {
          //     if (getpr.id < 10) {
          //       console.log('I am in If');
          //       this.TMpStr = '0' + getpr.id;
          //       if (this.TMpStr === this.Str) {
          //         this.TableName = getpr.Cat_Des;
          //         if ( this.TableName === 'PhoneAndTabletProduct' ) {
          //           this.GetOneProduct.get_PhoneAndTabletProduct_ProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //
          //             this.resultProduct = resSlidersData1;
          //
          //
          //             this.resultProduct[0].Qty = +tmp.Qty;
          //
          //             // this.Allproducts['products'].push(this.resultProduct);
          //             this.GetAllproducts.push(this.resultProduct);
          //             //
          //             console.log(this.Allproducts['products']);
          //             //
          //             //  console.log( this.resultProduct);
          //             //
          //             //  this.GetAllproducts.(this.resultProduct)
          //             //
          //             // console.log( this.GetAllproducts);
          //
          //             console.log('end');
          //           });
          //
          //         } else if ( this.TableName === 'WomenFashionProduct' ) {
          //           this.GetOneProduct.getWomenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'MenFashionProduct' ) {
          //           this.GetOneProduct.getMenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'TVAudioVideoProduct' ) {
          //           this.GetOneProduct.geTVAudioVideoProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'ComputingLaptopsProduct' ) {
          //           this.GetOneProduct.getComputingLaptopsProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'HomeAppliancesProduct' ) {
          //           this.GetOneProduct.getHomeAppliancesProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             console.log(this.Allproducts['products']);
          //           });
          //
          //         }
          //
          //
          //       }
          //     } else {
          //       console.log('I am in ELse');
          //       if (getpr.id === this.Str) {
          //         this.TableName = getpr.Cat_Des;
          //
          //         if ( this.TableName === 'PhoneAndTabletProduct' ) {
          //           this.GetOneProduct.get_PhoneAndTabletProduct_ProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'WomenFashionProduct' ) {
          //           this.GetOneProduct.getWomenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'MenFashionProduct' ) {
          //           this.GetOneProduct.getMenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'TVAudioVideoProduct' ) {
          //           this.GetOneProduct.geTVAudioVideoProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'ComputingLaptopsProduct' ) {
          //           this.GetOneProduct.getComputingLaptopsProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         } else if ( this.TableName === 'HomeAppliancesProduct' ) {
          //           this.GetOneProduct.getHomeAppliancesProductById(tmp.ProductID).subscribe(resSlidersData1 => {
          //             this.resultProduct = resSlidersData1;
          //             this.Allproducts['products'].push(this.resultProduct);
          //             // console.log(this.Allproducts['products']);
          //           });
          //
          //         }
          //
          //
          //       }
          //     }
          //   }
          //
          //
          //
          //
          //
          // }
        });

    }
  }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
