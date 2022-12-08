import { DataService } from './../../data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.page.html',
  styleUrls: ['./question-five.page.scss'],
})
export class QuestionFivePage implements OnInit {

  gender ="male";
  age = "above18";

  constructor(private router: Router,
              private data: DataService) { }

  ngOnInit() {
  }

  async submit(){
    await this.data.set("age", this.age);
    await this.data.set("gender", this.gender);
    this.router.navigate(['complete-task']);
  }


  genderEvent(ev){
    console.log(ev.detail.value);
    this.gender = ev.detail.value;
    
  }

  ageEvent(ev){
    console.log(ev.detail.value);
    this.age = ev.detail.value;
    
  }
}
