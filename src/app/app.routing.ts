import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
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
import { StoreRegistrationComponent } from './store-registration/store-registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { MyBiddsComponent } from './my-bidds/my-bidds.component';
import { Checkout2Component } from './checkout2/checkout2.component';

import { MyBidsBuyerComponent } from './my-bids-buyer/my-bids-buyer.component';
const appRoutes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'select-category',
    component: SelectCategoryComponent
  },
  {
    path: 'single-product',
    component: SingleProductComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout2',
    component: Checkout2Component
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'post-ad',
    component: PostAdComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'ad-listing',
    component: AdListingComponent
  },
  {
    path: 'ad-detail',
    component: AdDetailComponent
  },
  {
    path: 'active-ad',
    component: ActiveAdComponent
  },
  {
    path: 'pending-ad',
    component: PendingAdComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'category-detail',
    component: CategoryDetailComponent
  },
  {
    path: 'user-detail',
    component: UserDetailComponent
  },
  {
    path: 'store-registration',
    component: StoreRegistrationComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  }, {
    path: 'buyer-dashboard',
    component: BuyerDashboardComponent
  }, {
    path: 'my-bids',
    component: MyBiddsComponent
  }, {
    path: 'my-bids-buyer',
    component: MyBidsBuyerComponent
  }




];

export const AppRoutingProvider: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
