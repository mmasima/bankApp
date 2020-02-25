import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


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

  data = {
    email: '',
    password: '',
    returnSecureToken: true
   };
  apiUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y';

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public route: Router) { }

   error: any;
  ngOnInit(): void {
  }
  submit() {
    this.hasError = false;
    this.data.email = this.email;
    this.data.password = this.password;

    this.http.post(this.apiUrl, this.data)
    .subscribe((response) => {
      this.response = response;
      console.log(this.response);

      // saving token in session storage
      sessionStorage.setItem('token', this.response.idToken);
      sessionStorage.setItem('localId', this.response.localId);

      // route to dashboard
      this.route.navigate(['/homepage']);
    }, (error) => {
      this.hasError = true;
      this.error = error;
      });
    }
}
