import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import { LoginService } from '../log-in/log-in.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  ServerUrl =  'http://127.0.0.1:8000/';
  NewPostcheck = false ;
  USerName: any;
  constructor(private _http: Http ,
              private Profile: LoginService,
              private _nav: Router) {
  }

  ngOnInit() {

    this.Profile.verify_token().subscribe((response) => {
        this.USerName =  this.jwtHelper.decodeToken(sessionStorage.getItem('Authorization'))['user_id'];
      },
      (err) => {
        console.log('ERROR:' + err);
        this._nav.navigate(['/login']);
      },
      () => {
      }
    );
    if ( sessionStorage.getItem('NewPost') === 'Done') {
          this.NewPostcheck = true;
      sessionStorage.setItem('NewPost', null);

  }
    window.scrollTo(0, 0);

  }


}
