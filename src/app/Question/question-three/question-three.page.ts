import { AudioService } from './../../audio.service';
import { DataService } from './../../data.service';
import { RelativeSelectPagePage } from './../../relative-select-page/relative-select-page.page';
import { SelectitemsPage } from './../../selectitems/selectitems.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { LanguagePopoverPage } from 'src/app/language-popover/language-popover.page';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.page.html',
  styleUrls: ['./question-three.page.scss'],
})
export class QuestionThreePage implements OnInit {

  yellowOptionSelected;
  orangeOptionSelected;
  redOptionSelected;
  whiteOptionSelected;
  greenOptionSelected;
  dogOptionSelected: any;
  buttonEvent: boolean = true;
  selectedList:any[] = [

  ]

  rList:any[] = [];
  fList:any[] = [];


  relativeCount:number;
  friendCount: number;

  listItems: any;
  positiveItems;
  negativeItems;

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
  allBooks: any[];
  allbonusBooks:any[];
  bonusBooks: any[];
  top200Books: any[];
  top100Books: any[];
  top150Books: any[];
  top50Books: any[];
  top30Books: any[];

  constructor(private router: Router,
    private toastController: ToastController,
    private data: DataService,
    private popoverController: PopoverController,
    private sound: AudioService,
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private booksService: BooksService,
    private alertController: AlertController,
    private modalController: ModalController) {
    // this.listItems = [
    //   "A. Yellow",
    //   "B. Orange",
    //   "C. Red",
    //   "D. White",
    //   "E. Green",
    // ];
    this.listItems = [
      {key: "A. Yellow", value: ""},//0
      {key: "B. Orange", value: ""},//1
      {key: "C. Red", value: ""},//2
      {key: "D. White", value: ""},//3
      {key: "E. Green", value: ""},//4
    ];

    this.booksDoc = this.afs.collection<any>('Books');
    this.tasksDoc = this.afs.collection<any>('Tasks');
   }

