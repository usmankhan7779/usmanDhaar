import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';

// import { AuthService } from 'angular4-social-login';
// import { SocialUser } from 'angular4-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  // user: SocialUser;
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




  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               // private authService: AuthService,
               private obj: LoginService,
               private _nav: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      // this.authService.authState.subscribe((user) => {
      //   this.user = user;
      // });
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
    if (isPlatformBrowser(this.platformId)){
   // console.log('Before');
    console.log(localStorage.getItem('Authorization'));
  //  this.obj.loged_out();
    localStorage.setItem('Authorization', '0');


    console.log(localStorage.getItem('Authorization'));
    this._nav.navigate(['/login']);
  }
  }

}
