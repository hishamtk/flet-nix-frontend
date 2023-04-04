import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBoardComponent } from './movie-board.component';

describe('MovieBoardComponent', () => {
  let component: MovieBoardComponent;
  let fixture: ComponentFixture<MovieBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
