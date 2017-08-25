import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()

export class AdService {

  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'http://localhost:8000/products/';

  constructor(private _http: Http,
              private _nav: Router) {

  }

  GetAllCategories() {

    return this._http.get(this.ServerUrl + 'Getallcat').map(response => response.json());



  }
  GetAllSubCategoriesByCatID(pk: string) {


    console.log(pk);
    return this._http.get(this.ServerUrl + 'Getsubcat/' + pk).map(response => response.json());


    // console.log(this.CateDeatils)
  }
  GetAllSubSubCategoriesByCatID(pk: string) {

      return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetSubSubCategories(pk: string) {

    return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(response => response.json());


    // console.log(this.CateDeatils)
  }


  Fixed_Product(Pic: any, Sub2_cat: any, title: any, User_ID: any, des: any, con: any, cat: any, sub_cat: any, Sub_Subcat: any, Price: any, Day: any, Auction: any ) {


    // console.log(Pidd);


    return this._http.post('http://localhost:8000/AddNewProduct',
      {

        'Cat_Name': cat ,
        'Subcat_Name': sub_cat,
        'Sub_Subcat_Name': Sub_Subcat,
        'P_Title':  title,
        'P_Des':  des,
        'P_Condition':  con,
        'Price': Price,
        'AuctionDays': Day,
        'Auction': Auction,



        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          console.log('this is the id' + responce_data.id);
          this.ProductImages(Pic, responce_data.id).subscribe();
          // localStorage.setItem('Authorization', res.json().token);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  ProductImages( Pidd: any, Pic: any) {



//    console.log('testing 123 ' + Pidd);
    return this._http.post(this.ServerUrl + 'productimages', { 'Pic': Pic, 'ProID': Pidd })
      .map((res: Response) => {
        if (res) {
         // console.log('testing res');
          if (res.status === 200 || res.status === 201) {

            const responce_data = res.json();
           // console.log('this isinsertion ' + responce_data.id);
            // this.UPload_PIc2(Sub2_cat, title, des, con, cat, sub_cat, Sub_Subcat, this.id).subscribe();
            //            localStorage.setItem('Authorization', res.json().token);
            //          this._nav.navigate(['/profile']);
            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {

        if (error.status === 404) {
          console.log('errors 404');
        } else {
          console.log('errors ');
        }
        console.log( error);
        console.log(error.text);
        return Observable.throw(new Error(error.status));
      });

  }

  Add_PhoneAndTabletProduct_Product(Product_ID: any,  User_ID: any,  basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.ServerUrl + 'phoneandtablets',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,
       }, { headers: headers }).map((res: Response) => {
      if (res) {

        if (res.status === 201) {
          const responce_data = res.json();
        // /  this.ProductImages(Product_ID, basex64).subscribe();
          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);



          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Add_WomenFashion_Product(Product_ID: any,  User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {

    return this._http.post(this.ServerUrl + 'womenfashion',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,



        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          // this.ProductImages(Product_ID, basex64).subscribe();


          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Add_MenFashion_Product(Product_ID: any, User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {


    return this._http.post(this.ServerUrl + 'menfashion',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,



        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();
          // this.ProductImages(Product_ID, basex64).subscribe();
          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Add_TVAudioVideo_Product(Product_ID: any, User_ID,  basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {


    return this._http.post(this.ServerUrl + 'TVAudioVideo',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,



        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          // this.ProductImages(Product_ID, basex64).subscribe();
          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Add_ComputingLaptops_Product(Product_ID: any, User_ID: any,  basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {
   // console.log('fsdfsfgsahd' + SubSubCat);

    return this._http.post(this.ServerUrl + 'ComputingLaptops',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,


        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();
          // this.ProductImages(Product_ID, basex64).subscribe();
          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Add_HomeAppliances_Product(Product_ID: any, User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any ) {


    return this._http.post(this.ServerUrl + 'HomeAppliances',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        'User_ID': User_ID,
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'Auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
        'Buyitnow': Buyitnow,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'Quantity': Quantity,
        'Active': false,
        'Sold': false,
        'Pic': basex64,


        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

         // this.ProductImages(Product_ID, basex64).subscribe();

          sessionStorage.setItem('NewPost', 'Done');
          this._nav.navigate(['/dashboard']);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }

}
