import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  PicServrUrl = 'http://localhost:8000/media';
  GetallPhoneProduct: any = [];
  getcomputinglaptopsproduct8: any = [];
  WomenFashionProducts4: any = [];
  MenFashionProducts4: any = [];
  GetALLProductss: any = [];
  GetALLFeaturedProductss: any = [];
  GetALLAuctionProductss: any = [];
  ProductPrice: any = [];
  NewBidInserted = false ;
  Tmp_ProID: any;
  Tmp_ProID_Array: any = [];
  Tmp_ProID_Array2: {
    ProID: any;
    Price: any;
  }[];


  AuctionProductPrice: number;
  AuctionTest = true;
  Getphoto: any = [];
  GetallphotsProduct: any = [];

  constructor(private GetProducts: HomeService) {


  }

  ngOnInit() {

    // this.newService.fetchJobCatagories().subscribe(data => {
    //   this.temp = data;
    //   console.log(this.temp);
    //   for (const i of this.temp) {
    //     i.values = i.values.split(',');
    //   }
    // });
    window.scrollTo(0, 0);
    // phone and tablets
    this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
      this.GetallPhoneProduct = resSlidersData;
      console.log(this.GetallPhoneProduct);
    });

    // tv vidoe audio
    this.GetProducts.GetWomenFashionProducts4().subscribe(resSlidersData => {

      this.WomenFashionProducts4 = resSlidersData;
      // console.log('Start');
      // console.log(this.TvVideoaudio8);

    });

    this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

      this.GetALLProductss = resSlidersData;
      // console.log('Start');


    });
    this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {

      this.GetALLAuctionProductss = resSlidersData;
      // console.log('Start');
    });
    this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

      this.GetALLFeaturedProductss = resSlidersData;
      // console.log('Start');
    });

    // tv vidoe audio
    this.GetProducts.GetMenFashionProducts4().subscribe(resSlidersData => {

      this.MenFashionProducts4 = resSlidersData;
      // console.log('Start');
      // console.log(this.TvVideoaudio8);

    });

    // tv vidoe audio
    this.GetProducts.getcomputinglaptopsproduct8().subscribe(resSlidersData => {

      this.getcomputinglaptopsproduct8 = resSlidersData;


    });


    // picture
    this.GetProducts.GetphotoById().subscribe(resSlidersData => {
      this.Getphoto = resSlidersData;

    });


    // this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
    //   this.GetallPhoneProduct = resSlidersData;
    //   console.log(this.GetallPhoneProduct);
    //
    //   for (const item of this.GetallPhoneProduct) {
    //     console.log(item['ProductID']);
    //     this.GetProducts.GetphotoById(item['ProductID']).subscribe(resSlidersData1 => {
    //       // this.Getphoto = resSlidersData1;
    //       console.log('roduct' + resSlidersData1.Pic);
    //     });
    //
    //     //
    //   }
    //
    // });

  }


  // someMethod(auction: boolean, ProID: string, startingPrice: number) {
  //
  //   console.log('some method callig for ProID' + ProID);
  //    // if ( this.Tmp_ProID_Array2.indexOf('ProID') ) {
  //    //
  //    // }
  //   if (auction === true) {
  //
  //     this.GetProducts.GetAuctionProductPriceById(ProID).subscribe(resSlidersData => {
  //
  //
  //       this.AuctionTest = false;
  //       console.log(resSlidersData);
  //       this.ProductPrice = resSlidersData;
  //       for (const entry of this.ProductPrice) {
  //         if (entry.Price === 0) {
  //           this.AuctionTest = false;
  //           this.AuctionProductPrice = startingPrice;
  //           //    console.log('first' + entry); // 1, "string", false
  //           // return true;
  //         } else if (entry.Price === -1) {
  //           this.AuctionProductPrice = startingPrice + 10;
  //           this.AuctionTest = false;
  //           //      console.log('seconds' + entry); // 1, "string", false
  //           // return true;
  //         } else {
  //           console.log('  this.AuctionProductPrice' + this.AuctionProductPrice);
  //           this.AuctionProductPrice = entry.Price;
  //           this.AuctionTest = false;
  //           //      console.log('thirds' + entry); // 1, "string", false
  //           // return true;
  //         }
  //         console.log('some method end callig for ProID' + ProID);
  //
  //       }
  //       if (resSlidersData.Price === 0) {
  //         this.AuctionProductPrice = startingPrice;
  //         this.AuctionTest = false;
  //         console.log(this.AuctionProductPrice);
  //         // console.log('thirds 00000000000'); // 1, "string", false
  //       } else if (resSlidersData.Price === -1) {
  //         this.AuctionProductPrice = startingPrice + 10;
  //         this.AuctionTest = false;
  //         console.log(this.AuctionProductPrice); // 1, "string", false
  //       }
  //
  //     });
  //
  //     console.log('anc');
  //     console.log('some method end callig for ProID' + ProID);
  //
  //     return true;
  //   } else {
  //
  //     return false;
  //   }
  //
  //
  // }



  CheckFOrDifferent(ProID: string) {
    console.log('PrOID: ' + ProID);
    if (this.Tmp_ProID_Array.length === 0 ) {
      console.log('this.Tmp_ProID_Array.length' + this.Tmp_ProID_Array.length);
      this.Tmp_ProID_Array.push(ProID);

     // this.Tmp_ProID = ProID;
      this.AuctionTest = true;
      return true;
    } else if ( this.Tmp_ProID_Array.indexOf(ProID) > -1 ) {
      console.log('this.exist' + this.Tmp_ProID_Array.indexOf(ProID));
      this.AuctionTest = false;
      return false;
    } else {

      console.log('this.Tmp_ProID_Array.length beofre: ' + this.Tmp_ProID_Array.length);
      this.Tmp_ProID_Array.push(ProID);
      console.log('this.Tmp_ProID_Array.length after: ' + this.Tmp_ProID_Array.length);

      this.AuctionTest = true;
      return true;

    }
}






}
