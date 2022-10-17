import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { SurveyFormComponent } from './survey-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CostumerSurveyService } from '../costumer-survey.service';

describe('SurveyFormComponent', () => {
  let component: SurveyFormComponent;
  let fixture: ComponentFixture<SurveyFormComponent>;
  let costumerSurvey: jasmine.SpyObj<CostumerSurveyService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: CostumerSurveyService, useValue: costumerSurvey}]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call onClick submit method',()=>{
    spyOn(component, 'submit')
    let submitButton: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'))
    fixture.detectChanges()
    submitButton.triggerEventHandler('click',null)
    fixture.detectChanges()
    expect(component.submit).toHaveBeenCalledTimes(1)
  })

  it('should load the Address API',()=>{
    
  })
});
