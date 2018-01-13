import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class  CategoryServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
<<<<<<< HEAD
  ServerUrl = 'http://ns519750.ip-158-69-23.net:7600/products/';
=======
  ServerUrl = 'https://dhaardb.herokuapp.com/products/';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef


  constructor(private _http: HttpService,
              private _nav: Router) {
  }
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }


  //Phone
  getAllPhoneAndTabletProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProduct?page=' + page, ).map(response => response.json());
  }
  getAllPhoneAndTabletProductBuyItNow(page: any) {
    return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProductbuy?page=' + page, ).map(response => response.json());
  }

  getAllPhoneAndTabletProductAuction(page: any) {
      return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProductauction?page=' + page, ).map(response => response.json());
  }
  getAllPhoneAndTabletProductoffer(page: any) {
        return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProductoffer?page=' + page, ).map(response => response.json());
    }


  getAllSearchProducts(page: any, query: string) {
    return this._http.get( this.ServerUrl + 'SearchResults/' + query + '?page=' + page, ).map(response => response.json());
  }
  getAllSearchProductsType(page: any, query: string, abc: boolean) {
    return this._http.get( this.ServerUrl + 'SearchResultstype/' + query + '/' + abc + '?page=' + page, ).map(response => response.json());
  }
  getAllSearchProductsPrice(page: any, query: string, pk1: string, pk2: string) {
    return this._http.get( this.ServerUrl + 'SearchResultsprice/' + query + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  getAllPhoneAndTabletProductWithType(page: any, Type: boolean) {

    return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }

  getAllPhoneAndTabletProductWithPrice(page: any, pk1: string, pk2: string) {
    return this._http.get( this.ServerUrl + 'getAllPhoneAndTabletProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //PhoneSUb

  getAllSubPhoneAndTabletProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubPhoneAndTabletProductoffer(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProductoffer/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubPhoneAndTabletProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubPhoneAndTabletProductbuy(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
  }


  getAllSubPhoneAndTabletProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubPhoneAndTabletProductWithPrice(page: any, subcat: string, pk1: string, pk2: string) {
    return this._http.get( this.ServerUrl + 'getAllSubPhoneAndTabletProductPrice/' + subcat + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Phone Sub sub
  getAllSubSubPhoneAndTabletProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubPhoneAndTabletProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubPhoneAndTabletProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubPhoneAndTabletProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubPhoneAndTabletProductPrice(page: any, subcat: string, pk1: string, pk2: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubPhoneAndTabletProductPrice/' + subcat + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }


  //Woman
  getAllWomenFashionProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProduct?page=' + page, ).map(response => response.json());
  }
  getAllWomenFashionProductbuy(page: any) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProductbuy?page=' + page, ).map(response => response.json());
  }
 getAllWomenFashionProductAuction(page: any) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProductauction?page=' + page, ).map(response => response.json());
  }
 getAllWomenFashionProductoffer(page: any) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProductoffer?page=' + page, ).map(response => response.json());
  }

  getAllWomenFashionProductWithType(page: any, Type: boolean) {
    return this._http.get( this.ServerUrl + 'getAllWomenFashionProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }
  getAllWomenFashionProductWithPrice(page: any, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllWomenFashionProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }
  //WOman SUb

  getAllSubWomenFashionProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubWomenFashionProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubWomenFashionProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubWomenFashionProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubWomenFashionProductbuy(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubWomenFashionProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubWomenFashionProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubWomenFashionProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubWomenFashionProductTypeWithPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubWomenFashionProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }
    //WOman SUb Sub

  getAllSubSubWomenFashionProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubWomenFashionProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubWomenFashionProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubWomenFashionProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubWomenFashionProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubSubWomenFashionProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }





  //Man
  getAllMenFashionProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProduct?page=' + page, ).map(response => response.json());
  }
  //Man
  getAllMenFashionProductbuy(page: any) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProductbuy?page=' + page, ).map(response => response.json());
  }
  getAllMenFashionProductauction(page: any) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProductauction?page=' + page, ).map(response => response.json());
  }
  getAllMenFashionProductoffer(page: any) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProductoffer?page=' + page, ).map(response => response.json());
  }

  getAllMenFashionProductWithType(page: any, Type: boolean) {
    return this._http.get( this.ServerUrl + 'getAllMenFashionProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }
  getAllMenFashionProductWithPrice(page: any, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllMenFashionProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }
  //man sub

  getAllSublMenFashionProduct(page: any, subcat: string) {
<<<<<<< HEAD
    return this._http.get( this.ServerUrl + 'getAllSubMenFashionProduct/' + subcat + '?page=' + page, ).map(response => response.json());
=======
    return this._http.get( this.ServerUrl + 'getAllSublMenFashionProduct/' + subcat + '?page=' + page, ).map(response => response.json());
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
  getAllSublMenFashionProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSublMenFashionProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSublMenFashionProductbuy(page: any, subcat: string) {
<<<<<<< HEAD
    return this._http.get( this.ServerUrl + 'getAllSubMenFashionProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
=======
    return this._http.get( this.ServerUrl + 'getAllSublMenFashionProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
  getAllSublMenFashionProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubMenFashionProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSublMenFashionProductPriceWithPrice(page: any, catname: string, pk1: string, pk2: string) {

<<<<<<< HEAD
    return this._http.get( this.ServerUrl + 'getAllSubMenFashionProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
=======
    return this._http.get( this.ServerUrl + 'getAllSublMenFashionProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
  //man sub SUb

  getAllSubSubMenFashionProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubMenFashionProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubMenFashionProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubMenFashionProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubMenFashionProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubSubMenFashionProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //TV AUDIO
  getAllTVAudioVideoProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProduct?page=' + page, ).map(response => response.json());
  }
  //TV AUDIO
  getAllTVAudioVideoProductbuy(page: any) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProductbuy?page=' + page, ).map(response => response.json());
  }
  getAllTVAudioVideoProductAuction(page: any) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProductauction?page=' + page, ).map(response => response.json());
  }
  getAllTVAudioVideoProductoffer(page: any) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProductoffer?page=' + page, ).map(response => response.json());
  }
  getAllTVAudioVideoProductWithType(page: any, Type: boolean) {
    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }
  getAllTVAudioVideoProductWithPrice(page: any, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllTVAudioVideoProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  // TV Audio sub
  getAllSubTVAudioVideoProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubTVAudioVideoProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubTVAudioVideoProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubTVAudioVideoProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubTVAudioVideoProductbuy(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubTVAudioVideoProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubTVAudioVideoProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubTVAudioVideoProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubTVAudioVideoProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubTVAudioVideoProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }
  // TV Audio sub SUb
  getAllSubSubTVAudioVideoProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubTVAudioVideoProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubTVAudioVideoProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubTVAudioVideoProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubTVAudioVideoProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubSubTVAudioVideoProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }


  //  Computing
  getAllComputingLaptopsProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProduct?page=' + page, ).map(response => response.json());
  }
  //  Computing
  getAllComputingLaptopsProductbuy(page: any) {
    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProductbuy?page=' + page, ).map(response => response.json());
  }
  getAllComputingLaptopsProductaucion(page: any) {
    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProductauction?page=' + page, ).map(response => response.json());
  }
   getAllComputingLaptopsProductoffer(page: any) {
      return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProductoffer?page=' + page, ).map(response => response.json());
    }

 getAllComputingLaptopsProductWithType(page: any, Type: boolean) {
    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }
  getAllComputingLaptopsProductWithPrice(page: any, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllComputingLaptopsProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Computing sub
  getAllSubComputingLaptopsProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubComputingLaptopsProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  //Computing sub
  getAllSubComputingLaptopsProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubComputingLaptopsProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  //Computing sub
  getAllSubComputingLaptopsProductbuy(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubComputingLaptopsProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubComputingLaptopsProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubComputingLaptopsProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubComputingLaptopsProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubComputingLaptopsProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Computing sub

  getAllSubSubComputingLaptopsProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubComputingLaptopsProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubComputingLaptopsProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubComputingLaptopsProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubComputingLaptopsProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubSubComputingLaptopsProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Home
  getAllHomeAppliancesProduct(page: any) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProduct?page=' + page, ).map(response => response.json());
  }

  //Home
  getAllHomeAppliancesProductbuy(page: any) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProductbuy?page=' + page, ).map(response => response.json());
  }

  //Home
  getAllHomeAppliancesProductoffer(page: any) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProductoffer?page=' + page, ).map(response => response.json());
  }
  //Home
  getAllHomeAppliancesProductauction(page: any) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProductauction?page=' + page, ).map(response => response.json());
  }
  getAllHomeAppliancesProductWithType(page: any, Type: boolean) {
    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProduct/' + Type + '?page=' + page, ).map(response => response.json());
  }

  getAllHomeAppliancesProductWithPrice(page: any, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllHomeAppliancesProductPrice/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Home sub
  getAllSubHomeAppliancesProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubHomeAppliancesProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  //Home sub
  getAllSubHomeAppliancesProductauction(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubHomeAppliancesProductauction/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  //Home sub
  getAllSubHomeAppliancesProductbuy(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubHomeAppliancesProductbuy/' + subcat + '?page=' + page, ).map(response => response.json());
  }

  getAllSubHomeAppliancesProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubHomeAppliancesProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubHomeAppliancesProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubHomeAppliancesProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }

  //Home sub SUb
  getAllSubSubHomeAppliancesProduct(page: any, subcat: string) {
    return this._http.get( this.ServerUrl + 'getAllSubSubHomeAppliancesProduct/' + subcat + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubHomeAppliancesProductType(page: any, subcat: string, Auction: boolean) {
    return this._http.get( this.ServerUrl + 'getAllSubSubHomeAppliancesProductType/' + subcat + '/' + Auction + '?page=' + page, ).map(response => response.json());
  }
  getAllSubSubHomeAppliancesProductPrice(page: any, catname: string, pk1: string, pk2: string) {

    return this._http.get( this.ServerUrl + 'getAllSubSubHomeAppliancesProductPrice/' + catname + '/' + pk1 + '/' + pk2 + '?page=' + page, ).map(response => response.json());
  }


}
