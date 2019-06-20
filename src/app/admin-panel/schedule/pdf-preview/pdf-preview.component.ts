import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../schedule.component';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {
  tableData = [];

  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pdfGeneratorService: PdfGeneratorService
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

  /** Method generates data and style for pdf-document */
  onDownload() {
    const mainTitle = `Розклад уроків ${this.data.selectedClass} класу`;
    const subTitle = `з ${this.data.dateStart} по ${this.data.dateEnd}`;

    // generetes table headers
    const tableHeader = [' '];
    for (const dayName of this.data.weekDayName) {
      tableHeader.push(dayName.legendDay.substring(0, dayName.legendDay.length - 1));
    }
    const tableStyle = {
      headStyles: {
        halign: 'center',
        fontSize: 12,
        fillColor: [78, 125, 185]
      },
      styles: {
        fontSize: 10,
        halign: 'left'
      },
      theme: 'grid'
    };
    this.pdfGeneratorService.pdfFromTable(
      tableHeader, this.tableData, 'l', [mainTitle, subTitle], tableStyle);
  }
}
