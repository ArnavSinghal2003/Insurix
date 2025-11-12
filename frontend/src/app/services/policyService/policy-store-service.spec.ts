import { TestBed } from '@angular/core/testing';

import { PolicyStoreService } from './policy-store-service';

describe('PolicyStoreService', () => {
  let service: PolicyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
