import { LanguagePopoverPage } from './../../language-popover/language-popover.page';
import { DataService } from './../../data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.page.html',
  styleUrls: ['./question-one.page.scss'],
})
export class QuestionOnePage implements OnInit {
  listItems: any;

  draggedList: any[] = [];

  constructor(private router: Router,
    private popoverController: PopoverController,
    private data: DataService) {
    this.listItems = [
      { key: "A. Cow", value: "CAREER" },//0
      { key: "B. Tiger", value: "PRIDE" },//1
      { key: "C. Sheep", value: "LOVE" },//2
      { key: "D. Horse", value: "FAMILY" },//3
      { key: "E. Pig", value: "MONEY" },//4
    ];
  }

  ngOnInit() {
  }

  async openLanguagePopOver(event){
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: event
    });

    await popover.present();
  }
  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.listItems.splice(event.detail.from, 1)[0];
    this.listItems.splice(event.detail.to, 0, draggedItem);
    console.log(this.listItems[event.detail.to]);
    // let obj = this.draggedList.find((value, index) => value = value.key === this.listItems[event.detail.to].key);
    // console.log(obj);

    let isFound = this.draggedList.includes(this.listItems[event.detail.to])
    console.log(isFound);
    if (!isFound) {
      this.draggedList.push(this.listItems[event.detail.to]);

      console.log(this.draggedList);
    }



    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }
  getList() {
    console.log(this.listItems);
    this.data.set('questionOne', this.listItems).then((value) => {
      this.router.navigate(['question-two']);

    }).catch((error) => {
      console.log(error);

    })
  }

}
