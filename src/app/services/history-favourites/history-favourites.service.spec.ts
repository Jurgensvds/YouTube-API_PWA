import { TestBed } from '@angular/core/testing';

import { HistoryFavouritesService } from './history-favourites.service';

describe('HistoryFavouritesService', () => {
  let service: HistoryFavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryFavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
