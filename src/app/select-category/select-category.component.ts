import { Component, OnInit } from '@angular/core';
import { AdService } from '../post-ad/ad.services';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  GetallCat: any = [];
  ServrUrl: string = 'assets/assets2/images/category/';
  constructor(
    private PostAdd: AdService,
  ) { }

  ngOnInit() {

    this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);

  }

}
