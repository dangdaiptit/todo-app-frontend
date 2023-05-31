import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentOtpComponent } from './sent-otp.component';

describe('SentOtpComponent', () => {
  let component: SentOtpComponent;
  let fixture: ComponentFixture<SentOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
