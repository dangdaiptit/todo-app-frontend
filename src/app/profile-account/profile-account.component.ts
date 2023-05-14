import { Component } from '@angular/core';
import { UserService } from '../_services/data/user.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent {

  data: object;
  username: string;
  email: string;
  roles: [];



  constructor(private userService: UserService,private route: ActivatedRoute) {
    this.getInforUser();

  }

  // ngOnInit() {
  //   // Lấy giá trị của query parameter
  //   this.route.queryParams.subscribe(params => {
  //     if (params['updated']) {
  //       // Nếu query parameter updated=true, gọi lại hàm getInforUser()
  //       this.getInforUser();
  //     }
  //   });
  // }

  getInforUser() {
    this.userService.getInformationUser().subscribe({
      next: (res: any) => {
        this.username = res.username;
        this.email = res.email;
        // this.roles = res.roles.map((role: { name: any; }) => role.name);
        this.roles = res.roles.map((roleItem: { name: string; }) => {
          let roleName = '';
          if (roleItem.name === 'ROLE_ADMIN') {
            roleName = 'ADMIN';
          } else if (roleItem.name === 'ROLE_USER') {
            roleName = 'USER';
          } else if (roleItem.name === 'ROLE_MODERATOR') {
            roleName = 'MODERATOR'
          }
          return roleName;
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
