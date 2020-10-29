import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private APIKey$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  login(loginData: {email: string, password: string}): void {
    this.http.post(`${environment.backendUrl}/login`, loginData)
    .subscribe(
      (response: {status: string, api_key: string}) => {
        localStorage.setItem('remember_token', response.api_key);
        this.APIKey$.next(response.api_key);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getAPIKey(): Observable<string> {
    return this.APIKey$.asObservable();
  }

  setAPIKey(APIKey: string): void {
    this.APIKey$.next(APIKey);
  }

  createUser(firstname, lastname, email, password) {
    return this.http.post(`${environment.backendUrl}/users/create`,
    {firstname, lastname, email, password}, {withCredentials: true});
  }

  check() {
    return this.http.post(`${environment.backendUrl}/check`, {});
  }
}
