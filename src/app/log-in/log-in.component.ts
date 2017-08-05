import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  model: any = {};
  private sub: any;
  loading = false;
  SignUpDOne = false;
  login_error = false;
  logout: string;
  returnUrl: string;




  constructor( private obj: LoginService,
               private _nav: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.logout = params['Logout'] || 0 ;
        console.log('assiing ');

      });

     if ( localStorage.getItem('Reg') === 'Done') {

       this.SignUpDOne = true;
       localStorage.setItem('Reg', '');
     }


    if (this.logout === 'yes') {
      this.LogOutClick();

    }
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  loged_in(mail: string , pass: string) {

    this.obj.loged_in(mail, pass).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
      },
      (err) => {
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
   // console.log('Before');
    console.log(localStorage.getItem('Authorization'));
  //  this.obj.loged_out();
    localStorage.setItem('Authorization', '0');


    console.log(localStorage.getItem('Authorization'));
    this._nav.navigate(['/login']);
  }


}
