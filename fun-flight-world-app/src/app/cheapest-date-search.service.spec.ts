import { TestBed } from '@angular/core/testing';

import { CheapestDateSearchService } from './cheapest-date-search.service';

describe('CheapestDateSearchService', () => {
  let service: CheapestDateSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheapestDateSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
