import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { AllSurveyReview, Banks, City, CustomerData, CustomerSurveyData, District, LoginData, ProfilingData, Province, RelativesData, SpouseData, Ward } from './customer-survey.model';

@Injectable({
  providedIn: 'root'
})
export class CostumerSurveyService {

  constructor(private readonly http: HttpClient) { }

  public getBanks(): Observable<Banks[]>{
    return this.http.get<Banks[]>('/bank/banks')
  }

  public getCustomerDataByNik(nik: string): Observable<ApiResponse<CustomerData>>{
    return this.http.get<ApiResponse<CustomerData>>('/bank/customers/' + nik)
  }

  public getLoginInfo(): Observable<LoginData>{
    return this.http.get<LoginData>('/bank/login')
  }

  public getFirstFormById(id: string): Observable<ApiResponse<CustomerSurveyData>>{
    return this.http.get<ApiResponse<CustomerSurveyData>>('/api/loan-types/' + id)
  }

  public getProvicies(): Observable<Province[]>{
    return this.http.get<Province[]>('/area/api/provinces.json')
  }

  public getCities(provId: any): Observable<City[]>{
    return this.http.get<City[]>(`/area/api/regencies/${provId}.json`)
  }

  public getDistricts(cityId: any): Observable<District[]>{
    return this.http.get<District[]>(`/area/api/districts/${cityId}.json`)
  }

  public getWards(districtId: any): Observable<Ward[]>{
    return this.http.get<Ward[]>(`/area/api/villages/${districtId}.json`)
  }

  public postSurvey(data: AllSurveyReview): Observable<ApiResponse<AllSurveyReview>>{
    return this.http.post<ApiResponse<AllSurveyReview>>('/post/api/survey/', data)
  }

}
