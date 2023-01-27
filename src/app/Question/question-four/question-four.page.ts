import { AudioService } from './../../audio.service';
import { BooksService } from './../../services/books.service';
import { DataService } from './../../data.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';

import {Email} from "../../../assets/icon/smtp.js"; //file path may change → 
declare let Email: any;

import * as CanvasJS from './../../../assets/canvasjs.min.js';
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


  bonusBooks: any[];
  top200Books: any[];
  top100Books: any[];
  top150Books: any[];
  top50Books: any[];
  top30Books: any[];

  chartOptionsPie = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: "Social Media Engagement"
    },
    data: [{
      type: "pie",
      startAngle: 45,
      indexLabel: "{name}: {y}",
      indexLabelPlacement: "inside",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 21.3, name: "Facebook" },
        { y: 27.7, name: "Instagram" },
        { y: 17, name: "Twitter" },
        { y: 14.9, name: "LinkedIn" },
        { y: 10.6, name: "Pinterest" },
        { y: 8.5, name: "Others" }
      ]
    }]
  }

  chartOptionsPyramid = {
    animationEnabled: true,
    theme: "light2",
    title: {
      // text: "Product Manufacturing Expenses"
    },
    data: [{
      type: "pyramid",
      indexLabelFontSize: 18,
      showInLegend: true,
      legendText: "{indexLabel}",
      toolTipContent: "{indexLabel}: {y}%",
      dataPoints: [
        // { y: 20, indexLabel: "Research and Design" },
        // { y: 20, indexLabel: "Manufacturing" },
        // { y: 20, indexLabel: "Marketing" },
        // { y: 20, indexLabel: "Shipping" },
        // { y: 20, indexLabel: "Retail" }
      ]
    }]
  }
  constructor(private router: Router,
    private iab: InAppBrowser,
    private data: DataService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private booksService: BooksService,
    private sound: AudioService,
    private afs: AngularFirestore) {
    this.booksDoc = this.afs.collection<any>('Books');
    this.tasksDoc = this.afs.collection<any>('Tasks');

    
  }

  ngOnInit() {

    this.getDataStored();
  }
  
  ionViewDidEnter() {
    
  }


  plotChart() {
    
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      data: [
        {
          type: "pyramid",
          indexLabelFontSize: 18,
          indexLabelPlacement: "inside",
          // showInLegend: true,
          // legendText: "{label}",
          // toolTipContent: "{label}: {y}%",
          dataPoints: [
            { label: this.valueFive, y:20 },
            { label: this.valueFour, y: 20 },
            { label: this.valueThree, y:20 },
            { label: this.valueTwo, y: 20 },
            { label: this.valueOne, y: 20 }
          ]
        }
      ]
    });
    chart.render();

    let barChart = new CanvasJS.Chart("barContainer", {
      theme: "light2",
      // colorSet:  "customColorSet1",

      data: [{
        type: "pie",
        startAngle: 45,
        indexLabel: "{name}: {y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 20, name: this.username + " " + "will never forget " + this.yellowValue  },
          { y: 20, name: this.username + " really loves "+ this.redValue },
          { y: 20, name: this.username + " will never forget "+  this.greenValue + " for the rest of the life"},
          { y: 20, name: this.orangeValue + " is "+ this.username + " true friend"},
          { y: 20, name: this.whiteValue + " is "+ this.username+ " twin soul" },
        ]
      }]
    });
    barChart.render();

    // let doChart = new CanvasJS.Chart("donutContainer", {
    //   theme: "light2",
    //   colorSet:  "customColorSet1",

    //   data: [{
    //     type: "doughnut",
    //     startAngle: 45,
    //     indexLabel: "{name}: {y}",
    //     indexLabelPlacement: "inside",
    //     yValueFormatString: "#,###.##'%'",
    //     dataPoints: [
    //       { y: 20, name: this.username + " " + "will never forget " + this.yellowValue  },
    //       { y: 20, name: this.username + " really loves "+ this.redValue },
    //       { y: 20, name: this.username + " will never forget "+  this.greenValue + " for the rest of the life"},
    //       { y: 20, name: this.orangeValue + " is "+ this.username + " true friend"},
    //       { y: 20, name: this.whiteValue + " is "+ this.username+ " twin soul" },
    //     ]
    //   }]
    // });
    // doChart.render();

  }

  sendmail(){
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'developerakshayjadhav@gmail.com',
      Password : 'BADE58F6BACE5661AF70523FC088DEF975A0',
      To : this.email,
      From : `developerakshayjadhav@gmail.com`,
      Subject : "subject",
      Body : `
      <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>${"Akshy"} <br /> <b>Email: </b>akshay@gmai..com<br /> <b>Subject: </b><br /> <b>Message:</b> <br /><br><br> <b>~End of Message.~</b> `
      ,Attachments : [
        {
          name : "Report.pdf",
          path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
        }]  
    
    }).then( message => {alert(message); } );
        
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
    this.plotChart();
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

  downloadResult() {
    console.log("Download");
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;
    console.log(pdfTable);
    // pdfMake.fonts = {
    //   Roboto: {
    //   normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    //   bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    //   italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    //   bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    //   }};


    // var html = htmlToPdfmake(pdfTable.innerHTML, {ignoreStyles:['font-family']});

    // const documentDefinition = { content: html,
    //   defaultStyle: {
    //     font: "Helvetica",
    // }
    
    // };
    var dataUrl = pdfTable.toDataURL();
    // doc.addImage(dataURL, 'JPEG', 0, 0);
    doc.save("download.pdf");
    this.sound.buttonClick();

    // pdfMake.createPdf(documentDefinition).open();
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
    this.sound.buttonClick();

    this.router.navigate(['question-five']);


  }
}
