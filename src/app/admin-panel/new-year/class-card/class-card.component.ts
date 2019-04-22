import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ClassInfo } from '../../../models/class-info';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() newClassTitle;
  @Input() curClass: ClassInfo;
  @Input() controlIndex: number;
  @Input() skipClassSwitcher: FormControl;
  @Input() editTitleSwitcher: FormControl;
  @Input() newTitleField: FormControl;
  @Input() form: FormGroup;
  public panelOpenState = false;

  constructor() { }

  ngOnInit() {
    }

  /**
   * Makes input with new class title enabled or disabled for editing
   * @param classNameInput HTML element - input for new title
   */
  editInput(classNameInput: HTMLInputElement) {
    if (classNameInput.classList.contains('locked')) {
      classNameInput.focus();
    }
  }

  /**
   * Include (exclude) class to (from) request
   * @param index number - index of element from form control
   * @param skipClass HTML element - checkbox for class skiping
   */
  lockClass(index: number, skipClass: HTMLInputElement) {
    const input = this.newTitleField;
    const newTitle = input.value;
    if (skipClass.checked) {
      input.reset({ value: newTitle, disabled: true });
    } else {
      input.reset({ value: newTitle, disabled: false });
    }
  }
}
