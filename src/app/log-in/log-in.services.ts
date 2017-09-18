import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()

export class LoginService {

  jwtHelper: JwtHelper = new JwtHelper();
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  decoded: string;
  ServerUrl =  'http://localhost:8000/user/';
  StoreServerUrl =  'http://localhost:8000/store/';

  constructor(private _http: Http ,
              private _nav: Router) {

  }


  loged_in(mail: any , pass: any, CatName: any, ProID: any) {


    return this._http.post(this.ServerUrl + 'user-token-auth/', {'username': mail, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            sessionStorage.setItem('Authorization', res.json().token);
            sessionStorage.setItem('UserName', mail);
            this.decoded =  this.jwtHelper.decodeToken(res.json().token)['user_id'];
            sessionStorage.setItem('UserID', this.decoded);
              this.GetUSerdetailsByUserId(this.jwtHelper.decodeToken(sessionStorage.getItem('Authorization'))['user_id']).subscribe(resSlidersData => {


              if ( CatName !== null && ProID !== null) {

                this._nav.navigate(['/single-product'], {queryParams: { CatName:  CatName, ProID: ProID, Redirect: 'MakeOffer' } });
              } else {

                if (resSlidersData['Vendor'] === true) {
                  this._nav.navigate(['/dashboard']);
                } else {
                  this._nav.navigate(['/buyer-dashboard']);
                }
              }


            }
              );
           }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }
  loged_No_redirect(mail: any , pass: any) {


    return this._http.post(this.ServerUrl + 'user-token-auth/', {'username': mail, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            sessionStorage.setItem('Authorization', res.json().token);
            sessionStorage.setItem('UserName', mail);
            this.decoded =  this.jwtHelper.decodeToken(res.json().token)['user_id'];
            sessionStorage.setItem('UserID', this.decoded);

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }

  GetUSerdetailsByUserId(decoded: any) {

    return this._http.get(this.ServerUrl + 'Get_User_details/' + decoded).map(response => response.json());
  }

  loged_out() {
    sessionStorage.setItem('UserID', null);
    return this._http.post(this.ServerUrl + 'api-token-refresh/', {'token': sessionStorage.getItem('Authorization')});
  }


  post_signup_form(username: string, email: string , password: string, Fname, LName, Mobile) {
    return this._http.post( this.ServerUrl + 'addUser/',
      {'username' :  username,  'email':  email, 'password':  password, })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            const responce_data = res.json();
            sessionStorage.setItem('Reg', 'Done');
            //  alert(localStorage.getItem('id'));
            //  console.log(responce_data.id);
            //  console.log('ok submited');
            this._nav.navigate(['/login']);
            this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
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

  register_customer(responce_data, Fname, LName, Mobile) {
    return this._http.post(this.ServerUrl + 'addUserDetails/',
      { 'user_id': responce_data,
        'Fname':  Fname,
        'Lname':  LName,
        'Mobile':  Mobile,
        'Vendor':  false,
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

    return this._http.get( this.ServerUrl + 'verifyusername/' + username)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
                const  response_useradmin = res.json();
              return response_useradmin;
          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            return Observable.throw(new Error(error.status));
          }
       } else {
          console.log(error);
          return Observable.throw(new Error(error.status));
        }
      });
  }

  check_email_unique(email) {
    return this._http.get(this.ServerUrl + 'email_verify/' + email).map((response: Response) => response.json());

  }
  GetStoreInformationByUserId(email) {
    return this._http.get(this.StoreServerUrl + 'GetStoreInformationByUserId/' + email).map((response: Response) => response.json());

  }

  verify_token() {
  return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': sessionStorage.getItem('Authorization')})
.map((res: Response) => {
  if (res) {
    console.log('Done');
    if (res.status === 201) {
      // return true;
    }
    else if (res.status === 200) {
      // return true;
    }
  }
}).catch((error: any) => {
  if (error.status === 404) {
    console.log('ok not submited submite');
    this._nav.navigate(['/login']);
    return Observable.throw(new Error(error.status));
  }
  else if (error.status === 400) {
    console.log('Not');
    this._nav.navigate(['/owner_login']);
    return Observable.throw(new Error(error.status));
  }
  else if (error.status === 401) {
    console.log('ok not submited submite');
    this._nav.navigate(['/login']);
    return Observable.throw(new Error(error.status));
  }
  else  {

    this._nav.navigate(['/login']);
  }
});
}
  verify_tokenWithNoRedirict() {

    return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': sessionStorage.getItem('Authorization')})
      .map(response => {
            const token = response.json() && response.json().token;
            if (token) {
              return true;
            } else {
              return false;
            }
          }
        )
          .catch(err => Observable.of(false));
      }


  StoreRegistration(model: any []) {
    console.log(model['fbrunregister']);
    if (model['fbrunregister'] === true ) {

      model['fbrregister'] = false;
      model['fbrname'] = '-';
      model['cnic'] = '-';
      model['strn'] = '-';

      console.log(model['fbrregister']);
      console.log(model['fbrname']);
      console.log(model['cnic']);
      console.log(model['strn']);

    }
    return this._http.post( this.StoreServerUrl + 'GetStoreInformation/' + sessionStorage.getItem('UserID'),
      {
        'StoreName' :  model['storename'],
        'OwnerName':  model['ownername'],
        'BusinessEmail':  model['email'],
        'Zip':  model['zipcode'],
        'City':  model['city'],
        'OwnerContactNum':  model['personal'],
        'BusinessPhone':  model['business'],
        'Address':  model['address'],
        'FbrRegister':  model['fbrregister'],
        'LegalName':  model['fbrname'],
        'NTN':  model['cnic'],
        'STRN':  model['strn'],
        'UserID': sessionStorage.getItem('UserID'),

      })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            // const responce_data = res.json();
            // localStorage.setItem('Reg', 'Done');
            //  alert(sessionStorage.getItem('id'));

            this.StoreBankRegistration(model).subscribe(data => {
              console.log(data);
            });
            // this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
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
  // Vendorshipchange(userid: string) {
  //   return this._http.get(this.ServerUrl + 'Vendorship/' + userid).map(response => response.json());
  // }

 StoreBankRegistration(model: any []) {

   return this._http.post( this.StoreServerUrl + 'GetStoreBankInformation/' + sessionStorage.getItem('UserID'),
     {
       'StoreID' :  model['storename'],
       'AccountTitle':  model['acount_title'],
       'AccountNumber':  model['acount_number'],
       'BankName':  model['Bank_name'],
       'BranchName':  model['Branch_name'],
       'BranchCode':  model['Branch_code'],
     })
     .map((res: Response) => {
       if (res) {
         console.log(res);
         if (res.status === 201 || res.status === 200) {
           // const responce_data = res.json();
            sessionStorage.setItem('StoreReg', 'Done');
           this._nav.navigate(['/login']);
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




  verifyStoreName(username:  string) {
    //console.log(username);

    return this._http.get( this.StoreServerUrl + 'verifyStoreName/' + username)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            const  response_useradmin = res.json();
            return response_useradmin;
          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            return Observable.throw(new Error(error.status));
          }
        } else {
          console.log(error);
          return Observable.throw(new Error(error.status));
        }
      });
  }

  email_verifyforStore(email) {
    return this._http.get(this.StoreServerUrl + 'emailverifyforStore/' + email).map((response: Response) => response.json());

  }

}
