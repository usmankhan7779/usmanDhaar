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
  ServerUrl = 'http://127.0.0.1:8000/products/';
  saleServerUrl = 'http://127.0.0.1:8000/sale/';

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

  Invoice(invID: any , invBalance: any, invPay: any,  invGuest: any, invUserID: any) {


    return this._http.post(this.saleServerUrl + 'AddcustomerInvoice', {'InvoicesID': invID, 'InvoicesBalance': invBalance, 'InvoicesPayment': invPay,
      'InvoicesAsGuest': invGuest,
      'InvoicesAsUserID': invUserID
    })
      .map((res: Response) => {
        if (res) {
          const responce_data = res.json();

          console.log('this is the id' + responce_data.id);
          sessionStorage.setItem('InvoiceID', responce_data.id)
          if (res.status === 200) {
          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }


  InvoiceProducts(invID: any , prodID: any, Quantity: any) {


    return this._http.post(this.saleServerUrl + 'AddcustomerInvoiceProduct', {'InvoicesID': invID, 'ProductID': prodID, 'Qty': Quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log(res.status)
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {
        alert(error);
        return Observable.throw(new Error(error.status));
      });

  }


  CustomerInvoiceShippingAddress(invID: any , fname: any, lname: any, email: any, state: any, country: any, city: any, zip: any, address: any, telephone: any, fax: any) {


    return this._http.post(this.saleServerUrl + 'AddcustomerInvoiceShippingAddrres', {'InvoicesID': invID, 'First_Name': fname, 'Last_Name': lname
      , 'Email': email      , 'State': state
      , 'Country': country, 'City': city, 'Zip': zip, 'Address': address,  'Telephon': telephone, 'Fax': fax

    })
      .map((res: Response) => {
        if (res) {
          console.log(res.status)
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }



}
