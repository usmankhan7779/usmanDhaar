import { Component, OnInit } from '@angular/core';
import { CategoryServices } from '../category-detail/category-detail.services';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.css']
})
export class SubCategoryDetailComponent implements OnInit {
  r: any;
  pageno: any;
  sub: any;
  PicServrUrl = 'https://sample-175508.appspot.com/media';
  modelNo: any;
  Trend: any = [];
  GetPhotos: any = [];
  CatName: any;
  Subcat: any;
  CoverPix: any;


  constructor( private _nav: Router,
               private route: ActivatedRoute,
               private httpService: CategoryServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


    this.httpService.getAllPhoneAndTabletProduct(this.pageno).subscribe(
      data => {
        this.Trend = data;
      });
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.CatName = params['CatName'];
        this.Subcat = params['SubCat'];
        // alert(this.CatName);
      if (this.CatName === 'Phones & Tablets') {
        this.CoverPix = 'PT';
      } else if (this.CatName === 'Women\'s Fashion') {
        this.CoverPix = 'WF';
      } else if (this.CatName === 'Men\'s Fashion') {
        this.CoverPix = 'MF';
      } else if (this.CatName === 'TV, Audio & Video') {
        this.CoverPix = 'TAV';
      } else if (this.CatName === 'Computing & Laptops') {
        this.CoverPix = 'CL';
      } else if (this.CatName === 'Home Appliances') {
        this.CoverPix = 'HA';
      } else if (this.CatName === 'Online Services') {
        this.CoverPix = 'OS';
      }


        if (this.CatName === 'Phones & Tablets') {
          //  console.log('Phones & Tablets')
          this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
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
        } else if (this.CatName === 'Online Services') {
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
