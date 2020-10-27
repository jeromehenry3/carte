import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private APIKey$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  login(): void {
    this.http.post('http://localhost:8000/login', {email: 'email', password: 'blabla'})
    .subscribe(
      (response: {status: string, api_key: string}) => {
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

  createUser(firstname, lastname, email, password) {
    return this.http.post('http://localhost:8000/users/create', {firstname, lastname, email, password}, {withCredentials: true});
  }

  check() {
    return this.http.post('http://localhost:8000/check', {});
  }
}
