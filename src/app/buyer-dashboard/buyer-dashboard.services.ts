import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class BuyerDashboardServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'http://localhost:8000/products/';
  saleServerUrl = 'http://localhost:8000/sale/';

  constructor(private _http: Http,
              private _nav: Router) {
  }


  GetallInvoiceIDByUser( UserID: any) {
    return this._http.get( this.saleServerUrl + 'GetallInvoiceIDByUser/' + UserID  ).map(response => response.json());
  }


  GetInvoiceByInvoiceID( UserID: any) {
    return this._http.get( this.saleServerUrl + 'GetInvoiceByInvoiceID/' + UserID  ).map(response => response.json());
  }

  GetAllProductBYInvoiceId( InvoiceId: any) {
    return this._http.get( this.saleServerUrl + 'GetAllProductBYInvoiceId/' + InvoiceId  ).map(response => response.json());
  }
  GetShippingByInvoiceId( InvoiceId: any) {
    return this._http.get( this.saleServerUrl + 'GetShippingByInvoiceId/' + InvoiceId  ).map(response => response.json());
  }





}
