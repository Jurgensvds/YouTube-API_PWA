import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVideoViewerComponent } from './main-video-viewer.component';

describe('MainVideoViewerComponent', () => {
  let component: MainVideoViewerComponent;
  let fixture: ComponentFixture<MainVideoViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainVideoViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainVideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
