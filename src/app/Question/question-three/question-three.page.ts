import { RelativeSelectPagePage } from './../../relative-select-page/relative-select-page.page';
import { SelectitemsPage } from './../../selectitems/selectitems.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

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


  constructor(private router: Router,
    private toastController: ToastController,
    private modalController: ModalController) {
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


  getList() {
    console.table(this.listItems);
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
    this.yellowOptionSelected = data.data;
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
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
    this.greenOptionSelected = data.data;
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalOrange(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.orangeOptionSelected = data.data;
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalRed(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.redOptionSelected = data.data;
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalWhite(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.whiteOptionSelected = data.data;
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
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
