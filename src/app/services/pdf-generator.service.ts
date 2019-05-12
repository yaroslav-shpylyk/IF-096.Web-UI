import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { robotoFont } from '../../fonts/roboto.font';


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {
  }
  public pageWidth: number;
  public pageHeight: number;

  generateImagePdf(htmlContent: ElementRef, orientation: 'p'|'l', docTitle?: string, imgWidth?: number, imgHeight?: number) {
    const content = htmlContent.nativeElement;
    const contentWidth = imgWidth || htmlContent.nativeElement.width;
    const contentHeight = imgHeight || htmlContent.nativeElement.height;
    const orient = orientation || 'l';
    const title = docTitle || document.title;
    html2canvas(content, {logging: false}).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdfDocument = new jsPDF(orient, 'pt', 'a4', { filters: ['ASCIIHexEncode'] });

      pdfDocument.addFileToVFS('Roboto-Regular-normal.ttf', robotoFont);
      pdfDocument.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
      pdfDocument.setFont('Roboto-Regular');

      this.pageWidth = pdfDocument.internal.pageSize.getWidth();
      this.pageHeight = pdfDocument.internal.pageSize.getHeight();
      const paddings = 50;
      const titleHeight = 20;

      if ( contentWidth < this.pageWidth ) {
        imgWidth = contentWidth;
      } else {
        imgWidth = contentWidth * ((this.pageWidth - 2 * paddings) / contentWidth);
      }

      if ( contentHeight < this.pageHeight ) {
        imgHeight = contentHeight;
      } else {
        imgHeight = imgWidth / (contentWidth / contentHeight);
      }
      const positionX = this.pageWidth / 2 - imgWidth / 2;
      const positionY = titleHeight + paddings;
      this.setTitle(pdfDocument, title, paddings);
      pdfDocument.addImage(contentDataURL, 'PNG', positionX, positionY + titleHeight / 2, imgWidth, imgHeight);
      this.setHeaderFooter(pdfDocument, paddings);
      this.savePdf(pdfDocument, title);
    });
  }

  setTitle(pdfDocument: jsPDF, pdfTitle: string, paddings: number): void {
    pdfDocument.setFontSize(18);
    const xOffset = (this.pageWidth / 2) - (pdfDocument.getStringUnitWidth(pdfTitle) * pdfDocument.internal.getFontSize() / 2);
    pdfDocument.text(pdfTitle.toUpperCase(), xOffset, paddings);
  }

  setHeaderFooter(pdfDocument: jsPDF, paddings: number): void {
    pdfDocument.setFontSize(10);
    pdfDocument.setTextColor(100);
    pdfDocument.text('Католицька школа-гімназія', paddings - 25, paddings / 2);
    const xOffset = (this.pageWidth / 2) - (pdfDocument.getStringUnitWidth(this.todayDate) * pdfDocument.internal.getFontSize() / 2);
    pdfDocument.text(this.todayDate, xOffset, this.pageHeight - paddings / 2);
  }

  savePdf(pdfDocument: jsPDF, title: string): void {
    pdfDocument.save(title);
  }

  get todayDate(): string {
    const curDate = new Date();
    const dd = String(curDate.getDate()).padStart(2, '0');
    const mm = String(curDate.getMonth() + 1).padStart(2, '0');
    const yyyy = curDate.getFullYear();
    const todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
  }
}

