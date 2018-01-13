<<<<<<< HEAD
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveAdServices } from '../active-ad/active-ad.services';


@Component({
  selector: 'app-accept-offer',
  templateUrl: './accept-offer.component.html',
  styleUrls: ['./accept-offer.component.css']
})
export class AcceptOfferComponent implements OnInit {
  sub;
  uid;
  ProductOffer: any = [];
<<<<<<< HEAD
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
=======
  constructor(private route: ActivatedRoute,
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
              private _nav: Router,
              private obj: ActiveAdServices,
              ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'] || '0';

    if ( this.uid === '0' )  {
      this._nav.navigate(['/home']);
    } else {

<<<<<<< HEAD
      if (isPlatformBrowser(this.platformId)) {

=======
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
      this.obj.GetOfferStatus( this.uid, localStorage.getItem('UserID')).subscribe(
        data => {
          this.ProductOffer = data;
          console.log(this.ProductOffer);
        });
<<<<<<< HEAD
      }
=======

>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
    }
    });






  }

}
