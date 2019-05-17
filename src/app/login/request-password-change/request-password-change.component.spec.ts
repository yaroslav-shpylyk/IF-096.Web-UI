import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordChangeComponent } from './request-password-change.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RequestPasswordChangeComponent', () => {
  let component: RequestPasswordChangeComponent;
  let fixture: ComponentFixture<RequestPasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule,
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [RequestPasswordChangeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
