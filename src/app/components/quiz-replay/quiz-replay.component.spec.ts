import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizReplayComponent } from './quiz-replay.component';

describe('QuizReplayComponent', () => {
  let component: QuizReplayComponent;
  let fixture: ComponentFixture<QuizReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizReplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
