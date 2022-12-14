import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  bg = new Howl({
    src: ['assets/background.mp3'],
    html5: true,
    loop: true,
    preload: true,
    autoplay:true
  });


  // success = new Howl({
  //   src: ['assets/success.ogg'],
  //   html5: true
  // });


  constructor() { }


  playBG(){
    console.log("play bg");
    
    this.bg.play();
  }

  // playSuccess(){
  //   this.success.play();
  // }
}
