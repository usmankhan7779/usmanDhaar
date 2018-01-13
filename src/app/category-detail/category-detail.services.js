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
require("rxjs/add/operator/map");
var CategoryServices = (function () {
    function CategoryServices(_http, _nav) {
        this._http = _http;
        this._nav = _nav;
        this.ServerUrl = 'http://127.0.0.1:8000/products/';
    }
    CategoryServices.prototype.getAllPhoneAndTabletProduct = function (page) {
        return this._http.get(this.ServerUrl + 'getAllPhoneAndTabletProduct?page=' + page).map(function (response) { return response.json(); });
    };
    return CategoryServices;
}());
CategoryServices = __decorate([
    core_1.Injectable()
], CategoryServices);
exports.CategoryServices = CategoryServices;
