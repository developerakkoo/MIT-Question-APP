import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.page.html',
  styleUrls: ['./question-four.page.scss'],
})
export class QuestionFourPage implements OnInit {


  listItems: any;
  positiveItems;
  negativeItems;

  questionOne;
  questionThree;

  key: string;
  booksDoc: AngularFirestoreCollection<any>;
  books: Observable<any>;

  tasksDoc: AngularFirestoreCollection<any>;
  tasks: Observable<any>;

  familyBooks: any[];
  prideBooks: any[];
  careerBooks: any[];
  moneyBooks: any[];
  loveBooks: any[];
  constructor(private router: Router,
    private iab: InAppBrowser,
    private data: DataService,
    private afs: AngularFirestore) {
    this.booksDoc = this.afs.collection<any>('Books');
    this.tasksDoc = this.afs.collection<any>('Tasks');
    // this.books = this.booksDoc.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );

    // this.tasks = this.tasksDoc.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );

  }

  ngOnInit() {
    this.getDataStored();
  }

  async getDataStored() {
    this.positiveItems = await this.data.get('pCount');
    this.negativeItems = await this.data.get('nCount');
    this.key = await this.data.get('key');
    this.questionOne = await this.data.get('questionOne');
    this.questionThree = await this.data.get('questionThree');
    // console.log(`Book For ${this.key}`);
    // console.log(`Question One:- ${this.questionOne}`);
    // this.questionOne.forEach(element => {
    //   console.log(element);

    // });
    console.log("Positive count:- " +this.positiveItems);
    console.log("Negative Count:- " + this.negativeItems);
    // console.log(`Question Three:- `);
    this.questionThree.forEach(element => {
      // console.log(element);

    });

    this.logic();


  }
  random(array) {
    return this[Math.floor((Math.random() * array.length))];
  }

  logic() {
    let key = this.key;
    if (key == "Year") {
      console.log("3 Books from Family, Pride, Love , Career, Money");
      if(this.positiveItems == 5){
        console.log("year and 5 positive run same filter");
        
      }

      if(this.positiveItems == 4 && this.negativeItems == 1){
        console.log("get from top 200");
        
      }
      if(this.positiveItems == 3 && this.negativeItems == 2){
        console.log("get from top 150");
        
      }
      if(this.positiveItems == 2 && this.negativeItems == 3){
        console.log("get from top 100");
        
      }if(this.positiveItems == 1 && this.negativeItems == 4){
        console.log("get from top 50");
        
      }if(this.negativeItems == 5){
        console.log("get from top 30");
        
      }
      // this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 3);

      //   this.familyBooks = bookThree;
      //   console.log(`Family Books`);
      //   console.log(this.familyBooks);
      

      // })

      // this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 3);
      //   this.prideBooks = bookThree;
      //   console.log(`Pride Books`);
      //   console.log(this.prideBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 3);

      //   this.moneyBooks = bookThree;
      //   console.log(`Money Books`);
      //   console.log(this.moneyBooks);

      // })
      // this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 3);

      //   this.careerBooks = bookThree;

      //   console.log(`Career Books`);
      //   console.log(this.careerBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 3);

      //   this.loveBooks = bookThree;
      //   console.log(`Love Books`);
      //   console.log(this.loveBooks);


      // })

    } else if (key == "Month") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      if(this.positiveItems == 5){
        console.log("year and 5 positive run same filter");
        
      }

      if(this.positiveItems == 4 && this.negativeItems == 1){
        console.log("get from top 200");
        
      }
      if(this.positiveItems == 3 && this.negativeItems == 2){
        console.log("get from top 150");
        
      }
      if(this.positiveItems == 2 && this.negativeItems == 3){
        console.log("get from top 100");
        
      }if(this.positiveItems == 1 && this.negativeItems == 4){
        console.log("get from top 50");
        
      }if(this.negativeItems == 5){
        console.log("get from top 30");
        
      }
      // this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.familyBooks = bookThree;
      //   console.log(`Family Books`);
      //   console.log(this.familyBooks);
      

      // })

      // this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);
      //   this.prideBooks = bookThree;
      //   console.log(`Pride Books`);
      //   console.log(this.prideBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.moneyBooks = bookThree;
      //   console.log(`Money Books`);
      //   console.log(this.moneyBooks);

      // })
      // this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.careerBooks = bookThree;

      //   console.log(`Career Books`);
      //   console.log(this.careerBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.loveBooks = bookThree;
      //   console.log(`Love Books`);
      //   console.log(this.loveBooks);


      // })

    } else if (key == "Week") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      if(this.positiveItems == 5){
        console.log("year and 5 positive run same filter");
        
      }

