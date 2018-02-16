import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ContactUsServices} from './contact-us.services';
import swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers : [ContactUsServices]
})
export class ContactUsComponent implements OnInit {

  model: any = {};
  Waitcall = false;

  constructor(private obj: ContactUsServices,
              private _nav: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }


  contact_log() {
    console.log('dfdcusdbjhaaaaaaaaaaaaaaaaaaaaaaaaa')
    if(this.model.name) {
      if(this.model.email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')) {
        if(this.model.mobile) {
          if(this.model.message){
            this.obj.contact_us(this.model.name, this.model.email, this.model.mobile, this.model.message).subscribe(data => {
              this.model = data;
              swal('Your Message has been Submitted','','success')
            });
          } else {
            swal('Please Enter Your Message','','error');
          }
        } else {
          swal('Please Enter Your Mobile Number','','error');
        }
      } else {
        swal('Please Enter Valid Email','','error');
      }
    } else {
      swal('Please Enter Your Name','','error');
    }

  }

}
