import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()

export class LoginService {

  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl =  'http://127.0.0.1:8000/';

  constructor(private _http: Http ,
              private _nav: Router) {

  }


  loged_in(mail: any , pass: any) {


    return this._http.post(this.ServerUrl + 'user-token-auth/', {'username': mail, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem('Authorization', res.json().token)
            this._nav.navigate(['/dashboard']);
            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }

  loged_out() {
    return this._http.post(this.ServerUrl + 'api-token-refresh/', {'token': localStorage.getItem('Authorization')});
  }


  post_signup_form(username: string, email: string , password: string, Fname, LName, Mobile) {

    return this._http.post( this.ServerUrl + 'addUser/',
      {'username' :  username,  'email':  email, 'password':  password})
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            const responce_data = res.json();
            this.id = localStorage.setItem('id', responce_data.id);
            //  alert(localStorage.getItem('id'));
            //  console.log(responce_data.id);
            //  console.log('ok submited');
            this._nav.navigate(['/login']);
            this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
          }
        }
      }).catch((error: any) => {
        console.log(error);
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

  register_customer(responce_data, Fname, LName, Mobile) {
    return this._http.post('http://127.0.0.1:8000/addUserDetails/',
      { 'user_id': responce_data,
        'Fname':  Fname,
        'Lname':  LName,
        'Mobile':  Mobile,
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          console.log('ok submited');
        }
      }
    }).catch((error: any) => {
      console.log(error);
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

  verify_username(username:  string) {
    //console.log(username);

    return this._http.get( this.ServerUrl + 'verifyusername/'+ username)
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
           // / const responce_data = res.json();
            //  this.id = localStorage.setItem('id', responce_data.id)
            const  response_useradmin = res.json();

            // console.log(response_useradmin.Res);
            //this._nav.navigate(['/login']);
            return response_useradmin;
          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            //this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  check_email_unique(email){
    return this._http.get(this.ServerUrl+'email_verify/'+email).map((response:Response) => response.json());

  }

  verify_token() {
    return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': localStorage.getItem('Authorization')})
      .map((res: Response) => {
        if (res) {
           console.log('Done')
          if (res.status === 201) {
            // return true;
          }
          else if (res.status === 200) {
            // return true;
          }
        }
      }).catch((error: any) => {
        if (error.status === 404) {
          console.log("ok not submited submite");
          this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          console.log("Not");
          this._nav.navigate(['/owner_login']);
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 401) {
          console.log("ok not submited submite");
          this._nav.navigate(['/login']);
          return Observable.throw(new Error(error.status));
        }
        else  {

          this._nav.navigate(['/login']);
        }
      });
  }

}
