import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailModel } from '../../config/models/details.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  details: DetailModel;
  username: any;

  constructor(public route: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }

}
