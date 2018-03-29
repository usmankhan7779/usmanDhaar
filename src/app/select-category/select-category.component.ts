import { Component, OnInit } from '@angular/core';
import { AdService } from '../post-ad/ad.services';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  GetallCat: any = [];
  user = false;
  seller = true;
  ServrUrl: string = 'assets/images/';
  constructor(
    private PostAdd: AdService,
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('StoreName'));
    console.log(localStorage.getItem('UserID'));

    if(localStorage.getItem('StoreName')) {
      this.user = true;
    } else if (localStorage.getItem('UserID') && localStorage.getItem('StoreName') === null){
      this.seller = false;
    } else {
      this.user=false;
    }

    this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);

  }

}
