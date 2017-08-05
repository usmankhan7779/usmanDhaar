import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import { LoginService } from '../log-in/log-in.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ServerUrl =  'http://127.0.0.1:8000/';
  NewPostcheck = false ;
  constructor(private _http: Http ,
              private Profile: LoginService,
              private _nav: Router) {
  }


  ngOnInit() {

    ///console.log('Verfiying')
    this.Profile.verify_token().subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
      },
      (err) => {
        console.log("ERROR: "+err);

        this._nav.navigate(['/login']);
        /* this function is executed when there's an ERROR */
         },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );

    if ( localStorage.getItem('NewPost') === 'Done') {
          this.NewPostcheck = true;
             localStorage.setItem('NewPost', '');
      window.scrollTo(0, 0);
  }


  }


}
