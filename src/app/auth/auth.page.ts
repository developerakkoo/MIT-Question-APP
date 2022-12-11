import { AudioService } from './../audio.service';
import { OtpPage } from './../otp/otp.page';
import { OtpPageModule } from './../otp/otp.module';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  mobileNo: number;

  constructor(private http: HttpClient,
              private router: Router,
              private sound : AudioService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.sound.playBG();
  }


  async presentModalOtp() {
    const modal = await this.modalController.create({
    component: OtpPage,
   
    });
  
    await modal.present();
  
  }

  Submit(){
    this.presentModalOtp();

  }
}
