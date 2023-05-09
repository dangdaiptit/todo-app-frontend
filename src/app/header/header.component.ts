import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ChangeEmailUserComponent } from '../change-email-user/change-email-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public authService: AuthService, public dialog: MatDialog) {

  }

  getUsername() {
    return localStorage.getItem('username');
  }


  openDialog() {
    const dialogRef = this.dialog.open(ChangeEmailUserComponent, {
      width: '60%',
    });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }






}


