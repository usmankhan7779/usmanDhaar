import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';




@Injectable()

export class LoginService {

  jwtHelper: JwtHelper = new JwtHelper();
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  decoded: string;
  ServerUrl =  'https://apis.dhaar.pk/user/';
  StoreServerUrl =  'http://192.168.30.222:7000/store/';
  EMailServerUrl =  'https://apis.dhaar.pk/rest-auth/';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpService ,
              private _nav: Router) {

  }


  loged_in(mail: any , pass: any, CatName: any, ProID: any, checkout: any) {

    if (isPlatformBrowser(this.platformId)) {
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
  }
  loged_No_redirect(mail: any , pass: any) {
    if (isPlatformBrowser(this.platformId)) {

    return this._http.post(this.ServerUrl + 'user-token-auth/', {'username': mail, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem('Authorization', res.json().token);
            localStorage.setItem('UserName', mail);
            this.decoded =  this.jwtHelper.decodeToken(res.json().token)['UserName'];
            localStorage.setItem('UserID', this.decoded);

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

    }

  }

  GetUSerdetailsByUserId(decoded: any) {
    // GetStoreInformation
    // Get_User_details
    
    return this._http.get(this.ServerUrl + 'Get_User_details/' + decoded).map(response => response.json());
  }



  loged_out() {
    if (isPlatformBrowser(this.platformId)) {
    // localStorage.setItem('UserID', null);
    localStorage.clear();
    return this._http.post(this.ServerUrl + 'api-token-refresh/', {'token': localStorage.getItem('Authorization')});
    }
  }

  sendmail(email) {

    if (isPlatformBrowser(this.platformId)) {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this.ServerUrl + 'user_confirm/',
        JSON.stringify({
          user: email,
          username: localStorage.getItem('Usernamae')
        }), {headers: headers})
        .map((response: Response) => {
          swal({
            title: 'Please check your Inbox for Account Activation Instructions.',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this._nav.navigate(['/VerfiyEmail/a'])
            }
          })
        });
    }
  }

  post_signup_form(username: string, email: string , password: string, Fname, LName, Mobile) {

    if (isPlatformBrowser(this.platformId)) {

    return this._http.post( this.ServerUrl + 'addUser/', {
      'username' :  username,
      'email':  email,
      'first_name': Fname,
      'last_name': LName,
      'password':  password,
    })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // localStorage.setItem('account_created' , '1' );
            const responce_data = res.json();
             localStorage.setItem('Usernamae', username);
             localStorage.setItem('email', email);
             localStorage.setItem('password', password);
            //  alert(localStorage.getItem('id'));
             console.log('Responce Data is: ',responce_data.id);
            //  console.log('ok submited');
            this.sendmail(email).subscribe();
            this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
            this._nav.navigate(['/VerfiyEmail/a']);
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

  register_customer(responce_data, Fname, LName, Mobile) {

    return this._http.post(this.ServerUrl + 'addUserDetails/',
      {
        'user_id': responce_data,
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
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this._http.get( this.ServerUrl + 'verifyusername/' + username, {headers: headers})
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
    console.log('sdsdd');

    return this._http.get(this.ServerUrl + 'email_verify/' + email).map((response: Response) => response.json());
  }

  GetStoreInformationByUserId(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' +localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.StoreServerUrl + 'GetStoreInformation/' + username,{headers: headers}).map((response: Response) => response.json());

  }

  verify_token() {
    if (isPlatformBrowser(this.platformId)) {

  return this._http.post(this.ServerUrl + 'api-token-verify/' , {'token': localStorage.getItem('Authorization')})
.map((res: Response) => {
  if (res) {

    if (res.status === 201) {
      // return true;

    } else if (res.status === 200) {
      // return true;
    }
  }
}).catch((error: any) => {
  if (error.status === 404) {
    console.log('ok not submited submite');
    this._nav.navigate(['/login']);
    return Observable.throw(new Error(error.status));
  } else if (error.status === 400) {
    console.log('Not');
    this._nav.navigate(['/owner_login']);
    return Observable.throw(new Error(error.status));
  } else if (error.status === 401) {
    console.log('ok not submited submite');
    this._nav.navigate(['/login']);
    return Observable.throw(new Error(error.status));
  } else  {

    this._nav.navigate(['/login']);
  }
});
  }
  }


  verify_tokenForlogin() {
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'api-token-verify/', {'token': localStorage.getItem('Authorization')})
        .map((res: Response) => {
          const token = res.json() && res.json().token;
          if (token) {
            this._nav.navigate(['/home']);
          } else {
            this._nav.navigate(['/login']);
          }
        }).catch((error: any) => {
          if (error.status === 404) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 400) {
            console.log('Not');
            this._nav.navigate(['/owner_login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 401) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else {

            this._nav.navigate(['/login']);
          }
        });
    }
  }


  verify_tokenWithNoRedirict() {
    if (isPlatformBrowser(this.platformId)) {

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
  }


  StoreRegistration(model: any []) {
    if (isPlatformBrowser(this.platformId)) {

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

      },)
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
  }

  StoreRegistrationPic(model: any [], Pic: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' +localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    if (isPlatformBrowser(this.platformId)) {

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

      return this._http.post( this.StoreServerUrl + 'GetStoreInformation/' + localStorage.getItem('UserName'),
        {
          'storename' :  model['storename'],
          'ownername':  model['ownername'],
          'businessemail':  model['email'],
          'zip':  model['zipcode'],
          'city':  model['city'],
          'contactno':  model['personal'],
          'businessphone':  model['business'],
          'address':  model['address'],
          'fbrregister':  model['fbrregister'],
          'legalname':  model['fbrname'],
          'ntn':  model['cnic'],
          'strn':  model['strn'],
          'user': localStorage.getItem('UserName'),
          'pic': Pic,
          // 'StoreID' :  model['storename'],
         'acctitle':  model['acount_title'],
          'accno':  model['acount_number'],
       'bankname':  model['Bank_name'],
       'branchname':  model['Branch_name'],
       'branchcode':  model['Branch_code'],

        },{headers: headers})
        .map((res: Response) =>  {
          console.log('Storing with pic');

          if (res) {
            if (res.status === 201 || res.status === 200) {
              // localStorage.setItem('account_created' , '1' );
              // const responce_data = res.json();
              // localStorage.setItem('Reg', 'Done');
              //  alert(localStorage.getItem('id'));
              console.log('Storing with pic');
              // this.StoreBankRegistration(model).subscribe(data => {
              //   console.log(data);
              // });
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
  }

  // Vendorshipchange(userid: string) {
  //   return this._http.get(this.ServerUrl + 'Vendorship/' + userid).map(response => response.json());
  // }

 StoreBankRegistration(model: any []) {
   if (isPlatformBrowser(this.platformId)) {


   return this._http.post( this.StoreServerUrl + 'GetStoreBankInformation/' + localStorage.getItem('UserID'),
     {
       'StoreID' :  model['storename'],
       'AccountTitle':  model['acount_title'],
       'AccountNumber':  model['acount_number'],
       'BankName':  model['Bank_name'],
       'BranchName':  model['Branch_name'],
       'BranchCode':  model['Branch_code'],
     })
     .map((res: Response) =>   res.json() 
    //  {
    //    if (res) {
    //      console.log(res);
    //      if (res.status == 201 || res.status == 200) {
    //        // const responce_data = res.json();
    //         localStorage.setItem('StoreReg', 'Done');
    //      // this._nav.navigate(['/login']);
    //       // localStorage.clear();
    //      }
    //    }
    //  }
     ).catch((error: any) => {
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
  }

  USerName;
  verifyStoreName(store) {
    // this.USerName = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' +localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));

    return this._http.post( this.StoreServerUrl + 'verifyStoreName&Email/',JSON.stringify({ 'store' : store}),{headers: headers})
      .map((res: Response) => res.json()
//        {
// alert(res)
//         if (res) {
//           // this.jwtHelper.decodeToken(localStorage.getItem('Authorization'));
//           if (res.status === 201 || res.status === 200) {
//             const responce_data = res.json();
//          }
//         }
//       }
      ).catch((error: any) => {

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
  searchrecord(search) {
     
    console.log(search)
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this._http.post('search/' , JSON.stringify({
       "search": search }), 
     {headers: headers}).map((response: Response) => response.json());
     }
//   LoginService.prototype.loged_in = function (mail, pass) {
//     var _this = this;
//     return this._http.post(this.ServerUrl + 'user-token-auth/', { 'username': mail, 'password': pass })
//         .map(function (res) {
//         if (res) {
//             if (res.status === 200) {
//                 localStorage.setItem('Authorization', res.json().token);
//                 _this.decoded = _this.jwtHelper.decodeToken(res.json().token)['user_id'];
//                 //localStorage.setItem('User_ID', res.json().id);
//                 console.log('Token: ' + res.json().token);
//                 console.log('UserID: ' + _this.decoded);
//                 _this._nav.navigate(['/dashboard']);
//                 return [{ status: res.status, json: res }];
//             }
//         }
//     }).catch(function (error) {
//         return Rx_1.Observable.throw(new Error(error.status));
//     });
// };


  // verifyStoreName(username:  string) {
  //   //console.log(username);

  //   return this._http.get( this.StoreServerUrl + 'verifyStoreName&Email/' )
  //     .map((res: Response) => {
  //       if (res) {
  //         if (res.status === 201 || res.status === 200) {
  //           const  response_useradmin = res.json();
  //           return response_useradmin;
  //         }
  //       }
  //     }).catch((error: any) => {
  //       console.log(error);
  //       if (error.status !== 404) {
  //         if (error.status === 401) {
  //           return Observable.throw(new Error(error.status));
  //         }
  //       } else {
  //         console.log(error);
  //         return Observable.throw(new Error(error.status));
  //       }
  //     });
  // }

  email_verifyforStore(email) {
    return this._http.get(this.StoreServerUrl + 'emailverifyforStore/' + email).map((response: Response) => response.json());

  }



  GetUserDetailByName(USerid) {
    return this._http.get(this.ServerUrl + 'UserFullDetails/' + USerid).map((response: Response) => response.json());
  }

   GetEmailById(USerid) {
    return this._http.get(this.ServerUrl + 'Get_EmailByID/' + USerid).map((response: Response) => response.json());
  }

  UserDetailsUpdatePic(Username: string,Pic: any) {
    return this._http.post( this.ServerUrl + 'UserFullDetailsPicUpload/' + Username,
      {
        'Pic' : Pic,
      })
      .map((res: Response) => {
        console.log('Response:', res);
      });
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

  UserConfirm(key:any) {
    return this._http.post(this.ServerUrl + 'user_confirm_email/', {
      'activation_key': key,
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          console.log('Yahoooooo Status MAtch');
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


  reset_service(email) {
    console.log(email);
    return this._http.post(this.ServerUrl + 'forget_password_customer/', {
      'user': email
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          console.log('Yahoooooo Status MAtch');
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


  ResetPasswordConfirm(uid, token, pass1, pass2) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.ServerUrl + 'passowrd_reset_confirm/',{
        'activation_key': token,
        'password': pass2,
        'uid': uid
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          // const responce_data = res.json();
          console.log('Yahoooooo Status MAtch');
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

  checkcode(key, email) {
    if (isPlatformBrowser(this.platformId)) {

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
  }


  NewsLatterEmail(email) {

      return this._http.post(this.ServerUrl + 'subscription', {
        'Email': email
      }).map((response: Response) => response.json());
    }


}
