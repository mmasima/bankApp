import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

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
accounts = 'accounts';

response: any;
ApiUrl = 'https://momentum-retail-practical-test.firebaseio.com/accounts/';
ApiUrl2 = 'https://momentum-retail-practical-test.firebaseio.com/clients/';

data = {
 };
  constructor(public route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }
  create() {
    this.token = sessionStorage.getItem('token');
    this.Id = sessionStorage.getItem('localId');
    console.log(this.accountNbr);
    this.data =  [this.accountNbr];

    this.http.patch(this.ApiUrl + this.accounts + '.json?auth=' + this.token, this.data)
    .subscribe((response) => {
      this.response = response;
      console.log(this.response);
      // this.http.put(this.ApiUrl2 + this.accounts + '/accounts.json?auth=' + this.token, this.accountNbr.toString())
      // .subscribe((add) => {
      //   this.add = add;
      //   console.log(this.add);
      });
    //
  }

}
