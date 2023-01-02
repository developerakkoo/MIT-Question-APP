import { AudioService } from './../audio.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
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

  openTaskInterval;
  count:number = 1;

  isTaskCompleted: boolean = false;
  bonusBooks:any[];

  books: any[];
  tasks: any[];

  ageGroup;
  type;
  isFirstTask;

  tasksDoc: AngularFirestoreCollection<any>;
  // tasks: Observable<any>;

  slides = {
    // Default parameters
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore:11,
    spaceBetween: 10,
    direction: 'horizontal',
    initialSlide: 0
    // Responsive breakpoints
  
  }
  constructor(private data: DataService,
    private iab: InAppBrowser,
    private alertController: AlertController,
    private booksService: BooksService,
    private afs: AngularFirestore,
    private router: Router,
    private sound: AudioService
              ) { 
    this.tasksDoc = this.afs.collection<any>('Tasks');

              }

  ngOnInit() {
    this.bonusBooks = this.booksService.getBonusBooks();
    this.books = this.booksService.getBooks();
    console.log(this.bonusBooks);
    console.log(this.books);
    this.getTaskBy("indian", "above18");
    
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Please complete the task within<strong> 60 seconds</strong> to unlock!!!',
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
            console.log('Confirm Okay');
    this.sound.buttonClick();

            this.openTask();
          }
        }
      ]
    });
  
    await alert.present();
  }

  openTask(){
    var options = "location=yes,hidden=yes,beforeload=yes";
    let browser = this.iab.create(this.tasks[0]['taskLink'],"_blank", options);

    this.openTaskInterval = setInterval(() =>{
      this.count += 1;
      console.log(this.count);
      
      if(this.count == 60){
    this.isTaskCompleted = true;
    clearInterval(this.openTaskInterval);

      }
    }, 1000)

  }

  downloadBook(book){
    this.sound.buttonClick();

    this.iab.create(book.EbookLink).show();
  }

}
