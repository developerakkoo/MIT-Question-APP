import { AudioService } from './../../audio.service';
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
    private sound: AudioService,
    private data: DataService) {
    this.listItems = [
      { key: "A. Cow", value: "CAREER", icon:"🐄",points:0 },//0
      { key: "B. Tiger", value: "PRIDE",icon:"🐅" , points: 0},//1
      { key: "C. Sheep", value: "LOVE",icon:"🐐", points:0 },//2
      { key: "D. Horse", value: "FAMILY",icon:"🐎" , points:0},//3
      { key: "E. Pig", value: "MONEY",icon:"🐖", points:0 },//4
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

  rangeChange(ev, item){
    console.log(ev.detail.value + " " + item.key);
    item.points = ev.detail.value;
    console.log(item);
    
    
    
  }
  

  uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }
  getList() {
    // console.log(this.listItems);
    // console.log(this.listItems.sort((a, b) => b.points-a.points));
    let dataList = this.listItems.sort((a, b) => b.points-a.points);
    console.log(dataList);
    
    this.data.set('questionOne',dataList).then((value) => {
      this.router.navigate(['question-two']);
    this.sound.buttonClick();


    }).catch((error) => {
      console.log(error);

    })
  }

}
