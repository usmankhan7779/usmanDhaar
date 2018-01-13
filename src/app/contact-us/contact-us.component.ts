import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ContactUsServices} from './contact-us.services';

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

  contact_log(name: string, email: string, mobile: string, message: string) {
    this.obj.contact_us(name, email, mobile, message).subscribe(data => this.model = data );
  }

}
