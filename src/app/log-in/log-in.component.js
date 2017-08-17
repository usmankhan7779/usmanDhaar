"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LogInComponent = (function () {
    function LogInComponent(obj, _nav, route) {
        this.obj = obj;
        this._nav = _nav;
        this.route = route;
        this.model = {};
        this.loading = false;
        this.SignUpDOne = false;
        this.login_error = false;
    }
    LogInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            _this.logout = params['Logout'] || 0;
            console.log('assiing ');
        });
        if (localStorage.getItem('Reg') === 'Done') {
            this.SignUpDOne = true;
            localStorage.setItem('Reg', '');
        }
        if (this.logout === 'yes') {
            this.LogOutClick();
        }
        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    };
    LogInComponent.prototype.loged_in = function (mail, pass) {
        var _this = this;
        this.obj.loged_in(mail, pass).subscribe(function (response) {
            /* this function is executed every time there's a new output */
            // console.log("VALUE RECEIVED: "+response);
        }, function (err) {
            _this.login_error = true;
            /* this function is executed when there's an ERROR */
            //   console.log("ERROR: "+err);
        }, function () {
            /* this function is executed when the observable ends (completes) its stream */
            //   console.log("COMPLETED");
        });
    };
    LogInComponent.prototype.LogOutClick = function () {
        // console.log('Before');
        console.log(localStorage.getItem('Authorization'));
        //  this.obj.loged_out();
        localStorage.setItem('Authorization', '0');
        console.log(localStorage.getItem('Authorization'));
        this._nav.navigate(['/login']);
    };
    return LogInComponent;
}());
LogInComponent = __decorate([
    core_1.Component({
        selector: 'app-log-in',
        templateUrl: './log-in.component.html',
        styleUrls: ['./log-in.component.css']
    })
], LogInComponent);
exports.LogInComponent = LogInComponent;
