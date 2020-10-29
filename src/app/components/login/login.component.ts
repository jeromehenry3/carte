import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(loginFormData: { email: string, password: string }) {
    this.loginForm.reset();
    console.warn('login submitted', loginFormData);
    this.loginService.login(loginFormData);
  }

}
