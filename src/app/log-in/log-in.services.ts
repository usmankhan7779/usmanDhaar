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
  ServerUrl =  'https://dhaardb.herokuapp.com/user/';
  StoreServerUrl =  'https://dhaardb.herokuapp.com/store/';
  EMailServerUrl =  'https://dhaardb.herokuapp.com/rest-auth/';


  constructor(private _http: HttpService ,
              private _nav: Router) {

  }


  loged_in(mail: any , pass: any, CatName: any, ProID: any, checkout: any) {
    return this._http.post(this.ServerUrl + 'user-token-auth/', {'username': mail, 'password': pass})
      .map((res: Response) => {
        if (res) {

          if (res.status === 200) {

            this.decoded =  this.jwtHelper.decodeToken(res.json().token)['user_id'];
            localStorage.setItem('UserID', this.decoded);
              this.GetUSerdetailsByUserId(this.decoded).subscribe(resSlidersData => {
              if (resSlidersData['ISConfirmed'] === true) {
                localStorage.setItem('Authorization', res.json().token);
                localStorage.setItem('password', null);
                localStorage.setItem('Username', null);
                localStorage.setItem('UserName', mail);

              if ( CatName !== null && ProID !== null) {

                this._nav.navigate(['/single-product'], {queryParams: { CatName:  CatName, ProID: ProID, Redirect: 'MakeOffer' } });
              } else if (checkout === 'yes') {
                if (resSlidersData['Complete'] === true) {
                  this._nav.navigate(['/checkout2'], {queryParams: {login: 'yes'}});
                } else {
                  this._nav.navigate(['/user-detail'], {queryParams: {Inc: 'true'}});
                }
              } else {
                    // alert(resSlidersData['Vendor']);
                if (resSlidersData['Vendor'] === true) {
                  this._nav.navigate(['/dashboard']);
                } else {
                  this._nav.navigate(['/buyer-dashboard']);
                }
              }
            } else {

                this.GetEmailById(this.decoded).subscribe(resSlidersData1 => {
                  localStorage.setItem('Usernamae', mail);
                  localStorage.setItem('email', resSlidersData1['email']);
                  localStorage.setItem('password', pass);
                });

                this._nav.navigate(['/VerfiyEmail']);
              }

                });
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
            localStorage.setItem('Authorization', res.json().token);
            localStorage.setItem('UserName', mail);
            this.decoded =  this.jwtHelper.decodeToken(res.json().token)['user_id'];
            localStorage.setItem('UserID', this.decoded);

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
    // localStorage.setItem('UserID', null);
    localStorage.clear();
    return this._http.post(this.ServerUrl + 'api-token-refresh/', {'token': localStorage.getItem('Authorization')});
  }



  post_signup_form(username: string, email: string , password: string, Fname, LName, Mobile) {
    return this._http.post( this.ServerUrl + 'addUser/',
      {'username' :  username,  'email':  email, 'password':  password, })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            const responce_data = res.json();
             localStorage.setItem('Usernamae', username);
             localStorage.setItem('email', email);
             localStorage.setItem('password', password);
            //  alert(localStorage.getItem('id'));
            //  console.log(responce_data.id);
            //  console.log('ok submited');
            this.sendmail(email).subscribe();
            this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
            this._nav.navigate(['/VerfiyEmail']);
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
        'ISConfirmed': false,
      }).map((res: Response) => {
      if (res) {

        if (res.status === 201 || res.status === 200) {

        }
      }
    }).catch((error: any) => {
      console.log(error);
      if (error.status !== 404) {
        if (error.status === 401) {
          // console.log(error);

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
  return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': localStorage.getItem('Authorization')})
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

    return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': localStorage.getItem('Authorization')})
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
    return this._http.post( this.StoreServerUrl + 'GetStoreInformation/' + localStorage.getItem('UserID'),
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
        'UserID': localStorage.getItem('UserID'),

      })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            // const responce_data = res.json();
            // localStorage.setItem('Reg', 'Done');
            //  alert(localStorage.getItem('id'));

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

   return this._http.post( this.StoreServerUrl + 'GetStoreBankInformation/' + localStorage.getItem('UserID'),
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
            localStorage.setItem('StoreReg', 'Done');
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
  GetUserDetailByName(USerid) {
    return this._http.get(this.ServerUrl + 'UserFullDetails/' + USerid).map((response: Response) => response.json());
  }

   GetEmailById(USerid) {
    return this._http.get(this.ServerUrl + 'Get_EmailByID/' + USerid).map((response: Response) => response.json());
  }




  UserDetailsUpdate(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Pic: any, Username: string) {
    return this._http.post( this.ServerUrl + 'UserFullDetails/' + Username,
      {
        'user_id': Username,
        'Fname' :  FName,
        'Lname' :  Lname,
        'Mobile' :  Mobile,
        'Country' :  Country,
        'State' :  State,
        'City' : City,
        'Zip' :  Zip,
        'Address' :  Address,
        'Pic' : Pic,


      })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
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

  UserDetailsUpdateWithOutPic(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Username: string) {
    return this._http.post( this.ServerUrl + 'UserFullDetailsWithoutPic/' + Username,
      {
        'user_id': Username,
        'Fname' :  FName,
        'Lname' :  Lname,
        'Mobile' :  Mobile,
        'Country' :  Country,
        'State' :  State,
        'City' : City,
        'Zip' :  Zip,
        'Address' :  Address,


      })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
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

  changepass(username: string, currPass: string, pass1: string, pass2: string) {

    return this._http.post(this.ServerUrl + 'ChangePassword', {
      'email': username,
      'current': currPass,
      'pass1': pass1,
      'pass2': pass2
    }).map((response: Response) => response.json());
  }


  reset_service(email) {
    console.log(email);
    return this._http.post(this.EMailServerUrl + 'password/reset/', {
      'email': email
    }).map((response: Response) => response.json());
  }


  ResetPasswordConfirm(uid, token, pass1, pass2) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.EMailServerUrl + 'password/reset/confirm/', JSON.stringify({
        new_password1: pass1,
        token: token,
        new_password2: pass2,
        uid: uid}),
      {headers: headers}).map((response: Response) => {

       return response.json();

    }).catch((error: any) => {
      console.log(error.message);
      // alert('sfs');
      return Observable.throw(new Error(error.status));
    });

  }
  sendmail(email) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.ServerUrl + 'confirm/email/',
      JSON.stringify({
        email: email,
        username: localStorage.getItem('Usernamae')
      }), {headers: headers})
      .map((response: Response) => {

        // console.log(response);
      });
  }
  checkcode(key, email) {
    console.log(key);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.ServerUrl + 'verify/email/',
      JSON.stringify({
        email: email,
        username: localStorage.getItem('Usernamae'),
        key: key
      }), {headers: headers})
      .map((response: Response) => {

        if (response) {

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



  NewsLatterEmail(email) {

      return this._http.post(this.ServerUrl + 'subscription', {
        'Email': email
      }).map((response: Response) => response.json());
    }


}
