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
var AdService = (function () {
    function AdService(_http, _nav) {
        this._http = _http;
        this._nav = _nav;
        this.ServerUrl = 'http://127.0.0.1:8000/products/';
    }
    AdService.prototype.GetAllCategories = function () {
        return this._http.get(this.ServerUrl + 'Getallcat').map(function (response) { return response.json(); });
    };
    AdService.prototype.GetAllSubCategoriesByCatID = function (pk) {
        console.log(pk);
        return this._http.get(this.ServerUrl + 'Getsubcat/' + pk).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    AdService.prototype.GetAllSubSubCategoriesByCatID = function (pk) {
        return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    AdService.prototype.GetSubSubCategories = function (pk) {
        return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(function (response) { return response.json(); });
        // console.log(this.CateDeatils)
    };
    AdService.prototype.Fixed_Product = function (Pic, Sub2_cat, title, User_ID, des, con, cat, sub_cat, Sub_Subcat, Price, Day, Auction) {
        // console.log(Pidd);
        var _this = this;
        return this._http.post('http://localhost:8000/AddNewProduct', {
            'Cat_Name': cat,
            'Subcat_Name': sub_cat,
            'Sub_Subcat_Name': Sub_Subcat,
            'P_Title': title,
            'P_Des': des,
            'P_Condition': con,
            'Price': Price,
            'AuctionDays': Day,
            'Auction': Auction,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    console.log('this is the id' + responce_data.id);
                    _this.ProductImages(Pic, responce_data.id).subscribe();
                    // localStorage.setItem('Authorization', res.json().token);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.ProductImages = function (Pidd, Pic) {
        //    console.log('testing 123 ' + Pidd);
        return this._http.post(this.ServerUrl + 'productimages', { 'Pic': Pic, 'ProID': Pidd })
            .map(function (res) {
            if (res) {
                // console.log('testing res');
                if (res.status === 200 || res.status === 201) {
                    var responce_data = res.json();
                    // console.log('this isinsertion ' + responce_data.id);
                    // this.UPload_PIc2(Sub2_cat, title, des, con, cat, sub_cat, Sub_Subcat, this.id).subscribe();
                    //            localStorage.setItem('Authorization', res.json().token);
                    //          this._nav.navigate(['/profile']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            if (error.status === 404) {
                console.log('errors 404');
            }
            else {
                console.log('errors ');
            }
            console.log(error);
            console.log(error.text);
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_PhoneAndTabletProduct_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        var _this = this;
        console.log('fsdfsfgsahd' + SubSubCat);
        return this._http.post(this.ServerUrl + 'phoneandtablets', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'User_ID': User_ID,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'P_Des': Addetail,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'MaxBidPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_WomenFashion_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        //console.log('fsdfsfgsahd' + SubSubCat);
        var _this = this;
        return this._http.post(this.ServerUrl + 'womenfashion', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'User_ID': User_ID,
            'P_Des': Addetail,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'MaxBidPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_MenFashion_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        var _this = this;
        console.log('fsdfsfgsahd' + SubSubCat);
        return this._http.post(this.ServerUrl + 'menfashion', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'User_ID': User_ID,
            'P_Des': Addetail,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'MaxBidPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_TVAudioVideo_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        var _this = this;
        console.log('fsdfsfgsahd' + SubSubCat);
        return this._http.post(this.ServerUrl + 'TVAudioVideo', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'User_ID': User_ID,
            'P_Des': Addetail,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'MaxBidPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_ComputingLaptops_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        // console.log('fsdfsfgsahd' + SubSubCat);
        var _this = this;
        return this._http.post(this.ServerUrl + 'ComputingLaptops', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'P_Des': Addetail,
            'User_ID': User_ID,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    AdService.prototype.Add_HomeAppliances_Product = function (Product_ID, User_ID, basex64, Title, CatName, SubCat, SubSubCat, condition, Addetail, Auction, Starting_Price, Buyitnow, ReservePrice, AuctionListing, FixedPrice, AddBestOffer, Quantity) {
        //console.log('fsdfsfgsahd' + SubSubCat);
        var _this = this;
        return this._http.post(this.ServerUrl + 'HomeAppliances', {
            'ProductID': Product_ID,
            'Cat_Name': CatName,
            'Sub_Cat_Name': SubCat,
            'Sub_Sub_Cat_Name': SubSubCat,
            'P_Title': Title,
            'P_Des': Addetail,
            'User_ID': User_ID,
            'P_Condition': condition,
            'Auction': Auction,
            'SrartingPrice': Starting_Price,
            'MaxBidPrice': Starting_Price,
            'Buyitnow': Buyitnow,
            'AuctionListing': AuctionListing,
            'ReservePrice': ReservePrice,
            'FixedPrice': FixedPrice,
            'Addbestoffer': AddBestOffer,
            'Quantity': Quantity,
        }).map(function (res) {
            if (res) {
                console.log('abc');
                if (res.status === 201) {
                    var responce_data = res.json();
                    _this.ProductImages(Product_ID, basex64).subscribe();
                    localStorage.setItem('NewPost', 'Done');
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            console.log(error.toString());
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    return AdService;
}());
AdService = __decorate([
    core_1.Injectable()
], AdService);
exports.AdService = AdService;
