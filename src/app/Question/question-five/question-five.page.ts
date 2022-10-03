import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.page.html',
  styleUrls: ['./question-five.page.scss'],
})
export class QuestionFivePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.router.navigate(['home'])
  }

}
