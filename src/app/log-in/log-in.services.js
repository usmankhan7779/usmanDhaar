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
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
var LoginService = (function () {
    function LoginService(_http, _nav) {
        this._http = _http;
        this._nav = _nav;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.ServerUrl = 'http://127.0.0.1:8000/user/';
    }
    LoginService.prototype.loged_in = function (mail, pass) {
        var _this = this;
        return this._http.post(this.ServerUrl + 'user-token-auth/', { 'username': mail, 'password': pass })
            .map(function (res) {
            if (res) {
                if (res.status === 200) {
                    localStorage.setItem('Authorization', res.json().token);
                    _this.decoded = _this.jwtHelper.decodeToken(res.json().token)['user_id'];
                    //localStorage.setItem('User_ID', res.json().id);
                    console.log('Token: ' + res.json().token);
                    console.log('UserID: ' + _this.decoded);
                    _this._nav.navigate(['/dashboard']);
                    return [{ status: res.status, json: res }];
                }
            }
        }).catch(function (error) {
            return Rx_1.Observable.throw(new Error(error.status));
        });
    };
    LoginService.prototype.loged_out = function () {
        return this._http.post(this.ServerUrl + 'api-token-refresh/', { 'token': localStorage.getItem('Authorization') });
    };
    LoginService.prototype.post_signup_form = function (username, email, password, Fname, LName, Mobile) {
        var _this = this;
        return this._http.post(this.ServerUrl + 'addUser/', { 'username': username, 'email': email, 'password': password })
            .map(function (res) {
            if (res) {
                if (res.status === 201 || res.status === 200) {
                    // localStorage.setItem('account_created' , '1' );
                    var responce_data = res.json();
                    localStorage.setItem('Reg', 'Done');
                    //  alert(localStorage.getItem('id'));
                    //  console.log(responce_data.id);
                    //  console.log('ok submited');
                    _this._nav.navigate(['/login']);
                    _this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
                }
            }
        }).catch(function (error) {
            console.log(error);
            if (error.status !== 404) {
                if (error.status === 401) {
                    console.log(error);
                    return Rx_1.Observable.throw(new Error(error.status));
                }
            }
            else {
                console.log(error);
                //   this._nav.navigate(['/login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
        });
    };
    LoginService.prototype.register_customer = function (responce_data, Fname, LName, Mobile) {
        return this._http.post(this.ServerUrl + 'addUserDetails/', { 'user_id': responce_data,
            'Fname': Fname,
            'Lname': LName,
            'Mobile': Mobile,
        }).map(function (res) {
            if (res) {
                if (res.status === 201 || res.status === 200) {
                    console.log('ok submited');
                }
            }
        }).catch(function (error) {
            console.log(error);
            if (error.status !== 404) {
                if (error.status === 401) {
                    console.log(error);
                    return Rx_1.Observable.throw(new Error(error.status));
                }
            }
            else {
                console.log(error);
                //   this._nav.navigate(['/login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
        });
    };
    LoginService.prototype.verify_username = function (username) {
        //console.log(username);
        return this._http.get(this.ServerUrl + 'verifyusername/' + username)
            .map(function (res) {
            if (res) {
                if (res.status === 201 || res.status === 200) {
                    // localStorage.setItem('account_created' , '1' );
                    // / const responce_data = res.json();
                    //  this.id = localStorage.setItem('id', responce_data.id)
                    var response_useradmin = res.json();
                    // console.log(response_useradmin.Res);
                    //this._nav.navigate(['/login']);
                    return response_useradmin;
                }
            }
        }).catch(function (error) {
            console.log(error);
            if (error.status !== 404) {
                if (error.status === 401) {
                    //this._nav.navigate(['/login']);
                    return Rx_1.Observable.throw(new Error(error.status));
                }
            }
            else {
                console.log(error);
                //   this._nav.navigate(['/login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
        });
    };
    LoginService.prototype.check_email_unique = function (email) {
        return this._http.get(this.ServerUrl + 'email_verify/' + email).map(function (response) { return response.json(); });
    };
    LoginService.prototype.verify_token = function () {
        var _this = this;
        return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
            .map(function (res) {
            if (res) {
                console.log('Done');
                if (res.status === 201) {
                    // return true;
                }
                else if (res.status === 200) {
                    // return true;
                }
            }
        }).catch(function (error) {
            if (error.status === 404) {
                console.log("ok not submited submite");
                _this._nav.navigate(['/login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
            else if (error.status === 400) {
                console.log("Not");
                _this._nav.navigate(['/owner_login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
            else if (error.status === 401) {
                console.log("ok not submited submite");
                _this._nav.navigate(['/login']);
                return Rx_1.Observable.throw(new Error(error.status));
            }
            else {
                _this._nav.navigate(['/login']);
            }
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable()
], LoginService);
exports.LoginService = LoginService;
