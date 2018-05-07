import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from "sweetalert2";



@Injectable()

export class HomeService {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl =  'https://apis.dhaar.pk/products/';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpService ,
              private http: Http,
              private _nav: Router) {
  }

  GetAllPhoneandtabletsProducts() {

    return this._http.get(this.ServerUrl + 'getphoneproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetAllProductPicture(pk: string) {

    return this._http.get(this.ServerUrl + 'Getproductimages/' + pk).map(response => response.json());
    // console.log(this.CateDeatils)
  }


  GetWomenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getwomenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getTVAudioVideoProduct() {

    return this._http.get(this.ServerUrl + 'gettvaudioproducts8').map(response => response.json());
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
  gethomeappliancesproduct8() {
    return this._http.get(this.ServerUrl + 'gethomeappliancesproduct4').map(response => response.json());
  }

  // id: string
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }



  get_AnyProduct_ProductById(proId: string ) {

    return this._http.get(this.ServerUrl + 'getAnyProductById/' + proId).map(response => response.json());
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
  GetBuyNowProductsfromAllCat() {
    return this._http.get(this.ServerUrl + 'getBuyNowProductsfromAllCat').map(response => response.json());
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
    return this._http.get( this.ServerUrl + 'GetUserReviewsByProductID/' + pID  ).map(response => response.json());
  }

  GetallUserReviewsCalculationBYProductId (pID: any) {
    return this._http.get(this.ServerUrl + 'GetUserReviewsCalculationByProductID/' + pID).map(response => response.json());
  }
  UnwatchProduct(Product_ID: any,  User_ID: any) {

    return this._http.delete(this.ServerUrl + 'unwatchProduct/' + Product_ID + '/' + User_ID).map((res:Response) => {
      if (res) {

        if (res.status === 204) {
          const responce_data = res.json();
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });

  }
  WatchProduct(Product_ID: any,  User_ID: any, CatName: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (isPlatformBrowser(this.platformId)){

      return this._http.post(this.ServerUrl + 'watchList',
        {
          'ProductID': Product_ID,
          'Cat_Name': CatName ,
          'User_ID': User_ID,
        }, { headers: headers }).map((res: Response) => {
        if (res) {

          if (res.status === 201) {
            const responce_data = res.json();
            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {
        console.log(error.toString());
        return Observable.throw(new Error(error.status));
      });


    }
  }

  // WatchProduct(pID: any, catName: any, UserID: any, Store: any, SubCat: any, SubsubCat: any, pTiltle: any, pDes: any, pCon: any, Auction: any, SPrice: any, Active: any, sold: any, MPrice: any, BuyitNow: any, ReservePrice: any, AuctionList: any, FPrice: any, AddBestOffer: any, Quantity: any, MaxQuantity: any, Pic: any) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this._http.post('http://127.0.0.1:8000/products/' + 'watchList/' + UserID, {
  //     'ProductID': pID,
  //     'Cat_Name': catName,
  //     'User_ID': UserID,
  //     'StoreName': Store,
  //     'Sub_Cat_Name': SubCat,
  //     'Sub_Sub_Cat_Name': SubsubCat,
  //     'P_Title': pTiltle,
  //     'P_Des': pDes,
  //     'P_Condition': pCon,
  //     'Auction': Auction,
  //     'SrartingPrice': SPrice,
  //     'Active': Active,
  //     'Sold': sold,
  //     'MaxBidPrice': MPrice,
  //     'Buyitnow': BuyitNow,
  //     'ReservePrice': ReservePrice,
  //     'AuctionListing': AuctionList,
  //     'FixedPrice': FPrice,
  //     'Addbestoffer': AddBestOffer,
  //     'Quantity': Quantity,
  //     'MaxQuantity': MaxQuantity,
  //     'Pic': Pic,
  //   },{ headers: headers }).map((res: Response) => {
  //     if (res) {
  //       // console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     return Observable.throw(new Error(error.status));
  //   });
  // }

  InsertwinnerBid(user: any, product:any) {
    return this.http.put(this.ServerUrl + 'InsertWinnerBid/' + user + '/' + product,
      {
        'win': true,
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

  InsertUserBid(User_Id: any, Product_ID: any, Price: any) {
    console.log('userId:', User_Id, 'ProductId is:', Product_ID,'Price is:', Price);
    return this._http.post(this.ServerUrl + 'InsertUserBid',
      {
        'User_Id': User_Id ,
        'Product_Id': Product_ID,
        'Price': Price,
        'win': false
      }).map((res: Response) => {
      if (res) {
       // console.log('abc');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      return Observable.throw(new Error(error.status));
    });


  }

  InsertProductReviews(Name: any, user: any, Reviews: any, Product_ID: any, RateNUmber: any, StoreName: any) {
    return this._http.post(this.ServerUrl + 'InsertUserReview/' + Product_ID,
      {
        'Name': Name ,
        'user': user ,
        'Product_Id': Product_ID,
        'StoreName': StoreName,
        'Rating': RateNUmber,
        'Reviews': Reviews,
      }).map((response: Response) => response.json());


  }


  ProductOffers(Product_ID: any, StoreName: any,Title: any, Cat_Name: any, model: any) {
    if (isPlatformBrowser(this.platformId)){
    return this._http.post(this.ServerUrl + 'ProductsOffersInsert',
      {

        'User_ID': localStorage.getItem('UserID') ,
        'Product_ID': Product_ID,
        'StoreName': StoreName,
        'P_Title': Title,
        'Cat_Name': Cat_Name,
        'PricePerQuantity': model.OfferAmount,
        'Status': true,
        'Accept': false,
        'Quantity': model.QuantityProduct,
        'CounterStatus':false,
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
      swal('Your Offer has been Updated','','success');
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  }





}
