import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Accounts } from '../models/account-Model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  Id: string;
  token: string;
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/clients/';
  apiUrl2 = 'https://momentum-retail-practical-test.firebaseio.com/accounts/';
  response: any;
  account: any;
  overview: any;
  put: any;
  data = {
    balance : 0,
    overdraft : 0
  };

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
      if (this.overview === null) {
        this.http.put(this.apiUrl2 + this.account + '.json?auth=' + this.token, this.data)
        .subscribe((put) => {
          this.put = put;
          console.log(this.put);
        });
      }
    });
  }
}
