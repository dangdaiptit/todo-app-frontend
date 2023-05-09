import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListTodoService } from '../_services/data/list-todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export interface TodoData {
  id: number;
  description: string;
  targetDate: string;
  completed: boolean;
}


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'description', 'targetDate', 'completed', 'action'];
  todos: TodoData[]
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private todoService: ListTodoService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.getTodos();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openTodoDialog() {
    this.dialog.open(TodoDialogComponent).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getTodos();
      }
    });
  }

  getTodos() {
    this.todoService.getTodos()
      .subscribe({
        next: (res) => {
          this.todos = res;
          this.dataSource = new MatTableDataSource(this.todos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records!!");
        }
      });
  }

  editTodo(row: any) {
    this.dialog.open(TodoDialogComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getTodos();
      }
    })

  }

  deleteTodo(id:number) {
    this.todoService.deleteTodo(id)
    .subscribe({
      next: (res)=>{
        alert("Todo deleted successfully!");
        this.getTodos();
      },

      error(err) {
        alert("Error while deleting the todo!");
      },
    })

  }



}
