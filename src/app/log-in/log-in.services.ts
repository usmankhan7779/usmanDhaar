import 'rxjs/add/operator/map';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { HttpService } from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { StaticInjector } from '@angular/core/src/di/injector';




@Injectable()

export class LoginService {

  jwtHelper: JwtHelper = new JwtHelper();
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  decoded: string;
  USerNameID: string;
  // http://192.168.30.225:7000
  // https://apis.dhaar.pk
  ServerUrl = 'https://apis.dhaar.pk/user/';
  StoreServerUrl = 'https://apis.dhaar.pk/store/';
  EMailServerUrl = 'https://apis.dhaar.pk/rest-auth/';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private _http: HttpService,
    private http: Http,
    private _nav: Router) {

  }


  loged_in(mail: any, pass: any, CatName: any, ProID: any, checkout: any) {

    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'user-token-auth/', { 'username': mail, 'password': pass })
        .map((res: Response) => {
          if (res) {

            if (res.status === 200) {

              this.decoded = this.jwtHelper.decodeToken(res.json().token)['user_id'];
              localStorage.setItem('UserID', this.decoded);
              this.GetUSerdetailsByUserId(this.decoded).subscribe(resSlidersData => {
                if (resSlidersData['ISConfirmed'] === true) {
                  localStorage.setItem('Authorization', res.json().token);
                  localStorage.setItem('password', null);
                  localStorage.setItem('Username', null);
                  localStorage.setItem('UserName', mail);

                  if (CatName !== null && ProID !== null) {

                    this._nav.navigate(['/single-product'], { queryParams: { CatName: CatName, ProID: ProID, Redirect: 'MakeOffer' } });
                  } else if (checkout === 'yes') {
                    if (resSlidersData['Complete'] === true) {
                      this._nav.navigate(['/checkout2'], { queryParams: { login: 'yes' } });
                    } else {
                      this._nav.navigate(['/user-detail'], { queryParams: { Inc: 'true' } });
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
  loged_No_redirect(mail: any, pass: any) {
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'user-token-auth/', { 'username': mail, 'password': pass })
        .map((res: Response) => {
          if (res) {
            if (res.status === 200) {
              localStorage.setItem('Authorization', res.json().token);
              localStorage.setItem('UserName', mail);
              this.decoded = this.jwtHelper.decodeToken(res.json().token)['user_id'];
              localStorage.setItem('UserID', this.decoded);

            }
          }
        }).catch((error: any) => {

          return Observable.throw(new Error(error.status));
        });

    }

  }

  GetUSerdetailsByUserId(decoded: any) {

    return this._http.get(this.ServerUrl + 'Get_User_details/' + decoded).map(response => response.json());
    // return this._http.get(this.ServerUrl + 'post_shipment_details/' + decoded).map(response => response.json());
  }
  GetUSeraddress() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'post_shipment_details/', { headers: headers }).map(response => response.json());
  }
  GetUSeraddressbyID(id: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'put_delete_shipment_details/' + id, { headers: headers }).map(response => response.json());
  }
  // http://192.168.30.225:7000/user/put_delete_shipment_details/
  GetUSerdetailsByUserId1() {

    // return this._http.get(this.ServerUrl + 'Get_User_details/' + decoded).map(response => response.json());
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'post_shipment_details/', { headers: headers }).map(response => response.json());
  }

  GetUSerdetailsByUserIdupdate(id: number, fullname: string, address: string, province: string, city: string, area: string, default_shipment_address: string, phone_no: string, user) {
    this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    console.log(this.USerNameID)
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.put(this.ServerUrl + 'put_delete_shipment_details/' + id,
      {

        "id": id,
        "fullname": fullname,
        "address": address,
        "province": province,
        "city": city,
        "area": area,
        "default_shipment_address": default_shipment_address,
        "phone_no": phone_no,
        "user_id": user


      }, { headers: headers })
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


  loged_out() {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.setItem('UserID', null);
      localStorage.clear();
      return this._http.post(this.ServerUrl + 'api-token-refresh/', { 'token': localStorage.getItem('Authorization') });
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
        }), { headers: headers })
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

  // post_signup_form(username: string, email: string, password: string, Fname, LName, Mobile) {
post_signup_form(username: string, email: string, password: string, Fname, LName, Mobile,Country,State,City,zip,Address,Pic) {

    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'signupuser/', {
        // 'username' :  username,
        // 'email':  email,
        // 'first_name': Fname,
        // 'last_name': LName,
        // 'password':  password,
        "username": username,
        "email": email,
        "password": password,
        "fname": Fname,
        "lname": LName,
        "mobile": Mobile,
        // "country": null,
        // "state": null,
        // "city": null,
        // "zip": null,
        // "address": null,
        // "vendor": false,
        // "pic": null
        "country": Country,
        "state": State,
        "city": City,
        "zip": zip,
        "address": Address,
        "vendor": false,
        "pic": Pic

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
              console.log('Responce Data is: ', responce_data.id);
              //  console.log('ok submited');
             // this.sendmail(email).subscribe();
              //this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
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
        'Fname': Fname,
        'Lname': LName,
        'Mobile': Mobile,
        'Vendor': false,
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

  verify_username(username: string) {

    //console.log(username);
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this._http.get(this.ServerUrl + 'verifyusername/' + username, { headers: headers })
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            const response_useradmin = res.json();
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

  GetStoreInformationByUserId(email) {
    const headers = new Headers();
  
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.StoreServerUrl + 'GetStoreInformation/' + email,{headers :headers}).map((response: Response) => response.json());

  }

  verify_token() {
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
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
          } else {

            this._nav.navigate(['/login']);
          }
        });
    }
  }


  verify_tokenForlogin() {
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
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

      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
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


  StoreRegistration(model: any[]) {
    if (isPlatformBrowser(this.platformId)) {

      console.log(model['fbrunregister']);
      if (model['fbrunregister'] === true) {

        model['fbrregister'] = false;
        model['fbrname'] = '-';
        model['cnic'] = '-';
        model['strn'] = '-';

        console.log(model['fbrregister']);
        console.log(model['fbrname']);
        console.log(model['cnic']);
        console.log(model['strn']);

      }
      return this._http.post(this.StoreServerUrl + 'GetStoreInformation/' + localStorage.getItem('UserID'),
        {
          'StoreName': model['storename'],
          'OwnerName': model['ownername'],
          'BusinessEmail': model['email'],
          'Zip': model['zipcode'],
          'City': model['city'],
          'OwnerContactNum': model['personal'],
          'BusinessPhone': model['business'],
          'Address': model['address'],
          'FbrRegister': model['fbrregister'],
          'LegalName': model['fbrname'],
          'NTN': model['cnic'],
          'STRN': model['strn'],
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
  }

  StoreRegistrationPic(model: any[], Pic: any) {
    if (isPlatformBrowser(this.platformId)) {

      console.log(model['fbrunregister']);
      if (model['fbrunregister'] === true) {

        model['fbrregister'] = false;
        model['fbrname'] = '-';
        model['cnic'] = '-';
        model['strn'] = '-';

        console.log(model['fbrregister']);
        console.log(model['fbrname']);
        console.log(model['cnic']);
        console.log(model['strn']);

      }

      return this._http.post(this.StoreServerUrl + 'GetStoreInformationWithPic/' + localStorage.getItem('UserID'),
        {
          'StoreName': model['storename'],
          'OwnerName': model['ownername'],
          'BusinessEmail': model['email'],
          'Zip': model['zipcode'],
          'City': model['city'],
          'OwnerContactNum': model['personal'],
          'BusinessPhone': model['business'],
          'Address': model['address'],
          'FbrRegister': model['fbrregister'],
          'LegalName': model['fbrname'],
          'NTN': model['cnic'],
          'STRN': model['strn'],
          'UserID': localStorage.getItem('UserID'),
          'Pic': Pic,

        })
        .map((res: Response) => {
          console.log('Storing with pic');

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

  // Vendorshipchange(userid: string) {
  //   return this._http.get(this.ServerUrl + 'Vendorship/' + userid).map(response => response.json());
  // }

  StoreBankRegistration(model: any[]) {
    if (isPlatformBrowser(this.platformId)) {


      return this._http.post(this.StoreServerUrl + 'GetStoreBankInformation/' + localStorage.getItem('UserID'),
        {
          'StoreID': model['storename'],
          'AccountTitle': model['acount_title'],
          'AccountNumber': model['acount_number'],
          'BankName': model['Bank_name'],
          'BranchName': model['Branch_name'],
          'BranchCode': model['Branch_code'],
        })
        .map((res: Response) => {
          if (res) {
            console.log(res);
            if (res.status === 201 || res.status === 200) {
              // const responce_data = res.json();
              localStorage.setItem('StoreReg', 'Done');
              this._nav.navigate(['/login']);
              localStorage.clear();
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





  verifyStoreName(username: string) {
    //console.log(username);

    return this._http.get(this.StoreServerUrl + 'verifyStoreName/' + username)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            const response_useradmin = res.json();
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

  UserDetailsUpdatePic(Username: string, Pic: any) {
    return this._http.post(this.ServerUrl + 'UserFullDetailsPicUpload/' + Username,
      {
        'Pic': Pic,
      })
      .map((res: Response) => {
        console.log('Response:', res);
      });
  }
  Useraddressaddtocart(FName: string, province: string, City: string, Area: string, Mobile: string, Address: string, Shipmentaddress: string) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.post(this.ServerUrl + 'post_shipment_details/',
      {
        // {
        //   "fullname":"hassan",
        //   "address":"hsjssososoosos",
        //   "province":"punjab",
        //   "city":"fsd",
        //   "area":"samanabad",
        //   "default_shipment_address":false,
        //   "phone_no":"89128963447"
        //   }
        // 'user_id': Username,
        'fullname': FName,
        'address': Address,
        'phone_no': Mobile,
        'province': province,
        'default_shipment_address': Shipmentaddress,
        'city': City,
        'area': Area,
        'Address': Address,
        // 'Pic' : Pic,


      }, { headers: headers })
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


  UserDetailsUpdate(id: number, FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Vendor: string, Pic: any, Username: string, ISConfirmed: string, Complete: string) {
    this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    console.log(this.USerNameID)
    return this.http.put(this.ServerUrl + 'UserFullDetails/' + this.USerNameID,
      {
        "id": id,
        // "user_id": 277,

        'user_id': Username,
        'Fname': FName,
        'Lname': Lname,
        'Mobile': Mobile,
        'Country': Country,
        'State': State,
        'City': City,
        'Zip': Zip,
        'Address': Address,
        'Vendor': Vendor,
        'ISConfirmed': ISConfirmed,
        'Pic': Pic,
        'Complete': Complete


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
    return this._http.post(this.ServerUrl + 'UserFullDetailsWithoutPic/' + Username,
      {
        'user_id': Username,
        'Fname': FName,
        'Lname': Lname,
        'Mobile': Mobile,
        'Country': Country,
        'State': State,
        'City': City,
        'Zip': Zip,
        'Address': Address,


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

  UserConfirm(key: any) {
    return this._http.post(this.ServerUrl + 'activate_account/', {
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
    return this._http.post(this.ServerUrl + 'passowrd_reset_confirm/', {
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
        }), { headers: headers })
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
