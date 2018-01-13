<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';

<<<<<<< HEAD
// import { AuthService } from 'angular4-social-login';
// import { SocialUser } from 'angular4-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
<<<<<<< HEAD
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  // user: SocialUser;
=======
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  model: any = {};
  private sub: any;
  loading = false;
  SignUpDOne = false;
  StoreUpDOne = false;
  login_error = false;
  Waitcall = false;
  logout: string;
  ProID: string;
  RedirectFromlogin: string;
  CatName: string;

  checkout: string;
  returnUrl: string;




<<<<<<< HEAD
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               // private authService: AuthService,
               private obj: LoginService,
=======
  constructor( private obj: LoginService,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
               private _nav: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
      // this.authService.authState.subscribe((user) => {
      //   this.user = user;
      // });
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.logout = params['Logout'] || 0 ;
        this.CatName = params['CatName'] || null ;
        this.ProID = params['ProID'] || null ;
        this.checkout = params['checkout'] || null ;

      });



     if ( localStorage.getItem('Reg') === 'Done') {

       this.SignUpDOne = true;
       localStorage.setItem('Reg', null);
     }
     if ( localStorage.getItem('StoreReg') === 'Done') {

       this.StoreUpDOne = true;
       localStorage.setItem('StoreReg', null);
     }
    window.scrollTo(0, 0);

    if (this.logout === 'yes') {
      this.LogOutClick();

    }
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }
<<<<<<< HEAD
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  //
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  //
  // signOut(): void {
  //   this.authService.signOut();
  // }

  loged_in(username: any, password: any) {
    this.obj.loged_in(username, password, this.CatName, this.ProID, this.checkout).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
        this.login_error = false;
        this.Waitcall = true;
=======

  loged_in(mail: string , pass: string) {
    this.login_error = false;
    this.Waitcall = true;
    this.obj.loged_in(mail, pass, this.CatName, this.ProID, this.checkout).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

      },
      (err) => {
        this.Waitcall = false;
        this.login_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }



  LogOutClick() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
   // console.log('Before');
    console.log(localStorage.getItem('Authorization'));
  //  this.obj.loged_out();
    localStorage.setItem('Authorization', '0');


    console.log(localStorage.getItem('Authorization'));
    this._nav.navigate(['/login']);
  }
<<<<<<< HEAD
  }
=======

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

}
