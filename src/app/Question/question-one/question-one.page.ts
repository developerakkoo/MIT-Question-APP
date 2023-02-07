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
      { key: "A.", value: "CAREER", icon:"./../../../assets/cow.svg",points:0, name: "Cow" },//0
      { key: "B.", value: "PRIDE",icon:"./../../../assets/tiger.svg" , points: 0, name: "Tiger"},//1
      { key: "C.", value: "LOVE",icon:"./../../../assets/sheep.svg", points:0, name:"Sheep" },//2
      { key: "D.", value: "FAMILY",icon:"./../../../assets/Horse.svg" , points:0, name: "Horse"},//3
      { key: "E.", value: "MONEY",icon:"./../../../assets/pig.svg", points:0, name: "Pig" },//4
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
