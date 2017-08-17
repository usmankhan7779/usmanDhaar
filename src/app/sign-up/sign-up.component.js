"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SignUpComponent = (function () {
    function SignUpComponent(singup, route, router) {
        this.singup = singup;
        this.route = route;
        this.router = router;
        this.model = {};
        this.loading = false;
        this.registration_ok = false;
        this.UserError = false;
        this.UserTyping = false;
        this.Userloading = false;
        this.EmailExist = false;
        this.Emailok = false;
        this.Emailinvalid = false;
        this.Emailchange = false;
        this.PassMatch = true;
        this.registration_error = false;
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/log-in';
    };
    SignUpComponent.prototype.register = function (username, Email, Password, Fname, Lname, Mobile) {
        var _this = this;
        this.singup.post_signup_form(username, Email, Password, Fname, Lname, Mobile).subscribe(function (response) {
            /* this function is executed every time there's a new output */
            // console.log("VALUE RECEIVED: "+response);
            _this.registration_ok = true;
        }, function (err) {
            _this.registration_error = true;
            /* this function is executed when there's an ERROR */
            //   console.log("ERROR: "+err);
        }, function () {
            /* this function is executed when the observable ends (completes) its stream */
            //   console.log("COMPLETED");
        });
        // this.router.navigate([this.returnUrl]);
        // alert('???');
    };
    SignUpComponent.prototype.onChange = function (username) {
        var _this = this;
        if (username !== '') {
            if (username.length > 4 && username.length < 30) {
                if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
                    this.Userloading = true;
                    this.UserTyping = true;
                    this.singup.verify_username(username).subscribe(function (response) {
                        /* this function is executed every time there's a new output */
                        // console.log("VALUE RECEIVED: "+response);
                        if (response.Res !== true) {
                            _this.Userloading = false;
                            _this.UserError = true;
                            //   alert('true');
                        }
                        else {
                            _this.Userloading = false;
                            _this.UserError = false;
                            //   alert(response_useradmin.Res);
                        }
                    }, function (err) {
                        console.log('error');
                        _this.Userloading = true;
                        alert(err);
                        ////const User_exist_Resonse= err.json();
                        /* this function is executed when there's an ERROR */
                        //   console.log("ERROR: "+err);
                    }, function () {
                        console.log('error');
                        /* this function is executed when the observable ends (completes) its stream */
                        //   console.log("COMPLETED");
                    });
                }
            }
            else {
                this.UserTyping = true;
                this.Userloading = false;
                this.UserError = false;
            }
        }
        else {
            this.UserTyping = false;
        }
    };
    SignUpComponent.prototype.checkEmail = function (email) {
        var _this = this;
        if (email !== '') {
            if (email.length > 4) {
                this.singup.check_email_unique(email).subscribe(function (data) {
                    if (data['exists'] === 'Yes') {
                        _this.Emailinvalid = false;
                        _this.EmailExist = true;
                        //this.out_put = true;
                    }
                    else {
                        _this.Emailinvalid = false;
                        //console.log("false");
                        _this.Emailok = true;
                        // this.out_put = false;
                    }
                }, function (err) {
                    _this.Emailinvalid = true;
                }, function () {
                    /* this function is executed when the observable ends (completes) its stream */
                    //   console.log("COMPLETED");
                });
            }
            else {
                this.Emailok = false;
                this.Emailinvalid = true;
            }
        }
        else {
            this.Emailinvalid = false;
        }
    };
    SignUpComponent.prototype.OnEmailChangeEvent = function () {
        this.EmailExist = false;
        this.Emailok = false;
    };
    SignUpComponent.prototype.checkPassowed = function (RePass, Pass) {
        if (RePass != Pass) {
            this.PassMatch = false;
        }
        else {
            //  not match
            this.PassMatch = true;
        }
    };
    SignUpComponent.prototype.OnPassReset = function () {
        this.PassMatch = true;
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'app-sign-up',
        templateUrl: './sign-up.component.html',
        styleUrls: ['./sign-up.component.css']
    })
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
