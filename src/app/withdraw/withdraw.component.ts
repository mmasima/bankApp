import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  account: number;
  withdraw: number;
  overdraft: number;
  token: string;
  response: any;
  hasError: boolean;
  Id: string;
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/clients/';
  overview: any;
  newBalance: number;
  update: any;
  data = {
    balance: 0,
    overdraft: 0
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
      });
    }
    // getting the balance
    displayAccount(account: any) {
      this.token = sessionStorage.getItem('token');
      this.http.get('https://momentum-retail-practical-test.firebaseio.com/accounts/' + this.account + '.json?auth=' + this.token)
    .subscribe((overview) => {
      this.overview = overview;
      console.log(this.overview);
      console.log(this.overview);
      });
    }
    submit() {
    this.token = sessionStorage.getItem('token');
    this.data.overdraft = parseFloat(this.overview.overdraft);
    this.data.balance = parseFloat(this.overview.balance);

    if (parseFloat(this.withdraw.toString()) > this.data.balance && this.data.balance !== 0) {
      this.withdraw = parseFloat(this.withdraw.toString()) - parseFloat(this.overview.balance);
      console.log(this.data.overdraft);
      this.data.overdraft = parseFloat(this.withdraw.toString());
      this.data.balance = 0;
      console.log(this.data.overdraft);
    } else if (this.data.balance === 0) {
      this.data.overdraft = parseFloat(this.overview.overdraft) + parseFloat(this.withdraw.toString());
    } else if (this.data.balance > this.data.overdraft) {
      this.data.balance = this.data.balance - parseFloat(this.withdraw.toString());
    }
    this.http.put('https://momentum-retail-practical-test.firebaseio.com/accounts/' + this.account + '.json?auth=' + this.token, this.data)
      .subscribe ((update) => {
      this.hasError = false;
      this.update = update;
      console.log(this.update);
      });
    }
  }
