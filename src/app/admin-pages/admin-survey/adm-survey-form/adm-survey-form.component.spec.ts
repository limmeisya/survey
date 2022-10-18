import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdmSurveyFormComponent } from './adm-survey-form.component';

describe('AdmSurveyFormComponent', () => {
  let component: AdmSurveyFormComponent;
  let fixture: ComponentFixture<AdmSurveyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyFormComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],

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
