import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  registration_ok = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  Emailchange= false;

  PassMatch= true;


  registration_error = false;
  constructor( private singup: LoginService,
               private route: ActivatedRoute,
               private router: Router,

  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/log-in';
  }

  register(username: string, Email: string, Password: string , Fname: string, Lname: string, Mobile: string ) {


    this.singup.post_signup_form(username, Email, Password, Fname, Lname, Mobile) .subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
        this.registration_ok = true;
      },
      (err) => {
        this.registration_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );


    // this.router.navigate([this.returnUrl]);
    // alert('???');

  }

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

  }

  checkEmail(email: string) {

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
            (err) => {
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

  checkPassowed(RePass: string, Pass: string) {

    if ( RePass != Pass)
     {
       this.PassMatch = false;

     }
     else {
      //  not match
      this.PassMatch = true;

    }

  }

  OnPassReset()
  {
    this.PassMatch = true;
  }

}
