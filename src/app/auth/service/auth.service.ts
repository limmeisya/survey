import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { AuthRequest, LoginResponse, NewSigninResponse, UserResponse } from '../model/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http:HttpClient) { }

  register(auth: AuthRequest): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<UserResponse>>('/api/api/auth/register-customer', auth);
  }

  login(auth: AuthRequest): Observable<AuthRequest> {
    return this.http.post<AuthRequest>('/api/api/auth/login', auth);
  }

  getUserByNik(nik: string): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`/api/api/users/${nik}`);
  }

  getUserFromToken(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>('/api/api/auth/users/me');
  }

  storeUser(data: NewSigninResponse): void {
    if (data) sessionStorage.setItem('user', JSON.stringify(data));
    return;
  }

  getUserFromStorage(): NewSigninResponse | null {
    const user: string = sessionStorage.getItem('user') as string;
    if (user) return JSON.parse(user);
    return null;
  }

  clearStorage(): void {
    let user = this.getUserFromStorage();
    if (!user) return;
    sessionStorage.clear();
  }
}