  ngOnInit() {
    // this.getBookFromFamilyPrideLoveCareerMoney(15);
  }
  async openLanguagePopOver(event){
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: event
    });

    await popover.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Enter your name',
      subHeader:'As Per AADHAR',
      buttons: [{
        text: "Okay",
        handler: async (value) =>{
          console.log(value);
          let name = value[0];
          await this.data.set("name", name);
    this.sound.buttonClick();
          this.getList();
          
        }
      }],
      inputs: [
        {
          placeholder: 'Name',
          
        },
      ],
    });

    await alert.present();
  }

  async presentAlertEmail() {
    const alert = await this.alertController.create({
      header: 'Enter your email. We will send the report on it',
      buttons: [{
        text: "Okay",
        handler: async (value) =>{
          console.log(value);
          let name = value[0];
          await this.data.set("email", name);
    this.sound.buttonClick();

    this.getList();
          
        }
      }],
      inputs: [
        {
          placeholder: 'Email',
          
        },
      ],
    });

    await alert.present();
  }
  async getList() {
    this.listItems = [
      {key: "A. Yellow", value: this.yellowOptionSelected},//0
      {key: "B. Orange", value: this.orangeOptionSelected},//1
      {key: "C. Red", value: this.redOptionSelected},//2
      {key: "D. White", value: this.whiteOptionSelected},//3
      {key: "E. Green", value: this.greenOptionSelected},//4
    ];
    console.table(this.listItems);
    this.rList = this.selectedList.map(v => v.type === 'r');
    this.fList = this.selectedList.map(v => v.type === 'f');
    // console.log(this.pList);
    // console.log(this.pList.length);
    let relativeCount = this.rList.filter(x => x === true).length;
    let friendCount = this.rList.filter(x => x === false).length;

    console.log(`Relative Count:- ${ relativeCount}`);
    console.log(`Friend Count:- ${ friendCount}`);

    // if(relativeCount < 5 && friendCount < 5){
    //   this.presentToast("You need to answer the above question first.");
    //   return;
    // }
    let rCount = await this.data.set('rCount', relativeCount);
    let fCount = await this.data.set('fCount', friendCount);
    await this.data.set('questionThree', this.listItems);
    this.getDataStored();
  }

  async getBooks() {
    let books = this.booksService.getBooks();
    let bonusBooks = this.booksService.getBonusBooks();
    console.log("Books");
    console.log(this.allBooks);
    
    
    console.log(books);
    console.log("Bonus Books ALL");
    
    console.log(this.allbonusBooks);
    this.sound.buttonClick();
    await this.data.set('books', books);
    await this.data.set('bonusBooks', bonusBooks);
    this.router.navigate(['question-five']);


  }

  async presentModal(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.yellowOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
    //   if(this.selectedList.length == 5){
    // this.sound.buttonClick();
    //     this.buttonEvent = false;
    //     this.presentAlert();

    
    //     }
  
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentModalGreen(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.greenOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
    //   if(this.selectedList.length == 5){
    // this.sound.buttonClick();
    // this.buttonEvent = false;

    //     this.presentAlert();

    
    //     }
  }

  async presentModalOrange(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.orangeOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
    //   if(this.selectedList.length == 5){
    // this.sound.buttonClick();
    // this.buttonEvent = false;

    //     this.presentAlert();

    
    //     }
  }

  async presentModalRed(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.redOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
  
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
    //   if(this.selectedList.length == 5){
    // this.sound.buttonClick();
    // this.buttonEvent = false;

    //     this.presentAlert();

    
    //     }
  }

  async presentModalWhite(item) {
    const modal = await this.modalController.create({
    component: RelativeSelectPagePage,
    componentProps: { value: item }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data);
    this.whiteOptionSelected = data.data['value'];
    if (this.selectedList.includes(data.data)) {
      this.presentToast("You cannot use same words twice.");
      return;
     };
  
  
     
     this.selectedList.push(data.data);
      console.log(this.selectedList.includes(data.data));
      console.log(this.selectedList);
    //   if(this.selectedList.length == 5){
    // this.sound.buttonClick();
    // this.buttonEvent = false;

    //     this.presentAlert();
    
    //     }
  }


  openSelectPage(item){
    console.log(item);
    if(item == "Yellow"){
      this.presentModal(item);

    }
else if(item == "Orange"){
  this.presentModalOrange(item);
}
else if(item == "Red"){
  this.presentModalRed(item)
}else if(item == "White"){
  this.presentModalWhite(item);
}
else if(item == "Green"){
  this.presentModalGreen(item);
}
    // this.router.navigate(['selectitems', item])
    
  }


  async getDataStored() {

    let loading = await this.loadingController.create({
      message:"Loading..."
    })

    await loading.present();
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
    setTimeout(async () =>{
      this.getBooks();
      await loading.dismiss();
    }, 5000)


  }
  random(array) {
    return this[Math.floor((Math.random() * array.length))];
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
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
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REaltive 4 and friend 1");
          
          console.log("1 Bonus Book REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("For Relative 3 and friend 2");
          
          console.log("1 Bonus Book REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("For realtive 2 and friend 3");
          
          console.log("1 Bonus Book REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("For relative 1 and friend 4");
          
          console.log("1 Bonus Book REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("For friend 5");
          
          console.log("1 Bonus book REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }

      //POINT 2


      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(7);

        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;


        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;


        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;


        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;
        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;


        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;


        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;
        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;
        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
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
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
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
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(15);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
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
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
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
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }

      }

      if (this.positiveItems == 4 && this.negativeItems == 1) {
        console.log("get from top 200");
        this.getBooksFromTop200(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      }
      if (this.positiveItems == 3 && this.negativeItems == 2) {
        console.log("get from top 150");
        this.getBooksFromTop150(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      }
      if (this.positiveItems == 2 && this.negativeItems == 3) {
        console.log("get from top 100");
        this.getBooksFromTop100(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      } if (this.positiveItems == 1 && this.negativeItems == 4) {
        console.log("get from top 50");
        this.getBooksFromTop50(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      } if (this.negativeItems == 5) {
        console.log("get from top 30");
        this.getBooksFromTop30(7);
        //Bonus book logic
        if (this.relativeCount == 5) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 4 && this.friendCount == 1) {
          console.log("REsult from pride and careeer");
          this.getBonusBookFromPrideAndCareer(2);
          return;

        }
        if (this.relativeCount == 3 && this.friendCount == 2) {
          console.log("REsult from careeer and money");


          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 2 && this.friendCount == 3) {
          console.log("REsult from careeer and money");
          this.getBonusBookFromCareerAndMoney(2);
          return;

        } if (this.relativeCount == 1 && this.friendCount == 4) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }
        if (this.friendCount == 5) {
          console.log("REsult from family and love");
          this.getBonusBookFromFamilyAndLove(2);
          return;

        }


      }


    }


  }


  getBooksFromTop200(count: number) {
    this.afs.collection('Books', ref => ref.where("top200", "==", true))
    .valueChanges().subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top200Books = bookThree;
      console.log(`top 200 Books`);
      console.log(this.top200Books);
      let arr = [];

      this.top200Books.forEach((el) =>{
        console.log(el);
        
        arr.push(el)
      })

      await this.data.set("200Books", arr);

    })
  }
  getBooksFromTop150(count: number) {
    this.afs.collection('Books', ref => ref.where("top150", "==", true)).valueChanges()
    .subscribe(async(value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top150Books = bookThree;
      console.log(`top 150 Books`);
      console.log(this.top150Books);
     let arr = [];

   this.top150Books.forEach((el) =>{
    console.log(el);
    
    arr.push(el)
  })
  await this.data.set("150Books", arr);

    })
  }
  getBooksFromTop100(count: number) {
    this.afs.collection('Books', ref => ref.where("top100", "==", true)).valueChanges().subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top100Books = bookThree;
      console.log(`top 100 Books`);
      console.log(this.top100Books);
  
      let arr = [];
     this.top100Books.forEach((el) =>{
    console.log(el);

      arr.push(el)
    })

    await this.data.set("100Books", arr);


    })
  }

  getBooksFromTop50(count: number) {
    this.afs.collection('Books', ref => ref.where("top50", "==", true)).valueChanges().subscribe(async(value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top50Books = bookThree;
      console.log(`top 50 Books`);
      console.log(this.top50Books);
    let arr = [];

      this.top50Books.forEach((el) =>{
    console.log(el);

        arr.push(el)
      })

      await this.data.set("50Books", arr);


    })
  }
  getBooksFromTop30(count: number) {
    this.afs.collection('Books', ref => ref.where("top30", "==", true)).valueChanges().
    subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.top30Books = bookThree;
      console.log(`top 30 Books`);
      console.log(this.top30Books);
      let arr = [];

      this.top30Books.forEach((el) =>{
    console.log(el);

        arr.push(el)
      })
      await this.data.set("30Books", arr);



    })
  }
  getBonusBookFromFamilyAndLove(count) {
    this.afs.collection('Books', ref => ref.where("isFamily", "==", true).where("isLove", "==", true)).valueChanges()
    .subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);
      this.bonusBooks = bookThree;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      let arr = [];

      this.bonusBooks.forEach((el) =>{
    console.log(el);

        arr.push(el)
      })

      await this.data.set("BBooks", arr);


    });
  }

  getBonusBookFromCareerAndMoney(count) {
    this.afs.collection('Books', ref => ref.where("isCareer", "==", true).where("isMoney", "==", true)).valueChanges()
    .subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);
      this.bonusBooks = bookThree;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      let arr = [];

      this.bonusBooks.forEach((el) =>{
    console.log(el);

        arr.push(el)
      })

      await this.data.set("BBooks", arr);


    });
  }

  getBonusBookFromPrideAndCareer(count) {
    this.afs.collection('Books', ref => ref.where("isPride", "==", true).where("isCareer", "==", true)).valueChanges()
    .subscribe(async(value) => {
      // console.log(value);
      let bookOne = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.bonusBooks = bookOne;
      console.log(`Bonus Books`);
      console.log(this.bonusBooks);
      let arr = [];

      this.bonusBooks.forEach((el) =>{
    console.log(el);

        arr.push(el)
      })
      await this.data.set("BBooks", arr);


    });
  }

  async getBookFromFamilyPrideLoveCareerMoney(count: number) {
    let books:any[];
    this.afs.collection('Books', ref => ref.where("isFamily", "==", true)).valueChanges().
    subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.familyBooks = bookThree;
      console.log(`Family Books`);
      console.log(bookThree);
      let arr = [];
      bookThree.forEach((el) =>{
    console.log(el);
        arr.push(el)
      })


      console.log(arr);
      await this.data.set("fBooks", arr);
      

    });
    this.afs.collection('Books', ref => ref.where("isPride", "==", true)).valueChanges().subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.prideBooks = bookThree;
      console.log(`Pride Books`);
      console.log(this.prideBooks);
      let arr = [];
      this.prideBooks.forEach((el) =>{
    console.log(el);
        arr.push(el);
      })

      await this.data.set("pBooks", arr);



    });
    this.afs.collection('Books', ref => ref.where("isLove", "==", true)).valueChanges().subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.loveBooks = bookThree;
      console.log(`Love Books`);
      console.log(this.loveBooks);
      let arr = [];

    this.loveBooks.forEach((el) =>{
    console.log(el);

    arr.push(el)
  })
  await this.data.set("lBooks", arr);

  


    });
    this.afs.collection('Books', ref => ref.where("isCareer", "==", true)).valueChanges().subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.careerBooks = bookThree;
      console.log(`Career Books`);
      console.log(this.careerBooks);
      let arr = [];

    this.careerBooks.forEach((el) =>{
    console.log(el);

      arr.push(el)
    })
    await this.data.set("cBooks", arr);




    });

    this.afs.collection('Books', ref => ref.where("isMoney", "==", true)).valueChanges()
    .subscribe(async (value) => {
      // console.log(value);
      let bookThree = value.sort(() => Math.random() - Math.random()).slice(0, count);

      this.moneyBooks = bookThree;
      console.log(`Money Books`);
      console.log(this.moneyBooks);
      let arr = [];

    this.moneyBooks.forEach((el) =>{
    console.log(el);

      arr.push(el)
    })

    await this.data.set("mBooks", arr);



    });

  }

  
}
