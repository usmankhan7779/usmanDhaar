import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRegistrationComponent } from './store-registration.component';

describe('StoreRegistrationComponent', () => {
  let component: StoreRegistrationComponent;
  let fixture: ComponentFixture<StoreRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
