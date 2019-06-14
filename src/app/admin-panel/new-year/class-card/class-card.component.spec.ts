import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../../material.module';
import { ClassCardComponent } from './class-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePipe } from '../autotitle.pipe';
import { ClassData } from '../../../models/class-data';
import { classesData } from '../mock/classes-data';
import { NewYearComponent } from '../mock/parent-component';

describe('ClassCardComponent', () => {
  let newYearComponent: NewYearComponent;
  let newYearFixture: ComponentFixture<NewYearComponent>;
  let compiled: HTMLElement;

  const activeClassData: ClassData = classesData[2];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule,  MaterialModule, ReactiveFormsModule ],
      declarations: [ ClassCardComponent, NewYearComponent, TitlePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    newYearFixture = TestBed.createComponent(NewYearComponent);
    newYearComponent = newYearFixture.componentInstance;

    newYearComponent.classCardComponent.form = newYearComponent.transititionForm;
    newYearComponent.classCardComponent.controlIndex = 0;
    newYearComponent.classCardComponent.curClass = activeClassData;
    newYearComponent.classCardComponent.isClassTransited = false;
    newYearComponent.classCardComponent.isCardLock = false;
    newYearComponent.classCardComponent.currentYear = activeClassData.classYear;

    newYearFixture.detectChanges();
    compiled = newYearFixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(newYearComponent.classCardComponent).toBeTruthy();
  });

  it('should display element with error class and with error message', () => {
    expect(compiled.querySelector('div.validation-error')).toBeTruthy();
    expect(compiled.querySelector('div.validation-error p').textContent).toContain('Назви класів співпадають');
  });

  it('should lock input with title for edit', () => {
    const inputElement = compiled.querySelector('input');
    const matField = compiled.querySelector('mat-form-field');
    newYearComponent.classCardComponent.editInput(inputElement);
    const classes = matField.classList;
    expect(classes.contains('locked')).toBeTruthy();
  });

  it('should lock class card and disable input', () => {
    newYearComponent.classCardComponent.lockClass();
    const matCardElement = compiled.querySelector('mat-card');
    newYearFixture.detectChanges();
    const inputElement = compiled.querySelector('input');
    const cssClasses = matCardElement.classList;

    expect(cssClasses.contains('locked')).toBeTruthy();
    expect(inputElement.disabled).toBeTruthy();
    newYearComponent.classCardComponent.lockClass();
    expect(inputElement.disabled).toBeFalsy();
  });

});
