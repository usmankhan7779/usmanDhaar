import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class ActiveAdServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'https://dhaardb.herokuapp.com/products/';
  StoreServerUrl = 'https://dhaardb.herokuapp.com/store/';

  constructor(private _http: Http,
              private _nav: Router) {
  }


  GetAllActiveproductsBYUserID(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getAll_Active_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  getAll_ProductBYUserID(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getAll_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }
  getAll_ProductBYStoreName(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getAll_ProductBYStoreName/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  GetAllPendingproductsBYUserID(page: any, UserID: any) {

    return this._http.get( this.ServerUrl + 'getAll_pending_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  GetallProductdBids(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'GetallProductdBids/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  GetStoreInformation(storename) {
    return this._http.get(this.StoreServerUrl + 'GetStoreInformation/' + storename).map((response: Response) => response.json());

  }



  GetAllcoupons(decoded: any) {

    return this._http.get(this.ServerUrl + 'GetAllcoupons/' + decoded).map(response => response.json());
  }
 GetOnecouponsByID(store: any, coded: any) {

    return this._http.get(this.ServerUrl + 'GetOnecouponsBycode/' + store + '/' + coded).map(response => response.json());
  }
 GetOfferStatus(pk: any, us: any) {

    return this._http.get(this.ServerUrl + 'GetOfferStatus/' + pk + '/' + us).map(response => response.json());
  }

  VerifyProductID(pk: any, store: any) {

    return this._http.get(this.ServerUrl + 'VerifyProducts/' + pk + '/' + store).map(response =>  response.json());
  }



  InsertDisCountcoupons(Qty: string, Discount: string , Day: string, StoreName, PID) {

    return this._http.post( this.ServerUrl + 'insertdiscountcoupons/',
      {'Qty' :  Qty,  'Discount':  Discount, 'Day':  Day, 'StoreName':  StoreName , 'ProductID':  PID })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {

          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

}
