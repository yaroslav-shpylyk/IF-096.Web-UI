import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';
import { DialogData } from '../schedule.component';
import { robotoFont } from '../../../../fonts/roboto.font';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {

  tableData = [new Array(6).fill(' ')];

  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    // generetes data for table-schedule
    for (let i = 0; i < this.data.weekDayName.length; i++) {
      const dailySchedul = this.data.dataSchedule[this.data.weekDayName[i].dailySubjectsName];
      for (let j = 0; j < dailySchedul.length; j++) {
        if (dailySchedul.value[j].firstGroup !== '') {
          if (this.tableData.length <= j) {
            this.tableData.push(new Array(6).fill(' '));
          }
          this.tableData[j][i] = dailySchedul.value[j];
        } else if ('secondGroup' in dailySchedul.value[j]) {
          if (dailySchedul.value[j].secondGroup !== '') {
            if (this.tableData.length <= j) {
              this.tableData.push(new Array(6).fill(' '));
            }
            this.tableData[j][i] = dailySchedul.value[j];
          }
        }
      }
    }
  }

  /** Method generates pdf-document from form data */
  onDownload() {
    const paddingLeft = 24;
    const lineHeight = 20;
    const cellHeight = 30;
    const columnsCount = 6;
    let lineNumber = 2;

    const pdfDoc = new jsPDF('l', 'pt', 'a4');
    pdfDoc.addFileToVFS('Roboto-Regular-normal.ttf', robotoFont);
    pdfDoc.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
    pdfDoc.setFont('Roboto-Regular');

    // generetes title
    pdfDoc.setFontSize(14);
    const title = `Розклад уроків ${this.data.selectedClass} класу`;
    let xOffset = (pdfDoc.internal.pageSize.width / 2) - (pdfDoc.getStringUnitWidth(title) * pdfDoc.internal.getFontSize() / 2);
    pdfDoc.text(title, xOffset, lineHeight * lineNumber);

    pdfDoc.setFontSize(12);
    const period = `на період з ${this.data.dateStart} по ${this.data.dateEnd}`;
    xOffset = (pdfDoc.internal.pageSize.width / 2) - (pdfDoc.getStringUnitWidth(period) * pdfDoc.internal.getFontSize() / 2);
    lineNumber += 1;
    pdfDoc.text(period, xOffset, lineHeight * lineNumber);

    // generetes table headers
    lineNumber += 2;
    const firstCellWidth = 20;
    const cellWidth = (pdfDoc.internal.pageSize.width - paddingLeft * 2 - firstCellWidth) / columnsCount;
    pdfDoc.cell(paddingLeft, lineHeight * lineNumber, firstCellWidth, lineHeight,
      ' ', 0, 'center');
    for (const dayName of this.data.weekDayName) {
      pdfDoc.cell(paddingLeft, lineHeight * lineNumber, cellWidth, lineHeight,
        dayName.legendDay, 0, 'center');
    }

    // generetes table data
    pdfDoc.setFontSize(10);
    lineNumber += 1;
    let row = 1;
    for (const lesson of this.tableData) {
      pdfDoc.cell(paddingLeft, lineHeight * lineNumber, firstCellWidth, cellHeight,
        String(row), row, 'center');
      for (const subject of lesson) {
        let cellText = '';
        if (subject === ' ') {
          cellText = subject;
        } else {
          if ('secondGroup' in subject) {
            cellText = '';
            if (subject.firstGroup !== '') {
              cellText = subject.firstGroup.subjectName;
            }
            if (subject.secondGroup !== '') {
              cellText =  cellText + '\r\n' + subject.secondGroup.subjectName;
            }
          } else {
            cellText = subject.firstGroup.subjectName;
          }
        }
        pdfDoc.cell(paddingLeft, lineHeight * lineNumber, cellWidth, cellHeight,
          cellText, row, 'center');
      }
      row += 1;
      lineNumber += 1;
    }

    const fileName = `schedule${this.data.selectedClass}.pdf`;
    pdfDoc.save(fileName);
  }
}
