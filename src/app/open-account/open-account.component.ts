import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent implements OnInit {
  accountNbr: number;
  token: any;
  Id: any;
  add: any;
  existingAccounts: string[];
  accounts: any;
  put: any;

  response: any;
  ApiUrl = 'https://momentum-retail-practical-test.firebaseio.com/accounts/';
  ApiUrl2 = 'https://momentum-retail-practical-test.firebaseio.com/clients/';
  data = {
    balance: 0,
    overdraft: 0
  };
  ans: any;

  constructor(public route: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  create() {
    this.Id = sessionStorage.getItem('localId');
    this.token = sessionStorage.getItem('token');
    this.accountNbr = Math.floor(Math.random() * 10000000);
    this.http.get(this.ApiUrl2 + this.Id + '/accounts' + '.json?auth=' + this.token)
      .subscribe((response) => {
        this.response = response;
        console.log(this.response);
        if (this.accountNbr === undefined) {
          return ;
        }
        // adding the new accounts to the other accounts
        this.http.put(this.ApiUrl + this.accountNbr + '.json?auth=' + this.token, this.data)
        .subscribe((put) => {
          this.put = put;
          console.log(this.put);
        });
        this.response.push(this.accountNbr);
        console.log(this.response);
        //  making the put to the API
        this.http.put(this.ApiUrl2 + this.Id + '/accounts' + '.json?auth=' + this.token, this.response)
        .subscribe((ans) => {
          this.ans = ans;
         });
      });
    }
}
