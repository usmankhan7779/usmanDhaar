"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PostAdComponent = (function () {
    function PostAdComponent(route, PostAdd, router) {
        this.route = route;
        this.PostAdd = PostAdd;
        this.router = router;
        this.model = {};
        this.subcatNsubScat = [];
        this.GetAllSubSubCat = [];
        this.PictureData = [];
        this.GetAllSubCat = [];
        this.Buyitnow = false;
        this.ReservePrice = false;
        this.ReversePrice = false;
        this.base64textString = '';
        this.sizeLimit = 2000000;
        this.Fixed = true;
        this.Addbestoffer = false;
        this.Auction = true;
    }
    PostAdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            _this.CatName = params['CatName'] || '0';
            _this.CatId = params['CatId'] || '0';
            _this.User_ID = params['User_ID'] || '1';
        });
        if (this.CatName === '0') {
            this.router.navigate(['/login']);
        }
        this.PostAdd.GetAllSubCategoriesByCatID(this.CatId).subscribe(function (resSlidersData) { return _this.GetAllSubCat = resSlidersData; });
        console.log(this.GetAllSubCat);
        this.PostAdd.GetAllSubSubCategoriesByCatID(this.CatId).subscribe(function (resSlidersData) { return _this.GetAllSubSubCat = resSlidersData; });
    };
    PostAdComponent.prototype.EnableAuction = function () {
        if (this.Auction === false) {
            // console.log('ture');
            this.Auction = true;
        }
    };
    PostAdComponent.prototype.EnableFixd = function () {
        if (this.Auction === true) {
            // console.log('ture');
            this.Auction = false;
        }
    };
    PostAdComponent.prototype.BuyitnowFun = function () {
        if (this.Buyitnow === true) {
            //console.log('ture')
            this.Buyitnow = false;
        }
        else {
            // console.log('false')
            this.Buyitnow = true;
        }
    };
    PostAdComponent.prototype.AddbestofferFun = function () {
        if (this.Addbestoffer === true) {
            this.Addbestoffer = false;
        }
        else {
            this.Addbestoffer = true;
        }
    };
    PostAdComponent.prototype.AddReservePriceFun = function () {
        if (this.ReservePrice === true) {
            this.ReservePrice = false;
        }
        else {
            this.ReservePrice = true;
        }
    };
    // BuyitnowFun() {
    //
    //    if ( this.Buyitnow is equal(false) ){
    //      this.Buyitnow = true;
    //    }
    //    else {
    //      this.Buyitnow = false;
    //    }
    //
    // }
    PostAdComponent.prototype.save = function (cateogry, condition) {
        var utcDate = new Date(new Date().getTime());
        var dateformat = utcDate.toString().split(' ');
        var timeNOw = dateformat[4].split(':');
        var Monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthind = Monthlist.indexOf(dateformat[1]);
        var monthindex = monthind + 1;
        console.log('month' + monthindex);
        this.DateTime = monthindex + dateformat[2] + dateformat[3] + timeNOw[0] + timeNOw[1] + timeNOw[2];
        console.log('month' + this.DateTime);
        var subcat = this.model.subcat.split('!');
        this.CatNumber = +this.CatId;
        if (this.CatNumber < 10) {
            console.log('loggggggg');
            this.CatId = '0' + this.CatId;
            console.log('loggcat' + this.CatId);
        }
        var Product_ID = this.CatId + subcat[1] + subcat[3] + this.DateTime;
        // console.log('var132:' + Product_ID );
        if (this.Auction === true) {
            this.model.FixedPrice = 0;
            this.model.AddBestOffer = 0;
            this.model.Quantity = 0;
            if (this.model.ReservePrice == null) {
                this.model.ReservePrice = 0;
            }
            if (this.model.Buyitnow == null) {
                this.model.Buyitnow = 0;
            }
            if (this.CatName === 'Phones & Tablets') {
                //  console.log('Phones & Tablets')
                this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Women\'s Fashion') {
                // console.log('Women\'s Fashion')
                this.PostAdd.Add_WomenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Men\'s Fashion') {
                this.PostAdd.Add_MenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'TV, Audio & Video') {
                // console.log('TV, Audio & Video')
                this.PostAdd.Add_TVAudioVideo_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Computing & Laptops') {
                this.PostAdd.Add_ComputingLaptops_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Home Appliances') {
                this.PostAdd.Add_HomeAppliances_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
        }
        else {
            this.model.Starting_Price = 0;
            this.model.Buyitnow = 0;
            this.model.ReservePrice = 0;
            this.model.AuctionListing = 0;
            if (this.model.AddBestOffer == null) {
                this.model.AddBestOffer = 0;
            }
            // console.log('catName:'+ this.CatName);
            if (this.CatName === 'Phones & Tablets') {
                //console.log('Phones & Tablets');
                this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Women\'s Fashion') {
                //console.log('Women\'s Fashion')
                this.PostAdd.Add_WomenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Men\'s Fashion') {
                this.PostAdd.Add_MenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'TV, Audio & Video') {
                // console.log('TV, Audio & Video')
                this.PostAdd.Add_TVAudioVideo_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Computing & Laptops') {
                this.PostAdd.Add_ComputingLaptops_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
            else if (this.CatName === 'Home Appliances') {
                this.PostAdd.Add_HomeAppliances_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
            }
        }
        // console.log(day);
        //  this.PostAdd.Fixed_Product(this.base64textString, cateogry, this.model.Title, this.model.P_Des, condition, this.CatName, '', cateogry, this.model.Price, day, P_auction).subscribe();
    };
    PostAdComponent.prototype.handleUpload = function (data) {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    };
    PostAdComponent.prototype.beforeUpload = function (uploadingFile) {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('File is too large');
        }
    };
    PostAdComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
    };
    PostAdComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        this.files = target.files;
        this.file = this.files[0];
        console.log(this.files);
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
    };
    return PostAdComponent;
}());
PostAdComponent = __decorate([
    core_1.Component({
        selector: 'app-post-ad',
        templateUrl: './post-ad.component.html',
        styleUrls: ['./post-ad.component.css']
    })
], PostAdComponent);
exports.PostAdComponent = PostAdComponent;
