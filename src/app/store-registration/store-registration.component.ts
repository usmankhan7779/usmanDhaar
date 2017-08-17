import { Component, OnInit } from '@angular/core';

import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {
  model: any = {};

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1button = false;
  step2button = false;


  constructor( private obj: LoginService) {
  }

  save() {

    console.log(this.model);
    this.obj.StoreRegistration(this.model).subscribe(
      resSlidersData => {
      // console.log('DONEDsdfnsd');
      });

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
      this.step1button = true;
    }
  }
  checkButtonStep2()
  {
    if (this.model.fbrname != null && this.model.cnic != null && this.model.strn != null ) {
      this.step2button = true;
    }
  }

  ngOnInit() {
this.model.fbrregister = false;
    this.model.fbrunregister = false;
this.model.terms = true;
  }
}
