<<<<<<< HEAD
import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { JwtHelper } from 'angular2-jwt';


@Component({
  selector: 'app-buyer-setting',
  templateUrl: './buyer-setting.component.html',
  styleUrls: ['./buyer-setting.component.css']
})
export class BuyerSettingComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  match = true;
  Right = false;
  notsame = false;
  Waitcall = false;
  Error = false;
  USerNameID: any;
<<<<<<< HEAD
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    this.USerNameID =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    }
=======
  constructor(private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {
    this.USerNameID =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }


  updatePassword(old: string, new1: string, new2: string) {
    if (old === new1 || old === new2) {
      this.notsame = true;
    } else {
      if (new1 === new2) {
        this.Waitcall = true;
        this.match = true;
        this.obj.changepass(this.USerNameID, old, new1, new2).subscribe((response) => {
            /* this function is executed every time there's a new output */
            // console.log("VALUE RECEIVED: "+response);
            this.Error = false;
            this.Waitcall = false;
            this.Right = true;


          },
          (err) => {
            this.Right = false;
            this.Waitcall = false;
            this.Error = true;
            /* this function is executed when there's an ERROR */
            //   console.log("ERROR: "+err);
          },
          () => {

            /* this function is executed when the observable ends (completes) its stream */
            //   console.log("COMPLETED");
          }
        );


      } else {

        this.match = false;
      }
    }

  }

  clearSessionstoreage() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
=======
    localStorage.clear();
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }
}
