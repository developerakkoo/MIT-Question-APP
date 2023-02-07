import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  bg = new Howl({
    src: ['assets/background.mp3'],
    html5: true,
    loop: false,
    preload: true,
    autoplay:true,
    volume: 0.5
  });


  success = new Howl({
    src: ['assets/success.ogg'],
    html5: true,
    preload: true,

  });


  click = new Howl({
    src: ['assets/cork-85200.mp3'],
    html5: true,
    preload: true,

  });


  constructor() { }


  playBG(){
    console.log("play bg");
    
    this.bg.play();
  }

  playSuccess(){
    this.success.play();
  }


  buttonClick(){
    this.click.play(); 
  }
}
