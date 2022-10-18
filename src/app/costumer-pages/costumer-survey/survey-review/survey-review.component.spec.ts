import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { css } from 'jquery';

import { SurveyReviewComponent } from './survey-review.component';

describe('SurveyReviewComponent', () => {
  let component: SurveyReviewComponent;
  let fixture: ComponentFixture<SurveyReviewComponent>;
  let h6 : HTMLElement
  let deb : DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyReviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h6 = fixture.debugElement.nativeElement.querySelector('h6')
    deb = fixture.debugElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
// =====================HTML================================
  // it('should match H6 text', fakeAsync(()=>{
  //   fixture.detectChanges()
  //   expect(h6.textContent).toContain('Customer Identity')
  // }))


  // it('should set NIK some default value',()=>{
  //   component.nik = 'dummy'
  //   expect(component.nik).toContain('dummy')
  // })

  // it('should click edit and run the function of edit()', ()=>{
  //   const btn = deb.query(By.css('button[type=submit]'))
  //   btn.triggerEventHandler('click',{})
  //   fixture.detectChanges()

  //   expect(component.edit).toEqual
  // })

  // it('should call the right function of button back', ()=>{
  //   spyOn(component, 'back')
  //   let btn = deb.nativeElement.query(By.css('input[type=submit]'))
  //   btn.click()
  //   tick()
  //   expect(component.back).toHaveBeenCalled()
  // })


});
