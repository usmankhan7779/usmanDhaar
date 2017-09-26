import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()

export class HomeService {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl =  'https://dhaardb.herokuapp.com/products/';


  constructor(private _http: HttpService ,
              private _nav: Router) {
  }

  GetAllPhoneandtabletsProducts() {

    return this._http.get(this.ServerUrl + 'getphoneproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }


  GetWomenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getwomenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetMenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getmenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  getcomputinglaptopsproduct8() {

    return this._http.get(this.ServerUrl + 'getcomputinglaptopsproduct8').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  // id: string
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }




  get_PhoneAndTabletProduct_ProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getphoneproductsById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getWomenFashionProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getwomenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getMenFashionProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getmenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  geTVAudioVideoProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'gettvaudiovideoproductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getComputingLaptopsProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getComputingLaptopsProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getHomeAppliancesProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getHomeAppliancesProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }




  GetAuctionProductPriceById(proId: string ) {

    return this._http.get(this.ServerUrl + 'GetAuctionProductPriceById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetProductsfromAllCat( ) {

    return this._http.get(this.ServerUrl + 'getProductsfromAllCat').map(response => response.json());
    // console.log(this.CateDeatils)
  }
  GetAuctionProductsfromAllCat( ) {

    return this._http.get(this.ServerUrl + 'getAuctionProductsfromAllCat').map(response => response.json());
    // console.log(this.CateDeatils)
  }
   GetAllFeaturedProducts( ) {

    return this._http.get(this.ServerUrl + 'getallfeaturedProducts').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetallBidsProductdbyProductID( ProductID: any) {
    return this._http.get( this.ServerUrl + 'GetallBidsProductd/' + ProductID  ).map(response => response.json());
  }

  GetallProductsOffersByStoreName(page: any, StoreName: any) {
    return this._http.get( this.ServerUrl + 'GetallProductsOffersByStoreName/' + StoreName + '?page=' + page, ).map(response => response.json());
  }

  GetallUserReviewsBYProductId(pID: any) {
    return this._http.get( this.ServerUrl + 'InsertUserReviews/' + pID  ).map(response => response.json());
  }



  InsertUserBid(User_Id: any, Product_ID: any, Price: any) {
    return this._http.post(this.ServerUrl + 'InsertUserBid/' + Product_ID,
      {
        'User_Id': User_Id ,
        'Product_Id': Product_ID,
        'Price': Price,
      }).map((res: Response) => {
      if (res) {
       // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      return Observable.throw(new Error(error.status));
    });


  }

  InsertProductReviews(Name: any, Email: any, Reviews: any, Product_ID: any, RateNUmber: any) {
    return this._http.post(this.ServerUrl + 'InsertUserReviews/' + Product_ID,
      {
        'Name': Name ,
        'Email': Email ,
        'Product_Id': Product_ID,
        'Rating': RateNUmber,
        'Reviews': Reviews,
      }).map((res: Response) => {
      if (res) {
       // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      return Observable.throw(new Error(error.status));
    });


  }


  ProductOffers(Product_ID: any, StoreName: any, Cat_Name: any, Qty: any, model: any) {
    return this._http.post(this.ServerUrl + 'ProductsOffersInsert',
      {

        'User_Id': localStorage.getItem('UserID') ,
        'Product_Id': Product_ID,
        'StoreName': StoreName,
        'Cat_Name': Cat_Name,
        'Price': model.OfferAmount,
        'Status': 'Open',
        'Qty': Qty,
        'Message': model.message,

        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          // console.log('this is the id' + responce_data.id);
          // localStorage.setItem('Authorization', res.json().token);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      alert(error.toString());
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }





}
