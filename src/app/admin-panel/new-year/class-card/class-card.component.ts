import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ClassInfo } from '../../../models/class-info';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() curClass: ClassInfo;
  @Input() controlIndex: number;
  @Input() newTitleField: FormControl;
  @Input() form: FormGroup;
  @Input() isClassTransited: boolean;
  @Input() isCardLock: boolean;
  @Input() isEditEnable: boolean;
  public panelOpenState = false;

  constructor() { }

  ngOnInit() { }

  /**
   * Makes input with new class title enabled or disabled for editing
   * @param classNameInput HTML element - input for new title
   */
  editInput(classNameInput: HTMLInputElement) {
    if (this.isEditEnable) {
      this.isEditEnable = false;
    } else {
      this.isEditEnable = true;
      classNameInput.focus();
    }
  }

  /**
   * Include (exclude) class to (from) request
   */
  lockClass() {
    const input = this.newTitleField;
    const newTitle = input.value;
    if (!this.isCardLock) {
      this.isCardLock = true;
      input.reset({ value: newTitle, disabled: true });
    } else {
      this.isCardLock = false;
      input.reset({ value: newTitle, disabled: false });
    }
  }
}
