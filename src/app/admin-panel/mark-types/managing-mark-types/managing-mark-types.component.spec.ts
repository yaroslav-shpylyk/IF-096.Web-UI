import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkTypesService } from '../../../services/mark-types.service';
import { ManagingMarkTypesComponent } from './managing-mark-types.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ManagingMarkTypesComponent', () => {
  let component: ManagingMarkTypesComponent;
  let fixture: ComponentFixture<ManagingMarkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ ManagingMarkTypesComponent ],
      providers: [
        MarkTypesService,
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [{markType: ''}, [] ] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingMarkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
