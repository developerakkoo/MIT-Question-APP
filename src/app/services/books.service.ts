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
  }

  getBooks(){
    return this.booksArray || [];
  }

  setBonusBooks(bonusBooks: any){
    this.bonusBooksArray = bonusBooks;
  }
  getBonusBooks(){
    return this.bonusBooksArray || [];
  }
}
