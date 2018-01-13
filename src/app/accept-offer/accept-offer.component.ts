import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private _nav: Router,
              private obj: ActiveAdServices,
              ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'] || '0';

    if ( this.uid === '0' )  {
      this._nav.navigate(['/home']);
    } else {

      if (isPlatformBrowser(this.platformId)) {

      this.obj.GetOfferStatus( this.uid, localStorage.getItem('UserID')).subscribe(
        data => {
          this.ProductOffer = data;
          console.log(this.ProductOffer);
        });
      }
    }
    });






  }

}
