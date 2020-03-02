import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
    public isAuthenticated(): any {
      const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
      return (token);
  }
}
