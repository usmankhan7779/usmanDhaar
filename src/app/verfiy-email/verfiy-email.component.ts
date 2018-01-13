<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.css']
})
export class VerfiyEmailComponent implements OnInit {
  sub;
  blogs;
  query;
  password1;
  password2;
  searchQuery;
  Waitcall = false;
  uid: any;
  email: any;
  is_set = false;
  is_send = false;
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
    }
=======
    window.scrollTo(0, 0);
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef

  }

  resedcode( ) {
<<<<<<< HEAD
    if (isPlatformBrowser(this.platformId)) {
      this.Waitcall = true;
      this.obj.sendmail(localStorage.getItem('email'))
        .subscribe(
          data => {
            // this.alertService.success('Registration successful', true);
            this.is_send = true;
            this.is_match_error = false;
            this.Waitcall = false;
            // alert('success')
          },
          error => {
            this.is_send = false;
            this.is_match_error = true;
            this.Waitcall = false;

          });
    }
  }

  UPdatePassword( pass2: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.is_set = false;
      this.Waitcall = true;
=======
    this.Waitcall = true;
    this.obj.sendmail(localStorage.getItem('email'))
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.is_send = true;
          this.is_match_error = false;
          this.Waitcall = false;
          // alert('success')
        },
        error => {
          this.is_send = false;
          this.is_match_error = true;
          this.Waitcall = false;

        });

  }

  UPdatePassword( pass2: any) {
    this.is_set = false;
    this.Waitcall = true;
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
      this.obj.checkcode(pass2, localStorage.getItem('email'))
        .subscribe(
          data => {
            // alert('done');
<<<<<<< HEAD
            this.obj.loged_in(localStorage.getItem('Usernamae'), localStorage.getItem('password'), null, null, null).subscribe((response) => {
                /* this function is executed every time there's a new output */
                // console.log("VALUE RECEIVED: "+response);

                // alert('logedin');
              },
              (err) => {
                this.Waitcall = false;
                alert('error ');
=======
            this.obj.loged_in(localStorage.getItem('Usernamae'), localStorage.getItem('password'), null , null , null ).subscribe((response) => {
                /* this function is executed every time there's a new output */
                // console.log("VALUE RECEIVED: "+response);

                 // alert('logedin');
              },
              (err) => {
                this.Waitcall = false;
                 alert('error ');
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
              () => {
                /* this function is executed when the observable ends (completes) its stream */
                //   console.log("COMPLETED");
              }
            );
            this.Waitcall = false;
            // this.alertService.success('Registration successful', true);
            // this._nav.navigate(['/login']);
            // alert('success')
          },
          error => {
            this.Waitcall = false;
            this.is_set = true;
            // this.alertService.error(error);
            // this.loading = false;
            // alert(error);
          });
<<<<<<< HEAD
    }
=======

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  }

}
