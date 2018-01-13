<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';


@Component({
  selector: 'app-reser-password',
  templateUrl: './reser-password.component.html',
  styleUrls: ['./reser-password.component.css']
})
export class ReserPasswordComponent implements OnInit {
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
<<<<<<< HEAD
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
=======
  constructor(private obj: LoginService,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
              private route: ActivatedRoute,
              private _nav: Router) { }

  ngOnInit() {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)){
      window.scrollTo(0, 0);
=======
    window.scrollTo(0, 0);
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'] || '0';
      this.token = params['token'] || '0';
    });

    if ( this.uid === '0' || this.token === '0' )  {
      this._nav.navigate(['/login']);
    }
  }
<<<<<<< HEAD
  }
=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef



  UPdatePassword(pass1: any, pass2: any) {
    if ( pass1 === pass2 ) {
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
