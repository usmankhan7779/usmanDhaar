import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AdService } from './ad.services';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  _nav: any;

  private sub: any;
  model: any = {};

  subcatNsubScat: any = [];
  GetAllSubSubCat: any = [];
  PictureData: any = [];
  DateTime: string;
  public GetAllSubCat: any = [];
  name: any;
  page: number;
  CatId: string;
  User_ID: string;
  CatName: string;
  SubCat_ID: string;
  uploadFile: any;
  Buyitnow = false;
  CatNumber: number;
  ReservePrice = false;
  ReversePrice = false;
  private base64textString= '';
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  Addbestoffer = false;
  Auction = true;
  file: any;
  files: FileList;
  constructor(
    private route: ActivatedRoute,
    private PostAdd: AdService,


    private router: Router) {}

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.CatName = params['CatName'] || '0' ;
        this.CatId  = params['CatId'] || '0';
        this.User_ID  = sessionStorage.getItem('UserID');


      });
      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      }



    this.PostAdd.GetAllSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => this.GetAllSubCat = resSlidersData);
      console.log(this.GetAllSubCat);

    this.PostAdd.GetAllSubSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => this.GetAllSubSubCat = resSlidersData);
  }
  EnableAuction() {

    if ( this.Auction === false ) {
     // console.log('ture');
      this.Auction = true;
    }

  }

  EnableFixd() {

    if ( this.Auction === true ) {
      // console.log('ture');
      this.Auction = false;
    }

  }

  BuyitnowFun() {

    if ( this.Buyitnow === true ) {
      //console.log('ture')
      this.Buyitnow = false;
    } else {
     // console.log('false')
      this.Buyitnow = true;
    }
  }

  AddbestofferFun() {
    if ( this.Addbestoffer === true ) {
          this.Addbestoffer = false;
    } else {
      this.Addbestoffer = true;
    }
  }



  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }

  // BuyitnowFun() {
  //
  //    if ( this.Buyitnow is equal(false) ){
  //      this.Buyitnow = true;
  //    }
  //    else {
  //      this.Buyitnow = false;
  //    }
  //
  // }



  save( cateogry: any, condition: string) {
    // alert('first')
    const utcDate = new Date(new Date().getTime());
    const dateformat = utcDate.toString().split(' ');
    const timeNOw = dateformat[4].split(':');
    const Monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthind = Monthlist.indexOf(dateformat[1]) ;
    const  monthindex = monthind + 1;
    console.log('month' + monthindex);
    this.DateTime = monthindex  + dateformat[2] + dateformat[3] + timeNOw[0] + timeNOw[1] + timeNOw[2];
    console.log('month' + this.DateTime );
    const subcat = this.model.subcat.split('!');

    this.CatNumber = + this.CatId;

    if ( this.CatNumber < 10) {

      this.CatId = '0' + this.CatId;
    }

    const Product_ID = this.CatId + subcat[1] + subcat[3] + this.DateTime;
    // console.log('var132:' + Product_ID );
    //   alert('before');
    //   alert(this.CatName);
    if ( this.Auction === true ) {
           // alert('dasdasd');
      this.model.FixedPrice = 0;
      this.model.AddBestOffer = 0;
      this.model.Quantity = 0;
      if (this.model.ReservePrice == null) {
        this.model.ReservePrice = 0;
      }
      if (this.model.Buyitnow == null) {
        this.model.Buyitnow = 0;
      }

      if (this.CatName === 'Phones & Tablets') {
      //  console.log('Phones & Tablets')
        this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Women\'s Fashion') {
       // console.log('Women\'s Fashion')
        this.PostAdd.Add_WomenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Men\'s Fashion') {
        this.PostAdd.Add_MenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'TV, Audio & Video') {
       // console.log('TV, Audio & Video')
        this.PostAdd.Add_TVAudioVideo_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Computing & Laptops') {
        this.PostAdd.Add_ComputingLaptops_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Home Appliances') {
        this.PostAdd.Add_HomeAppliances_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      }
    } else {


      this.model.Starting_Price = 0;
      this.model.Buyitnow = 0;
      this.model.ReservePrice = 0;
      this.model.AuctionListing = 0;

      if (this.model.AddBestOffer == null) {
        this.model.AddBestOffer = 0;
      }
      // console.log('catName:'+ this.CatName);
      if (this.CatName === 'Phones & Tablets') {
        //console.log('Phones & Tablets');
        this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Women\'s Fashion') {
        //console.log('Women\'s Fashion')
        this.PostAdd.Add_WomenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Men\'s Fashion') {
        this.PostAdd.Add_MenFashion_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'TV, Audio & Video') {
       // console.log('TV, Audio & Video')
        this.PostAdd.Add_TVAudioVideo_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Computing & Laptops') {
        this.PostAdd.Add_ComputingLaptops_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      } else if (this.CatName === 'Home Appliances') {
        // alert('Home');
        this.PostAdd.Add_HomeAppliances_Product(Product_ID, this.User_ID, this.base64textString, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer, this.model.Quantity).subscribe();
      }


    }


   // console.log(day);

  //  this.PostAdd.Fixed_Product(this.base64textString, cateogry, this.model.Title, this.model.P_Des, condition, this.CatName, '', cateogry, this.model.Price, day, P_auction).subscribe();

  }


  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);





  }

  onChange(event: EventTarget) {

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
     this.files = target.files;
    this.file = this.files[0];
    console.log(this.files);

    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file);
 }






}


