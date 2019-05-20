import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPopupComponent } from './list-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../../material.module';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

describe('ListPopupComponent', () => {
  let component: ListPopupComponent;
  let fixture: ComponentFixture<ListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
         MaterialModule],
      declarations: [ ListPopupComponent ],
      providers: [
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
