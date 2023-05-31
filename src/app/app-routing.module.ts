import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ChangeEmailUserComponent } from './change-email-user/change-email-user.component';
import { AdminAuthGuard } from './_services/admin-auth.guard';
import { ManagerUserComponent } from './manager-user/manager-user.component';
import { IdentifyEmailComponent } from './identify-email/identify-email.component';
import { SentOtpComponent } from './sent-otp/sent-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CanActivateOTPGuard } from './_services/can-activate-otp.guard';
import { CanActivateEmailGuard } from './_services/can-activate-email.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    children: [
      {path: 'identify', component: IdentifyEmailComponent},
      {path: 'code', component: SentOtpComponent, canActivate: [CanActivateEmailGuard]},
      {path: 'new-password', component: ResetPasswordComponent, canActivate: [CanActivateOTPGuard]}
    ]
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    children: [
      { path: 'profile-account', component: ProfileAccountComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'change-email', component: ChangeEmailUserComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'manager-user',
        component: ManagerUserComponent,
      },
    ],
  },
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
