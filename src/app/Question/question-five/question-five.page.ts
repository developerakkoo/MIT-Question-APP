import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Below18withoutmhPage } from './../../modal/below18withoutmh/below18withoutmh.page';
import { Above18Page } from './../../modal/above18/above18.page';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from './../../data.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Below18Page } from 'src/app/modal/below18/below18.page';
import { AudioService } from 'src/app/audio.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.page.html',
  styleUrls: ['./question-five.page.scss'],
})
export class QuestionFivePage implements OnInit {

  ionicForm: FormGroup;
  isAbove18Open: boolean = false;
  isBelow18Open: boolean = false;
  @ViewChild('above18') aboveModal!: ModalController;
  @ViewChild('below18') belowModal!: ModalController;
  gender ="male";
  age = "above18";
  email;
  tehsil;
  state:string = "Maharashtra";
  district;
  pincode;
  occupation = 'Health Care';
  @ViewChild('btnB', {static: false}) btnB: ElementRef;
  @ViewChild('btnA', {static: false}) btnA: ElementRef;
  number;
  name;
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private modalController: ModalController,
              private afs: AngularFirestore,
              private fb: FormBuilder,
              private toastController: ToastController,
              private audio: AudioService,
              
              private router: Router,
              private data: DataService) {
                this.ionicForm = this.fb.group({
                  district: ['',[Validators.required]],
                  tehsil: ['',[Validators.required]],
                  pincode: ['',[Validators.required]]
                })
                this.itemsCollection = afs.collection<any>('profiles');
                this.items = this.itemsCollection.valueChanges();
               }


              async ngOnInit() {
                // this.age = await this.data.get("age");
                this.email = await this.data.get("email");
                this.number = await this.data.get("number");
                this.occupation = await this.data.get("occupation");
                this.gender = await this.data.get("gender");
                this.name = await this.data.get("name");
                this.add();
              }
          
              add(){
                let id = this.afs.createId();
                let obj = {
                  name: this.name,
                  email: this.email,
                  number: this.number,
                  age: this.age,
                  gender: this.gender,
                  occupation: this.occupation,
                  state: this.state,
                  pincode: this.pincode,
                  district: this.district,
                  tehsil: this.tehsil
                }
                this.itemsCollection.doc(id).set({...obj, key: id}).then((data) =>{
                  console.log(data);
                  
                }).catch((error) =>{
                  console.log(error);
                  
                })
              }
            
              openWhatsappA(btn){
                console.log(this.btnA);
                this.btnA.nativeElement.click();
                this.aboveModal.dismiss();
                this.belowModal.dismiss();
                this.router.navigate(['complete-task'])
            
                
              }
              openWhatsappB(btn){
                console.log(this.btnB);
                this.aboveModal.dismiss();
                this.belowModal.dismiss();

                this.btnB.nativeElement.click();
                this.router.navigate(['complete-task']);
            
                
              }


              async presentToast(msg) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: 2000
                });
                toast.present();
              }
  async submit(){
    let age = await this.data.set("age", this.age);
    await this.data.set("gender", this.gender);
    await this.data.set("email", this.email);
    await this.data.set("occupation", this.occupation);
    // this.router.navigate(['complete-task']);

    if(this.tehsil == "" || this.pincode == "" || this.district == "" ){
      this.presentToast("Please Fill All required values.")
    }
    if(age == "above18"){
      // this.presentModalAbove18();
      this.presentModalAbove18();
      this.audio.buttonClick();

      console.log("Open Above 18 page");
      
     }
     if(age == "below18"){
      this.audio.buttonClick();
      this.presentModalBelow18WithoutMaharashtra();
      console.log("Open Below 18 page without maha");

    }
    if(age == "below18" && this.state == "Maharashtra"){
      this.audio.buttonClick();
      this.presentModalBelow18();
      console.log("Open Below 18 page with maha");

    }
  }

  closeAbove18(){
    this.aboveModal.dismiss();
  }

  closeBelow18(){
    this.belowModal.dismiss();
  }
  async presentModalBelow18WithoutMaharashtra() {
    const modal = await this.modalController.create({
    component: Below18withoutmhPage,
    componentProps: { value: 123 },
    cssClass:'modal'

    });
  
    await modal.present();
  
  }

  async presentModalAbove18() {
    const modal = await this.modalController.create({
    component: Above18Page,
    componentProps: { value: 123 },
    cssClass:'modal'
    });
  
    await modal.present();
  
  }

  async presentModalBelow18() {
    console.log("Present modal below 18");
    
    const modal = await this.modalController.create({
    component: Below18Page,
    componentProps: { value: 123 },
    cssClass:'modal'

    });
  
    await modal.present();
  
  }
  genderEvent(ev){
    console.log(ev.detail.value);
    this.gender = ev.detail.value;
    
  }

  ageEvent(ev){
    console.log(ev.detail.value);
    this.age = ev.detail.value;
    
  }

  stateEvent(ev){
    this.state = ev.detail.value;
  }

  occupationEvent(ev){
    this.occupation = ev.detail.value;
    console.log(this.occupation);
    
  }
}
