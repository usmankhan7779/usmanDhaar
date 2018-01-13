<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  model: any = {};
  loading = false;
  Waitcall = false;
  returnUrl: string;
  registration_ok = false;
  UserError = false;
  EmailPosterror = false;
  recaptcha: any;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  Emailchange= false;
  termsAggre= false;
  PassMatch= true;
  registration_error = false;
<<<<<<< HEAD
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private singup: LoginService,
=======
  constructor( private singup: LoginService,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
               private route: ActivatedRoute,
               private router: Router,

  ) { }

  ngOnInit() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/log-in';
    }
  }
  register() {
    if (isPlatformBrowser(this.platformId)) {

    if (this.model.Agree) {

      // if (this.recaptcha) {
      //   this.Waitcall = true;

        if (this.Emailok) {
          this.singup.post_signup_form(this.model.Username, this.model.Email, this.model.Password, this.model.FName, this.model.LName, this.model.Mobile).subscribe((response) => {
=======
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/log-in';
  }
  register(username: string, Email: string, Password: string , Fname: string, Lname: string, Mobile: string ) {

    if ( this.model.Agree) {

      if (this.recaptcha) {
        this.Waitcall = true;

        if (this.Emailok) {
          this.singup.post_signup_form(username, Email, Password, Fname, Lname, Mobile).subscribe((response) => {
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
              /* this function is executed every time there's a new output */
              // console.log("VALUE RECEIVED: "+response);
              this.registration_ok = true;
            },
            (err) => {
              this.Waitcall = false;
              this.registration_error = true;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
            () => {
              /* this function is executed when the observable ends (completes) its stream */
              //   console.log("COMPLETED");
            }
          );
        } else {
          this.Waitcall = false;
          this.EmailPosterror = true;
        }
<<<<<<< HEAD
      // } else {
      //   alert('Captcha Missing');
      //
      // }
=======
      } else {
        alert('Captcha Missing');

      }
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    } else {
      alert('You must agree to the terms  first.');
    }


    // this.router.navigate([this.returnUrl]);
    // alert('???');

  }
<<<<<<< HEAD
  }

  onChange(username: string) {
    if (isPlatformBrowser(this.platformId)) {


      if (username !== '') {


        if (username.length > 4 && username.length < 30) {
          if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
            this.Userloading = true;
            this.UserTyping = true;


            this.singup.verify_username(username).subscribe((response) => {
                /* this function is executed every time there's a new output */
                // console.log("VALUE RECEIVED: "+response);
                if (response.Res !== true) {

                  this.Userloading = false;
                  this.UserError = true;
                  //   alert('true');

                } else {
                  this.Userloading = false;
                  this.UserError = false;
                  //   alert(response_useradmin.Res);
                }
              },
              (err) => {

                console.log('error');
                this.Userloading = true;

                alert(err);
                ////const User_exist_Resonse= err.json();


                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
              () => {
                console.log('error');
                /* this function is executed when the observable ends (completes) its stream */
                //   console.log("COMPLETED");
              }
            );
          }
        } else {
          this.UserTyping = true;
          this.Userloading = false;
          this.UserError = false;

        }
      } else {
        this.UserTyping = false;

      }
    }
=======

  onChange(username: string) {


    if (username !== '') {


      if (username.length > 4 && username.length < 30) {
        if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
           this.Userloading = true;
           this.UserTyping = true;


          this.singup.verify_username(username).subscribe((response) => {
              /* this function is executed every time there's a new output */
              // console.log("VALUE RECEIVED: "+response);
              if (response.Res !== true) {

                this.Userloading = false;
                this.UserError = true;
                //   alert('true');

              } else {
                this.Userloading = false;
                this.UserError = false;
                //   alert(response_useradmin.Res);
              }
            },
            (err) => {

              console.log('error');
              this.Userloading = true;

              alert(err);
              ////const User_exist_Resonse= err.json();


              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
            () => {
                      console.log('error');
              /* this function is executed when the observable ends (completes) its stream */
              //   console.log("COMPLETED");
            }
          );
        }
      } else {
        this.UserTyping = true;
        this.Userloading = false;
        this.UserError = false;

      }
    } else {
      this.UserTyping = false;

    }

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }

  checkEmail(email: string) {

<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)) {

      console.log('Email.... : ' + email);
      if (email !== '') {

        if (email.length > 4) {


          this.singup.check_email_unique(email).subscribe((data) => {
              console.log('Email Checked Subscribe');
              if (data['exists'] === 'Yes') {
                this.Emailinvalid = false;
                this.EmailExist = true;
                // this.out_put = true;
              } else {
                this.Emailinvalid = false;
                // console.log("false");
                this.Emailok = true;

                // this.out_put = false;
              }

            },
=======
    if (email !== '') {

      if (email.length > 4) {



        this.singup.check_email_unique(email).subscribe(( data ) => {

            if (data['exists'] === 'Yes') {
              this.Emailinvalid = false;
              this.EmailExist = true;
              //this.out_put = true;
            }
            else {
              this.Emailinvalid = false;
              //console.log("false");
              this.Emailok = true;

              // this.out_put = false;
            }

          },
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
            (err) => {
              this.Emailinvalid = true;
            },
            () => {
              /* this function is executed when the observable ends (completes) its stream */
              //   console.log("COMPLETED");
            }
<<<<<<< HEAD
          );
        } else {
          this.Emailok = false;
          this.Emailinvalid = true;
        }
      } else {
        this.Emailinvalid = false;


      }
    }
  }
  // resolved(captchaResponse: string) {
  //
  //   if (captchaResponse) {
  //     this.recaptcha = true;
  //   }
  // }
  // alert("hiii")  }
  OnEmailChangeEvent() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Change Event');
      this.EmailExist = false;
      this.Emailok = false;
    }
  }

  checkPassowed(RePass: string, Pass: string) {
    if (isPlatformBrowser(this.platformId)) {

      if (RePass !== Pass) {
        this.PassMatch = false;

      } else {
        //  not match
        this.PassMatch = true;

      }
    }
  }

  OnPassReset() {
    if (isPlatformBrowser(this.platformId)) {
      this.PassMatch = true;
    }
  }
=======
        );
      } else {
        this.Emailok = false;
        this.Emailinvalid = true;
      }
    } else {
      this.Emailinvalid = false;


    }

  }
  resolved(captchaResponse: string) {

    if (captchaResponse) {
      this.recaptcha = true;
    }
  }
  // alert("hiii")  }
  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
  }

  checkPassowed(RePass: string, Pass: string) {

    if ( RePass !== Pass) {
       this.PassMatch = false;

     } else {
      //  not match
      this.PassMatch = true;

    }

  }

  OnPassReset() {
    this.PassMatch = true;
  }

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
}
