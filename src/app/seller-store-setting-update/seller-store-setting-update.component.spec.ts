import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerStoreSettingUpdateComponent } from './seller-store-setting-update.component';

describe('SellerStoreSettingUpdateComponent', () => {
  let component: SellerStoreSettingUpdateComponent;
  let fixture: ComponentFixture<SellerStoreSettingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerStoreSettingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerStoreSettingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
