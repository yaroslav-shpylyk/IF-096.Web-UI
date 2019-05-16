import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifySubjectsComponent } from './modify-subjects.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

describe('ModifySubjectsComponent', () => {
  let component: ModifySubjectsComponent;
  let fixture: ComponentFixture<ModifySubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule ],
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
