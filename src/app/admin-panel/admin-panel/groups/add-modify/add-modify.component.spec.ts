import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyGroupComponent } from './add-modify.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('AddModifyComponent', () => {
  let component: AddModifyGroupComponent;
  let fixture: ComponentFixture<AddModifyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule],
      declarations: [ AddModifyGroupComponent ],
      providers: [
        MatDialog, {provide: MatDialogRef, useValue: {}},
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
