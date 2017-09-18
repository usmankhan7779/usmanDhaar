
import { Component, OnInit } from '@angular/core';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { AdService } from '../post-ad/ad.services';
import { HomeService } from '../home/home.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-purchasing-invoice',
  templateUrl: './seller-purchasing-invoice.component.html',
  styleUrls: ['./seller-purchasing-invoice.component.css']
})
export class SellerPurchasingInvoiceComponent implements OnInit {

  r: any;

  pageno: any;
  sub: any;
  PicServrUrl = 'http://localhost:8000/media';
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



  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private CatServices: AdService,
               private GetOneProduct: HomeService,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {
    this.SessionstoreName = sessionStorage.getItem('StoreName');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.InvoicesID = params['InvoicesID'] || '0' ;
      });

    if (sessionStorage.getItem('UserID') === null) {

      this._nav.navigate(['/login']);
    } else {

      this.httpService.GetShippingByInvoiceId( this.InvoicesID).subscribe(
        data => {
          this.ShipingInvoice = data;
        });

      this.CatServices.GetAllCategories().subscribe(
        data => {
          this.AllCategories = data;
        });


      this.httpService.GetShippingByInvoiceId( this.InvoicesID).subscribe(
        data => {
          this.ShipingInvoice = data;
        });

      this.httpService.GetInvoiceByInvoiceID( this.InvoicesID).subscribe(
        data => {
          this.InvoiceData = data;
        });

      this.httpService.GetAllProductBYInvoiceId( this.InvoicesID).subscribe(
        data => {
          this.ProductsID = data;

          for (const tmp of   this.ProductsID) {
            this.Str = tmp.ProductID.substr(0, 2);
            for (const getpr of this.AllCategories) {
              if (getpr.id < 10) {
                this.TMpStr = '0' + getpr.id;
                if (this.TMpStr === this.Str) {
                  this.TableName = getpr.Cat_Des;
                  if ( this.TableName === 'PhoneAndTabletProduct' ) {
                    this.GetOneProduct.get_PhoneAndTabletProduct_ProductById(tmp.ProductID).subscribe(resSlidersData1 => {

                      this.resultProduct = resSlidersData1;


                      this.resultProduct[0].Qty = +tmp.Qty;

                      // this.Allproducts['products'].push(this.resultProduct);
                      this.GetAllproducts.push(this.resultProduct);
                      //
                      console.log(this.Allproducts['products']);
                      //
                      //  console.log( this.resultProduct);
                      //
                      //  this.GetAllproducts.(this.resultProduct)
                      //
                      // console.log( this.GetAllproducts);

                      console.log('end');
                    });

                  } else if ( this.TableName === 'WomenFashionProduct' ) {
                    this.GetOneProduct.getWomenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'MenFashionProduct' ) {
                    this.GetOneProduct.getMenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'TVAudioVideoProduct' ) {
                    this.GetOneProduct.geTVAudioVideoProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'ComputingLaptopsProduct' ) {
                    this.GetOneProduct.getComputingLaptopsProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'HomeAppliancesProduct' ) {
                    this.GetOneProduct.getHomeAppliancesProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  }


                }
              } else {
                if (getpr.id === this.Str) {
                  this.TableName = getpr.Cat_Des;

                  if ( this.TableName === 'PhoneAndTabletProduct' ) {
                    this.GetOneProduct.get_PhoneAndTabletProduct_ProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'WomenFashionProduct' ) {
                    this.GetOneProduct.getWomenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'MenFashionProduct' ) {
                    this.GetOneProduct.getMenFashionProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'TVAudioVideoProduct' ) {
                    this.GetOneProduct.geTVAudioVideoProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'ComputingLaptopsProduct' ) {
                    this.GetOneProduct.getComputingLaptopsProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  } else if ( this.TableName === 'HomeAppliancesProduct' ) {
                    this.GetOneProduct.getHomeAppliancesProductById(tmp.ProductID).subscribe(resSlidersData1 => {
                      this.resultProduct = resSlidersData1;
                      this.Allproducts['products'].push(this.resultProduct);
                    });

                  }


                }
              }
            }





          }
        });

    }
  }

}
