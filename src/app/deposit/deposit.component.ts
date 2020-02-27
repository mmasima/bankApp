import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorModel } from '../models/error-model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  account: number;
  deposit: number;
  overdraft: number;
  token: string;
  response: any;
  hasError: boolean;
  error: ErrorModel;
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
      console.log(account);
      });
    }
    submit() {
    this.token = sessionStorage.getItem('token');
    this.data.overdraft = parseFloat(this.overview.overdraft);
    this.data.balance = parseFloat(this.overview.balance);
    if (this.data.overdraft > this.data.balance) {
      this.data.overdraft = this.data.overdraft - parseFloat(this.deposit.toString());
      console.log( 'new overdraft' + this.data.overdraft);
    }
    if (this.deposit > this.data.overdraft) {
      this.data.balance =  this.deposit - this.data.overdraft;
      this.data.overdraft = 0;
      console.log('new balance' + this.data.balance);
    }
    if (this.data.balance === this.data.overdraft) {
      this.data.balance = 0;
      this.data.overdraft = 0;
    }
    this.http.put('https://momentum-retail-practical-test.firebaseio.com/accounts/' + this.account + '.json?auth=' + this.token, this.data)
      .subscribe ((update) => {
      this.hasError = false;
      this.update = update;
      console.log(this.update);
      });
    }
  }
