import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCheckinComponent } from './passenger-checkin.component';

describe('PassengerCheckinComponent', () => {
  let component: PassengerCheckinComponent;
  let fixture: ComponentFixture<PassengerCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
