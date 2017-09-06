import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HostListener} from '@angular/core';
import { LoginService } from '../log-in/log-in.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ValueRec: Boolean = false;
  GetUSerDOne: any [];
  CartedProduct: any = [];
  ItemInCart: any ;
  constructor(private obj: LoginService,
              private _nav: Router) { }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log('Back button pressed');
  //   if (window.location.pathname === '/home') {
  //     window.location.reload();
  //   }
  // }
  go() {
    window.location.href = '/home';
  }
  ngOnInit() {



    // console.log('fdsfsdfdsgj' + sessionStorage.getItem('UserID'));
    if (sessionStorage.getItem('UserID') !== null) {
      this.obj.GetUSerdetailsByUserId(sessionStorage.getItem('UserID')).subscribe(resSlidersData => {
        this.GetUSerDOne = resSlidersData;
         this.ValueRec = true;

      //  console.log('saqib hanif');
        console.log(  this.GetUSerDOne);
      });

     }

    this.CartedProduct = JSON.parse(sessionStorage.getItem('Cartdata'));

    if (this.CartedProduct) {

      this.ItemInCart = this.CartedProduct['products'].length;

    } else {
      this.ItemInCart = 0;

    }




  }

  ValueReset() {

    this.ValueRec = false;
    this.obj.loged_out();
    this._nav.navigate(['/login']);
  }


}
