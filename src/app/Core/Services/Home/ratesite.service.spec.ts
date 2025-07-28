import { TestBed } from '@angular/core/testing';

import { RatesiteService } from './ratesite.service';

describe('RatesiteService', () => {
  let service: RatesiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
