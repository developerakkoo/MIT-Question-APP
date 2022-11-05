import { RelativeSelectPagePage } from './../../relative-select-page/relative-select-page.page';
import { SelectitemsPage } from './../../selectitems/selectitems.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  selectedList: any;
  catOptionSelected: any;
  ratOptionSelected: any;
  coffeeOptionSelected: any;
  seaOptionSelected: any;


  constructor(private router: Router,
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
    component: SelectitemsPage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.dogOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }
  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  async presentModalCat(item) {
    const modal = await this.modalController.create({
    component: SelectitemsPage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.catOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalRat(item) {
    const modal = await this.modalController.create({
    component: SelectitemsPage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.ratOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalCoffee(item) {
    const modal = await this.modalController.create({
    component: SelectitemsPage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.coffeeOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
  
  }

  async presentModalSea(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.seaOptionSelected = data.data['value'];
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
    if(item == "DOG"){
      this.presentModal(item);

    }
else if(item == "CAT"){
  this.presentModalCat(item);
}
else if(item == "RAT"){
  this.presentModalRat(item)
}else if(item == "COFFEE"){
  this.presentModalCoffee(item);
}
else if(item == "SEA"){
  this.presentModalSea(item);
}
    // this.router.navigate(['selectitems', item])
    
  }

}
