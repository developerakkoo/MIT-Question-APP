import { AudioService } from './../audio.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  @Input() otp;
  userotp;
  constructor(private router: Router,
    private sound: AudioService,
    private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.otp);
    
  }

  onOtpChange(ev){
    console.log(ev);
    this.userotp = ev;
  }

  close(){
    this.modalController.dismiss();
  }
  Submit(){
    this.sound.buttonClick();
    if(this.otp === this.userotp){
      this.close();
      this.router.navigate(['question-one'])

    }

    if(this.otp !== this.userotp){
      console.log("Incorrect OTP!");
      
    }
  }
}
