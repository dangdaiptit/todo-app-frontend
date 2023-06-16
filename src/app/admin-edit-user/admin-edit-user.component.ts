import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../_services/data/admin.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable, map } from 'rxjs';
import { UserService } from '../_services/data/user.service';

export function checkEmail(userService: UserService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{
    [key: string]: any;
  } | null> => {
    const email = control.value;
    return userService
      .checkExitUserByEmail(email)
      .pipe(map((exists) => (exists ? { emailExists: true } : null)));
  };
}

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css'],
})
export class AdminEditUserComponent implements OnInit {
  hide = true;
  changeEmailForm!: FormGroup;
  changePasswordForm!: FormGroup;
  changeRolesForm!: FormGroup;
  roleList: string[] = ['ADMIN'];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private adminService: AdminService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AdminEditUserComponent>,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.changeEmailForm = this._formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: checkEmail(this.userService),
          updateOn: 'blur',
        }


      ],
    });

    this.changePasswordForm = this._formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/
          ),
        ],
      ],
    });

    this.changeRolesForm = this._formBuilder.group({
      role: ['', [Validators.required]],
    });

    if (this.editData) {
      this.changeEmailForm.controls['email'].setValue(this.editData.email);
      this.changeRolesForm.controls['role'].setValue(this.editData.roles);
    }
  }

  get fbEmailFormGroup() {
    return this.changeEmailForm.controls;
  }

  get fbChangePass() {
    return this.changePasswordForm.controls;
  }

  submit() {
    const roles = this.changeRolesForm
      .get('role')
      ?.value?.map((role: string) => role.toLowerCase());
    const role = { role: roles };
    console.log(role);
  }

  changeEmail() {
    this.adminService
      .changeEmail(this.editData.id, this.changeEmailForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success({
            summary: 'Change Email successfully!',
            duration: 3000,
          });
          this.dialogRef.close('save');
        },
        error: (err) => {
          this.toast.error({ summary: 'Change Email Failed!', duration: 3000 });
        },
      });
  }

  changePassword() {
    this.adminService
      .changePassword(this.editData.id, this.changePasswordForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success({
            summary: 'Change Password successfully!',
            duration: 3000,
          });
          this.dialogRef.close('save');
        },
        error: (err) => {
          this.toast.error({
            summary: 'Change Password Failed!',
            duration: 3000,
          });
        },
      });
  }

  changeRoles() {
    const roles = this.changeRolesForm
      .get('role')
      ?.value?.map((role: string) => role.toLowerCase());
    const role = { role: roles };
    this.adminService.changeRoles(this.editData.id, role).subscribe({
      next: (res) => {
        this.toast.success({
          summary: 'Change Roles successfully!',
          duration: 3000,
        });
        this.dialogRef.close('save');
      },
      error: (err) => {
        this.toast.error({
          summary: 'Change Roles Failed!',
          duration: 3000,
        });
      },
    });
  }
}
