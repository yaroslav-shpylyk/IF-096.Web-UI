import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
//var html2canvas: Html2CanvasStatic;
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
    console.log(this.pdfcontent.nativeElement);
    console.log(this.pdfcontent.nativeElement.width, this.pdfcontent.nativeElement.height);

    html2canvas(this.pdfcontent.nativeElement).then((canvas) => {
      const imgContent = canvas.toDataURL('image/png');
      console.log(this.pdfcontent.nativeElement, this.pdfcontent.nativeElement.width);
      //temp.remove();
      const doc = new jsPDF('l', 'pt', {filters: 'ASCIIHexEncode'} );
      console.log(doc.internal.pageSize.width, doc.internal.pageSize.height);

      doc.addImage(imgContent, 'PNG', 10, 10, 840, 500);
      //this.setHeaderFooter(pdfDocument, paddings);
      const fileName = `schedule${this.data.selectedClass}.pdf`
      doc.save(fileName);
      //document.body.appendChild(canvas);
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
