import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequestPasswordChangeComponent } from './request-password-change/request-password-change.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    ChangePasswordComponent,
    RequestPasswordChangeComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class LoginModule { }
