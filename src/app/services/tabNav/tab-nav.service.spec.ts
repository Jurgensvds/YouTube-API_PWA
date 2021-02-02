import { TestBed } from '@angular/core/testing';

import { TabNavService } from './tab-nav.service';

describe('TabNavService', () => {
  let service: TabNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
