import { Above18Page } from './../../modal/above18/above18.page';
import { ModalController } from '@ionic/angular';
import { DataService } from './../../data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Below18Page } from 'src/app/modal/below18/below18.page';
import { AudioService } from 'src/app/audio.service';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.page.html',
  styleUrls: ['./question-five.page.scss'],
})
export class QuestionFivePage implements OnInit {

  gender ="male";
  age = "above18";
  email;
  occupation = 'Health Care';
  constructor(private router: Router,
              private data: DataService,
              private audio: AudioService,
              private modalController: ModalController) { }

  ngOnInit() {
  }



  async submit(){
    let age = await this.data.set("age", this.age);
    await this.data.set("gender", this.gender);
    await this.data.set("email", this.email);
    await this.data.set("occupation", this.occupation);
    // this.router.navigate(['complete-task']);
    if(age == "above18"){
      this.presentModalAbove18();
      this.audio.buttonClick();

      console.log("Open Above 18 page");
      
    }
    if(age == "below18"){
      this.audio.buttonClick();
      this.presentModalBelow18();
      console.log("Open Below 18 page");

    }
  }


  async presentModalAbove18() {
    const modal = await this.modalController.create({
    component: Above18Page,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  async presentModalBelow18() {
    const modal = await this.modalController.create({
    component: Below18Page,
    componentProps: { value: 123 }
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

  occupationEvent(ev){
    this.occupation = ev.detail.value;
    console.log(this.occupation);
    
  }
}
