import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const APIURL = "https://quotable.io/quotes";
@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  quotes:any[];
  constructor(private http: HttpClient) { }


  getQuotes(){
    return this.http.get(APIURL);
  }
}
