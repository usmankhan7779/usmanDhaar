import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HomeService } from './home.services';
import {OwlCarousel} from "ngx-owl-carousel";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // public brands= [
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Hot Deals  of day',
  //     link:'all'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Ebay'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Walmart'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Groupon'
  //   },{
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'BestBuy'
  //   },
  // ];
  GetallCat: any = [];
  ServrUrl: string = 'assets/assets2/images/category/';
  public GetallPhoneProduct: any = [];
  getcomputinglaptopsproduct8: any = [];
  WomenFashionProducts4: any = [];
  MenFashionProducts4: any = [];
  getFashionProduct: any = [];
  GetALLProductss: any = [];
  GetALLFeaturedProductss: any = [];
  GetALLAuctionProductss: any = [];
  GetALLBuyNowProductss: any = [];
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

  images = [
    "assets/images/slider/5-min.png",
    "assets/images/slider/menslider.png",
    "assets/images/slider/womenslider.png",
    "assets/images/slider/2-min.png",
    "assets/images/slider/4-min.png"
  ];
  categories = [
    {
      "image":"assets/images/phone-and-tablet-min.png",
      "name":"Phones & Tablets",
    },
    {
      "image":"assets/images/Mens-min.png",
      "name":"Men\'s Fashion",
    },
    {
      "image":"assets/images/Womens-2-min.png",
      "name":"Women\'s Fashion",
    },
    {
      "image":"assets/images/Audio-video-2-min.png",
      "name":"TV, Audio & Video",
    },
    {
      "image":"assets/images/Computing-laptop-min.png",
      "name":"Computing & Laptops",
    },
    {
      "image":"assets/images/Home-Appliance-min.png",
      "name":"Home Appliances",
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private GetProducts: HomeService) {


  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      // phone and tablets

      this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
        this.GetallPhoneProduct = resSlidersData;
        // for (const itm of this.GetallPhoneProduct) {
        //   this.GetallphotsProduct = itm['Pic'].split(',');
        //   console.log('Photo urlsssssss', this.GetallphotsProduct);
        // }

        // console.log('Phone products are:', this.GetallPhoneProduct);
        // console.log('Brands Are:', this.brands);

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

      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData;
        // console.log('Start');
      });

      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        this.GetALLFeaturedProductss = resSlidersData;
        if( this.GetALLFeaturedProductss.totalItems === 0) {

        }
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
      // this.GetProducts.GetphotoById().subscribe(resSlidersData => {
      //   this.Getphoto = resSlidersData;
      //
      // });


    }
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

