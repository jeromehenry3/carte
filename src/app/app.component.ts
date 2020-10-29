import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // subscriptions: Subscription = new Subscription();
  public _apikey: Observable<string>;

  constructor(private loginService: LoginService) {
    this._apikey = this.loginService.getAPIKey();
  }

  ngOnInit() {
    const token = localStorage.getItem('remember_token');
    token && this.loginService.setAPIKey(token);
  }
}
