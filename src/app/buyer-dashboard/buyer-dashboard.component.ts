import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UploadItemService} from '../file-uploads/upload-item-service';


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
  filetoup: FileList;
  fileName: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,
              private itemUploadService: UploadItemService

              ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      console.log('hahaha', localStorage.getItem('UserID'));
    this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;
      console.log('User Id is:', this.GetUSerDOne);
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

  handleFileInput(files: FileList) {
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);

    this.fileName= 'https://storage.dhaar.pk/UserPics/' + localStorage.getItem('UserID') + '/' + this.filetoup[0].name;
    console.log('File Name is:' ,this.fileName);
    this.uploadItemsToActivity();

  }

  uploadItemsToActivity() {
    console.log('I am in 1 Component');
    this.itemUploadService.postOneImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
      data => {
        this.obj.UserDetailsUpdatePic(this.GetUSerDOne['user_id'],this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
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
