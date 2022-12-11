import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  bg = new Howl({
    src: ['assets/background.mp3'],
    html5: true
  });
  success = new Howl({
    src: ['assets/success.ogg'],
    html5: true
  });


  constructor() { }


  playBG(){
    this.bg.play();
  }

  playSuccess(){
    this.success.play();
  }
}
