import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }
  logout() {
    // remove user from local storage to log user out
    location.reload();
    sessionStorage.clear();
    this.route.navigate(['']);
  }
}
