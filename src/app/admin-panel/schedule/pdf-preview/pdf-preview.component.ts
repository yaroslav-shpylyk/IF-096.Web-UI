import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DialogData } from '../schedule.component';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {

  /*selectedClass: string;
  //dateStart: string;
  //dateEnd: string,
  dataSchedule: {
    mondaySubjects: null,
    tuesdaySubjects: null,
    wednesdaySubjects: null,
    thursdaySubjects: null,
    fridaySubjects: null,
    saturdaySubjects: null
  },
  weekDayName: null*/
  @ViewChild('pdfcontent') pdfcontent: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    //console.log("1", this.pdfcontent.nativeElement);
  }

  onDownload() {
    console.log('onDownload()');
    console.log(this.pdfcontent.nativeElement);

    html2canvas(this.pdfcontent.nativeElement).then((canvas) => {
      const imgContent = canvas.toDataURL('image/png');
      //temp.remove();
      const doc = new jsPDF('p', 'mm');
      doc.addImage(imgContent, 'PNG', 10, 10, 300, 100);
      //this.setHeaderFooter(pdfDocument, paddings);
      doc.save('table.pdf');
      //document.body.appendChild(canvas);
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
