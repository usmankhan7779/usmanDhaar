// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UploadItemService} from '../file-uploads/upload-item-service';
import swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-usershipment',
  templateUrl: './usershipment.component.html',
  styleUrls: ['./usershipment.component.scss']
})
export class UsershipmentComponent implements OnInit {
  // public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  private base64textString= '';
  files: FileList;
  Mobile: string;
  Address: string;
  GetUSerDOne: any [];
  GetUSerAddress:any[];
  ValueRec: Boolean = false;
  filetoup: FileList;
  fileName: any;
  ReservePrice = false;
  total_GetUSeradress;
  usershipmentid;
  usershipmentfullname;
  usershipmentphoneno;
  usershipmentarea;
  usershipmentcity;
  usershipmentaddress;
  usershipmentdefault;
  usershipmentprovnice;
  usershipmentbilling;
  id;
  USerNameID;
  Shipmentaddress: boolean = false;
  f;
  default_shipment_address: boolean = false;
  default_bill_address: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,
              private itemUploadService: UploadItemService,
              private httpService: LoginService,
              public dialog: MatDialog

              ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      console.log('hahaha', localStorage.getItem('UserID'));
    // this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
    //   this.GetUSerDOne = resSlidersData;
    //   console.log('User Id is:', this.GetUSerDOne);
    
    //   this.ValueRec = true;
    // });
    this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
      this.GetUSerAddress = resAddSlidersData;
      this.total_GetUSeradress = resAddSlidersData['Total Result']
      console.log(this.total_GetUSeradress,'total')
      // alert(this.total_GetUSeradress)
      console.log('User Id is:', this.GetUSerAddress);
      this.ValueRec = true;
    });
    }
  }
  
  save(FName: string,Address:string, province: string,  City: string, Area: string,  Shipmentaddress,Shipmentbilladdress,Mobile , f:NgForm) {
    
    // if ( this.fileName) {
      //this.uploadItemsToActivity();
      // this.Waitcall = true;
      console.log('I am in 1 Component');
      // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        // data => {
         // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
          console.log('Successs' )
          // fullname.value,address.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,phone_no.value
          // fullname.value,phone_no.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,address.value
          // fullname.value,address.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,phone_no.value
          this.httpService.Useraddressaddtocart(FName,Address,province,City,Area,Shipmentaddress,Shipmentbilladdress,Mobile).subscribe((response) => {
         console.log(FName,Address,province,City,Area,Shipmentaddress,Shipmentbilladdress,Mobile)
         
         this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
          this.GetUSerAddress = resAddSlidersData;
          console.log('User Id is:', this.GetUSerAddress);
          this.ValueRec = true;
        });
          // this.Error = false;
          // this.Waitcall = false;
          // this.Right = true;
        },
        error => {
          console.log(error);
        });
     // );
    //  f.resetForm();
   
  }
  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
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
        this.obj.UserDetailsUpdatePic(this.GetUSerDOne['user'],this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
  }

  // save() {
  //   if (isPlatformBrowser(this.platformId)){
  //   this.obj.UserDetailsUpdate(this.FName, this.LName, this.Country, this.State, this.City, this.Zip, this.Mobile, this.Address, this.base64textString, localStorage.getItem('UserID')).subscribe(data => this.GetallCat = data);}
  // }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  } 
  getvalueofusershippment(val1,val2,val3,val4,val5,val6,val7,val8,val9){
    this.usershipmentid = val1;
    this.usershipmentfullname= val2;
    this.usershipmentphoneno= val3;
    this.usershipmentarea= val4;
    this.usershipmentcity= val5;
    this.usershipmentaddress= val6;
    this.usershipmentdefault= val7;
    this.usershipmentprovnice=val8;
    this.usershipmentbilling=val9
    // GetUser.id,GetUser.fullname,GetUser.phone_no,GetUser.area,GetUser.city,GetUser.address,GetUser.default_shipment_address 

  }
  // fullname.value,phone_no.value,province.value,city.value,area.value,default_shipment_address.value,address.value
  update(fullname:string,phone_no:string,province:string,city:string,area:string,default_shipment_address:string,address:string,default_billing_addresss:string) {
    //this.uploadItemsToActivity();
    // this.Waitcall = true;
    console.log('I am in 1 Component');
    // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
      // data => {
       // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        console.log('Successs' )
        // save(FName.value,Lname.value,Country.value,State.value,City.value, zipcode.value, personal.value, address.value)
        // GetUSerdetailsByUserIdupdate(id:number,fullname:string,address:string,province:string,city:string,area:string,default_shipment_address:string,phone_no:string,user) {
//  
        this.obj.GetUSerdetailsByUserIdupdate(this.usershipmentid,fullname,address,province,city,area,default_shipment_address,phone_no,default_billing_addresss).subscribe((response) => {
          this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
            this.GetUSerAddress = resAddSlidersData;
            this.ValueRec = true;
          });
          //  console.log(this.usershipmentid,fullname,address,province,city,area,default_shipment_address,phone_no,default_billing_address);
          //  console.log(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.fileName, this.USerNameID,this.complete,this.ISConfirmed)
        this.Error = false;
        this.Waitcall = false;
        // this.Right = true;
      },
      error => {
        console.log(error);
      });


     
      () => {

     
      }
   // );
  } 
  deleteAddress(usershipmentid){
    this.obj.DeleteAddress(usershipmentid).subscribe((response) => {
      this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
        this.GetUSerAddress = resAddSlidersData;
        this.ValueRec = true;
      });
    });
  }
}

