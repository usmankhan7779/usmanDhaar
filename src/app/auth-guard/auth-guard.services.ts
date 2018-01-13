
<<<<<<< HEAD
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Injectable } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from '../services/http-service';
@Injectable()
export class AuthGuard implements CanActivate {
<<<<<<< HEAD
  ServerUrl =  'http://ns519750.ip-158-69-23.net:7600/user/';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpService ,
              private router: Router) { }

  verify_tokenWithNoRedirict() {
    if (isPlatformBrowser(this.platformId)){
=======
  ServerUrl =  'https://dhaardb.herokuapp.com/user/';
  constructor(private _http: HttpService ,
              private router: Router) { }

  verify_tokenWithNoRedirict() {

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    return this._http.post(this.ServerUrl + 'api-token-verify/', {'token': localStorage.getItem('Authorization')})
      .map(response => {
          const token = response.json() && response.json().token;
          if (token) {
            return true;
          } else {
            return false;
          }
        });
<<<<<<< HEAD
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
=======
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    if (localStorage.getItem('Authorization')) {
      // logged in so return true
      return true;
    }
<<<<<<< HEAD
    }
=======

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
