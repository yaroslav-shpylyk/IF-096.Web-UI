import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../../material.module';
import { ClassCardComponent } from './class-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { TitlePipe } from '../autotitle.pipe';
import { ClassData } from '../../../models/class-data';
import { classesData } from '../mock/classes-data';
import { OnInit, ViewChild, Component } from '@angular/core';
import { NewTitleValidator } from '../validators/new-title.validator';

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

@Component({
  selector: `app-new-year`,
  template: `<app-class-card></app-class-card>`
})
class NewYearComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @ViewChild(ClassCardComponent)
  public classCardComponent: ClassCardComponent;

  transititionForm = this.fb.group({
    newClassTitle: this.fb.array([])
  });
  get newClassTitle() { return this.transititionForm.get('newClassTitle') as FormArray; }

  ngOnInit() {
    const newInput = this.fb.control(
      classesData[2].className,
      [Validators.pattern('(^[1-7][(]([1-9]|1[0-2])-[А-Я]{1}[)]$)|(^([1-9]|1[0-2])-[А-Я]{1}$)'),
      NewTitleValidator(classesData, classesData[2].classYear, classesData[2].className)]
    );
    (this.transititionForm.controls.newClassTitle as FormArray).push(newInput);
  }
}
