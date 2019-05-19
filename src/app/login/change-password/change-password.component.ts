import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public status: string;
  public response: string;
  public changePasswordForm: FormGroup;
  private token: string;
  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.status = 'gettingData';
    this.createForm();
    this.token = this.authService.getChangePasswordToken();
  }
  /**
   * Method creates form for password change
   */
  private createForm(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[\w]+$/)
      ]),
      confirmPassword: new FormControl('')
    }, confirmPasswordValidator);
  }

  /**
   * Methods calls on submit form
   */
  public submitPasswordChange(): void {
    if (!this.changePasswordForm.valid) {
      return;
    }
    this.status = 'waitingResponse';
    this.authService.changePassword(this.changePasswordForm.value.password, this.token)
      .pipe(delay(1500))
      .subscribe(result => {
        this.response = result.data;
        this.status = 'response';
        this.authService.setChangePasswordToken('');
      });
  }
}


