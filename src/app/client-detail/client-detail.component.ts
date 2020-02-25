import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  Id: string;
  token: string;
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/clients/';
  response: any;
  account: any;
  overview: any;

  constructor(public route: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.Id = sessionStorage.getItem('localId');
    this.token = sessionStorage.getItem('token');
    console.log(this.token);

    this.http.get(this.apiUrl + this.Id + '.json?auth=' + this.token)
      .subscribe((response) => {
      this.response = response;
      console.log(this.response);
      }, (error) => {
        console.log(error);
  });

}
   displayAccount(account) {
    console.log(account);
  }
  show() {
    this.token = sessionStorage.getItem('token');
    this.http.get('https://momentum-retail-practical-test.firebaseio.com/accounts/' + this.account + '.json?auth=' + this.token)
    .subscribe((overview) => {
      this.overview = overview;
      console.log(this.overview);
    });
  }
}
