import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersDetailsComponent } from './passengers-details.component';

describe('PassengersDetailsComponent', () => {
  let component: PassengersDetailsComponent;
  let fixture: ComponentFixture<PassengersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
