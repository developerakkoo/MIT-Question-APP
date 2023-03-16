import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from './../data.service';
import { AudioService } from './../audio.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  @Input() otp;
  @Input() number;
  userotp;
  constructor(private router: Router,
              private auth:AngularFireAuth,
              private sound: AudioService,
              private data: DataService,
              private afs: AngularFirestore,
    private modalController: ModalController) { }

  async ngOnInit() {
    console.log(this.otp);
    console.log("number in otp"+ this.number);
    
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
      let email = this.number+"@test.com";
      let password = this.number;
      console.log(email);
      this.auth.fetchSignInMethodsForEmail(email).then((methods) =>{
        console.log(methods);
        if(methods.length > 0){
          console.log("User Available for login");
          this.auth.signInWithEmailAndPassword(email, this.number)
          .then(async (user) =>
          {
            console.log("user Signed in");
            let id = user?.user?.uid;
            await this.data.set("userId", id);
            this.close();
      this.router.navigate(['question-one'])
          })
        }else{
          this.auth.createUserWithEmailAndPassword(email, password)
          .then(async (success) =>{
            console.log("REgistering user");
            
            console.log(success.user.uid);
            await this.data.set("userId", success?.user?.uid);
            let obj = {
              userId:success.user.uid,
              email: email,
              password: password,
              number: this.number,
              fullname: "",
              imageOne:"",
              imageTwo:"",
              imageThree:"",
              isActive: true,
              tehsil: "",
              taluka:"",
              pincode:"",
              occupation:"",
              state:"",
              city:"",
              gender:"",
              age:""
            }
            this.afs.collection('Users').doc(success.user.uid).set(obj).then((data) =>{
              console.log("Data set");
              this.close();
          this.router.navigate(['question-one'])
            })
            
          })
        }
      })
      
      
     
      

    }

    if(this.otp !== this.userotp){
      console.log("Incorrect OTP!");
      
    }
  }
}
