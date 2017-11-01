import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  GetallPhoneProduct: any = [];
  getcomputinglaptopsproduct8: any = [];
  WomenFashionProducts4: any = [];
  MenFashionProducts4: any = [];
  getFashionProduct: any = [];
  GetALLProductss: any = [];
  GetALLFeaturedProductss: any = [];
  GetALLAuctionProductss: any = [];
  ProductPrice: any = [];
  NewBidInserted = false;
  Tmp_ProID: any;
  Tmp_ProID_Array: any = [];
  Tmp_ProID_Array2: {
    ProID: any;
    Price: any;
  }[];
  intervalId = 0;
  message = '';
  seconds = 59;


  AuctionProductPrice: number;
  AuctionTest = true;
  Getphoto: any = [];
  GetallphotsProduct: any = [];

  constructor(private GetProducts: HomeService) {


  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // phone and tablets

    this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
      this.GetallPhoneProduct = resSlidersData;

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
   this.GetProducts.getFashionProduct().subscribe(resSlidersData => {

      this.getFashionProduct = resSlidersData;
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




  }


  timer(end_date: string) {
    return ((new Date(end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0);
  }


  CheckFOrDifferent(ProID: string) {
    console.log('PrOID: ' + ProID);
    if (this.Tmp_ProID_Array.length === 0) {
      console.log('this.Tmp_ProID_Array.length' + this.Tmp_ProID_Array.length);
      this.Tmp_ProID_Array.push(ProID);

      // this.Tmp_ProID = ProID;
      this.AuctionTest = true;
      return true;
    } else if (this.Tmp_ProID_Array.indexOf(ProID) > -1) {
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

