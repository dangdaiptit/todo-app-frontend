import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  hide = true;
  hidec = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}




