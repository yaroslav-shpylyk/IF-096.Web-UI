import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassInfo } from '../../../models/class-info';
import { MatDialog } from '@angular/material';
import {} from '@angular/material';
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
  @Input() newTitleField: FormControl;
  @Input() form: FormGroup;
  @Input() isClassTransited: boolean;
  @Input() isCardLock: boolean;
  @Input() isEditEnable: boolean;
  public panelOpenState = false;
  public classList: Student[];
  constructor(
    private newYearService: NewYearService,
    public dialog: MatDialog) { }

  openDialog(eclassId: number): void {
    this.newYearService.getPupilList(eclassId).subscribe(
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

  ngOnInit() {
    this.newTitleField.reset({ value: this.newTitle, disabled: false });
    this.newTitleField.markAsTouched();
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
  get newTitle() {
    const curClassName = this.curClass.className;
    const classNameParts = curClassName.split(/[-(]/);
    if ( classNameParts.length > 2) {
      return (+classNameParts[1] + 1 > 11) ? '' : `${+classNameParts[0] + 1}(${+classNameParts[1] + 1}-${classNameParts[2]}`;
    } else {
      return (+classNameParts[0] + 1 > 11) ? '' : (+classNameParts[0] + 1) + '-' + classNameParts[1];
    }
  }
}


