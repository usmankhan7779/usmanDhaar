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
    this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;
      this.ValueRec = true;
    });

  }
  clearSessionstoreage() {
    localStorage.clear();
  }


}
