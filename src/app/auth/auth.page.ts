import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  mobileNo: number;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  Submit(){
    this.router.navigate(['otp']);

  }
}
