import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead: boolean = false;
  title = 'todo-app-frontend';

  constructor(private router: Router) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('#')[0];
        if (url === '/login') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });

  }

}
