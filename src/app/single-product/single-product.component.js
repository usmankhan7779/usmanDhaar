"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SingleProductComponent = (function () {
    function SingleProductComponent(route, GetAdd, router) {
        this.route = route;
        this.GetAdd = GetAdd;
        this.router = router;
        this.model = {};
        this.PicServrUrl = 'http://localhost:8000/media';
        this.Getphoto = [];
        this.NewBidInserted = false;
        this.AuctionTest = true;
        this.resultProduct = [];
        this.GeProductBiding = [];
        this.ProductPrice = [];
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            _this.CatName = params['CatName'] || '0';
            _this.ProID = params['ProID'] || '0';
        });
        this.GetAdd.GetphotoById().subscribe(function (resSlidersData) {
            _this.Getphoto = resSlidersData;
        });
        if (this.CatName === '0') {
            this.router.navigate(['/login']);
        }
        else {
            if (this.CatName === 'Phones & Tablets') {
                console.log('Phones & Tablets');
                this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
            else if (this.CatName === 'Women\'s Fashion') {
                // console.log('Women\'s Fashion')
                this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
            else if (this.CatName === 'Men\'s Fashion') {
                this.GetAdd.getMenFashionProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
            else if (this.CatName === 'TV, Audio & Video') {
                // console.log('TV, Audio & Video')
                this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
            else if (this.CatName === 'Computing & Laptops') {
                this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
            else if (this.CatName === 'Home Appliances') {
                this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
            }
        }
    };
    SingleProductComponent.prototype.InsertBid = function (startingPrice) {
        var _this = this;
        this.GetAdd.InsertUserBid('1', this.ProID, this.model.UserPriceBid).subscribe(function (resSlidersData) {
            _this.GeProductBiding = resSlidersData;
            if (_this.CatName === '0') {
                _this.router.navigate(['/login']);
            }
            else {
                if (_this.CatName === 'Phones & Tablets') {
                    console.log('Phones & Tablets');
                    _this.GetAdd.get_PhoneAndTabletProduct_ProductById(_this.ProID).subscribe(function (resSlidersData1) { return _this.resultProduct = resSlidersData1; });
                }
                else if (_this.CatName === 'Women\'s Fashion') {
                    // console.log('Women\'s Fashion')
                    _this.GetAdd.getWomenFashionProductById(_this.ProID).subscribe(function (resSlidersData1) { return _this.resultProduct = resSlidersData1; });
                }
                else if (_this.CatName === 'Men\'s Fashion') {
                    _this.GetAdd.getMenFashionProductById(_this.ProID).subscribe(function (resSlidersData1) { return _this.resultProduct = resSlidersData1; });
                }
                else if (_this.CatName === 'TV, Audio & Video') {
                    // console.log('TV, Audio & Video')
                    _this.GetAdd.geTVAudioVideoProductById(_this.ProID).subscribe(function (resSlidersData1) { return _this.resultProduct = resSlidersData1; });
                }
                else if (_this.CatName === 'Computing & Laptops') {
                    _this.GetAdd.getComputingLaptopsProductById(_this.ProID).subscribe(function (resSlidersData1) { return _this.resultProduct = resSlidersData1; });
                }
                else if (_this.CatName === 'Home Appliances') {
                    _this.GetAdd.getHomeAppliancesProductById(_this.ProID).subscribe(function (resSlidersData) { return _this.resultProduct = resSlidersData; });
                }
            }
        });
        console.log(this.GeProductBiding);
        // this.someMethod(true, this.ProID, startingPrice );
        console.log('BIdding');
        this.NewBidInserted = true;
        //UPdate QUery
        console.log('Checking if else');
    };
    return SingleProductComponent;
}());
SingleProductComponent = __decorate([
    core_1.Component({
        selector: 'app-single-product',
        templateUrl: './single-product.component.html',
        styleUrls: ['./single-product.component.css'],
    })
], SingleProductComponent);
exports.SingleProductComponent = SingleProductComponent;