      if(this.positiveItems == 4 && this.negativeItems == 1){
        console.log("get from top 200");
        
      }
      if(this.positiveItems == 3 && this.negativeItems == 2){
        console.log("get from top 150");
        
      }
      if(this.positiveItems == 2 && this.negativeItems == 3){
        console.log("get from top 100");
        
      }if(this.positiveItems == 1 && this.negativeItems == 4){
        console.log("get from top 50");
        
      }if(this.negativeItems == 5){
        console.log("get from top 30");
        
      }
      // this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.familyBooks = bookThree;
      //   console.log(`Family Books`);
      //   console.log(this.familyBooks);
      

      // })

      // this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);
      //   this.prideBooks = bookThree;
      //   console.log(`Pride Books`);
      //   console.log(this.prideBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.moneyBooks = bookThree;
      //   console.log(`Money Books`);
      //   console.log(this.moneyBooks);

      // })
      // this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.careerBooks = bookThree;

      //   console.log(`Career Books`);
      //   console.log(this.careerBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.loveBooks = bookThree;
      //   console.log(`Love Books`);
      //   console.log(this.loveBooks);


      // })

    } else if (key == "Day") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      if(this.positiveItems == 5){
        console.log("year and 5 positive run same filter");
        
      }

      if(this.positiveItems == 4 && this.negativeItems == 1){
        console.log("get from top 200");
        
      }
      if(this.positiveItems == 3 && this.negativeItems == 2){
        console.log("get from top 150");
        
      }
      if(this.positiveItems == 2 && this.negativeItems == 3){
        console.log("get from top 100");
        
      }if(this.positiveItems == 1 && this.negativeItems == 4){
        console.log("get from top 50");
        
      }if(this.negativeItems == 5){
        console.log("get from top 30");
        
      }
      // this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.familyBooks = bookThree;
      //   console.log(`Family Books`);
      //   console.log(this.familyBooks);
      

      // })

      // this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);
      //   this.prideBooks = bookThree;
      //   console.log(`Pride Books`);
      //   console.log(this.prideBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.moneyBooks = bookThree;
      //   console.log(`Money Books`);
      //   console.log(this.moneyBooks);

      // })
      // this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.careerBooks = bookThree;

      //   console.log(`Career Books`);
      //   console.log(this.careerBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      //   this.loveBooks = bookThree;
      //   console.log(`Love Books`);
      //   console.log(this.loveBooks);


      // })

    } else if (key == "Life") {
      console.log("2 Books from Family, Pride, Love , Career, Money");
      if(this.positiveItems == 5){
        console.log("year and 5 positive run same filter");
        
      }

      if(this.positiveItems == 4 && this.negativeItems == 1){
        console.log("get from top 200");
        
      }
      if(this.positiveItems == 3 && this.negativeItems == 2){
        console.log("get from top 150");
        
      }
      if(this.positiveItems == 2 && this.negativeItems == 3){
        console.log("get from top 100");
        
      }if(this.positiveItems == 1 && this.negativeItems == 4){
        console.log("get from top 50");
        
      }if(this.negativeItems == 5){
        console.log("get from top 30");
        
      }
      // this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 2);

      //   this.familyBooks = bookThree;
      //   console.log(`Family Books`);
      //   console.log(this.familyBooks);
      

      // })

      // this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 2);
      //   this.prideBooks = bookThree;
      //   console.log(`Pride Books`);
      //   console.log(this.prideBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 2);

      //   this.moneyBooks = bookThree;
      //   console.log(`Money Books`);
      //   console.log(this.moneyBooks);

      // })
      // this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 2);

      //   this.careerBooks = bookThree;

      //   console.log(`Career Books`);
      //   console.log(this.careerBooks);

      // })

      // this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      //   console.log(value);
      //   let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, 2);

      //   this.loveBooks = bookThree;
      //   console.log(`Love Books`);
      //   console.log(this.loveBooks);


      // })

    }
  }


  getList() { }
}
