import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { PaginationResponse } from 'src/app/shared/model/PaginationResponse';
import { AllSurveyReview, City, CustomerData, District, Province, Transaction, Ward } from './admin-survey.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSurveyService {

  constructor(private readonly http: HttpClient) { }

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
  public getCustomerDataByNik(nik: string): Observable<ApiResponse<CustomerData>>{
    return this.http.get<ApiResponse<CustomerData>>('/api/api/customer/' + nik)
  }

  public postUpdateSurvey(data: AllSurveyReview): Observable<ApiResponse<AllSurveyReview>>{
    if(data.surveyId) return this.http.put<ApiResponse<AllSurveyReview>>('/api/api/survey/', data)
    else return this.http.post<ApiResponse<AllSurveyReview>>('/api/api/survey/', data);
  }

  public getSurveyByTrxId(trxId: string): Observable<ApiResponse<AllSurveyReview>>{
    return this.http.get<ApiResponse<AllSurveyReview>>('/api/api/survey/id/' + trxId)
  }

  public deleteSurvey(trxId: string): Observable<AllSurveyReview>{
      return this.http.delete<AllSurveyReview>(`/api/api/survey/id/${trxId}`)
  }

//=============================TRANSACTION========================================
  public getAllTransaction(params: any): Observable<ApiResponse<PaginationResponse<Transaction>>>{
    let reqParams: any = {};
    if (params){
      Object.keys(params).map(k => {
        reqParams[k] = params[k];
      })
    }
    return this.http.get<ApiResponse<PaginationResponse<Transaction>>>(`/api/api/transaction`, {params: reqParams});
  }

  public getTransactionByTrxId(trxId: string): Observable<ApiResponse<Transaction>>{
    return this.http.get<ApiResponse<Transaction>>('/api/api/transaction/id/' + trxId)
  }

}
