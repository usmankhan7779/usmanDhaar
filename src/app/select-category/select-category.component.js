"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectCategoryComponent = (function () {
    function SelectCategoryComponent(PostAdd) {
        this.PostAdd = PostAdd;
        this.GetallCat = [];
        this.ServrUrl = 'assets/assets2/images/category/';
    }
    SelectCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.PostAdd.GetAllCategories().subscribe(function (resSlidersData) { return _this.GetallCat = resSlidersData; });
    };
    return SelectCategoryComponent;
}());
SelectCategoryComponent = __decorate([
    core_1.Component({
        selector: 'app-select-category',
        templateUrl: './select-category.component.html',
        styleUrls: ['./select-category.component.css']
    })
], SelectCategoryComponent);
exports.SelectCategoryComponent = SelectCategoryComponent;
