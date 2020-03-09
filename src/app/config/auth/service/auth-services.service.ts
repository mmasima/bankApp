import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenModel } from '../../models/tokenModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  data: any;
  response: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient, public route: Router) {
  }

  getToken(username: string, pwd: string): Observable<TokenModel> {
    return this.http.post<TokenModel>(environment.PasswordUrl,
    { email : username, password : pwd, returnSecureToken: true },
    this.httpOptions).pipe(
      map((response) => {
          // storing token into SessionStorage
          sessionStorage.setItem('token',  JSON.stringify(response));
          sessionStorage.setItem('username', JSON.stringify(response.email));
          // route to dashboard
          this.route.navigate(['/homepage']);
          return (response);
      })
    );
  }
}
