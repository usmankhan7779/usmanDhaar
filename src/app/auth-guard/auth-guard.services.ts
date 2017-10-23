
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from '../services/http-service';
@Injectable()
export class AuthGuard implements CanActivate {
  ServerUrl =  'http://ns519750.ip-158-69-23.net:7600/user/';
  constructor(private _http: HttpService ,
              private router: Router) { }

  verify_tokenWithNoRedirict() {

    return this._http.post(this.ServerUrl + 'api-token-verify/', {'token': localStorage.getItem('Authorization')})
      .map(response => {
          const token = response.json() && response.json().token;
          if (token) {
            return true;
          } else {
            return false;
          }
        });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('Authorization')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
