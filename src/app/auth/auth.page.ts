import { QuotesService } from './../services/quotes.service';
import { AudioService } from './../audio.service';
import { OtpPage } from './../otp/otp.page';
import { OtpPageModule } from './../otp/otp.module';
import { IonSlide, IonSlides, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  mobileNo: number;
  @ViewChild('slides') slides: IonSlides;


  quotesArray:any;

  slideOpts = {
    initialSlide: 1,
    loop: true,
    autoplay: {
      delay:5500
    },
    speed: 400
  };
  constructor(private http: HttpClient,
              private router: Router,
              private sound : AudioService,
              private quotes: QuotesService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.quotes.getQuotes().subscribe((quote) =>{
      this.quotesArray = quote['results'];
      console.log(quote);
      
    }, (err) =>{
      console.log(err);
      
    }, ()=>{
      console.log("Completed Quotes subscription");
      this.slides.startAutoplay();
      
    })
  }


  ionViewDidEnter(){
    this.sound.playBG();
  }

  async presentModalOtp() {
    const modal = await this.modalController.create({
    component: OtpPage,
   
    });
    await modal.present();
  }


  Submit(){
    this.sound.buttonClick();
    this.presentModalOtp();
  }
}
