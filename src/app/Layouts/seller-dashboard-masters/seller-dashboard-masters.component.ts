import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seller-dashboard-masters',
  templateUrl: './seller-dashboard-masters.component.html',
  styleUrls: ['./seller-dashboard-masters.component.scss']
})
export class SellerDashboardMastersComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      swal('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
