import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
   }

  init(){
    this.storage.create();
  }

  set(key, value){
    return this.storage.set(key, value);
  }

  get(key){
    return this.storage.get(key);
  }

  remove(key){
    return this.storage.remove(key);
  }

  clear(){
    this.storage.clear();
  }
}
