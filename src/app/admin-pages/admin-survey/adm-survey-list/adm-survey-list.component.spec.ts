import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdmSurveyListComponent } from './adm-survey-list.component';

describe('AdmSurveyListComponent', () => {
  let component: AdmSurveyListComponent;
  let fixture: ComponentFixture<AdmSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
