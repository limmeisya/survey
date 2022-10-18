import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { Province, City, District, Ward, AllSurveyReview, CustomerData } from './admin-survey.model';

import { AdminSurveyService } from './admin-survey.service';

describe('AdminSurveyService', () => {
  let service: AdminSurveyService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],

    });
    service = TestBed.inject(AdminSurveyService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

//===========================INDONESIA AREA==================================

it('make GET request of getProvincies return all province data', ()=>{
  const url = '/area/api/provinces.json'
  const expectedProvince : Province[] = [
    {
      id: 1,
      name: 'dummy'
    }
  ]
  
  service.getProvicies().subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedProvince)
  })

  const{request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url : url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getCities return all city data', ()=>{
  const provId = '1'
  const url = `/area/api/regencies/${provId}.json`
  const expectedCities : City[] = [
    {
      id: '1',
      province_id: 'dummy',
      name: 'dummy'
    }
  ]
  
  service.getCities(provId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedCities)
  })

  const{request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url : url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getDistricts return all district data', ()=>{
  const cityId = '1'
  const url = `/area/api/districts/${cityId}.json`
  const expectedDistrict : District[] = [
    {
      id: '1',
      regency_id: 'dummy',
      name: 'dummy'
    }
  ]
  
  service.getDistricts(cityId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedDistrict)
  })

  const{request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url : url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getWards return all ward data', ()=>{
  const districtId = '1'
  const url = `/area/api/villages/${districtId}.json`
  const expectedWard : Ward[] = [
    {
      id: '1',
      district_id: 'dummy',
      name: 'dummy'
    }
  ]
  
  service.getWards(districtId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedWard)
  })

  const{request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url : url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getWard return Ward Data by Id',()=>{
  const wardId = '1'
  const url = `/area/api/village/${wardId}.json`
  const expectedWard : Ward = {id: '1', district_id: '123', name: 'dummy'}
  service.getWard(wardId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedWard)
  })
  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})


it('make GET request of getDistrict returns District Data', ()=>{
  const districtId = '1'
  const url = `/area/api/district/${districtId}.json`
  const expectedDistrict : District = {id: '1', regency_id: '123', name: 'dummy'}
  service.getDistrict(districtId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedDistrict)
  })
  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getCity returns City Data', ()=>{
  const cityId = '1'
  const url = `/area/api/regency/${cityId}.json`
  const expectedCity : City = {id: '1', province_id: '123', name: 'dummy'}
  service.getCity(cityId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedCity)
  })
  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make GET request of getProvice returns Province Data', ()=>{
  const provId = '1'
  const url = `/area/api/province/${provId}.json`
  const expectedProvince : Province = {id: 1, name: 'dummy'}
  service.getProvice(provId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedProvince)
  })
  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})
//=============================SURVEY========================================

it('make GET request of getSurveyByNik return response API response', ()=>{
  const nik = '1'
  const url = `/api/api/customer/${nik}`
  const expectedResponse : ApiResponse<CustomerData> = {message: 'submitted', data: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
  'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}}
  service.getCustomerDataByNik(nik).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedResponse)
  })
  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url)
})

it('make PUT request from AllSurveyReview return response API response', () =>{
  const url = `/api/api/survey/`
  const expectedSurveyReview: AllSurveyReview = {surveyId: '123', 
  transaction: {trxId: '1234', trxDate: new Date(), nominalCredit: 123, trxStatus: 'dummy', customerId: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
                'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}},
  surveyData: {surveyDataId: '1234', mothersMaidenName: 'salala', latestEducationalLevel:'elementary', dependents:3, email:'sakaka@mail.com', bankName: 'Bank', accountName:'syaya', accountNumber:'12345'}, 
  spouse: {spouseId: '1234', spouseNik:'12345', spouseName:'sasasa', spouseBirthdate:'12345', gender:'female', spouseBirthplace:'dummy', spouseMothersMaidenName: 'sasasa'},
  relatives: {relativesId:'1234', relativesName:'sasasa', relativesRelation:'dummy', relativesPhoneNumber:'12345', relativesCellNumber:'12345', relativesAddress:'sasasa', relativesRt:'1', relativesRw:'2', relativesProvince:'sasasa', relativesCity:'sasasa', relativesDistrict:'sasasa', relativesWard:'sasasa'},
  profile: {profileId: true, breadwinner: true, literacyAbility: true, transportationOwner: true, insuranceOwner: true, internetAccess: true}}

  const expectedResponse : ApiResponse<AllSurveyReview> = {message: 'submitted', data: {surveyId: '123', transaction: {trxId: '1234', trxDate: new Date(), nominalCredit: 123, trxStatus: 'dummy', customerId: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
  'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}}, 
  surveyData: {surveyDataId: '1234', mothersMaidenName: 'salala', latestEducationalLevel:'elementary', dependents:3, email:'sakaka@mail.com', bankName: 'Bank', accountName:'syaya', accountNumber:'12345'}, 
  spouse: {spouseId: '1234', spouseNik:'12345', spouseName:'sasasa', spouseBirthdate:'12345', gender:'female', spouseBirthplace:'dummy', spouseMothersMaidenName:'sasasa'},
  relatives: {relativesId:'1234', relativesName:'sasasa', relativesRelation:'dummy', relativesPhoneNumber:'12345', relativesCellNumber:'12345', relativesAddress:'sasasa', relativesRt:'1', relativesRw:'2', relativesProvince:'sasasa', relativesCity:'sasasa', relativesDistrict:'sasasa', relativesWard:'sasasa'},
  profile: {profileId: true, breadwinner: true, literacyAbility: true, transportationOwner: true, insuranceOwner: true, internetAccess: true}}}
  service.postUpdateSurvey(expectedSurveyReview).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedResponse)
  })
  const {request}: TestRequest = httpMock.expectOne(url)
  expect(request.method).toMatch('PUT')
  expect(request.url).toMatch(url)
  expect(request.body).toMatch(`${expectedSurveyReview}`)
})

