import { TestBed } from '@angular/core/testing';

import { CanActivateEmailGuard } from './can-activate-email.guard';

describe('CanActivateEmailGuard', () => {
  let guard: CanActivateEmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateEmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
