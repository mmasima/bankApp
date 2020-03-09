import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OverallService } from '../../config/auth/service/overall.service';
import { ErrorModel } from '../../config/models/error-model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  response: any;
  checker: any;
  account: any;
  overview: any;
  error: ErrorModel;
  hasError: boolean;
  data = {
    balance: 0,
    overdraft: 0
  };

  constructor(public route: Router, private http: HttpClient, private auth: OverallService) { }
  ngOnInit(): void {
    this.auth.getAccounts().subscribe((response) => {
      this.response = response;
    });
}
   displayAccount(account) {
     this.account = account;
  }
  show() {
    // displaying account details to user
    this.auth.accountDetails(this.account).subscribe((overview) => {
      this.overview = overview;
      if (this.overview === null) {
        this.auth.depositMoney(this.account , this.data.balance, this.data.overdraft).subscribe((checker) => {
          this.checker = checker;
        });
      }
    }, (error) => {
      this.hasError = true;
      this.error = error;
      }
    );
  }
}
