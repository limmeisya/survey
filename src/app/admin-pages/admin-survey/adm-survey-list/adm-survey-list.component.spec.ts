import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSurveyListComponent } from './adm-survey-list.component';

describe('AdmSurveyListComponent', () => {
  let component: AdmSurveyListComponent;
  let fixture: ComponentFixture<AdmSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSurveyListComponent ]
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
