import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListTodoService } from '../_services/data/list-todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  private breakpointMaxWidths = new Map([
    [Breakpoints.XSmall, '100%'],
    [Breakpoints.Small, '80%'],
    [Breakpoints.Medium, '60%'],
    [Breakpoints.Large, '50%'],
    [Breakpoints.XLarge, '40%'],
  ]);

  displayedColumns: string[] = [
    'id',
    'description',
    'targetDate',
    'completed',
    'action',
  ];
  todos: TodoData[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private todoService: ListTodoService,
    private dialog: MatDialog,
    private toast: NgToastService,
    private breakpointObserver: BreakpointObserver
  ) {
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
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '50%', // Giá trị mặc định
    });

    // Kiểm tra breakpoint và đặt giá trị maxWidth phù hợp
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        const matches = Object.keys(result.breakpoints).filter(
          (key) => result.breakpoints[key]
        );
        const breakpointMaxWidth = this.breakpointMaxWidths.get(matches[0]);
        if (breakpointMaxWidth) {
          dialogRef.updateSize(breakpointMaxWidth);
        }
      });

    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.getTodos();
      }
    });
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (res) => {
        this.todos = res;
        this.dataSource = new MatTableDataSource(this.todos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Records!!');
      },
    });
  }

  editTodo(row: any) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: row,
      width: '50%',
    });
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        const matches = Object.keys(result.breakpoints).filter(
          (key) => result.breakpoints[key]
        );
        const breakpointMaxWidth = this.breakpointMaxWidths.get(matches[0]);
        if (breakpointMaxWidth) {
          dialogRef.updateSize(breakpointMaxWidth);
        }
      });

      dialogRef.afterClosed().subscribe(val => {
        if(val === 'update') {
          this.getTodos();
        }
      })
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Todo deleted successfully!',
          duration: 3000,
        });
        this.getTodos();
      },

      error(err) {
        alert('Error while deleting the todo!');
      },
    });
  }
}
