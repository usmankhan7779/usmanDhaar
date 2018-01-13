"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var log_in_component_1 = require("./log-in/log-in.component");
var sign_up_component_1 = require("./sign-up/sign-up.component");
var select_category_component_1 = require("./select-category/select-category.component");
var single_product_component_1 = require("./single-product/single-product.component");
var checkout_component_1 = require("./checkout/checkout.component");
var forget_password_component_1 = require("./forget-password/forget-password.component");
var post_ad_component_1 = require("./post-ad/post-ad.component");
var change_password_component_1 = require("./change-password/change-password.component");
var ad_listing_component_1 = require("./ad-listing/ad-listing.component");
var ad_detail_component_1 = require("./ad-detail/ad-detail.component");
var active_ad_component_1 = require("./active-ad/active-ad.component");
var pending_ad_component_1 = require("./pending-ad/pending-ad.component");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var contact_us_component_1 = require("./contact-us/contact-us.component");
var category_detail_component_1 = require("./category-detail/category-detail.component");
var user_detail_component_1 = require("./user-detail/user-detail.component");
var store_registration_component_1 = require("./store-registration/store-registration.component");
var appRoutes = [
<<<<<<< HEAD
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: dashboard_component_1.DashboardComponent
  },
  {
    path: 'home',
    component: home_component_1.HomeComponent
  },
  {
    path: 'login',
    component: log_in_component_1.LogInComponent
  },
  {
    path: 'sign-up',
    component: sign_up_component_1.SignUpComponent
  },
  {
    path: 'select-category',
    component: select_category_component_1.SelectCategoryComponent
  },
  {
    path: 'single-product',
    component: single_product_component_1.SingleProductComponent
  },
  {
    path: 'checkout',
    component: checkout_component_1.CheckoutComponent
  },
  {
    path: 'forget-password',
    component: forget_password_component_1.ForgetPasswordComponent
  },
  {
    path: 'post-ad',
    component: post_ad_component_1.PostAdComponent
  },
  {
    path: 'change-password',
    component: change_password_component_1.ChangePasswordComponent
  },
  {
    path: 'ad-listing',
    component: ad_listing_component_1.AdListingComponent
  },
  {
    path: 'ad-detail',
    component: ad_detail_component_1.AdDetailComponent
  },
  {
    path: 'active-ad',
    component: active_ad_component_1.ActiveAdComponent
  },
  {
    path: 'pending-ad',
    component: pending_ad_component_1.PendingAdComponent
  },
  {
    path: 'edit-profile',
    component: edit_profile_component_1.EditProfileComponent
  },
  {
    path: 'contact-us',
    component: contact_us_component_1.ContactUsComponent
  },
  {
    path: 'category-detail',
    component: category_detail_component_1.CategoryDetailComponent
  },
  {
    path: 'user-detail',
    component: user_detail_component_1.UserDetailComponent
  },
  {
    path: 'store-registration',
    component: store_registration_component_1.StoreRegistrationComponent
  }
=======
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'login',
        component: log_in_component_1.LogInComponent
    },
    {
        path: 'sign-up',
        component: sign_up_component_1.SignUpComponent
    },
    {
        path: 'select-category',
        component: select_category_component_1.SelectCategoryComponent
    },
    {
        path: 'single-product',
        component: single_product_component_1.SingleProductComponent
    },
    {
        path: 'checkout',
        component: checkout_component_1.CheckoutComponent
    },
    {
        path: 'forget-password',
        component: forget_password_component_1.ForgetPasswordComponent
    },
    {
        path: 'post-ad',
        component: post_ad_component_1.PostAdComponent
    },
    {
        path: 'change-password',
        component: change_password_component_1.ChangePasswordComponent
    },
    {
        path: 'ad-listing',
        component: ad_listing_component_1.AdListingComponent
    },
    {
        path: 'ad-detail',
        component: ad_detail_component_1.AdDetailComponent
    },
    {
        path: 'active-ad',
        component: active_ad_component_1.ActiveAdComponent
    },
    {
        path: 'pending-ad',
        component: pending_ad_component_1.PendingAdComponent
    },
    {
        path: 'edit-profile',
        component: edit_profile_component_1.EditProfileComponent
    },
    {
        path: 'contact-us',
        component: contact_us_component_1.ContactUsComponent
    },
    {
        path: 'category-detail',
        component: category_detail_component_1.CategoryDetailComponent
    },
    {
        path: 'user-detail',
        component: user_detail_component_1.UserDetailComponent
    },
    {
        path: 'store-registration',
        component: store_registration_component_1.StoreRegistrationComponent
    }
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
];
exports.AppRoutingProvider = [];
exports.Routing = router_1.RouterModule.forRoot(appRoutes);
