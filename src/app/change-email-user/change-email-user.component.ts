import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
// adding to the page props

@Component({
  selector: 'app-change-email-user',
  templateUrl: './change-email-user.component.html',
  styleUrls: ['./change-email-user.component.css'],
})
export class ChangeEmailUserComponent implements OnInit {
  [x: string]: any;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  // code: string = '';
  @ViewChild(ChangeEmailUserComponent) codeInput: ChangeEmailUserComponent;

  resetCodeInput() {
    this.codeInput.reset();
  }

  // this called every time when user changed the code
  // onCodeChanged(code: string) {}

  // this called only if user entered full code
  // onCodeCompleted(code: string) {}

  constructor(private _formBuilder: FormBuilder) {}


  // constructor(private fb: FormBuilder) {}

  ngOnInit() {

  }



  // countdownTime: number = 10; // 5 minutes in seconds
  // showCountdown: boolean = false;
  // countdownIntervalId: any;
  // countdownStarted: boolean = false;

  // startCountdown() {
  //   this.showCountdown = true;
  //   this.countdownStarted = true;
  //   this.countdownIntervalId = setInterval(() => {
  //     if (this.countdownTime > 0) {
  //       this.countdownTime--;
  //       if (this.countdownTime === 0) {
  //         this.showCountdown = false;
  //       }
  //     } else {
  //       clearInterval(this.countdownIntervalId);
  //       this.countdownStarted = false;
  //       this.countdownTime = 10;
  //     }
  //   }, 1000);
  // }

  // stopCountdown() {
  //   clearInterval(this.countdownIntervalId);
  //   this.countdownStarted = false;
  //   this.countdownTime = 10;
  // }

  // onClickSentCode() {
  //   if (this.countdownStarted) {
  //     this.stopCountdown();
  //   }

  //   this.startCountdown();
  // }
}
