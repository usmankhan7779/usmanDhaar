import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.services';
import {LayoutComponent} from "./layout/layout.component";

const appRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      { path: '', loadChildren: './home/home.module#HomeModule'},
      { path: 'home', loadChildren: './home/home.module#HomeModule'},
      { path: 'login', loadChildren: './log-in/log-in.module#LoginModule'},
      { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'},
      { path: 'select-category', loadChildren: './select-category/select-category.module#SelectCategoryModule'},
      { path: 'single-product', loadChildren: './single-product/single-product.module#SingleProductModule'},
      { path: 'checkout2', loadChildren: './checkout2/checkout2.module#Checkout2Module'},
      { path: 'forget-password', loadChildren: './forget-password/forget-password.module#ForgetPasswordModule'},
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule'},
      { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule'},
      { path: 'post-ad', loadChildren: './post-ad/post-ad.module#PostAdModule', canActivate:[AuthGuard]},
      { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsModule'},
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
      { path: 'active-ad', loadChildren: './active-ad/active-ad.module#ActiveAdModule', canActivate: [AuthGuard]},
      { path: 'pending-ad', loadChildren: './pending-ad/pending-ad.module#PendingAdModule', canActivate: [AuthGuard]},
      { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsModule'},
      { path: 'category-detail', loadChildren: './category-detail/category-detail.module#CategoryDetailModule'},
      { path: 'user-detail', loadChildren: './user-detail/user-detail.module#UserDetailModule', canActivate: [AuthGuard]},
      { path: 'seller-user-detail', loadChildren: './seller-user-detail/seller-user-detail.module#SellerUserDetailModule', canActivate: [AuthGuard]},
      { path: 'store-registration', loadChildren: './store-registration/store-registration.module#StoreRegistrationModule', canActivate: [AuthGuard]},
      { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'},
      { path: 'buyer-dashboard', loadChildren: './buyer-dashboard/buyer-dashboard.module#BuyerDashboardModule', canActivate: [AuthGuard]},
      { path: 'my-bids', loadChildren: './my-bids/my-bids.module#MyBidsModule', canActivate: [AuthGuard]},
      { path: 'my-bids-buyer', loadChildren: './my-bids-buyer/my-bids-buyer.module#MyBidsBuyerModule', canActivate: [AuthGuard]},
      { path: 'buyer-orders', loadChildren: './buyer-order/buyer-order.module#BuyerOrderModule', canActivate: [AuthGuard]},
      { path: 'buyer-invoice', loadChildren: './buyer-invoice/buyer-invoice.module#BuyerInvoiceModule', canActivate: [AuthGuard]},
      { path: 'seller-purchasing', loadChildren: './seller-purchasing/seller-purchasing.module#SellerPurchasingModule', canActivate: [AuthGuard]},
      { path: 'seller-purchasing-invoice', loadChildren: './seller-purchasing-invoice/seller-purchasing-invoice.module#SellerPurchasingInvoiceModule', canActivate: [AuthGuard]},
      { path: 'store/:storename', loadChildren: './store-template/store-template.module#StoreTemplateModule'},
      { path: 'sub-category-detail/:CatName/:SubCat', loadChildren: './sub-category-detail/sub-category-detail.module#SubCategoryDetailModule'},
      { path: 'subsub-category-detail/:CatName/:SubsubCat', loadChildren: './subsub-category-detail/subsub-category-detail.module#SubsubCategoryDetailModule'},
      { path: 'account-setting', loadChildren: './buyer-setting/buyer-setting.module#BuyerSettingModule', canActivate: [AuthGuard]},
      { path: 'seller-setting', loadChildren: './seller-setting/seller-setting.module#SellerSettingModule', canActivate: [AuthGuard]},
      { path: 'manage-coupons', loadChildren: './manage-coupons/manage-coupons.module#ManageCouponsModule', canActivate: [AuthGuard]},
      { path: 'reset/:uid/:token', loadChildren: './reset-password/reset-password.module#ResetPasswordModule',},
      { path: 'VerfiyEmail', loadChildren: './verify-email/verify-email.module#VerfiyEmailModule',},
      { path: 'watch-Product', loadChildren: './watch-product/watch-product.module#WatchProductModule',},
      { path: 'buyer-offer', loadChildren: './buyer-offer/buyer-offer.module#BuyerOfferModule', canActivate: [AuthGuard]},
      { path: 'seller-offer', loadChildren: './seller-offer/seller-offer.module#SellerOfferModule', canActivate: [AuthGuard]},
      { path: 'privacy-policy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'},
    ]
  },
];

export const AppRoutingProvider: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
