import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { JwtHelper } from 'angular2-jwt';
import swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-seller-user-detail',
  templateUrl: './seller-user-detail.component.html',
  styleUrls: ['./seller-user-detail.component.css']
})
export class SellerUserDetailComponent implements OnInit {
  model: any = {};
  jwtHelper: JwtHelper = new JwtHelper();
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1button = false;
  step2button = false;
  Waitcall = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  base64textString;
  SessionstoreName: any;
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  GetUSerdetails: any [];
  Addbestoffer = false;
  Auction = true;
  file: any;
  USerNameID: any;
  files: FileList;
  Error= false;
  Right= false;
  match = true;
  notsame = false;
  url: any = 'JPG, GIF, PNG';
  // filetoup1:any=[];
  // PicCounter: any =0;
  PictureCheck = false;
filetoup: FileList;
  fileName = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,
              private Profile: LoginService,
              private itemUploadService: UploadItemService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.SessionstoreName = localStorage.getItem('StoreName');
      this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];

      this.obj.GetUserDetailByName(this.USerNameID).subscribe(resSlidersData => {
        this.GetUSerdetails = resSlidersData;
        // console.log('fdsf');
        console.log(this.GetUSerdetails);
      });
    }

  }

  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
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
  handleFileInput(files: FileList) {
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);

    this.fileName= 'https://storage.dhaar.pk/UserPics/' + localStorage.getItem('UserID') + '/' + this.filetoup[0].name;
    console.log('File Name is:' ,this.fileName);
this.uploadItemsToActivity();
}

uploadItemsToActivity() {
    console.log('I am in 1 Component');
    this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
      data => {
        this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
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

  save(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string) {
    
    if ( this.fileName) {
      //this.uploadItemsToActivity();
      this.Waitcall = true;
      console.log('I am in 1 Component');
      this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        data => {
         // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
          console.log('Successs' )
          this.obj.UserDetailsUpdate(FName, Lname, Country, State, City, Zip, Mobile, Address, this.fileName, this.USerNameID).subscribe((response) => {
         console.log(FName, Lname, Country, State, City, Zip, Mobile, Address, this.fileName, this.USerNameID)
          this.Error = false;
          this.Waitcall = false;
          this.Right = true;
        },
        error => {
          console.log(error);
        });


        },
        (err) => {
          this.Right = false;
          this.Waitcall = false;
          this.Error = true;
     
        },
        () => {

       
        }
      );
    } else {
      this.Waitcall = true;
      this.obj.UserDetailsUpdateWithOutPic(FName, Lname, Country, State, City, Zip, Mobile, Address, this.USerNameID).subscribe((response) => {
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
    }

  }

  updatePassword(old: string, new1: string, new2: string) {
    this.Error = false;
    this.Right = false;

    if (old === new1 || old === new2) {
      this.notsame = true;
    } else {
      if (new1 === new2) {
        this.match = true;
        this.Waitcall = true;
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
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
