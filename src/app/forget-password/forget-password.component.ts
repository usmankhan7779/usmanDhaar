import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  isSend = false;
  isError = false;
  Waitcall = false;
  constructor(private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {
  }

  SendEmail(id: any) {
    this.Waitcall = true;
    this.isSend = false;
    this.Waitcall = false;
    this.obj.reset_service(id)
      .subscribe(
        data => {
          console.log(data);
          this.Waitcall = false;
          this.isSend = true;
          id.reset();
        },
        error => {
          this.Waitcall = false;
          this.isSend = false;
          this.isError = true;
          console.log(error);
        });
  }



}
