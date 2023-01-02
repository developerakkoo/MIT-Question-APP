import { AudioService } from './../audio.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router: Router,
    private sound: AudioService,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  onOtpChange(ev){
    console.log(ev);
    
  }

  close(){
    this.modalController.dismiss();
  }
  Submit(){
    this.sound.buttonClick();

    this.close();
    this.router.navigate(['first-page-task'])
  }
}
