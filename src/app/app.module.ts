import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePipe   } from '@angular/common';
import {Routing , AppRoutingProvider} from './app.routing';
import { SocialLoginModule } from 'angular4-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('886122871552158')
  }
]);
export function provideConfig() {
  return config;
}
import { AppComponent } from './app.component';
import { TimePipe } from './home/test';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './log-in/log-in.services';
import { HomeService } from './home/home.services';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AdService } from './post-ad/ad.services';
import { CategoryServices } from './category-detail/category-detail.services';
import { ActiveAdServices } from './active-ad/active-ad.services';
import { BuyerDashboardServices } from './buyer-dashboard/buyer-dashboard.services';
import { TextMaskModule } from 'angular2-text-mask';
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
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {ImageZoomModule} from 'angular2-image-zoom';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LayoutComponent } from './layout/layout.component';
import { OwlModule} from "ngx-owl-carousel";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    // PreloaderFull,
    PreloaderSmall,
    TimePipe,
    LayoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo-v5'}),
    HttpClientModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    Ng2PaginationModule,
    FormsModule,
    // HeaderModule,
    HttpModule,
    ImageZoomModule,
    Ng2AutoCompleteModule,
    TextMaskModule,
    SocialLoginModule,
    OwlModule,
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
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, PreloaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
