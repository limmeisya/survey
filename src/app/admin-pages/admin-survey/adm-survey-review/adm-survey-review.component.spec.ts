import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdmSurveyReviewComponent } from './adm-survey-review.component';

describe('AdmSurveyReviewComponent', () => {
  let component: AdmSurveyReviewComponent;
  let fixture: ComponentFixture<AdmSurveyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyReviewComponent ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],

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
