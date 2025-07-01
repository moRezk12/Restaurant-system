import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRatingReportsComponent } from './question-rating-reports.component';

describe('QuestionRatingReportsComponent', () => {
  let component: QuestionRatingReportsComponent;
  let fixture: ComponentFixture<QuestionRatingReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionRatingReportsComponent]
    });
    fixture = TestBed.createComponent(QuestionRatingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
