import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-request-password-change',
  templateUrl: './request-password-change.component.html',
  styleUrls: ['./request-password-change.component.scss']
})
export class RequestPasswordChangeComponent implements OnInit, OnDestroy {
  public status: string;
  public response: string;
  private onDestroy$ = new Subject();
  public requestPasswordChangeForm: FormGroup;
  public type: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.status = 'gettingData';
    this.createForm();
    const controls = this.requestPasswordChangeForm.controls;
    controls.recoveryType.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => {
        switch (result) {
          case 'login': {
            controls.query.setValidators([ Validators.required, Validators.pattern(/^[\w]+$/)]);
            break;
          }
          case 'email': {
            controls.query.setValidators([ Validators.required, Validators.email ]);
            break;
          }
        }
        controls.query.setValue('');
        controls.query.markAsUntouched();
        controls.query.markAsPristine();
        controls.query.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  /**
   * Method creates form
   */
  private createForm(): void {
    this.requestPasswordChangeForm = new FormGroup({
      recoveryType: new FormControl('login', [
        Validators.required
      ]),
      query: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-]+$/)])
    });
  }

  /**
   * Method calls on submit form for request to change password
   */
  public submitRequest(): void {
    if (!this.requestPasswordChangeForm.valid) {
      return;
    }
    this.status = 'waitingResponse';
    this.authService.requestPasswordChange(this.requestPasswordChangeForm.value.query)
      .pipe(delay(1500))
      .subscribe(result => {
        this.response = result.data;
        this.status = 'response';
      });
  }
}
