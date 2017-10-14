import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute,
              private _nav: Router,
              private obj: ActiveAdServices,
              ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'] || '0';

    if ( this.uid === '0' )  {
      this._nav.navigate(['/home']);
    } else {

      this.obj.GetOfferStatus( this.uid, localStorage.getItem('UserID')).subscribe(
        data => {
          this.ProductOffer = data;
          console.log(this.ProductOffer);
        });

    }
    });






  }

}
