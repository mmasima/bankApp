import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public route: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.route.navigate(['']);
      return false;
    }
    return true;
  }
}
