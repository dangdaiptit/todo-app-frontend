import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ListTodoService } from '../_services/data/list-todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent implements OnInit {

  todoForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private _formBuilder: FormBuilder,
    private todoService: ListTodoService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<TodoDialogComponent>
  ) {

  }
  ngOnInit(): void {
    this.todoForm = this._formBuilder.group({
      description: ['', Validators.required],
      targetDate: ['', Validators.required],
      completed: [false]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.todoForm.controls['targetDate'].setValue(this.editData.targetDate);
      this.todoForm.controls['completed'].setValue(this.editData.completed);
    }
  }

  getCompletedStatus(checkValue: boolean): string {
    return checkValue ? "Accomplished" : "Unfinished";
  }

  addTodo() {
    if (!this.editData) {
      if (this.todoForm.valid) {
        this.todoService.saveTodo(this.todoForm.getRawValue())
          .subscribe({
            next: (res) => {
              alert("Todo added successfully!");
              this.todoForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              alert("Error while adding the todo");
            }
          });
      }
    } else {
      this.updateTodo();
    }
  }

  updateTodo() {
    this.todoService.updateTodo(this.todoForm.getRawValue(), this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Todo updated successfully!");
          this.todoForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          alert("Error while updating the todo!");
        }
      })
    console.log(this.todoForm.getRawValue());
    console.log(this.editData.id);

  }



}
