import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from '../_services/data/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminEditUserComponent } from '../admin-edit-user/admin-edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



export interface UsersData {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: [];
}

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css'],
})
export class ManagerUserComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  private  breakpointWidths = new Map([
    [Breakpoints.XSmall, '100%'],
    [Breakpoints.Small, '80%'],
    [Breakpoints.Medium, '60%'],
    [Breakpoints.Large, '50%'],
    [Breakpoints.XLarge, '40%'],
  ]);

  private breakpointMaxWidths = new Map([
    [Breakpoints.XSmall, '100%'],
    [Breakpoints.Small, '80%'],
    [Breakpoints.Medium, '60%'],
    [Breakpoints.Large, '50%'],
    [Breakpoints.XLarge, '40%'],
  ]);

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'password',
    'roles',
    'action',
  ];

  // users: object;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private adminService: AdminService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getUsers();
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

  getUsers() {
    this.adminService.getAllUser().subscribe({
      next: (res: any) => {
        const users = res.map((user: any) => {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            roles: user.roles.map((roleItem: { name: string }) => {
              let roleName = '';
              if (roleItem.name === 'ROLE_ADMIN') {
                roleName = 'ADMIN';
              } else if (roleItem.name === 'ROLE_USER') {
                roleName = 'USER';
              }
              return roleName;
            }),
          };
        });
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Records!!');
      },
    });
  }


  openDialogAdminEdit(row: any) {
    const dialogRef = this.dialog.open(AdminEditUserComponent, {
      data: row,
      width: '40%', // Giá trị mặc định
    });

    // Kiểm tra breakpoint và đặt giá trị width phù hợp
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      const matches = Object.keys(result.breakpoints).filter(key => result.breakpoints[key]);
      const breakpointWidth = this.breakpointWidths.get(matches[0]);
      if (breakpointWidth) {
        dialogRef.updateSize(breakpointWidth);
      }
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getUsers();
      }
    });
  }


  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '50%', // Giá trị mặc định
    });

    // Kiểm tra breakpoint và đặt giá trị maxWidth phù hợp
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      const matches = Object.keys(result.breakpoints).filter(key => result.breakpoints[key]);
      const breakpointMaxWidth = this.breakpointMaxWidths.get(matches[0]);
      if (breakpointMaxWidth) {
        dialogRef.updateSize(breakpointMaxWidth);
      }
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getUsers();
      }
    });
  }


  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe({
      next: (res) => {
        this.toast.success({
          summary: 'Delete User successfully!',
          duration: 3000,
        });
        this.getUsers();
      },
      error: (err) => {
        this.toast.error({
          summary: 'Delete User Failed!',
          duration: 3000,
        });
      },
    })
  }
}
