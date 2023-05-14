import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ListTodoService } from '../_services/data/list-todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
})
export class TodoDialogComponent implements OnInit {
  todoForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private _formBuilder: FormBuilder,
    private todoService: ListTodoService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<TodoDialogComponent>
  ) {}
  ngOnInit(): void {
    this.todoForm = this._formBuilder.group({
      description: ['', Validators.required],
      targetDate: ['', Validators.required],
      completed: [false],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.todoForm.controls['targetDate'].setValue(this.editData.targetDate);
      this.todoForm.controls['completed'].setValue(this.editData.completed);
    }
  }

  getCompletedStatus(checkValue: boolean): string {
    return checkValue ? 'Accomplished' : 'Unfinished';
  }

  addTodo() {
    if (!this.editData) {
      if (this.todoForm.valid) {
        this.todoService.saveTodo(this.todoForm.value).subscribe({
          next: (res) => {
            // alert('Todo added successfully!');
            this.toast.success({detail: "SUCCESS", summary: 'Todo added successfully!', duration: 3000}),
            this.todoForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error while adding the todo');
          },
        });
      }
    } else {
      this.updateTodo();
    }
  }

  submit() {
    this.todoService.saveTodo(this.todoForm.value).subscribe({
      next: (res) => {
        console.log(this.todoForm.value);
      },

      error: (err) => {
        console.log('Loi: ' + err);
      },
    });
  }

  updateTodo() {
    this.todoService
      .updateTodo(this.todoForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          // alert('Todo updated successfully!');
          this.toast.success({detail: "SUCCESS", summary: 'Todo updated successfully!', duration: 3000}),
          this.todoForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          alert('Error while updating the todo!');
        },
      });
  }
}
