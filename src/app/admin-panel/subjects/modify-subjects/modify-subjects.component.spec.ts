import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubjectsComponent } from './modify-subjects.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('ModifySubjectsComponent', () => {
  let component: ModifySubjectsComponent;
  let fixture: ComponentFixture<ModifySubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule],
      declarations: [ ModifySubjectsComponent ],
      providers: [
        MatDialog, {provide: MatDialogRef, useValue: {}},
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
