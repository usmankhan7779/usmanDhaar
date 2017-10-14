import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePipe   } from '@angular/common';
import {Routing , AppRoutingProvider} from './app.routing';
import { RecaptchaModule } from 'ng2-recaptcha';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginService } from './log-in/log-in.services';
import { HomeService } from './home/home.services';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdListingComponent } from './ad-listing/ad-listing.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { ActiveAdComponent } from './active-ad/active-ad.component';
import { PendingAdComponent } from './pending-ad/pending-ad.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdService } from './post-ad/ad.services';
import { StoreRegistrationComponent } from './store-registration/store-registration.component';
import { CategoryServices } from './category-detail/category-detail.services';
import { NotFoundComponent } from './not-found/not-found.component';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { ActiveAdServices } from './active-ad/active-ad.services';
import { BuyerDashboardServices } from './buyer-dashboard/buyer-dashboard.services';
import { MyBiddsComponent } from './my-bidds/my-bidds.component';
import { MyBidsBuyerComponent } from './my-bids-buyer/my-bids-buyer.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { BuyerOrderComponent } from './buyer-order/buyer-order.component';
import { BuyerInvoiceComponent } from './buyer-invoice/buyer-invoice.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CarouselModule } from 'ngx-bootstrap';
import { SellerPurchasingComponent } from './seller-purchasing/seller-purchasing.component';
import { SellerPurchasingInvoiceComponent } from './seller-purchasing-invoice/seller-purchasing-invoice.component';
import { StoreTemplateComponent } from './store-template/store-template.component';
import { SubCategoryDetailComponent } from './sub-category-detail/sub-category-detail.component';
import { SubsubCategoryDetailComponent } from './subsub-category-detail/subsub-category-detail.component';
import { AuthGuard } from './auth-guard/auth-guard.services';
import { XHRBackend, RequestOptions } from '@angular/http';
export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
  return new HttpService(backend, defaultOptions, preloaderService);
}
import { HttpService } from './services/http-service';
import { PreloaderService } from './services/preloader-service';
import { PostService } from './services/post-service';
import { PreloaderFull } from './components/preloader-full/preloader-full';
import { PreloaderSmall } from './components/preloader-small/preloader-small';
import { SellerUserDetailComponent } from './seller-user-detail/seller-user-detail.component';
import { BuyerSettingComponent } from './buyer-setting/buyer-setting.component';
import { SellerSettingComponent } from './seller-setting/seller-setting.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ReserPasswordComponent } from './reser-password/reser-password.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';
import {ImageZoomModule} from 'angular2-image-zoom';
import { ManageCouponsComponent } from './manage-coupons/manage-coupons.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LogInComponent,
    SignUpComponent,
    SelectCategoryComponent,
    SingleProductComponent,
    CheckoutComponent,
    ForgetPasswordComponent,
    PostAdComponent,
    ChangePasswordComponent,
    AdListingComponent,
    AdDetailComponent,
    ActiveAdComponent,
    PendingAdComponent,
    EditProfileComponent,
    ContactUsComponent,
    CategoryDetailComponent,
    UserDetailComponent,
    StoreRegistrationComponent,
    NotFoundComponent,
    BuyerDashboardComponent,
    MyBiddsComponent,
    MyBidsBuyerComponent,
    Checkout2Component,
    BuyerOrderComponent,
    BuyerInvoiceComponent,
    SellerPurchasingComponent,
    SellerPurchasingInvoiceComponent,
    StoreTemplateComponent,
    SubCategoryDetailComponent,
    SubsubCategoryDetailComponent,
    PreloaderFull,
    PreloaderSmall,
    SellerUserDetailComponent,
    BuyerSettingComponent,
    SellerSettingComponent,
    SearchResultComponent,
    ReserPasswordComponent,
    VerfiyEmailComponent,
    ManageCouponsComponent,
    AcceptOfferComponent,

  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    RecaptchaModule.forRoot(),
    Ng2PaginationModule,
    FormsModule,
    HttpModule,
    ImageZoomModule,
    Ng2AutoCompleteModule,
    TextMaskModule,
    Routing
  ],
  providers: [
    AppRoutingProvider,
    ActiveAdServices,
    LoginService,
    AdService,
    AuthGuard,
    HomeService,
    CategoryServices,
    BuyerDashboardServices,
    DatePipe,
    PreloaderService,
    PostService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, PreloaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
