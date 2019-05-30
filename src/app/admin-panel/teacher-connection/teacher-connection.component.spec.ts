import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatStepperModule, MatInputModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from '../../shared/shared.module';
import { TeacherConnectionComponent } from './teacher-connection.component';

describe('TeacherConnectionComponent', () => {
  let component: TeacherConnectionComponent;
  let fixture: ComponentFixture<TeacherConnectionComponent>;
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TeacherConnectionComponent ],
      imports: [
        RouterTestingModule, 
        SharedModule, 
        MatStepperModule,
        MatInputModule,
        MatButtonModule,       
        MatFormFieldModule,
        MatInputModule, 
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  it('should create the TeacherConnectionComponent', () => {
    fixture = TestBed.createComponent(TeacherConnectionComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  });
