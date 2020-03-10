import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../config/auth/service/auth-services.service';
import { ErrorModel } from '../../config/models/error-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  email: string;
  password: string;
  response: any;
  hasError: boolean;
  please: any;

  data = {
    email: '',
    password: '',
    returnSecureToken: true
   };
  constructor(public route: Router, private service: AuthService ) { }
  error: ErrorModel;
  ngOnInit(): void {
  }
  submit() {
    if (this.email === undefined || this.password === undefined) {
      this.hasError = true;
      location.reload();
      return;
    }
    this.hasError = false;
    this.service.getToken(this.email, this.password)
    .subscribe((data) => {
      this.please = data;
    }, (error) => {
         this.hasError = true;
         this.error = error.error.error.errors[0].message;
      });
  }
}
