import { LoadingController } from '@ionic/angular';
import { AudioService } from './../../audio.service';
import { BooksService } from './../../services/books.service';
import { DataService } from './../../data.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import * as confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';

import { Email } from "../../../assets/icon/smtp.js"; //file path may change → 
declare let Email: any;

import * as CanvasJS from './../../../assets/canvasjs.min.js';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// CanvasJS.addColorSet("customColorSet1",["#ffcb06", "#ce1249", "#3a943c","#df7f2e", "#e3e3e3"]);
// CanvasJS.set("theme", "light2");
@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.page.html',
  styleUrls: ['./question-four.page.scss'],
})
export class QuestionFourPage implements OnInit {

  @ViewChild('doc', { read: ElementRef }) pdfTable: ElementRef;
  listItems: any;
  positiveItems;
  negativeItems;
  relativeCount;
  friendCount;

  questionOne;
  questionTwo;
  questionThree;

  username;
  email;

  valueOne;
  valueTwo;
  valueThree;
  valueFour;
  valueFive;


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

  wordOne;
  wordTwo;
  wordThree;
  wordFour;
  wordFive;
  wordList;
  public clicked = false;
  interval;
  confettiInterval;

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

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  bonusBooks: any[];
  top200Books: any[];
  top100Books: any[];
  top150Books: any[];
  top50Books: any[];
  top30Books: any[];


  constructor(private router: Router,
    private iab: InAppBrowser,
    private data: DataService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private booksService: BooksService,
    private sound: AudioService,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private afs: AngularFirestore) {
    this.booksDoc = this.afs.collection<any>('Books');
    this.tasksDoc = this.afs.collection<any>('Tasks');


  }

  ngOnInit() {

    this.getDataStored();
  }

  ionViewDidEnter() {

  }


  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }


  sendmail(fileurl) {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'labyrinththemind@gmail.com',
      Password: 'BCF20BC019EF4CE7AFF2C12FD7759769DCC9',
      To:"labyrinththemind@gmail.com",
      From: `labyrinththemind@gmail.com`,
      Subject: "Your Analysis Report From Mind Labyrinth.",
      Body: `
      <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>${"Akshy"} <br /> <b>Email: </b>akshay@gmai..com<br /> <b>Subject: </b><br /> <b>Message:</b> <br /><br><br> <b>~End of Message.~</b> `
      , Attachments: [
        {
          name: "Report.pdf",
          path: fileurl
        }]

    }).then(message => { alert(message); });

  }



  async getDataStored() {


    this.positiveItems = await this.data.get('pCount');
    this.negativeItems = await this.data.get('nCount');
    this.relativeCount = await this.data.get('rCount');
    this.friendCount = await this.data.get('fCount');
    this.key = await this.data.get('key');

    this.username = await this.data.get('name');
    this.email = await this.data.get('email');
    this.questionOne = await this.data.get('questionOne');
    this.valueOne = this.questionOne[0]['value'];
    this.valueTwo = this.questionOne[1]['value'];
    this.valueThree = this.questionOne[2]['value'];
    this.valueFour = this.questionOne[3]['value'];
    this.valueFive = this.questionOne[4]['value'];
    // this.questionTwo = await this.data.get('questionTwo');

    this.wordList = await this.data.get('wordList');
    this.wordOne = await this.wordList[0]['value'];
    this.wordTwo = await this.wordList[1]['value'];
    this.wordThree = await this.wordList[2]['value'];
    this.wordFour = await this.wordList[3]['value'];
    this.wordFive = await this.wordList[4]['value'];
    this.questionThree = await this.data.get('questionThree');

    console.log("Positive count:- " + this.positiveItems);
    console.log("Negative Count:- " + this.negativeItems);
    // this.dogValue = this.questionTwo[0]['value'];
    // this.catValue = this.questionTwo[1]['value'];
    // this.ratValue = this.questionTwo[2]['value'];
    // this.coffeeValue = this.questionTwo[3]['value'];
    // this.seaValue = this.questionTwo[4]['value'];

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

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }



  public surprise() {

    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, angle: 60, spread: 360, ticks: 60, zIndex: 1000, resize: true };
    var timeLeft = animationEnd - Date.now();
    var particleCount = 2;
    const canvas = document.getElementById('canvas');

    // this.renderer2.appendChild(this.elementRef.nativeElement, canvas);



    const myConfetti = confetti.create(canvas, { angle: 60, spread: 50, particleCount: 2, zIndex: 1000, resize: true, useWorker: true, origin: { x: 0 } });

    this.confettiInterval = setInterval(() => {
      myConfetti();
      // myConfetti2();
    }, 3000)

    this.clicked = true;
  }

  async downloadResult() {
    console.log("Download");
    const doc = new jsPDF();

    let loading = await this.loadingController.create({
      message:"Creating pdf..."
    })

    await loading.present();
    const pdfTable = this.pdfTable.nativeElement;
    console.log(pdfTable);



    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {
      content: html,
      // image: this.getBase64ImageFromURL('./../../../assets/Empty-template-middle-page.jpg')

    };

    this.sound.buttonClick();

    const pdf = await pdfMake.createPdf(documentDefinition);
    pdf.getBlob((blob) => {
      console.log(blob);
      let file = this.blobToFile(blob, "report.pdf")
      console.log(file);
      const filePath = `reports/${this.username}.pdf`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(async (url) =>{
              console.log(url);
              await loading.dismiss();
              this.sendmail(url);

              
            })
          } )
       )
      .subscribe((url) =>{
             
      })
    })

    
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
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
      console.log("FOR YEAR");
      
      console.log("3 Books from Family, Pride, Love , Career, Money");
      this.getBookFromFamilyPrideLoveCareerMoney(3);
      if (this.positiveItems == 5) {
        console.log("Year and 5 positive run same filter");
        this.getBookFromFamilyPrideLoveCareerMoney(3);

        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("For Relative count 5");
          
          console.log("1 Bonus Book REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REaltive 4 and friend 1");
          
          console.log("1 Bonus Book REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(1);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("For Relative 3 and friend 2");
          
          console.log("1 Bonus Book REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("For realtive 2 and friend 3");
          
          console.log("1 Bonus Book REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(1);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("For relative 1 and friend 4");
          
          console.log("1 Bonus Book REsult from family and love");
          this.getBonusBookFromFamilyAndLove(1);
          return;

        }
        if (this.friendCount == 5) {
          console.log("For friend 5");
          
          console.log("1 Bonus book REsult from family and love");
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
      this.getBookFromFamilyPrideLoveCareerMoney(1);
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

  async getList() {
    let books = this.booksService.getBooks();
    let bonusBooks = this.booksService.getBonusBooks();
    console.log("Books");
    
    console.log(books);
    console.log("Bonus Books");
    
    console.log(bonusBooks);
    this.sound.buttonClick();
    await this.data.set('books', books);
    await this.data.set('bonusBooks', bonusBooks);
    this.router.navigate(['question-five']);


  }


  
}
