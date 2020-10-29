import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private APIKey$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  login(loginData: {email: string, password: string}): void {
    this.http.post('http://localhost:8000/login', loginData)
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
    return this.http.post('http://localhost:8000/users/create', {firstname, lastname, email, password}, {withCredentials: true});
  }

  check() {
    return this.http.post('http://localhost:8000/check', {});
  }
}
