import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SurveyReviewComponent } from './survey-review.component';

describe('SurveyReviewComponent', () => {
  let component: SurveyReviewComponent;
  let fixture: ComponentFixture<SurveyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyReviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
