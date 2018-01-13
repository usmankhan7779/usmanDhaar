import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import { LoginService } from '../log-in/log-in.services';
import { HomeService } from '../home/home.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  ServerUrl =  'http://ns519750.ip-158-69-23.net:7600/';
  PicServrUrl = 'http://ns519750.ip-158-69-23.net:7600/media/';
  NewPostcheck = false ;
  ValueRec: Boolean = false;
  ActiveProduct: any = [];
  GetUSerDOne: any = [];

  GetUSerOffer: any[] = [];
  USerName: any;
  storename: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: Http ,
              private Profile: LoginService,
              private HomeServics: HomeService,
              private _nav: Router) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.Profile.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
        this.GetUSerDOne = resSlidersData;
        this.ValueRec = true;
      });

      this.USerName = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
      if (localStorage.getItem('NewPost') === 'Done') {
        this.NewPostcheck = true;
        localStorage.setItem('NewPost', null);

      }
      window.scrollTo(0, 0);

      this.Profile.GetStoreInformationByUserId(localStorage.getItem('UserID')).subscribe(
        data => {
          this.ActiveProduct = data;
          if (this.ActiveProduct.length > 0) {
            localStorage.setItem('StoreName', this.ActiveProduct[0].StoreName);
            this.HomeServics.GetallProductsOffersByStoreName(1, localStorage.getItem('StoreName')).subscribe(resSlidersData => {
              this.GetUSerOffer = resSlidersData;


            });
            this.storename = localStorage.getItem('StoreName');
          } else {
            this._nav.navigate(['/login']);
          }
        });


    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }

}
