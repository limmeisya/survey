import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSurveyReviewComponent } from './adm-survey-review.component';

describe('AdmSurveyReviewComponent', () => {
  let component: AdmSurveyReviewComponent;
  let fixture: ComponentFixture<AdmSurveyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmSurveyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
