import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ValueRec: Boolean = false;
  GetUSerDOne: any [];
  constructor(private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {

    console.log('fdsfsdfdsgj' + sessionStorage.getItem('UserID'));
    // if (localStorage.getItem('UserID') !== null) {
    //   this.obj.GetUSerdetailsByUserId(localStorage.getItem('UserID')).subscribe(resSlidersData => {
    //     this.GetUSerDOne = resSlidersData;
    //     this.ValueRec = true;
    //   });

    // }


  }

  ValueReset() {

    this.ValueRec = false;
    this.obj.loged_out();
    this._nav.navigate(['/login']);
  }


}
