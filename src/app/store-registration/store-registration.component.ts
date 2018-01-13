import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {
  model: any = {};
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  Waitcall = false;
  step1button = false;
  step2button = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private obj: LoginService) {
  }

  save() {


    if ( this.model.terms ) {
      this.Waitcall = true;
      this.obj.StoreRegistration(this.model).subscribe(
        resSlidersData => {
          // console.log('DONEDsdfnsd');
        });
    } else {
      alert('You must agree to the terms  first.');
    }
  }

  onChange(username: string) {
    if (username !== '') {


      if (username.length > 4 && username.length < 30) {
        if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
          this.Userloading = true;
          this.UserTyping = true;

          this.obj.verifyStoreName(username).subscribe((response) => {
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

  checkEmail(email: string) {

    if (email !== '') {

      if (email.length > 4) {



        this.obj.email_verifyforStore(email).subscribe(( data ) => {

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
          (err) => {
            alert('Email invalid');
            this.Emailinvalid = true;
          },
          () => {
            /* this function is executed when the observable ends (completes) its stream */
            //   console.log("COMPLETED");
          }
        );
      } else {
        this.Emailok = false;
        this.Emailinvalid = true;
      }
    } else {
      this.Emailinvalid = false;


    }

  }

  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
  }


  closeregister() {
    // alert(this.model.fbrunregister)
    this.step2button = !this.step2button;

    this.model.fbrregister = false;
  }
  closecheck() {
    this.step2button = false;

    // alert("hi")
  this.model.fbrunregister = false;
  }
  checkButtonStep1() {
    if (this.model.storename != null && this.model.email != null && this.model.ownername != null && this.model.city != null && this.model.zipcode != null && this.model.personal != null && this.model.address != null && this.model.ownername != null) {



     if (!this.EmailExist && this.UserError && this.UserTyping && !this.Userloading) {
       this.step1button = true;
     } else {
       this.step1button = false;
     }


    }
  }
  checkButtonStep2() {
    if (this.model.fbrname != null && this.model.cnic != null && this.model.strn != null ) {
      this.step2button = true;
    }
  }

  ngOnInit() {
this.model.fbrregister = false;
    this.model.fbrunregister = false;
this.model.terms = true;
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }
}
