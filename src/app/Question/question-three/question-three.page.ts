import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.page.html',
  styleUrls: ['./question-three.page.scss'],
})
export class QuestionThreePage implements OnInit {

  listItems:any;

  constructor(private router: Router) {
    this.listItems = [
      "A. Cow",
      "B. Tiger",
      "C. Sheep",
      "D. Horse",
      "E. Pig",
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
    this.router.navigate(['question-four']);
  }

}
