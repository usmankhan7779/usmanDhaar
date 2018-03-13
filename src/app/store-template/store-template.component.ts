import { Component, OnInit } from '@angular/core';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-store-template',
  templateUrl: './store-template.component.html',
  styleUrls: ['./store-template.component.css']
})
export class StoreTemplateComponent implements OnInit {
  sub: any;
  r: any;
  Trend: any = [];
  pageno: any;
  StoreName: any;
  StoreInfo: any = [];
  StoreInfoo: any = [];
  constructor(private route: ActivatedRoute,
              private Getstoreinfo: ActiveAdServices,
              private _nav: Router
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
        this.StoreName = params['storename']; // (+) converts string 'id' to a number
        //  //alert"call")

        this.Getstoreinfo.GetStoreInformation(this.StoreName).subscribe(
          data => {
            this.StoreInfo = data;
            console.log('Store info', this.StoreInfo);
            this.StoreInfoo = this.StoreInfo[0];
            if ( this.StoreInfo.length === 0) {
              this._nav.navigate(['/404']);
            } else {

              this.Getstoreinfo.getAll_ProductBYStoreName(1, this.StoreName).subscribe(
                data1 => {
                  this.Trend = data1;
                console.log('Start');
                console.log(this.Trend.results);
                });

            }
          });

    });


  }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    // alert(this.pageno);
    this.Getstoreinfo.getAll_ProductBYStoreName(this.pageno, this.StoreName).subscribe(
      data => {
        this.Trend = data;
      });
  }

}
