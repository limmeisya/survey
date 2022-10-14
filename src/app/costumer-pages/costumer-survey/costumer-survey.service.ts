import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { AllSurveyReview, Banks, City, CustomerData, CustomerSurveyData, District, LoanType, LoginData, ProfilingData, Province, RelativesData, SpouseData, Ward } from './customer-survey.model';

@Injectable({
  providedIn: 'root'
})
export class CostumerSurveyService {

  constructor(private readonly http: HttpClient) { }

  public getCustomerDataByNik(nik: string): Observable<ApiResponse<CustomerData>>{
    return this.http.get<ApiResponse<CustomerData>>('/bank/customers/' + nik)
  }

//================================BANK=======================================
  public getBanks(): Observable<Banks[]>{
    return this.http.get<Banks[]>('/bank/banks')
  }
//===========================INDONESIA AREA==================================
  public getProvicies(): Observable<Province[]>{
    return this.http.get<Province[]>('/area/api/provinces.json')
  }

  public getProvice(provId: any): Observable<Province>{
    return this.http.get<Province>(`/area/api/province/${provId}.json`)
  }

  public getCities(provId: any): Observable<City[]>{
    return this.http.get<City[]>(`/area/api/regencies/${provId}.json`)
  }

  public getCity(cityId: any): Observable<City>{
    return this.http.get<City>(`/area/api/regency/${cityId}.json`)
  }

  public getDistricts(cityId: any): Observable<District[]>{
    return this.http.get<District[]>(`/area/api/districts/${cityId}.json`)
  }

  public getDistrict(districtId: any): Observable<District>{
    return this.http.get<District>(`/area/api/district/${districtId}.json`)
  }

  public getWards(districtId: any): Observable<Ward[]>{
    return this.http.get<Ward[]>(`/area/api/villages/${districtId}.json`)
  }

  public getWard(wardId: any): Observable<Ward>{
    return this.http.get<Ward>(`/area/api/village/${wardId}.json`)
  }
//=============================SURVEY========================================
  public postSurvey(data: AllSurveyReview): Observable<ApiResponse<AllSurveyReview>>{
    return this.http.post<ApiResponse<AllSurveyReview>>('/post/api/survey/', data)
  }

  public getSurveyById(id: string): Observable<ApiResponse<AllSurveyReview>>{
    return this.http.get<ApiResponse<AllSurveyReview>>('/post/api/survey/' + id)
  }

  public updateSurvey(data:AllSurveyReview):Observable<ApiResponse<AllSurveyReview>>{
    return this.http.put<ApiResponse<AllSurveyReview>>('/post/api/survey/', data);
  }

}
