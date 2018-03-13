import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';


@Component({
  selector: 'app-reser-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  sub;
  blogs;
  query;
  password1;
  password2;
  searchQuery;
  loaded = false;
  uid: any;
  token: any;
  is_set = false;
  is_match_error = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private route: ActivatedRoute,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'] || '0';
      this.token = params['token'] || '0';
    });

    if ( this.uid === '0' || this.token === '0' )  {
      this._nav.navigate(['/login']);
    }
  }
  }



  UPdatePassword(pass1: any, pass2: any) {
    if ( pass1 === pass2 ) {
      console.log('pass:',pass1,pass2,'uid is:', this.uid,'Token is:', this.token);
    this.obj.ResetPasswordConfirm(this.uid, this.token, pass1, pass2)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this._nav.navigate(['/login']);
          // alert('success')
        },
        error => {
          this.is_set = true;
          // this.alertService.error(error);
          // this.loading = false;
          // alert(error);
        });
  } else {
      this.is_match_error = true;
    }
  }

}
