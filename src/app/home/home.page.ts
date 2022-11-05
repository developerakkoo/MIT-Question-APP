import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  booksYear:any[] = [
    {
      name: "Rich Dad Poor Dad",
      image: "assets/richdadpoordad.jpg"
    }
    ,
    {
      name: "Rich Dad Poor Dad",
      image: "assets/richdadpoordad.jpg"
    },
    {
      name: "Rich Dad Poor Dad",
      image: "assets/richdadpoordad.jpg"
    }
  ]
  constructor() {}

}
