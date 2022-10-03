import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.page.html',
  styleUrls: ['./question-four.page.scss'],
})
export class QuestionFourPage implements OnInit {

  
  listItems:any;

  constructor(private router: Router) {
    this.listItems = [
      "A. Yellow",
      "B. Orange",
      "C. Red",
      "D. White",
      "E. Green",
    ];
   }

  ngOnInit() {
  }

  getList(){this.router.navigate(['question-five'])}
}
