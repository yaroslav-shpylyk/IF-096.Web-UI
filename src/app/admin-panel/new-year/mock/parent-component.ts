import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ClassCardComponent } from '../class-card/class-card.component';
import { classesData } from '../mock/classes-data';
import { NewTitleValidator } from '../validators/new-title.validator';

@Component({
  selector: `app-new-year`,
  template: `<app-class-card></app-class-card>`
})
export class NewYearComponent implements OnInit {
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
