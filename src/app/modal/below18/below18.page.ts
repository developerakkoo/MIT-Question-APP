import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-below18',
  templateUrl: './below18.page.html',
  styleUrls: ['./below18.page.scss'],
})
export class Below18Page implements OnInit {

  @ViewChild('btn', {static: false}) btn: ElementRef;
  email;
  number;
  name;
  age;
  gender;
  occupation;
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private modalController: ModalController,
              private afs: AngularFirestore,
              private router: Router,
              private data: DataService) {
                this.itemsCollection = afs.collection<any>('profiles');
                this.items = this.itemsCollection.valueChanges();
               }

  async ngOnInit() {
    this.age = await this.data.get("age");
    this.email = await this.data.get("email");
    this.number = await this.data.get("number");
    this.occupation = await this.data.get("occupation");
    this.gender = await this.data.get("gender");
    this.name = await this.data.get("name");
    this.add();
  }
  dismiss(){
    this.modalController.dismiss();
  }
  add(){
    let id = this.afs.createId();
    let obj = {
      name: this.name,
      email: this.email,
      number: this.number,
      age: this.age,
      gender: this.gender,
      occupation: this.occupation
    }
    this.itemsCollection.doc(id).set({...obj, key: id}).then((data) =>{
      console.log(data);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  openWhatsapp(btn){
    console.log(this.btn);
    this.btn.nativeElement.click();
    this.dismiss();
    this.router.navigate(['complete-task'])

    
  }
}
