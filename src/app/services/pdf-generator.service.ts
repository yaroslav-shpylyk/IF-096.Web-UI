import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { robotoFont } from '../../fonts/roboto.font';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface JsPdfWithAutotable extends jsPDF {
  autotable: (options: UserOptions) => jsPDF;
}

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {
  }
  public pageWidth: number;
  public pageHeight: number;

  /**
   * Generated pdf document that contain image created from html content
   * @params htmlContent - content, that will be contained into documnent
   * @params orientation - orientation of the document (landscape or portrait)
   * @params docTitle - title of the document
   * @params imgWidth - width of html content (px)
   * @params imgHeight - height of html content (px)
   */
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

      imgWidth = contentWidth * ((this.pageWidth - 2 * paddings) / contentWidth);
      imgHeight = contentHeight * ((this.pageHeight - 2 * paddings) / contentHeight) * (contentHeight / contentWidth) ;

      const positionX = this.pageWidth / 2 - imgWidth / 2;
      const positionY = titleHeight + paddings;
      this.setTitle(pdfDocument, title, paddings);
      pdfDocument.addImage(contentDataURL, 'PNG', positionX, positionY + titleHeight / 2, imgWidth, imgHeight);
      this.setHeaderFooter(pdfDocument, paddings);
      this.savePdf(pdfDocument, title);
    });
  }

  /**
   * Method that sets title in the top of document
   * @params pdfDocument - pdf document, jsPDF object
   * @params pdfTitle - title of document
   * @params paddings - size of paddings in document
   */
  setTitle(pdfDocument: jsPDF, pdfTitle: string, paddings: number): void {
    pdfDocument.setFontSize(18);
    const xOffset = (this.pageWidth / 2) - (pdfDocument.getStringUnitWidth(pdfTitle) * pdfDocument.internal.getFontSize() / 2);
    pdfDocument.text(pdfTitle.toUpperCase(), xOffset, paddings);
  }

  /**
   * Method that sets header and footer text into document
   * @params pdfDocument - pdf document, jsPDF object
   * @params paddings - size of paddings in document
   */
  setHeaderFooter(pdfDocument: jsPDF, paddings: number): void {
    pdfDocument.setFontSize(10);
    pdfDocument.setTextColor(100);
    pdfDocument.text('Католицька школа-гімназія', paddings - 25, paddings / 2);
    const xOffset = (this.pageWidth / 2) - (pdfDocument.getStringUnitWidth(this.todayDate) * pdfDocument.internal.getFontSize() / 2);
    pdfDocument.text(this.todayDate, xOffset, this.pageHeight - paddings / 2);
  }

  /**
   * Method that start process of saving pdf document
   * @params pdfDocument - pdf document, jsPDF object
   * @params title - filename of genarated document
   */
  savePdf(pdfDocument: jsPDF, title: string): void {
    pdfDocument.save(title);
  }

  /**
   * Method return current data
   * @returns - current date (dd/mm/yyyy)
   */
  get todayDate(): string {
    const curDate = new Date();
    const dd = String(curDate.getDate()).padStart(2, '0');
    const mm = String(curDate.getMonth() + 1).padStart(2, '0');
    const yyyy = curDate.getFullYear();
    const todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
  }
}
