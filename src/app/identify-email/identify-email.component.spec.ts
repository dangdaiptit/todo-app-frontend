import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyEmailComponent } from './identify-email.component';

describe('IdentifyEmailComponent', () => {
  let component: IdentifyEmailComponent;
  let fixture: ComponentFixture<IdentifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifyEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
