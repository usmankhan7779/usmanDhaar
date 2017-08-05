import { Component, OnInit } from '@angular/core';
// import './single-product.js';
import { Router, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],

})
export class SingleProductComponent implements OnInit {
  private sub: any;
  model: any = {};
  ProID: string;
  PicServrUrl = 'http://localhost:8000/media';
  Getphoto: any = [];
  NewBidInserted = false ;
  AuctionTest = true;
  AuctionProductPrice: number;
  resultProduct: any = [];
  GeProductBiding: any = [];
  ProductPrice: any = [];
  CatName: string;
  constructor( private route: ActivatedRoute,
               private GetAdd: HomeService,
               private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.CatName = params['CatName'] || '0' ;
        this.ProID  = params['ProID'] || '0';

      });
    this.GetAdd.GetphotoById().subscribe(resSlidersData => {
      this.Getphoto = resSlidersData;
    });

    if (this.CatName === '0') {
      this.router.navigate(['/login']);
    } else {
      if (this.CatName === 'Phones & Tablets') {
        console.log('Phones & Tablets');

        this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Women\'s Fashion') {
        // console.log('Women\'s Fashion')
        this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Men\'s Fashion') {
        this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'TV, Audio & Video') {
        // console.log('TV, Audio & Video')
        this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Computing & Laptops') {
        this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      } else if (this.CatName === 'Home Appliances') {
        this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
      }
    }
  }

  InsertBid(startingPrice: number ) {
    this.GetAdd.InsertUserBid('1', this.ProID, this.model.UserPriceBid).subscribe(resSlidersData => {
      this.GeProductBiding = resSlidersData
      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      } else {
        if (this.CatName === 'Phones & Tablets') {
          console.log('Phones & Tablets');

          this.GetAdd.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Women\'s Fashion') {
          // console.log('Women\'s Fashion')
          this.GetAdd.getWomenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Men\'s Fashion') {
          this.GetAdd.getMenFashionProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'TV, Audio & Video') {
          // console.log('TV, Audio & Video')
          this.GetAdd.geTVAudioVideoProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Computing & Laptops') {
          this.GetAdd.getComputingLaptopsProductById(this.ProID).subscribe(resSlidersData1 => this.resultProduct = resSlidersData1);
        } else if (this.CatName === 'Home Appliances') {
          this.GetAdd.getHomeAppliancesProductById(this.ProID).subscribe(resSlidersData => this.resultProduct = resSlidersData);
        }
      }

    });
     console.log(this.GeProductBiding);
    // this.someMethod(true, this.ProID, startingPrice );
    console.log('BIdding');
    this.NewBidInserted = true;
    //UPdate QUery
    console.log('Checking if else');



  }



}
