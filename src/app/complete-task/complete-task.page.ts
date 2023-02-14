import { AudioService } from './../audio.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { BooksService } from '../services/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.page.html',
  styleUrls: ['./complete-task.page.scss'],
})
export class CompleteTaskPage implements OnInit {
  @ViewChild('btnA', {static: false}) btnA: ElementRef;
  openTaskInterval;
  count:number = 10;
  showTimer: boolean = false;
  secondsInaterval;
  seconds =  60;
  isTaskCompleted: boolean = false;
  isAreYouSureOpen: boolean = false;
  isShareInGroupOpen: boolean = false;
  isShareInGroupChatOpened: boolean = false;
  isSeminarModal: boolean = false;
  bonusBooks:any[] = [
    // {
    //   bookImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5adcab162041559.63cf68c4f0405.jpg'
    // },
    // {
    //   bookImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5adcab162041559.63cf68c4f0405.jpg'
    // },
    // {
    //   bookImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5adcab162041559.63cf68c4f0405.jpg'
    // }
  ];

  fbooks: any[];
  pbooks: any[];
  lbooks: any[];
  cbooks: any[];
  mbooks: any[];
  tasks: any[];
  booksArr = [];
  ageGroup;
  type;
  isFirstTask;

  tasksDoc: AngularFirestoreCollection<any>;
  // tasks: Observable<any>;


  
  slides = {
    // Default parameters
    freeMode: true,
    centeredSlides: true,
    slidesPerView: 1,
    slidesOffsetBefore:11,
    // spaceBetween: 10,
    direction: 'horizontal',
    initialSlide: 0
    // Responsive breakpoints
  
  }
  constructor(private data: DataService,
    private iab: InAppBrowser,
    private alertController: AlertController,
    private booksService: BooksService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private router: Router,
    private sound: AudioService
              ) { 
    this.tasksDoc = this.afs.collection<any>('Tasks');

              }

  async ngOnInit() {
    this.presentAlertModal();
    this.bonusBooks = await  this.data.get('BBooks');
    this.isShareInGroupChatOpened = await this.data.get('isModalLoaded');
    this.type = await this.data.get("gender");
    this.ageGroup = await this.data.get("age");
    this.getTaskBy("indian", this.ageGroup);
    if(this.isShareInGroupChatOpened == true){
      this.isAreYouSureOpen = true;
    }
  }


  async presentAlertModal() {
    const alert = await this.alertController.create({
      header: 'Continue!',
      message: 'Do you want to  <strong>continue?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.modalController.dismiss();
          }
        }
      ]
    });
  
    await alert.present();
  }


  getTaskBy(type, age){
    this.afs.collection('Tasks', ref => ref.where("ageGroup", "==",age).where("isFirstTask", "==", true).where("type", "==", type)).valueChanges().subscribe((value) => {
      console.log(value);
      let bookOne = value.sort(() => Math.random() - Math.random()).slice(0, 1);

      this.tasks = bookOne;
      console.log(`Tasks `);
      console.log(this.tasks);
      // this.booksService.setBonusBooks(this.bonusBooks);



    });
  }

  closeSeminarModal(){
    this.isSeminarModal = false;
  }
  closeShareInGroupModal(){
    this.isShareInGroupOpen = false;
  }

  closeAreYouSure(){
    this.isAreYouSureOpen = false;
  }

  async yesBtn(){
    this.isAreYouSureOpen = false;
    //show the boooks
    this.bonusBooks = await  this.data.get('BBooks');
    this.fbooks = await this.data.get('fBooks');
    this.pbooks = await this.data.get('pBooks');
    this.lbooks = await this.data.get('lBooks');
    this.cbooks = await this.data.get('cBooks');
    this.mbooks = await this.data.get('mBooks');
    this.type = await this.data.get("gender");
    this.ageGroup = await this.data.get("age");
    console.log(this.bonusBooks);
    
    this.fbooks.forEach(el =>{
      this.booksArr.push(el)
    })

    this.pbooks.forEach(el =>{
      this.booksArr.push(el)
    })

    this.lbooks.forEach(el =>{
      this.booksArr.push(el)
    })

    this.cbooks.forEach(el =>{
      this.booksArr.push(el)
    })

    this.mbooks.forEach(el =>{
      this.booksArr.push(el)
    })

    console.log("All Books Array");
    console.log(this.booksArr);
    await this.data.set('isModalLoaded', false);
    setTimeout(() =>{
      this.isSeminarModal = true;
    }, 5000)
    this.openTask();
    
    
  }

  noBtn(){
    this.isShareInGroupOpen = true;
    this.isAreYouSureOpen = false;
  }


  async openWhatsappB(){
    console.log(this.btnA);
    this.btnA.nativeElement.click();
    await this.data.set("isModalLoaded", true);
    this.isShareInGroupChatOpened = true;
    this.openTask();
   
  }
  async presentAlertConfirm() {
    this.isShareInGroupOpen = true;

  }

  async openTask(){
    let loading = await this.loadingController.create({
      message:"Complete the task..."
    })
    await loading.present();
    var options = "location=yes,hidden=yes,beforeload=yes";
    let browser = this.iab.create(this.tasks[0]['taskLink'],"_blank", options);

    this.openTaskInterval = setInterval(async() =>{
      this.count -= 1;
      console.log(this.count);
      
      if(this.count == 0){
    this.isTaskCompleted = true;
    await loading.dismiss();
    this.showTimer = false;

    clearInterval(this.openTaskInterval);

      }
    }, 1000)

  }

  downloadBook(book){
    this.sound.buttonClick();

    this.iab.create(book.EbookLink).show();
  }

}
