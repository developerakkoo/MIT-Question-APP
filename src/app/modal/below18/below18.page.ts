import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-below18',
  templateUrl: './below18.page.html',
  styleUrls: ['./below18.page.scss'],
})
export class Below18Page implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalController.dismiss();
  }
}
