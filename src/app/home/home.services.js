"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var HomeService = (function () {
    function HomeService(_http, _nav) {
        this._http = _http;
        this._nav = _nav;
        this.ServerUrl = 'http://127.0.0.1:8000/products/';
    }
    HomeService.prototype.GetAllPhoneandtabletsProducts = function () {
        return this._http.get(this.ServerUrl + 'getphoneproducts8').map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.GetWomenFashionProducts4 = function () {
        return this._http.get(this.ServerUrl + 'getwomenfashionproducts4').map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.GetMenFashionProducts4 = function () {
        return this._http.get(this.ServerUrl + 'getmenfashionproducts4').map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.getTvVideoaudio8 = function () {
        return this._http.get(this.ServerUrl + 'gettvaudioproducts8').map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    // id: string
    HomeService.prototype.GetphotoById = function () {
        return this._http.get(this.ServerUrl + 'GetProductPic').map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.get_PhoneAndTabletProduct_ProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'getphoneproductsById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.getWomenFashionProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'getwomenfashionProductById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.getMenFashionProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'getmenfashionProductById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.geTVAudioVideoProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'gettvaudiovideoproductById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.getComputingLaptopsProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'getComputingLaptopsProductById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.getHomeAppliancesProductById = function (proId) {
        return this._http.get(this.ServerUrl + 'getHomeAppliancesProductById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.GetAuctionProductPriceById = function (proId) {
        return this._http.get(this.ServerUrl + 'GetAuctionProductPriceById/' + proId).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    HomeService.prototype.InsertUserBid = function (User_Id, Product_ID, Price) {
        // console.log(Pidd);
        return this._http.post(this.ServerUrl + 'InsertUserBid/' + Product_ID, {
            'User_Id': User_Id,
            'Product_Id': Product_ID,
            'Price': Price,
        }).map(function (res) {
            if (res) {
                // console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    // console.log('this is the id' + responce_data.id);
                    // localStorage.setItem('Authorization', res.json().token);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    return HomeService;
}());
HomeService = __decorate([
    core_1.Injectable()
], HomeService);
exports.HomeService = HomeService;
