import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private APIKey$: string;
  private APIKeySubscription: Subscription = new Subscription();

  constructor(private loginService: LoginService) {
  }

  /**
   * Retourne true si la requête est /login
   */
  isALoginRequest(request: HttpRequest<unknown>): boolean {
    return request.url.includes('/login');
  }

  /**
   * Si la requete n'est pas sur login, ajoute le token dans les headers
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.isALoginRequest(request)) { return next.handle(request); }
    return this.loginService.getAPIKey().pipe(
      map(token => request.clone({ setHeaders: { Authorization: `Bearer: ${token}` }})),
      mergeMap(req => next.handle(req))
    );
  }
}
