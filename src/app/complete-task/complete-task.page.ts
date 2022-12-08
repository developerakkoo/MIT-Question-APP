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

  isTaskCompleted: boolean = false;
  bonusBooks:any[];

  books: any[];
  tasks: any[];

  ageGroup;
  type;
  isFirstTask;

  tasksDoc: AngularFirestoreCollection<any>;
  // tasks: Observable<any>;
  constructor(private data: DataService,
    private iab: InAppBrowser,
    private booksService: BooksService,
    private afs: AngularFirestore,
    private router: Router
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

  openTask(){
    let browser = this.iab.create(this.tasks[0]['taskLink'],"_blank");
    this.isTaskCompleted = true;
    browser.on("exit").subscribe((value) =>{
      console.log(value);
      console.log("Exited");
      
      
    })

    browser.on("message").subscribe((value) =>{
      console.log(value);
      console.log("Message");
      
      
    })
  }

  downloadBook(book){
    this.iab.create(book.EbookLink).show();
  }

}
