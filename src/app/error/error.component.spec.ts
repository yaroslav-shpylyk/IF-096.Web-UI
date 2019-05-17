import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { MaterialModule } from '../material.module';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
      providers: [
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
