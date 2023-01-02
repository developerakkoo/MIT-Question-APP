import { AudioService } from './../audio.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-first-page-task',
  templateUrl: './first-page-task.page.html',
  styleUrls: ['./first-page-task.page.scss'],
})
export class FirstPageTaskPage implements OnInit {

  selectedKey: string;

  constructor(private router: Router,
    private sound: AudioService,
              private data: DataService) { }

  ngOnInit() {
  }

  async BookForYear(){
    this.data.set("key", "Year").then((value) =>{
    this.sound.buttonClick();

      this.router.navigate(['question-one']);
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  async BookForMonth(){
    this.data.set("key", "Month").then((value) =>{
    this.sound.buttonClick();

      this.router.navigate(['question-one']);
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  async BookForDay(){
    this.data.set("key", "Day").then((value) =>{
    this.sound.buttonClick();

      this.router.navigate(['question-one']);
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  async BookForWeek(){
    this.data.set("key", "Week").then((value) =>{
    this.sound.buttonClick();

      this.router.navigate(['question-one']);
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  async BookForLife(){
    this.data.set("key", "Life").then((value) =>{
    this.sound.buttonClick();

      this.router.navigate(['question-one']);
    }).catch((error) =>{
      console.log(error);
      
    })
  }
}
