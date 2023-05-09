import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailUserComponent } from './change-email-user.component';

describe('ChangeEmailUserComponent', () => {
  let component: ChangeEmailUserComponent;
  let fixture: ComponentFixture<ChangeEmailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
