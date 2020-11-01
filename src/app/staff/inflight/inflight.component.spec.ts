import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflightComponent } from './inflight.component';

describe('InflightComponent', () => {
  let component: InflightComponent;
  let fixture: ComponentFixture<InflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
