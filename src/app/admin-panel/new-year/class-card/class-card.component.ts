import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ClassInfo } from '../../../models/class-info';
import { MatDialog } from '@angular/material';
import { NewYearService } from '../../../services/new-year.service';
import { ListPopupComponent } from './list-popup/list-popup.component';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() curClass: ClassInfo;
  @Input() controlIndex: number;
  @Input() form: FormGroup;
  @Input() isClassTransited: boolean;
  @Input() isCardLock: boolean;
  @Input() currentYear: number;
  newTitleField: FormControl;
  public isEditEnable = false;
  public classList: Student[];

  constructor(
    private newYearService: NewYearService,
    public dialog: MatDialog) {}

  ngOnInit() {
    const arrayControl = this.form.get('newClassTitle') as FormArray;
    this.newTitleField = arrayControl.at(this.controlIndex) as FormControl;
  }

  /**
   * Display popup with list of pupils for current classs
   * @param classId number - id of current class
   */
  openDialog(classId: number): void {
    this.newYearService.getPupilList(classId).subscribe(
      data => {
        this.classList = data;
        this.dialog.open(
          ListPopupComponent,
          {data: {
            classList: this.classList,
            className: this.curClass.className,
            classYear: this.curClass.classYear,
            numOfStudents: this.curClass.numOfStudents
            }
          }
        );
      }
    );
  }

  /**
   * Makes input with new class title enabled or disabled for editing
   * @param classNameInput HTML element - input for new title
   */
  editInput(classNameInput: HTMLInputElement) {
    if (this.isEditEnable) {
      this.isEditEnable = false;
    } else {
      this.isEditEnable = true;
      setTimeout(() => classNameInput.focus(), 0);
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
