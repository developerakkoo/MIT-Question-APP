import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.page.html',
  styleUrls: ['./question-two.page.scss'],
})
export class QuestionTwoPage implements OnInit {
  listItems:any;

  constructor(private router: Router) {
    this.listItems = [
      "A. Dog",
      "B. Cat",
      "C. Rat",
      "D. Coffee",
      "E. Sea",
    ];
   }

  ngOnInit() {
  }

  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
     let draggedItem = this.listItems.splice(event.detail.from,1)[0];
     this.listItems.splice(event.detail.to,0,draggedItem)
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  getList() {
    console.table(this.listItems);
    this.router.navigate(['question-four']);  }

}
