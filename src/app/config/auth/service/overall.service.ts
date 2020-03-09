import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AccountModel } from '../../models/account.model';
import { DetailModel } from '../../models/details.model';
import { Accounts } from '../../models/account-Model';

@Injectable({
  providedIn: 'root'
})
export class OverallService {
  data: any;
  details: DetailModel;
  constructor(private http: HttpClient, public route: Router) {
    const token = sessionStorage.getItem('token');
    this.details = JSON.parse(token);
  }
  // getting account number
  getAccounts(): Observable<DetailModel> {
    return this.http.get<DetailModel>(environment.ClientUrl + this.details.localId + environment.auth + this.details.idToken).pipe(
      map((data) => {
        return data;
      })
    );
  }
  // getting account balance and overdraft
  accountDetails(account: any): Observable<AccountModel> {
    return this.http.get<AccountModel>(environment.AccountUrl + account + environment.auth + this.details.idToken).pipe(
      map((data) => {
        this.data = data;
        return data;
      })
    );
  }
  // deposit money into account
  depositMoney(account: any, balnce: number, overdrft: number): Observable<AccountModel> {
    return this.http.put
    <AccountModel>(environment.AccountUrl + account + environment.auth + this.details.idToken,
    { balance: balnce, overdraft: overdrft }).pipe(
       map((data) => {
        this.data = data;
        return data;
       })
     );
  }
// adding new account to the other accounts
newAccount(accountNbr: string): Observable<Accounts> {
  return this.http.put<Accounts>(environment.AccountUrl + accountNbr + environment.auth + this.details.idToken,
    { balance: 0, overdraft: 0 }).pipe(
      map((data) => {
        this.data = data;
        console.log(data);
        return data;
      })
    );
  }
  // adding the new accounts to the clients list
  addAcocunt(accounts: any): Observable<Accounts> {
    return this.http.put<Accounts>(environment.ClientUrl + this.details.localId + '/accounts' + environment.auth +
    this.details.idToken,
    accounts).pipe(
      map((data) => {
        this.data = data;
        return data;
      })
    );
  }
  // get accounts
  fetchAccounts(): Observable<Accounts> {
    return this.http.get<Accounts>(environment.ClientUrl + this.details.localId + '/accounts' + environment.auth + this.details.idToken)
    .pipe(map((data) => {
      this.data = data;
      return data;
    })
    );
  }
}
