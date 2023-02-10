import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  bonusBooksArray: any[];

  booksArray: any[];

  constructor() { }

  setBooks(book: any){
    this.booksArray = book;
    console.log("Books Service");

    console.log(this.booksArray);
    
  }

  getBooks(){
    return this.booksArray || [];
  }

  setBonusBooks(bonusBooks: any){
    this.bonusBooksArray = bonusBooks;
    console.log(bonusBooks);
    console.log("Bonus books set");
    
    
  }
  getBonusBooks(){
    return this.bonusBooksArray || [];
  }
}
