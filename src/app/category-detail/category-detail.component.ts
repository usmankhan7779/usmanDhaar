import { Component, OnInit } from '@angular/core';
import { CategoryServices } from './category-detail.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
   r: any;
  pageno: any;
  sub: any;
  PicServrUrl = 'http://localhost:8000/media';
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  CatName: any;


  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private httpService: CategoryServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

      alert(this.pageno);
      this.httpService.getAllPhoneAndTabletProduct(this.pageno).subscribe(
        data => {
          this.Trend = data;
        });


  }
ngOnInit() {

  this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.CatName = params['CatName'] || '0' ;



 // alert(this.CatName);
  if (this.CatName === 'Phones & Tablets') {
    //  console.log('Phones & Tablets')
    this.httpService.getAllPhoneAndTabletProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else if (this.CatName === 'Women\'s Fashion') {
    // console.log('Women\'s Fashion')
    this.httpService.getAllWomenFashionProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else if (this.CatName === 'Men\'s Fashion') {
    this.httpService.getAllMenFashionProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else if (this.CatName === 'TV, Audio & Video') {
    // console.log('TV, Audio & Video')
    this.httpService.getAllTVAudioVideoProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else if (this.CatName === 'Computing & Laptops') {
    this.httpService.getAllComputingLaptopsProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else if (this.CatName === 'Home Appliances') {
    this.httpService.getAllHomeAppliancesProduct(1).subscribe(
      data => {
        this.Trend = data;
      });
  } else {

    this._nav.navigate(['/404']);
  }

    });
  if (this.CatName === '0') {
    this._nav.navigate(['/404']);
  }





  this.httpService.GetphotoById().subscribe(resSlidersData => {
    this.GetPhotos = resSlidersData;

  });

}

}
