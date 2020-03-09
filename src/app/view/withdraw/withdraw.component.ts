import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverallService } from '../../config/auth/service/overall.service';
import { ErrorModel } from '../../config/models/error-model';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  isDisabled: boolean;
  account: number;
  withdraw: number;
  overdraft: number;
  response: any;
  hasError: boolean;
  error: ErrorModel;
  overview: any;
  update: any;
  data = {
    balance: 0,
    overdraft: 0
   };
  constructor(public route: Router, private auth: OverallService) { }

  ngOnInit(): void {
    this.isDisabled = true;
    this.auth.getAccounts().subscribe((response) => {
      this.response = response;
    }, (error) => {
      this.hasError = true;
      this.error = error;
      console.log(this.hasError);
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
    if (this.withdraw === undefined) {
      this.hasError = true;
      return;
    }
    this.isDisabled = false;
    this.hasError = false;
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
    this.auth.depositMoney(this.account, this.data.balance, this.data.overdraft)
    .subscribe((update) => {
        this.update = update;
    }, (error) => {
      this.hasError = true;
      this.error = error;
      console.log(this.error);
    });
  }
    refresh() {
      location.reload();
    }
  }
