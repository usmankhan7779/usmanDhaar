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
import { BuyerOrderComponent } from './buyer-order/buyer-order.component';
import { BuyerInvoiceComponent } from './buyer-invoice/buyer-invoice.component';
import { MyBidsBuyerComponent } from './my-bids-buyer/my-bids-buyer.component';
import { SellerPurchasingComponent } from './seller-purchasing/seller-purchasing.component';
import { SellerPurchasingInvoiceComponent } from './seller-purchasing-invoice/seller-purchasing-invoice.component';
import { StoreTemplateComponent } from './store-template/store-template.component';
import { SubCategoryDetailComponent } from './sub-category-detail/sub-category-detail.component';
import { SubsubCategoryDetailComponent } from './subsub-category-detail/subsub-category-detail.component';
import { SellerUserDetailComponent } from './seller-user-detail/seller-user-detail.component';
import { SellerSettingComponent } from './seller-setting/seller-setting.component';
import { BuyerSettingComponent } from './buyer-setting/buyer-setting.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ReserPasswordComponent } from './reser-password/reser-password.component';
import { AuthGuard } from './auth-guard/auth-guard.services';


const appRoutes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
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
    component: PostAdComponent,
    canActivate: [AuthGuard]
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
    component: ActiveAdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pending-ad',
    component: PendingAdComponent,
    canActivate: [AuthGuard]
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
     component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-user-detail',
     component: SellerUserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'store-registration',
    component: StoreRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  }, {
    path: 'buyer-dashboard',
    component: BuyerDashboardComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'my-bids',
    component: MyBiddsComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'my-bids-buyer',
    component: MyBidsBuyerComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'buyer-orders',
    component: BuyerOrderComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'buyer-invoice',
    component: BuyerInvoiceComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'seller-purchasing',
    component: SellerPurchasingComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'seller-purchasing-invoice',
    component: SellerPurchasingInvoiceComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'store/:storename',
    component: StoreTemplateComponent
  }, {
    path: 'sub-category-detail/:CatName/:SubCat',
    component: SubCategoryDetailComponent
  }, {
    path: 'subsub-category-detail/:CatName/:SubsubCat',
    component: SubsubCategoryDetailComponent
  },
  {
    path: 'search-resuls',
    component: SearchResultComponent
  },
  {
    path: 'account-setting',
    component: BuyerSettingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-setting',
    component: SellerSettingComponent,
    canActivate: [AuthGuard]
  },
  {
      path: 'reset/:uid/:token',
      component: ReserPasswordComponent,

    },








];

export const AppRoutingProvider: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
