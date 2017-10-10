import { Component, OnInit } from '@angular/core';
import { LoginService } from '../log-in/log-in.services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  login_error = false;
  model: any = {};
  Waitcall = false;
  constructor(private GetProducts: LoginService) { }

  ngOnInit() {
  }


  loged_in(mail: string) {
    this.login_error = false;
    this.Waitcall = false;

    this.GetProducts.NewsLatterEmail(mail).subscribe((response) => {
        this.Waitcall = true;
      },
      (err) => {
        this.Waitcall = false;
        this.login_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
  }


  OnEmailChangeEvent() {
    this.login_error = false;
    this.Waitcall = false;
  }


}
