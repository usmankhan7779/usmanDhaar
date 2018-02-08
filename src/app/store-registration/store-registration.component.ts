import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {
  model: any = {};
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  Waitcall = false;
  step1button = false;
  step2button = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  uploadFile: any;
  sizeLimit = 2000000;
  ALLbase64textStringforPic= {0: 'dfghjk'};
  file: any;
  file1: any;
  files: FileList;
  private base64textString= '';

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private obj: LoginService) {
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

  }


  onChange(event: EventTarget) {



    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    if (this.files.length >= 1 && this.files.length < 5) {
      this.file = this.files[0];
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);

      if (this.files.length > 1 && this.files.length < 5) {

        for (let a = 1; a < (this.files.length); a++) {
          // alert(a);
          this.file1 = this.files[a];
          const reader1 = new FileReader();
          reader1.onload = (e: any) => {
            this._handleReaderLoadedforALl(e, a - 1);
          };
          // this._handleReaderLoadedforALl.bind(this.file1, a-1);
          reader1.readAsBinaryString(this.file1);
        }
        // console.log("fsdfsdf");
        console.log(this.ALLbase64textStringforPic);
      }
    }


  }


  _handleReaderLoadedforALl(readerEvt, index) {
    // console.log('attt  ',index);
    const binaryString = readerEvt.target.result;
    // console.log('123456');
    // console.log('asdfghjk   ',btoa(binaryString))
    // // this.arrayIndex=0;

    this.ALLbase64textStringforPic[index] = btoa(binaryString);
    // console.log(this.ALLbase64textStringforPic);


  }

  save() {

    if ( this.model.terms ) {
      this.Waitcall = true;
      if ( this.base64textString) {
        console.log('Inside base 64');
        this.obj.StoreRegistrationPic(this.model, this.base64textString).subscribe();
      } else {
        this.obj.StoreRegistration(this.model).subscribe(
          resSlidersData => {
            // console.log('DONEDsdfnsd');
          });
      }
    } else {
      alert('You must agree to the terms  first.');
    }
  }

  onChangeuser(username: string) {
    if (username !== '') {


      if (username.length > 4 && username.length < 30) {
        if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
          this.Userloading = true;
          this.UserTyping = true;

          this.obj.verifyStoreName(username).subscribe((response) => {
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

  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
  }


  closeregister() {
    // alert(this.model.fbrunregister)
    this.step2button = !this.step2button;

    this.model.fbrregister = false;
  }
  closecheck() {
    this.step2button = false;

    // alert("hi")
  this.model.fbrunregister = false;
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
  checkButtonStep2() {
    if (this.model.fbrname != null && this.model.cnic != null && this.model.strn != null ) {
      this.step2button = true;
    }
  }

  ngOnInit() {
this.model.fbrregister = false;
    this.model.fbrunregister = false;
this.model.terms = true;
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
    }
  }
}
