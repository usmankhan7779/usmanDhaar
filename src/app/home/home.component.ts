import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HomeService } from './home.services';
import {OwlCarousel} from "ngx-owl-carousel";
import {AdService} from '../post-ad/ad.services';
import {CategoryServices} from "../category-detail/category-detail.services";
declare const $: any;
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
  getcomputinglaptopsproduct: any = [];
  WomenFashionProducts: any = [];
  MenFashionProducts: any = [];
  getTvAudioVideoProduct: any = [];
  GetALLProductss: any = [];
  gethomeappliancesproduct: any = [];
  GetALLFeaturedProductss: any = [];
  GetALLAuctionProductss: any = [];
  GetALLBuyNowProductss: any = [];
  HotDealProducts: any = [];
  RecommendedProducts: any = [];
  ViewedProducts: any = [];
  WatchedProducts: any = [];
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
              private GetProducts: HomeService,
              private GetCat:AdService,
              private Category: CategoryServices) {


  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);

      this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

        this.GetALLProductss = resSlidersData;
      });

      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData;
      });

      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {

        this.GetALLAuctionProductss = resSlidersData;
      });

      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        this.GetALLFeaturedProductss = resSlidersData;
      });

      this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
        this.GetallPhoneProduct = resSlidersData;
      });

      this.GetProducts.GetWomenFashionProducts4().subscribe(resSlidersData => {

        this.WomenFashionProducts = resSlidersData;
      });

      this.GetProducts.GetMenFashionProducts4().subscribe(resSlidersData => {

        this.MenFashionProducts = resSlidersData;
      });

      this.GetProducts.getTVAudioVideoProduct().subscribe(resSlidersData => {

        this.getTvAudioVideoProduct = resSlidersData;
      });

      this.GetProducts.getcomputinglaptopsproduct8().subscribe(resSlidersData => {

        this.getcomputinglaptopsproduct = resSlidersData;
      });

      this.GetProducts.gethomeappliancesproduct8().subscribe(resSlidersData => {

        this.gethomeappliancesproduct = resSlidersData;
      });

      this.CategorySlider();
      this.HotDealSlider();
      this.RecommendedSlider();
      this.ViewedItemSlider();
      this.WatchedItemSlider();
    }
  }


  CategorySlider(){
    this.GetCat.GetAllCategories().subscribe(data => {
      this.GetallCat = data;
      console.log('Categories Are:', this.GetallCat);
      $('.homeSlider').fadeOut(0);
      if (this.GetallCat) {
        setTimeout(function () {
          $('.homeSlider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: '<button class="leftRs">&lt;</button>',
            nextArrow: '<button class="rightRs">&lt;</button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.homeSlider').fadeIn(500).delay(200);
    });
  }

  HotDealSlider(){
    this.Category.getAllPhoneAndTabletProduct(1).subscribe(resSlidersData => {
      this.HotDealProducts = resSlidersData;
      $('.hotslider').fadeOut(0);
      if (this.HotDealProducts) {
        setTimeout(function () {
          $('.hotslider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRsBanner">&lt;</button>',
            nextArrow: '<button class="rightRsBanner">&lt;</button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.hotslider').fadeIn(500).delay(200);
    });
  }
  RecommendedSlider(){
    this.Category.getAllPhoneAndTabletProduct(1).subscribe(resSlidersData => {
      this.RecommendedProducts = resSlidersData;
      $('.recommendedslider').fadeOut(0);
      if (this.RecommendedProducts) {
        setTimeout(function () {
          $('.recommendedslider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRsBanner">&lt;</button>',
            nextArrow: '<button class="rightRsBanner">&lt;</button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.recommendedslider').fadeIn(500).delay(200);
    });
  }
  ViewedItemSlider(){
    this.Category.getAllPhoneAndTabletProduct(1).subscribe(resSlidersData => {
      this.ViewedProducts = resSlidersData;
      $('.viewedslider').fadeOut(0);
      if (this.ViewedProducts) {
        setTimeout(function () {
          $('.viewedslider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRsBanner">&lt;</button>',
            nextArrow: '<button class="rightRsBanner">&lt;</button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.viewedslider').fadeIn(500).delay(200);
    });
  }
  WatchedItemSlider(){
    this.Category.getAllPhoneAndTabletProduct(1).subscribe(resSlidersData => {
      this.WatchedProducts = resSlidersData;
      $('.watchslider').fadeOut(0);
      if (this.WatchedProducts) {
        setTimeout(function () {
          $('.watchslider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRsBanner">&lt;</button>',
            nextArrow: '<button class="rightRsBanner">&lt;</button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.watchslider').fadeIn(500).delay(200);
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

