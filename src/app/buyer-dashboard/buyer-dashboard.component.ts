import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {
  GetUSerDOne: any [];
  PicServrUrl = 'https://dhaardb.herokuapp.com/media';
  ValueRec: Boolean = false;
  constructor(private obj: LoginService,
              private _nav: Router,

              ) { }

  ngOnInit() {
   if (sessionStorage.getItem('Authorization') !== null) {
     this.obj.verify_token().subscribe((response) => {
         //  this.USerName =  this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
       },
       (err) => {
         console.log('ERROR:' + err);
         this._nav.navigate(['/login']);
       },
       () => {
       }
     );

     if (sessionStorage.getItem('Authorization') === null) {
       console.log('ERROR:sdfsd');
       this._nav.navigate(['/login']);
     } else {
       this.obj.GetUSerdetailsByUserId(sessionStorage.getItem('UserID')).subscribe(resSlidersData => {
         this.GetUSerDOne = resSlidersData;
         this.ValueRec = true;
       });
     }

   }

  }
  clearSessionstoreage() {
    sessionStorage.clear();
  }


}
