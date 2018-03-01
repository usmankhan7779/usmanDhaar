import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CategoryDetailComponent} from '../category-detail/category-detail.component';
import {SingleProductComponent} from '../single-product/single-product.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import {ImageZoomModule} from 'angular2-image-zoom';
import {HeaderComponent} from '../header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderModule} from '../header/header.module';
import {PreloaderFullModule} from '../components/preloader-full/preloader-full.module';
const loginRoutes: Routes = [
  { path: 'hahah', component: HeaderComponent }
];


@NgModule({
  declarations: [
    CategoryDetailComponent,
    SingleProductComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    ImageZoomModule,
    HeaderModule,
    PreloaderFullModule,
    // HomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [CategoryDetailComponent,
  SingleProductComponent]
})

export class NewModule {

}
