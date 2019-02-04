import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class BuyerDashboardServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'https://apis.dhaar.pk/products/';
  // saleServerUrl = 'https://apis.dhaar.pk/sale/';
  saleServerUrl = 'https://apis.dhaar.pk/sale/';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: Http,
              private _nav: Router) {
  }


  GetallInvoiceIDByUser( UserID: any) {
    return this._http.get( this.saleServerUrl + 'GetallInvoiceIDByUser/' + UserID  ).map(response => response.json());
  }

  GetallIDByUser( PId: any) {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get( this.ServerUrl + 'InsertUserReview/' + PId ,{headers:headers}).map(response => response.json());

      // return this._http.get( this.saleServerUrl + 'ActiveReviewsByUserId/' + PId + '/' + UserID ).map(response => response.json());
    }
    else{
      return this._http.get( this.ServerUrl + 'InsertUserReview/' + PId ).map(response => response.json());
    }
  }
// InsertUserReview

  GetInvoiceByInvoiceID( UserID: any) {
    return this._http.get( this.saleServerUrl + 'GetInvoiceByInvoiceID/' + UserID  ).map(response => response.json());
  }

  GetAllProductBYInvoiceId( InvoiceId: any) {
    return this._http.get( this.saleServerUrl + 'GetAllProductBYInvoiceId/' + InvoiceId  ).map(response => response.json());
  }

  GetShippingByInvoiceId( InvoiceId: any) {
    return this._http.get( this.saleServerUrl + 'GetShippingByInvoiceId/' + InvoiceId  ).map(response => response.json());
  }
  WatchStatus() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    if (isPlatformBrowser(this.platformId)){

    return this._http.get(this.ServerUrl + 'watchList/' ,{headers:headers}).map(response => response.json());
  }
}

  SendEmail(InvID: any) {
    return this._http.post(this.saleServerUrl + 'OrderEmail/', {
      'InvoiceID': InvID,
      'UserID': localStorage.getItem('UserID')
    }).map((res: Response) => {
      if (res) {
        console.log(res.status);
        if (res.status === 200) {

        }
      }
    }).catch((error: any) => {
      alert(error);
      return Observable.throw(new Error(error.status));
    });
  }

  Invoice(invID:any, invBalance: any, invPay: any,  invGuest: any, invUserID: any) {


    return this._http.post(this.saleServerUrl + 'AddcustomerInvoice', {
      'InvoicesID': invID,
      'InvoicesBalance': invBalance,
      'InvoicesPayment': invPay,
      'InvoicesAsGuest': invGuest,
      'InvoicesAsUserID': invUserID
      // {
      //   InvoicesBalance:250,
      //   InvoicesPayment:false,
      //   InvoicesAsGuest:false,
      //   InvoicesAsUserID:277
      //   }
    })
      .map((res: Response) => {
        if (res) {
          const responce_data = res.json();

          console.log('this is the id' + responce_data.id);
          if (isPlatformBrowser(this.platformId)){
          localStorage.setItem('InvoiceID', responce_data.id);
          }
          if (res.status === 200) {
          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }
  // http://192.168.30.225:7000/sale/AddcustomerInvoice
  paymentmethod(creditno , exp, ccv ,paymenttype , price , currency_code , card_type ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    if (isPlatformBrowser(this.platformId)){

      return this._http.post(this.saleServerUrl+'payment/post_payment/',
        {


        
            "creditno":creditno ,
            "exp":exp,
            "ccv":ccv,
            "paymenttype":paymenttype ,
            "price":price,
            "currency_code":currency_code ,
            "card_type":card_type 
            // "shipmentid":shipmentid

        }, { headers: headers }).map((res: Response) => {
          if (res) {
            console.log(res.status);
            if (res.status === 200) {

            }
          }

      }).catch((error: any) => {
        console.log(error.toString());
        return Observable.throw(new Error(error.status));
      });


    }
  }

  InvoiceProducts(invID: any , prodID: any, Quantity: any, UserID: any) {

    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.saleServerUrl + 'AddcustomerInvoiceProduct', {
        'InvoicesID': invID,
        'ProductID': prodID,
        'UserID': UserID,
        'Qty': Quantity
      })
        .map((res: Response) => {
          if (res) {
            console.log(res.status);
            if (res.status === 200) {

            }
          }
        }).catch((error: any) => {
          alert(error);
          return Observable.throw(new Error(error.status));
        });
    }
  }


  CustomerInvoiceShippingAddress(invID: any , fname: any, lname: any, email: any, state: any, country: any, city: any, zip: any, address: any, telephone: any, fax: any) {
    return this._http.post(this.saleServerUrl + 'AddcustomerInvoiceShippingAddrres', {
      'InvoicesID': invID, 'First_Name': fname, 'Last_Name': lname
      , 'Email': email, 'State': state
      , 'Country': country, 'City': city, 'Zip': zip, 'Address': address,  'Telephon': telephone, 'Fax': fax

    })
      .map((res: Response) => {
        if (res) {
          console.log(res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });

  }

  PhoneAndTabletQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllPhoneAndTabletProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  WomenFashionQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllWomenFashionProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  MenFashionQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllMenFashionProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  TVAudioVideoQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllTVAudioVideoProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  ComputingLaptopsQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllComputingLaptopsProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  HomeAppliancesQuantity(proID: any, quantity: any) {
    return this._http.post(this.ServerUrl + 'getAllHomeAppliancesProductQuantity', {
      'ProductID': proID,
      'Itemsqty': quantity
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }

  InsertPhoneMaxBid(proID: any, MaxPrice: any) {
    console.log('In service', MaxPrice);
    return this._http.post(this.ServerUrl + 'PhoneAndTabletProductMaxBid', {
      'ProductID': proID,
      'MaxBidPrice': MaxPrice,
    })
      .map((res: Response) => {
        if (res) {
          console.log('statusresponse',res.status);
          if (res.status === 200) {

          }
        }
      }).catch((error: any) => {

        return Observable.throw(new Error(error.status));
      });
  }
}
