import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class CategoryServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'http://localhost:8000/products/';


  constructor(private _http: Http,
              private _nav: Router) {
  }
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }


  getAllPhoneAndTabletProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProduct?page=' + page, ).map(response => response.json());
  }
  getAllWomenFashionProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProduct?page=' + page, ).map(response => response.json());
  }
  getAllMenFashionProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProduct?page=' + page, ).map(response => response.json());
  }
  getAllTVAudioVideoProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProduct?page=' + page, ).map(response => response.json());
  }
  getAllComputingLaptopsProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProduct?page=' + page, ).map(response => response.json());
  }
  getAllHomeAppliancesProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProduct?page=' + page, ).map(response => response.json());
  }

}