it('make POST request from AllSurveyReview return response API response', () =>{
  const url = `/api/api/survey/`
  const expectedSurveyReview : AllSurveyReview = {surveyId: '', 
  transaction: {trxId: '1234', trxDate: new Date(), nominalCredit: 123, trxStatus: 'dummy', customerId: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
                'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}},
  surveyData: {surveyDataId: '1234', mothersMaidenName: 'salala', latestEducationalLevel:'elementary', dependents:3, email:'sakaka@mail.com', bankName: 'Bank', accountName:'syaya', accountNumber:'12345'}, 
  spouse: {spouseId: '1234', spouseNik:'12345', spouseName:'sasasa', spouseBirthdate:'12345', gender:'female', spouseBirthplace:'dummy', spouseMothersMaidenName: 'sasasa'},
  relatives: {relativesId:'1234', relativesName:'sasasa', relativesRelation:'dummy', relativesPhoneNumber:'12345', relativesCellNumber:'12345', relativesAddress:'sasasa', relativesRt:'1', relativesRw:'2', relativesProvince:'sasasa', relativesCity:'sasasa', relativesDistrict:'sasasa', relativesWard:'sasasa'},
  profile: {profileId: true, breadwinner: true, literacyAbility: true, transportationOwner: true, insuranceOwner: true, internetAccess: true}}

  const expectedResponse : ApiResponse<AllSurveyReview> = {message: 'submitted', data: {surveyId: '123', transaction: {trxId: '1234', trxDate: new Date(), nominalCredit: 123, trxStatus: 'dummy', customerId: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
  'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}}, 
  surveyData: {surveyDataId: '1234', mothersMaidenName: 'salala', latestEducationalLevel:'elementary', dependents:3, email:'sakaka@mail.com', bankName: 'Bank', accountName:'syaya', accountNumber:'12345'}, 
  spouse: {spouseId: '1234', spouseNik:'12345', spouseName:'sasasa', spouseBirthdate:'12345', gender:'female', spouseBirthplace:'dummy', spouseMothersMaidenName:'sasasa'},
  relatives: {relativesId:'1234', relativesName:'sasasa', relativesRelation:'dummy', relativesPhoneNumber:'12345', relativesCellNumber:'12345', relativesAddress:'sasasa', relativesRt:'1', relativesRw:'2', relativesProvince:'sasasa', relativesCity:'sasasa', relativesDistrict:'sasasa', relativesWard:'sasasa'},
  profile: {profileId: true, breadwinner: true, literacyAbility: true, transportationOwner: true, insuranceOwner: true, internetAccess: true}}}
  service.postUpdateSurvey(expectedSurveyReview).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedResponse)
  })
  const {request}: TestRequest = httpMock.expectOne(url)
  expect(request.method).toMatch('POST')
  expect(request.url).toMatch(url)
  expect(request.body).toMatch(`${expectedSurveyReview}`)
})

it('make GET request of getSurveyByTrxId return response API response with data', ()=>{
  const trxId = '1'
  const url = `/api/api/survey/id/${trxId}`

  const expectedResponse : ApiResponse<AllSurveyReview> = {message: 'submitted', data: {surveyId: '123', transaction: {trxId: '1234', trxDate: new Date(), nominalCredit: 123, trxStatus: 'dummy', customerId: {customerId: '123', nik: '1234', fullName: 'sasasa', birthPlace: 'dummy', birthDate: new Date(), gender: 'female', maritalStatus: 'marriage', religion:'dummy', phoneNumber: '1234', address: 'dummy', rt: '12', rw:'123', ward: 
  'dummy', district: 'dummy', city: 'dummy', province: 'dummy', officeLocation: 'dummy', businessPhoto: 'dummy', postalCode:'dummy', occupationType:'dummy',supportingDocument: []}}, 
  surveyData: {surveyDataId: '1234', mothersMaidenName: 'salala', latestEducationalLevel:'elementary', dependents:3, email:'sakaka@mail.com', bankName: 'Bank', accountName:'syaya', accountNumber:'12345'}, 
  spouse: {spouseId: '1234', spouseNik:'12345', spouseName:'sasasa', spouseBirthdate:'12345', gender:'female', spouseBirthplace:'dummy', spouseMothersMaidenName:'sasasa'},
  relatives: {relativesId:'1234', relativesName:'sasasa', relativesRelation:'dummy', relativesPhoneNumber:'12345', relativesCellNumber:'12345', relativesAddress:'sasasa', relativesRt:'1', relativesRw:'2', relativesProvince:'sasasa', relativesCity:'sasasa', relativesDistrict:'sasasa', relativesWard:'sasasa'},
  profile: {profileId: true, breadwinner: true, literacyAbility: true, transportationOwner: true, insuranceOwner: true, internetAccess: true}}}
 
  service.getSurveyByTrxId(trxId).subscribe((actualResponse)=>{
    expect(actualResponse).toEqual(expectedResponse)
  })

  const {request}: TestRequest = httpMock.expectOne({
    method: 'GET',
    url: url
  })
  expect(request.method).toMatch('GET')
  expect(request.url).toMatch(url) 
})
});
