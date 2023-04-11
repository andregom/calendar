import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointimentDetailsComponent } from './appointiment-details.component';

describe('AppointimentDetailsComponent', () => {
  let component: AppointimentDetailsComponent;
  let fixture: ComponentFixture<AppointimentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointimentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointimentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
