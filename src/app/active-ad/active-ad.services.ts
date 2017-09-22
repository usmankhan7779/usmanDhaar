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

}
