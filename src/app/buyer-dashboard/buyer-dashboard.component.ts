import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  private base64textString= '';
  files: FileList;
  FName: string;
  LName: string;
  Country: string;
  State: string;
  City: string;
  Zip: string;
  Mobile: string;
  Address: string;
  GetUSerDOne: any [];
  PicServrUrl = 'https://apis.dhaar.pk/media/';
  ValueRec: Boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,

              ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;
      // this.FName = this.GetUSerDOne['Fname'];
      // this.LName = this.GetUSerDOne['Lname'];
      // this.Country = this.GetUSerDOne['Country'];
      // this.State = this.GetUSerDOne['State'];
      // this.City = this.GetUSerDOne['City'];
      // this.Zip = this.GetUSerDOne['Zip'];
      // this.Mobile = this.GetUSerDOne['Mobile'];
      // this.Address = this.GetUSerDOne['Address'];
      this.ValueRec = true;
    });
    }
  }
  onChange(event: EventTarget) {

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    this.file = this.files[0];
    console.log(this.files);

    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file);
  }


  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

  }
  // save() {
  //   if (isPlatformBrowser(this.platformId)){
  //   this.obj.UserDetailsUpdate(this.FName, this.LName, this.Country, this.State, this.City, this.Zip, this.Mobile, this.Address, this.base64textString, localStorage.getItem('UserID')).subscribe(data => this.GetallCat = data);}
  // }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }


}
