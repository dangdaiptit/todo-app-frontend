import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  hide = true;
  hidec = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  username: string;
  password: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';





  constructor(private authService: AuthService, private router: Router) {

  }

  handeLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: data => {
        console.log("login success!");
        console.log(data.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/todos']);
      },

      error: err => {
        console.log("login false!");
        this.isLoginFailed = true;
        this.errorMessage = 'Login unsuccessful! Please check your login information again';
        setTimeout(() => {
          this.errorMessage = '';
        }, 4000);
      }
    });
  }

}




