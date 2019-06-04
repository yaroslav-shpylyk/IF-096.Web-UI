import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DialogData } from '../schedule.component';
import { robotoFont } from '../../../../fonts/roboto.font';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {

  tableData = [];

  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    // generetes data for table-schedule
    this.tableData.push(new Array(7).fill(' '));
    this.tableData[0][0] = 1;
    for (let i = 0; i < this.data.weekDayName.length; i++) {
      const dailySchedul = this.data.dataSchedule[this.data.weekDayName[i].dailySubjectsName];
      for (let j = 0; j < dailySchedul.length; j++) {
        let lessonSubjects = ' ';
        if (dailySchedul.value[j].firstGroup !== '') {
          if (this.tableData.length <= j) {
            this.tableData.push(new Array(7).fill(' '));
            this.tableData[j][0] = j + 1;
          }
          lessonSubjects = dailySchedul.value[j].firstGroup.subjectName;
        }
        if ('secondGroup' in dailySchedul.value[j]) {
          if (dailySchedul.value[j].secondGroup !== '') {
            if (this.tableData.length <= j) {
              this.tableData.push(new Array(7).fill(' '));
              this.tableData[j][0] = j + 1;
            }
            lessonSubjects = lessonSubjects +  '\r\n' +
              dailySchedul.value[j].secondGroup.subjectName;
          }
        }
        if (lessonSubjects !== ' ') {
          this.tableData[j][i + 1] = lessonSubjects;
        }

      }
    }
  }

  /** Method generates pdf-document from form data */
  onDownload() {
    const lineHeight = 20;
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
    const tableHeader = [[' ']];
    for (const dayName of this.data.weekDayName) {
      tableHeader[0].push(dayName.legendDay);
    }
    // generetes table
    pdfDoc.autoTable({
      startY: lineHeight * lineNumber,
      head: tableHeader,
      headStyles: {
        fontStyle: 'Roboto-Regular',
        halign: 'center',
        fontSize: 12,
        fillColor: [78, 125, 185]
      },
      body: this.tableData,
      styles: {
        font: 'Roboto-Regular',
        fontSize: 10
      },
      theme: 'grid'
    });
    const fileName = `schedule${this.data.selectedClass}.pdf`;
    pdfDoc.save(fileName);
  }
}
