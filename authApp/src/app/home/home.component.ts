import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  welcome = [
    'Hello!',
    'Welcome to My Angular Authentication Application',

  ]
  constructor() {}

  ngOnInit(): void {
    console.log(this.welcome)
  }
}
