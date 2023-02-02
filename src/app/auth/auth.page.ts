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
  otp;
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

  async presentModalOtp(otp) {
    const modal = await this.modalController.create({
    component: OtpPage,
  backdropDismiss: false,
      componentProps:{otp: otp}
    });
    await modal.present();
  }

  generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async Submit(){
    this.sound.buttonClick();
    this.otp = this.generateOTP();
    console.log(this.otp);
    
    this.http
    .get(`https://sms.k7marketinghub.com/app/smsapi/index.php?key=56391A88208C8A&campaign=14827&routeid=30&type=text&contacts=${this.mobileNo}&senderid=WBMCCE&msg=Dear%20Customer,%20Your%20OTP%20is%20${this.otp}%20for%20The%20Mind%20Labyrinth.%20Do%20not%20share%20this%20OTP%20to%20anyone%20for%20security%20reasons.%20-App%20Institute&template_id=1707167514169508879`)
    .subscribe((data) =>{
      console.log(data);
      
    })
    this.presentModalOtp(this.otp);
  }
}
