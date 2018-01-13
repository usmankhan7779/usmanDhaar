"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = (function () {
    function HomeComponent(GetProducts) {
        this.GetProducts = GetProducts;
        this.PicServrUrl = 'http://localhost:8000/media';
        this.GetallPhoneProduct = [];
        this.TvVideoaudio8 = [];
        this.WomenFashionProducts4 = [];
        this.MenFashionProducts4 = [];
        this.ProductPrice = [];
        this.NewBidInserted = false;
        this.Tmp_ProID_Array = [];
        this.AuctionTest = true;
        this.Getphoto = [];
        this.GetallphotsProduct = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.newService.fetchJobCatagories().subscribe(data => {
        //   this.temp = data;
        //   console.log(this.temp);
        //   for (const i of this.temp) {
        //     i.values = i.values.split(',');
        //   }
        // });
        window.scrollTo(0, 0);
        // phone and tablets
        this.GetProducts.GetAllPhoneandtabletsProducts().subscribe(function (resSlidersData) {
            _this.GetallPhoneProduct = resSlidersData;
            console.log(_this.GetallPhoneProduct);
        });
        // tv vidoe audio
        this.GetProducts.GetWomenFashionProducts4().subscribe(function (resSlidersData) {
            _this.WomenFashionProducts4 = resSlidersData;
            // console.log('Start');
            // console.log(this.TvVideoaudio8);
        });
        // tv vidoe audio
        this.GetProducts.GetMenFashionProducts4().subscribe(function (resSlidersData) {
            _this.MenFashionProducts4 = resSlidersData;
            // console.log('Start');
            // console.log(this.TvVideoaudio8);
        });
        // tv vidoe audio
        this.GetProducts.getTvVideoaudio8().subscribe(function (resSlidersData) {
            _this.TvVideoaudio8 = resSlidersData;
            console.log('Start');
            console.log(_this.TvVideoaudio8);
        });
        // picture
        this.GetProducts.GetphotoById().subscribe(function (resSlidersData) {
            _this.Getphoto = resSlidersData;
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
    };
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
    HomeComponent.prototype.CheckFOrDifferent = function (ProID) {
        console.log('PrOID: ' + ProID);
        if (this.Tmp_ProID_Array.length === 0) {
            console.log('this.Tmp_ProID_Array.length' + this.Tmp_ProID_Array.length);
            this.Tmp_ProID_Array.push(ProID);
            // this.Tmp_ProID = ProID;
            this.AuctionTest = true;
            return true;
        }
        else if (this.Tmp_ProID_Array.indexOf(ProID) > -1) {
            console.log('this.exist' + this.Tmp_ProID_Array.indexOf(ProID));
            this.AuctionTest = false;
            return false;
        }
        else {
            console.log('this.Tmp_ProID_Array.length beofre: ' + this.Tmp_ProID_Array.length);
            this.Tmp_ProID_Array.push(ProID);
            console.log('this.Tmp_ProID_Array.length after: ' + this.Tmp_ProID_Array.length);
            this.AuctionTest = true;
            return true;
        }
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
