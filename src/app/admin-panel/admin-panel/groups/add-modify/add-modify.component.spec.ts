import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyGroupComponent } from './add-modify.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Group } from '../../../../models/group-data.model';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

let component: AddModifyGroupComponent;
let fixture: ComponentFixture<AddModifyGroupComponent>;
let page: Page;
let debugElement: DebugElement;
let debugElements: DebugElement[];
const mockGroup: Group = {
  id: 11,
  classYear: 2001,
  className: '11-А',
  classDescription: 'some text',
  isActive: true,
  numOfStudents: 9
};

describe('AddModifyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
      ],
      declarations: [AddModifyGroupComponent],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents()
      .then(createComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct data', () => {
    expect(page.formInput[0].value).toEqual(mockGroup.className);
    expect(page.formInput[1].value).toEqual(mockGroup.classYear.toString());
    expect(page.formInput[2].value).toEqual(mockGroup.id.toString());
  });

  it('should open method after click', () => {
    spyOn(component, 'save').and.returnValue('');
    debugElements = fixture.debugElement.queryAll(By.css('button'));
    debugElement = debugElements.find((element, i, arr) => {
      if (element.nativeElement.innerText === 'Зберегти') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', 1);
    expect(component.save).toHaveBeenCalled();
  });

  it('should open method after click', () => {
    spyOn(component, 'abort').and.returnValue('work');
    debugElements = fixture.debugElement.queryAll(By.css('button'));
    debugElement = debugElements.find((element, i, arr) => {
      if (element.nativeElement.innerText === 'Відміна') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', 1);
    expect(component.abort).toHaveBeenCalled();
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AddModifyGroupComponent);
  component = fixture.componentInstance;
  component.data = mockGroup;
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  formInput: HTMLInputElement[];
  constructor() {
    this.formInput = Array.from(
      fixture.nativeElement.querySelectorAll('input.mat-input-element')
    );
  }
}
