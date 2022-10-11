import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { Banks, City, CustomerData, CustomerSurveyData, District, ProfilingData, Province, RelativesData, SpouseData, Ward } from './customer-survey.model';

@Injectable({
  providedIn: 'root'
})
export class CostumerSurveyService {

  constructor(private readonly http: HttpClient) { }

  public getBanks(): Observable<Banks[]>{
    return this.http.get<Banks[]>('/bank/banks')
  }

  public getCustomerDataById(id: string): Observable<ApiResponse<CustomerData>>{
    return this.http.get<ApiResponse<CustomerData>>('/bank/customers/' + id)
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

  public postFirstSurvey(data: CustomerSurveyData): Observable<ApiResponse<CustomerSurveyData>>{
    return this.http.post<ApiResponse<CustomerSurveyData>>('/post/api/survey-data/', data)
  }

  public postSecondSurvey(data: SpouseData): Observable<ApiResponse<SpouseData>>{
    return this.http.post<ApiResponse<SpouseData>>('/post/api/spouse/', data)
  }

  public postThirdSurvey(data: RelativesData): Observable<ApiResponse<RelativesData>>{
    return this.http.post<ApiResponse<RelativesData>>('/post/api/relatives/', data)
  }

  public postForthSurvey(data: ProfilingData): Observable<ApiResponse<ProfilingData>>{
    return this.http.post<ApiResponse<ProfilingData>>('/post/api/profile/', data)
  }

}
