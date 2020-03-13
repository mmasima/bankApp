import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverallService } from '../../config/auth/service/overall.service';
import { ErrorModel } from '../../config/models/error-model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  account: any;
  deposit: number;
  overdraft: number;
  response: any;
  hasError: boolean;
  error: ErrorModel;
  overview: any;
  update: any;
  isDisabled: boolean;
  data = {
    balance: 0,
    overdraft: 0
   };

  constructor(public route: Router, private auth: OverallService) { }


  ngOnInit(): void {
    this.isDisabled = true;
    this.auth.getAccounts().subscribe((response) => {
      this.response = response;
    });
    }
    displayAccount(account: any) {
      this.account = account;
      this.auth.accountDetails(account)
      .subscribe((overview) => {
        this.overview = overview;
      });
    }
     submit() {
    if (this.deposit === undefined || this.account === undefined) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.isDisabled = false;
    this.data.overdraft = parseFloat(this.overview.overdraft);
    this.data.balance = parseFloat(this.overview.balance);
    if (parseFloat(this.deposit.toString()) > this.data.overdraft && this.data.overdraft !== 0) {
      this.deposit = parseFloat(this.deposit.toString()) - this.data.overdraft;
      this.data.balance = parseFloat(this.deposit.toString()) + this.data.balance;
      this.data.overdraft = 0;
    } else if (this.data.overdraft === 0) {
      this.data.balance = this.data.balance + parseFloat(this.deposit.toString());
    } else if (this.data.overdraft > this.data.balance) {
      this.data.overdraft = this.data.overdraft - parseFloat(this.deposit.toString());
    } else if (this.data.overdraft > 0) {
      this.data.overdraft = this.data.overdraft - parseFloat(this.deposit.toString());
      console.log(this.data.overdraft);
    }
    this.auth.depositMoney(this.account, this.data.balance, this.data.overdraft)
    .subscribe((update) => {
        this.update = update;
    }, (error) => {
      this.hasError = true;
      this.error = error;
   });
  }
  refresh() {
    location.reload();
  }
}
