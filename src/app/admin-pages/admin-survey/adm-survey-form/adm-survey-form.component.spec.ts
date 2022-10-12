import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSurveyFormComponent } from './adm-survey-form.component';

describe('AdmSurveyFormComponent', () => {
  let component: AdmSurveyFormComponent;
  let fixture: ComponentFixture<AdmSurveyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
