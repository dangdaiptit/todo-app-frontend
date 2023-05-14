import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ChangeEmailUserComponent } from './change-email-user/change-email-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuardService] },
  {
    path: 'user/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/profile-account',
    component: ProfileAccountComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/change-email',
    component: ChangeEmailUserComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
