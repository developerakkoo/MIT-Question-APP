import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QuotesService } from './../services/quotes.service';
import { AudioService } from './../audio.service';
import { OtpPage } from './../otp/otp.page';
import { OtpPageModule } from './../otp/otp.module';
import { IonSlide, IonSlides, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  mobileNo: number;

  ionicForm: FormGroup;
  otp;
  @ViewChild('slides') slides: IonSlides;
  showError: boolean = false;
  setError:boolean = false;
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
              private fb: FormBuilder,
              private data: DataService,
              private auth: AngularFireAuth,
              private modalController: ModalController) { 
                this.ionicForm = this.fb.group({
                  mobileNo:[, [Validators.required, Validators.min(10)]]
                })
              }

  ngOnInit() {
    this.modalController.dismiss();
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


  checkNumber(ev){
    console.log(ev.detail.value);
    let number = ev.detail.value;

    if(number.toString().length == 10){
      console.log("Number correct");
      this.showError = false;
    }

    if(number.toString().length < 10){
      console.log("Check number again");
      this.showError = true;
      
    }
  }
  async presentModalOtp(otp) {
    const modal = await this.modalController.create({
    component: OtpPage,
  backdropDismiss: false,
      componentProps:{otp: otp, number: this.ionicForm.value.mobileNo}
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

  async onSubmit(){

    console.log(this.ionicForm.value.mobileNo);
    let email = this.ionicForm.value.mobileNo + "@test.com";
    console.log(email);

   
   
    this.sound.buttonClick();
    this.otp = this.generateOTP();
    console.log(this.otp);
    await this.data.set("number", this.ionicForm.value.mobileNo);
    this.http 
    .get(`https://sms.k7marketinghub.com/app/smsapi/index.php?key=56391A88208C8A&campaign=14827&routeid=30&type=text&contacts=${this.ionicForm.value.mobileNo}&senderid=WBMCCE&msg=Dear%20Customer,%20Your%20OTP%20is%20${this.otp}%20for%20The%20Mind%20Labyrinth.%20Do%20not%20share%20this%20OTP%20to%20anyone%20for%20security%20reasons.%20-App%20Institute&template_id=1707167514169508879`)
    .subscribe((data) =>{
      console.log(data);
      
    })
    this.presentModalOtp(this.otp);
  }
}
