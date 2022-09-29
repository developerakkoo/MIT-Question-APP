import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onOtpChange(ev){
    console.log(ev);
    
  }

  Submit(){
    this.router.navigate(['question-one'])
  }
}
