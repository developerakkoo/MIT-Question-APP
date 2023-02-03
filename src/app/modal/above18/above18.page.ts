import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-above18',
  templateUrl: './above18.page.html',
  styleUrls: ['./above18.page.scss'],
})
export class Above18Page implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
