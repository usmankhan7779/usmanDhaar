import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhaarComponent } from './dhaar.component';

describe('DhaarComponent', () => {
  let component: DhaarComponent;
  let fixture: ComponentFixture<DhaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
