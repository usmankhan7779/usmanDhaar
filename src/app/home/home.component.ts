import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HomeService } from './home.services';
import { OwlCarousel } from "ngx-owl-carousel";
import { AdService } from '../post-ad/ad.services';
import { CategoryServices } from "../category-detail/category-detail.services";
import { split } from "ts-node/dist";
import { ActiveAdServices } from "../active-ad/active-ad.services";
// import { PhotosObj, Photos } from './_modal';
import { PagerService } from '../pager.service';
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
  ViewedProducts: any = { "products": [] };
  WatchedProducts: any = [];
  Tmp_ProID_Array: any = [];
  imageurls = 'https://storage.dhaar.pk/Category/SliderImages/';
  usercheck = false;
  Tmp_ProID_Array2: {
    ProID: any;
    Price: any;
  }[];
  intervalId = 0;
  message = '';
  seconds = 59;
  ActiveProduct: any = [];
  page: number = 1;
  AuctionProductPrice: number;
  AuctionTest = true;
  Getphoto: any = [];
  GetallphotsProduct: any = [];
  pager: any = {};
  // myPhotosList: Photos[] = [];
  images = [
    "assets/images/slider/5-min.png",
    "assets/images/slider/menslider.png",
    "assets/images/slider/womenslider.png",
    "assets/images/slider/2-min.png",
    "assets/images/slider/4-min.png"
  ];
  categories = [
    {
      "image": "assets/images/phone-and-tablet-min.png",
      "name": "Phones & Tablets",
    },
    {
      "image": "assets/images/Mens-min.png",
      "name": "Men\'s Fashion",
    },
    {
      "image": "assets/images/Womens-2-min.png",
      "name": "Women\'s Fashion",
    },
    {
      "image": "assets/images/Audio-video-2-min.png",
      "name": "TV, Audio & Video",
    },
    {
      "image": "assets/images/Computing-laptop-min.png",
      "name": "Computing & Laptops",
    },
    {
      "image": "assets/images/Home-Appliance-min.png",
      "name": "Home Appliances",
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private GetProducts: HomeService,
    private GetCat: AdService,
    private pagerService: PagerService,
    private Category: CategoryServices,
    private GetWatch: ActiveAdServices) {


  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.ProductsAllCat(1);
      this.GetAllBuyNowproduct();
      // this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

      //   this.GetALLProductss = resSlidersData;
      //   // Sub_Sub_Cat_Name
      //   // localStorage.setItem('sub_sub_cat', this.GetALLProductss.results[0].Sub_Sub_Cat_Name);
      //   // localStorage.setItem('StoreName', this.ActiveProduct.StoreInfo[0].StoreName);

      // });

      // this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersData => {

      //   this.GetALLBuyNowProductss = resSlidersData;
      //   // localStorage.setItem('sub_sub_cat', this.GetALLBuyNowProductss.results[0].Sub_Sub_Cat_Name);
      // });

      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {

        this.GetALLAuctionProductss = resSlidersData;
        // console.log(this.GetALLAuctionProductss.results.pic.split([,],3000),'pic')
        // localStorage.setItem('sub_sub_cat', this.GetALLAuctionProductss.results[0].Sub_Sub_Cat_Name);
      });

      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        this.GetALLFeaturedProductss = resSlidersData;
      });

      // this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(resSlidersData => {
      //   this.GetallPhoneProduct = resSlidersData;
      // });


      // this.GetProducts.GetWomenFashionProducts4().subscribe(resSlidersData => {

      //   this.WomenFashionProducts = resSlidersData;
      // });

      // this.GetProducts.GetMenFashionProducts4().subscribe(resSlidersData => {

      //   this.MenFashionProducts = resSlidersData;
      // });

      // this.GetProducts.getTVAudioVideoProduct().subscribe(resSlidersData => {

      //   this.getTvAudioVideoProduct = resSlidersData;
      // });

      // this.GetProducts.getcomputinglaptopsproduct8().subscribe(resSlidersData => {

      //   this.getcomputinglaptopsproduct = resSlidersData;
      // });

      // this.GetProducts.gethomeappliancesproduct8().subscribe(resSlidersData => {

      //   this.gethomeappliancesproduct = resSlidersData;
      // });
      this.PhoneandTablet();
      this.CategorySlider();
      this.HotDealSlider();
      this.RecommendedSlider();
      this.ViewedItemSlider();
      if (localStorage.getItem('UserID')) {
        this.usercheck = true;
        this.WatchedItemSlider();
      }
    }
  }
  ProductsAllCat(page: number) {
    if(localStorage.getItem('Authorization') !== null){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.GetProducts.GetProductsfromAllCat(page).subscribe(resSlidersData => {

      this.GetALLProductss = resSlidersData.Results.product;
      this.pager = this.pagerService.getPager(resSlidersData['Total Result'], page, 10);


    });
  }
  else{
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.GetProducts.GetProductsfromAllCat(page).subscribe(resSlidersData => {

      this.GetALLProductss = resSlidersData.Results;
      this.pager = this.pagerService.getPager(resSlidersData['Total Result'], page, 10);


    });

  }

  }

  GetAllBuyNowproduct(){
    // (localStorage.getItem('UserID') !== null)
    if(localStorage.getItem('Authorization') !== null){
    this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersData => {

      this.GetALLBuyNowProductss = resSlidersData.Results.product;
      // localStorage.setItem('sub_sub_cat', this.GetALLBuyNowProductss.results[0].Sub_Sub_Cat_Name);
    });
  }
  else{
    this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersData => {

      this.GetALLBuyNowProductss = resSlidersData.Results;
      // localStorage.setItem('sub_sub_cat', this.GetALLBuyNowProductss.results[0].Sub_Sub_Cat_Name);
    });
  }
  }
  PhoneandTablet() {

    this.GetProducts.PhoneandTablet("Phones & Tablets").subscribe(resSlidersData => {
      console.log(resSlidersData)
      this.GetallPhoneProduct = resSlidersData.Results;
    });
  }
  menfashion() {
    this.GetProducts.MenFashion("Men's Fashion").subscribe(resSlidersData => {

      this.MenFashionProducts = resSlidersData.Results;
    });
  }
  tv() {
    this.GetProducts.TV("TV, Audio & Video").subscribe(resSlidersData => {

      this.getTvAudioVideoProduct = resSlidersData.Results;
    });

  }
  computer() {
    this.GetProducts.Computer("Computing & Laptops").subscribe(resSlidersData => {

      this.getcomputinglaptopsproduct = resSlidersData.Results;
    });

  }
  home() {
    this.GetProducts.Home("Home Appliances").subscribe(resSlidersData => {

      this.gethomeappliancesproduct = resSlidersData.Results;
    });

  }


  womenFashion() {

    this.GetProducts.womenFashion("Women's Fashion").subscribe(resSlidersData => {
      console.log(resSlidersData)
      this.WomenFashionProducts = resSlidersData.Results;
    });
  }
  

  // onSuccess(resSlidersData) {
  //   console.log(resSlidersData);
  //   if (resSlidersData != null) {
  //     resSlidersData.forEach(item => {
  //       this.myPhotosList.push(new PhotosObj(item));
  //     });
  //   }
  // }
  // onScroll()
  // {
  //   console.log("Scrolled");
  //   this.page = this.page + 1;
  //   this.getPhotos(1);
  // }
  // nextClick() {
  //   console.log(this.model);
  //   if (this.model.pageno < this.model.totalpages) {
  //     this.model.pageno = this.model.pageno + 1; // (parseInt(this.model.pageno, 10) + 1).toString();
  //     this.newService.fetchJobByAdvanceSearch(this.model).subscribe(data => {
  //       for (let i = 0; i < data.jobs.length; i++) {
  //         this.jobsList.push(data.jobs[i]);
  //       }
  //     });
  //   }
  // }
  CategorySlider() {
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
            autoplay: true,
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

  HotDealSlider() {
    this.GetProducts.getcomputinglaptopsproduct8().subscribe(resSlidersData => {
      this.HotDealProducts = resSlidersData;
      $('.hotslider').fadeOut(0);
      if (this.HotDealProducts.length >= 5) {
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
  RecommendedSlider() {
    this.Category.getAllPhoneAndTabletProduct(1, 'Phone').subscribe(resSlidersData => {
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
  ViewedItemSlider() {
    this.ViewedProducts = JSON.parse(localStorage.getItem('ViewedItem'));
    if (this.ViewedProducts === null) {
      console.log('Viewed Products Are:', this.ViewedProducts);
    } else if (this.ViewedProducts !== null) {
      for (const tmp1 of this.ViewedProducts['products']) {
        tmp1['Pic'] = tmp1['Pic'].split(',')[0];
      }
      this.ViewedProducts = this.ViewedProducts['products'];
      $('.viewedslider').fadeOut(0);
      if (this.ViewedProducts.length >= 5) {
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
      // });
    }
  }
  WatchedItemSlider() {
    this.GetWatch.GetallWatchProducts(1, localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.WatchedProducts = resSlidersData;
      $('.watchslider').fadeOut(0);
      if (this.WatchedProducts.totalItems >= 5) {
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

