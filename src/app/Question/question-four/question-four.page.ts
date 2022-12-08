import { BooksService } from './../../services/books.service';
import { DataService } from './../../data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.page.html',
  styleUrls: ['./question-four.page.scss'],
})
export class QuestionFourPage implements OnInit {

  @ViewChild('pdfTable', {read: ElementRef}) pdfTable: ElementRef;
  listItems: any;
  positiveItems;
  negativeItems;
  relativeCount;
  friendCount;

  questionOne;
  questionTwo;
  questionThree;

  dogValue;
  catValue;
  ratValue;
  coffeeValue;
  seaValue;

  yellowValue;
  redValue;
  orangeValue;
  whiteValue;
  greenValue;


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


  bonusBooks: any[];
  top200Books: any[];
  top100Books: any[];
  top150Books: any[];
  top50Books: any[];
  top30Books: any[];
  constructor(private router: Router,
    private iab: InAppBrowser,
    private data: DataService,
    private booksService: BooksService,
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
    this.relativeCount = await this.data.get('rCount');
    this.friendCount = await this.data.get('fCount');
    this.key = await this.data.get('key');
    this.questionOne = await this.data.get('questionOne');
    this.questionTwo = await this.data.get('questionTwo');
    this.questionThree = await this.data.get('questionThree');
    // console.log(`Book For ${this.key}`);
    // console.log(`Question One:- ${this.questionOne}`);
    // this.questionOne.forEach(element => {
    //   console.log(element);

    // });
    console.log("Positive count:- " + this.positiveItems);
    console.log("Negative Count:- " + this.negativeItems);
    this.dogValue = this.questionTwo[0]['value'];
    this.catValue = this.questionTwo[1]['value'];
    this.ratValue = this.questionTwo[2]['value'];
    this.coffeeValue = this.questionTwo[3]['value'];
    this.seaValue = this.questionTwo[4]['value'];

    this.yellowValue = this.questionThree[0]['value'];
    this.orangeValue = this.questionThree[1]['value'];
    this.redValue = this.questionThree[2]['value'];
    this.whiteValue = this.questionThree[3]['value'];
    this.greenValue = this.questionThree[4]['value'];

    this.logic();


  }
  random(array) {
    return this[Math.floor((Math.random() * array.length))];
  }


  downloadResult(){
    console.log("Download");
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
    console.log(pdfTable);
    
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
  
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
  }

  getBooksFromDB(isFamily, isMoney, isPride, isCareer, isLove, bookCount) {
    this.afs.collection('Books', ref => ref.where("isFamily", "==", isFamily)
      .where("isPride", "==", isPride)
      .where("isCareer", "==", isCareer)
      .where("isLove", "==", isLove))
      .valueChanges().subscribe((value) => {
        console.log(value);
        let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, bookCount);

        this.familyBooks = bookThree;
        console.log(`Family Books`);
        console.log(this.familyBooks);


      })
  }

  logic() {
    let key = this.key;
    if (key == "Year") {
      console.log("3 Books from Family, Pride, Love , Career, Money");
      if (this.positiveItems == 5) {
        console.log("year and 5 positive run same filter");
        this.getBookFromFamilyPrideLoveCareerMoney(3);

        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }

      //POINT 2


      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);

        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;


        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;


        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;


        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;
        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;


        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;


        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;
        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }


    } else if (key == "Month") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      if (this.positiveItems == 5) {
        console.log("year and 5 positive run same filter");
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }


    } else if (key == "Week") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      this.getBookFromFamilyPrideLoveCareerMoney(1);
      if (this.positiveItems == 5) {
        console.log("year and 5 positive run same filter");
        this.getBookFromFamilyPrideLoveCareerMoney(1);


        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }


    } else if (key == "Day") {
      console.log("1 Books from Family, Pride, Love , Career, Money");
      this.getBookFromFamilyPrideLoveCareerMoney(1);
      if (this.positiveItems == 5) {
        console.log("year and 5 positive run same filter");
      this.getBookFromFamilyPrideLoveCareerMoney(1);

        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }

    } else if (key == "Life") {
      console.log("2 Books from Family, Pride, Love , Career, Money");
      this.getBookFromFamilyPrideLoveCareerMoney(2);
      if (this.positiveItems == 5) {
        console.log("year and 5 positive run same filter");
      this.getBookFromFamilyPrideLoveCareerMoney(2);



        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }


      }


    }


  }


  getBooksFromTop200(count: number) {
    this.afs.collection('Books', ref => ref.where("top200", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top200Books = bookThree;
      console.log(`top 200 Books`);
      console.log(this.top200Books);
      this.booksService.setBooks(this.top200Books);
    })
  }
  getBooksFromTop150(count: number) {
    this.afs.collection('Books', ref => ref.where("top150", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top150Books = bookThree;
      console.log(`top 150 Books`);
      console.log(this.top150Books);
      this.booksService.setBooks(this.top150Books);

    })
  }
  getBooksFromTop100(count: number) {
    this.afs.collection('Books', ref => ref.where("top100", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top100Books = bookThree;
      console.log(`top 100 Books`);
      console.log(this.top100Books);
      this.booksService.setBooks(this.top100Books);


    })
  }

  getBooksFromTop50(count: number) {
    this.afs.collection('Books', ref => ref.where("top50", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top50Books = bookThree;
      console.log(`top 50 Books`);
      console.log(this.top50Books);
      this.booksService.setBooks(this.top50Books);


    })
  }
  getBooksFromTop30(count: number) {
    this.afs.collection('Books', ref => ref.where("top30", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top30Books = bookThree;
      console.log(`top 30 Books`);
      console.log(this.top30Books);
      this.booksService.setBooks(this.top30Books);


    })
  }
  getBonusBookFromFamilyAndLove(count) {
    this.afs.collection('Books', ref => ref.where("isFamily", "==", true).where("isLove", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);
      this.bonusBooks = bookThree;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      this.booksService.setBonusBooks(this.bonusBooks);

    });
  }

  getBonusBookFromCareerAndMoney(count) {
    this.afs.collection('Books', ref => ref.where("isCareer", "==", true).where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);
      this.bonusBooks = bookThree;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      this.booksService.setBonusBooks(this.bonusBooks);


    });
  }

  getBonusBookFromPrideAndCareer(count) {
    this.afs.collection('Books', ref => ref.where("isPride", "==", true).where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookOne = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.bonusBooks = bookOne;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      this.booksService.setBonusBooks(this.bonusBooks);



    });
  }

  getBookFromFamilyPrideLoveCareerMoney(count: number) {
    this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.familyBooks = bookThree;
      console.log(`Family Books`);
      console.log(this.familyBooks);
      this.booksService.setBooks(this.familyBooks);
      


    });
    this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.prideBooks = bookThree;
      console.log(`Pride Books`);
      console.log(this.prideBooks);
      this.booksService.setBooks(this.prideBooks);



    });
    this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.loveBooks = bookThree;
      console.log(`Love Books`);
      console.log(this.loveBooks);
      this.booksService.setBooks(this.loveBooks);



    });
    this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.careerBooks = bookThree;
      console.log(`Career Books`);
      console.log(this.careerBooks);
      this.booksService.setBooks(this.careerBooks);



    });

    this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges().subscribe((value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.moneyBooks = bookThree;
      console.log(`Money Books`);
      console.log(this.moneyBooks);
      this.booksService.setBooks(this.moneyBooks);



    });
  }

  getList() {
    let books = this.booksService.getBooks();
    let bonusBooks = this.booksService.getBonusBooks();
    console.log(books);
    console.log(bonusBooks);
    this.router.navigate(['question-five']);
    
    
   }
}
