import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesTabComponent } from './favourites-tab.component';

describe('FavouritesTabComponent', () => {
  let component: FavouritesTabComponent;
  let fixture: ComponentFixture<FavouritesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
