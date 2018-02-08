"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var DashboardComponent = (function () {
    function DashboardComponent(_http, Profile, _nav) {
        this._http = _http;
        this.Profile = Profile;
        this._nav = _nav;
        this.ServerUrl = 'https://apis.dhaar.pk/';
        this.NewPostcheck = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        ///console.log('Verfiying')
        this.Profile.verify_token().subscribe(function (response) {
            /* this function is executed every time there's a new output */
            // console.log("VALUE RECEIVED: "+response);
        }, function (err) {
            console.log("ERROR: " + err);
            _this._nav.navigate(['/login']);
            /* this function is executed when there's an ERROR */
        }, function () {
            /* this function is executed when the observable ends (completes) its stream */
            //   console.log("COMPLETED");
        });
        if (localStorage.getItem('NewPost') === 'Done') {
            this.NewPostcheck = true;
            localStorage.setItem('NewPost', '');
            window.scrollTo(0, 0);
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
