import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {Routing , AppRoutingProvider} from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginService } from './log-in/log-in.services';
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
    CategoryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    AppRoutingProvider,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
