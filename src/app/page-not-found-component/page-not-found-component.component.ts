import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import anime from 'animejs/lib/anime.es';
// import * as anime from 'animejs'

@Component({
  selector: 'app-page-not-found-component',
  templateUrl: './page-not-found-component.component.html',
  styleUrls: ['./page-not-found-component.component.css']
})
export class PageNotFoundComponentComponent{

  constructor(private appComponent: AppComponent) {
    this.appComponent.showHead = false;




  }




}

