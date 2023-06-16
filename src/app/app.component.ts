import {Component, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead: boolean = false;
  showFooter: boolean = false;
  title = 'todo-app-frontend';
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  headerHeight = 0;

  constructor(private router: Router) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('#')[0];
        if (url.startsWith('/login')) {
          this.showHead = false;
          this.showFooter = false;
        } else {
          this.showHead = true;
          this.showFooter = true;
        }
      }
    });

  }


}


