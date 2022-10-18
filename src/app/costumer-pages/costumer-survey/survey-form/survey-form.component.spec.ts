import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { SurveyFormComponent } from './survey-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { from, of } from 'rxjs';
import { CostumerSurveyService } from '../costumer-survey.service';
import { Router } from '@angular/router';

describe('SurveyFormComponent', () => {
  let component: SurveyFormComponent;
  let fixture: ComponentFixture<SurveyFormComponent>;
  let costumerService: jasmine.SpyObj<CostumerSurveyService>
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
  let location : Location
  let router : Router

  beforeEach(async () => {
    let costumerServiceSpy = jasmine.createSpyObj('CostumerSurveyService', ['getProvice', 'getCity', 'getDistrict', 'getWard'])
    // costumerService.getProvicies=[]
    await TestBed.configureTestingModule({
      declarations: [ SurveyFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: CostumerSurveyService, useValue: costumerServiceSpy},
      // {provide: Router, useValue: routerSpy, useClass: RouterStub}
    ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    costumerService = TestBed.inject(CostumerSurveyService) as jasmine.SpyObj<CostumerSurveyService>
  });

  class RouterStub{
    navigateByUrl(url: string){
      return url
    }
  }

// describe('back', ()=>{
//   const de = fixture.debugElement.query(By.css('button[type=button]'))
//   const el = de.nativeElement

//   it('should navigate to cust-survey-list',()=>{
//     const router = TestBed.get(Router)
//     const spy = spyOn(router, 'navigateByUrl')
//     el.click()
//     const navArgs = spy.calls.first().args[0]
//     const nik = '1234'
//     expect(navArgs).toBe(`/cust-survey-list/${nik}`)
//   })
//   })

  it('should tell Router to navigate when button cancel is clicked', ()=>{
    let router = fixture.debugElement.injector.get(Router)
    let buttonElements = fixture.debugElement.query(By.css('button[type=button]'))
    buttonElements.triggerEventHandler('click', null)
    tick()
    const spy = router.navigateByUrl as jasmine.Spy
    const navArgs = spy.calls.first().args[0]
    const nik = '1234'
    expect(navArgs).withContext('should navigate to cust survey list').toBe(`/cust-survey-list/${nik}`)
  })

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
    let respProvince = {id: 123, name: 'dummy'}
    let respCity = {id: '123', province_id: '123', name: 'dummy'}
    let respDistrict = {id: '123', regency_id: '123', name: 'dummy'}
    let respWard = {id: '123', district_id: '123', name: 'dummy'}


    spyOn(costumerService, 'getProvice').and.returnValue(of(respProvince))
    component.loadAddressesApi.call(respProvince)
    spyOn(costumerService, 'getCity').and.returnValue(of(respCity))
    component.loadAddressesApi.call(respCity)

    spyOn(costumerService, 'getDistrict').and.returnValue(of(respDistrict))
    spyOn(costumerService, 'getWard').and.returnValue(of(respWard))

    component.loadAddressesApi()
  })

  it('should load Provincies',()=>{

    let respProvince = [{id: 123, name: 'dummy'}]

    spyOn(costumerService, 'getProvicies').and.returnValue(of(respProvince))
    component.dataProvincies.values()
    component.loadProvinces()
    expect(costumerService.getProvicies.calls.count()).toBe(1)

  })

  it('should load Cities',()=>{
    let respCities = [{id: '123', province_id: '123', name: 'dummy'}]
    let provId = '123'
    spyOn(costumerService, 'getCities').and.returnValue(of(respCities))
    component.dataCities.values()
    component.loadCity(provId)
    expect(costumerService.getProvicies.calls.count()).toBe(1)

  })

});
