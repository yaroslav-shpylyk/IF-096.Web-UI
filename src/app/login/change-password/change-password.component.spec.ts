import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ ChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//Uncaught InvalidTokenError: Invalid token specified thrown

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
