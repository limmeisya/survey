import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { MockInstance, ngMocks } from 'ng-mocks';
import { SurveyFormComponent } from './survey-form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, ModuleWithComponentFactories } from '@angular/core';
import { By } from '@angular/platform-browser';
import { from, Observable, of, subscribeOn, Subscriber } from 'rxjs';
import { CostumerSurveyService } from '../costumer-survey.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

describe('SurveyFormComponent', () => {
  let component: SurveyFormComponent;
  let fixture: ComponentFixture<SurveyFormComponent>;
  let costumerService: jasmine.SpyObj<CostumerSurveyService>
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
  let location : Location
  let router : Router
  let authService : jasmine.SpyObj<AuthService>
  let respProvince = {id: 123, name: 'dummy'}


  beforeEach(async () => {
    let costumerServiceSpy = jasmine.createSpyObj('CostumerSurveyService', ['getProvicies', 'getCity', 'getDistrict', 'getWard'])
    // let costumerServiceSpy = jasmine.createSpyObj('CostumerSurveyService', ['getProvicies'])
    let authServiceSpy = jasmine.createSpyObj('AuthService', {'getUserFromStorage': {'role' : 'toString'}})
    // costumerService.getProvicies=[]
    await TestBed.configureTestingModule({
      declarations: [ SurveyFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: CostumerSurveyService, useValue: costumerServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
      // {provide: Router, useValue: routerSpy, useClass: RouterStub}
    ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    costumerService = TestBed.inject(CostumerSurveyService) as jasmine.SpyObj<CostumerSurveyService>
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    // costumerServiceSpy.getProvicies.and.returnValue(of(respProvince))
  
    
  });



  class RouterStub{
    navigateByUrl(url: string){
      return url
    }
  }

    // it('reactive form validation - firstFormGroup', ()=>{
    //   let mothersMaidenName = component.firstFormGroup.controls['mothersMaidenName']
    //   expect(mothersMaidenName.valid).toBeFalsy()
    //   expect(mothersMaidenName.errors['required']).toBeTruthy()
    // })

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

  // it('should tell Router to navigate when button cancel is clicked', ()=>{
  //   let router = fixture.debugElement.injector.get(Router)
  //   let buttonElements = fixture.debugElement.query(By.css('button[type=button]'))
  //   buttonElements.triggerEventHandler('click', null)
  //   tick()
  //   const spy = router.navigateByUrl as jasmine.Spy
  //   const navArgs = spy.calls.first().args[0]
  //   const nik = '1234'
  //   expect(navArgs).withContext('should navigate to cust survey list').toBe(`/cust-survey-list/${nik}`)
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should call onClick submit method',()=>{
  //   spyOn(component, 'submit')
  //   let submitButton: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'))
  //   fixture.detectChanges()
  //   submitButton.triggerEventHandler('click',null)
  //   fixture.detectChanges()
  //   expect(component.submit).toHaveBeenCalledTimes(1)
  // })

  // it('should load the Address API',()=>{

  //   let respProvince = {id: 123, name: 'dummy'}
  //   let respCity = {id: '123', province_id: '123', name: 'dummy'}
  //   let respDistrict = {id: '123', regency_id: '123', name: 'dummy'}
  //   let respWard = {id: '123', district_id: '123', name: 'dummy'}


  //   spyOn(costumerService, 'getProvice').and.returnValue(of(respProvince))
  //   fixture.detectChanges()
  //   component.loadAddressesApi.call(respProvince)    
    // spyOn(costumerService, 'getDistrict').and.returnValue(of(respDistrict))
    // spyOn(costumerService, 'getWard').and.returnValue(of(respWard))
    
    // component.loadAddressesApi()
  // })

  it('should load Provincies',()=>{

    let respProvince = [{id: 123, name: 'dummy'}]

    spyOn(costumerService, 'getProvicies').and.returnValue(of(respProvince))
    // spyOn(costumerService, 'getProvicies').and.returnValue({subscribe: (value)=>{
    //   expect(value).toBe(respProvince)
    // }})

    component.dataProvincies.values()
    fixture.detectChanges()
    component.loadProvinces()
    expect(costumerService.getProvicies.calls.count()).toBe(1)

  })

  it('should load Cities',()=>{
    let respCities = [{id: '123', province_id: '123', name: 'dummy'}]
    let provId = '123'
    spyOn(costumerService, 'getCities').and.returnValue(of(respCities))
    component.dataCities.values()
    component.loadCity(provId)
    fixture.detectChanges()

    expect(costumerService.getProvicies.calls.count()).toBe(1)

  })

  describe('1.  FormGroup test scenario', ()=>{
    describe('1.1 FormGroup and FormControl should be initialized',()=>{
      it('should be successfully initialized.',()=>{
        expect(component.firstFormGroup).toBeTruthy()
        expect(component.firstFormGroup.get('surveyDataId')).toBeDefined()
        expect(component.firstFormGroup.get('surveyDataId')).toBeInstanceOf(AbstractControl)
        
        expect(component.firstFormGroup.get('mothersMaidenName')).toBeDefined()
        expect(component.firstFormGroup.get('mothersMaidenName')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('latestEducationalLevel')).toBeDefined()
        expect(component.firstFormGroup.get('latestEducationalLevel')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('dependents')).toBeDefined()
        expect(component.firstFormGroup.get('dependents')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('email')).toBeDefined()
        expect(component.firstFormGroup.get('email')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('bankName')).toBeDefined()
        expect(component.firstFormGroup.get('bankName')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('accountName')).toBeDefined()
        expect(component.firstFormGroup.get('accountName')).toBeInstanceOf(AbstractControl)

        expect(component.firstFormGroup.get('accountNumber')).toBeDefined()
        expect(component.firstFormGroup.get('accountNumber')).toBeInstanceOf(AbstractControl)
      })
    })
    describe('1.2 mothersMaidenName should be validated',()=>{
      let mothersMaidenNameControl : AbstractControl

      beforeEach(()=>{
        mothersMaidenNameControl = component.firstFormGroup.get('mothersMaidenName') as AbstractControl
      })
      describe('1.2.1 Validation required should be working',()=>{
        it('required validator should be truthy if mothersMaidenName value is blank',()=>{
          mothersMaidenNameControl.setValue('')
          fixture.detectChanges()
          
        })
    })

    })
  })


});
