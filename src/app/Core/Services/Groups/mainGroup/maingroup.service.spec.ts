import { TestBed } from '@angular/core/testing';

import { MaingroupService } from './maingroup.service';

describe('MaingroupService', () => {
  let service: MaingroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaingroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
