import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router, ActivatedRoute } from '@angular/router';
import {ContactUsServices} from './contact-us.services';
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
<<<<<<< HEAD
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
=======
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

  ngOnInit() {
  }

<<<<<<< HEAD
  contact_log(name: string, email: string, mobile: string, message: string) {
    this.obj.contact_us(name, email, mobile, message).subscribe(data => this.model = data );
  }

=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
}
