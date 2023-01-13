import { AudioService } from './../../audio.service';
import { DataService } from './../../data.service';
import { RelativeSelectPagePage } from './../../relative-select-page/relative-select-page.page';
import { SelectitemsPage } from './../../selectitems/selectitems.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from 'src/app/language-popover/language-popover.page';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.page.html',
  styleUrls: ['./question-three.page.scss'],
})
export class QuestionThreePage implements OnInit {

  listItems:any;
  yellowOptionSelected;
  orangeOptionSelected;
  redOptionSelected;
  whiteOptionSelected;
  greenOptionSelected;
  dogOptionSelected: any;

  selectedList:any[] = [

  ]

  rList:any[] = [];
  fList:any[] = [];

  relativeCount:number;
  friendCount: number;


  constructor(private router: Router,
    private toastController: ToastController,
    private data: DataService,
    private popoverController: PopoverController,
    private sound: AudioService,
    private alertController: AlertController,
    private modalController: ModalController) {
    // this.listItems = [
    //   "A. Yellow",
    //   "B. Orange",
    //   "C. Red",
    //   "D. White",
    //   "E. Green",
    // ];
    this.listItems = [
      {key: "A. Yellow", value: ""},//0
      {key: "B. Orange", value: ""},//1
      {key: "C. Red", value: ""},//2
      {key: "D. White", value: ""},//3
      {key: "E. Green", value: ""},//4
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Enter your name',
      buttons: [{
        text: "Okay",
        handler: async (value) =>{
          console.log(value);
          let name = value[0];
          await this.data.set("name", name);
    this.sound.buttonClick();

          this.getList();
          
        }
      }],
      inputs: [
        {
          placeholder: 'Name',
          
        },
      ],
    });

    await alert.present();
  }

  async getList() {
    this.listItems = [
      {key: "A. Yellow", value: this.yellowOptionSelected},//0
      {key: "B. Orange", value: this.orangeOptionSelected},//1
      {key: "C. Red", value: this.redOptionSelected},//2
      {key: "D. White", value: this.whiteOptionSelected},//3
      {key: "E. Green", value: this.greenOptionSelected},//4
    ];
    console.table(this.listItems);
    this.rList = this.selectedList.map(v => v.type === 'r');
    this.fList = this.selectedList.map(v => v.type === 'f');
    // console.log(this.pList);
    // console.log(this.pList.length);
    let relativeCount = this.rList.filter(x => x === true).length;
    let friendCount = this.rList.filter(x => x === false).length;

    console.log(`Relative Count:- ${ relativeCount}`);
    console.log(`Friend Count:- ${ friendCount}`);

    // if(relativeCount < 5 && friendCount < 5){
    //   this.presentToast("You need to answer the above question first.");
    //   return;
    // }
    let rCount = await this.data.set('rCount', relativeCount);
    let fCount = await this.data.set('fCount', friendCount);
    await this.data.set('questionThree', this.listItems);
    this.router.navigate(['question-four']);
  }

  async presentModal(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.yellowOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
      if(this.selectedList.length == 5){
    this.sound.buttonClick();

        this.presentAlert();

    
        }
  
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentModalGreen(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.greenOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
      if(this.selectedList.length == 5){
    this.sound.buttonClick();

        this.presentAlert();

    
        }
  }

  async presentModalOrange(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.orangeOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
      if(this.selectedList.length == 5){
    this.sound.buttonClick();

        this.presentAlert();

    
        }
  }

  async presentModalRed(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.redOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
      if(this.selectedList.length == 5){
    this.sound.buttonClick();

        this.presentAlert();

    
        }
  }

  async presentModalWhite(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.whiteOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
      if(this.selectedList.length == 5){
    this.sound.buttonClick();

        this.presentAlert();
    
        }
  }


  openSelectPage(item){
    console.log(item);
    if(item == "Yellow"){
      this.presentModal(item);

    }
else if(item == "Orange"){
  this.presentModalOrange(item);
}
else if(item == "Red"){
  this.presentModalRed(item)
}else if(item == "White"){
  this.presentModalWhite(item);
}
else if(item == "Green"){
  this.presentModalGreen(item);
}
    // this.router.navigate(['selectitems', item])
    
  }

}
