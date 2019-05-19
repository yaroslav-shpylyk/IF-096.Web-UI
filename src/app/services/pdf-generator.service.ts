import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { robotoFont } from '../../fonts/roboto.font';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {
  }
  public pageWidth: number;
  public pageHeight: number;
  public pdfDocument: jsPDF;
  public paddings: number;

  /**
   * Generated pdf document that contain image created from html content
   * @param htmlContent - content, that will be contained into documnent
   * @param orientation - orientation of the document (landscape or portrait)
   * @param docTitle - title of the document
   * @param imgWidth - width of html content (px)
   * @param imgHeight - height of html content (px)
   */
  pdfFromCanvas(htmlContent: ElementRef, orientation: 'p'|'l', docTitle?: string, imgWidth?: number, imgHeight?: number) {
    const content = htmlContent.nativeElement;
    const contentWidth = imgWidth || htmlContent.nativeElement.width;
    const contentHeight = imgHeight || htmlContent.nativeElement.height;
    const orient = orientation || 'l';
    const title = docTitle || document.title;
    html2canvas(content, {logging: false}).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');

      this.initPdfDocument(orientation, docTitle || document.title);

      this.pageWidth = this.pdfDocument.internal.pageSize.getWidth();
      this.pageHeight = this.pdfDocument.internal.pageSize.getHeight();
      const paddings = 50;
      const titleHeight = 20;

      imgWidth = contentWidth * ((this.pageWidth - 2 * paddings) / contentWidth);
      imgHeight = contentHeight * ((this.pageHeight - 2 * paddings) / contentHeight) * (contentHeight / contentWidth) ;

      const positionX = this.pageWidth / 2 - imgWidth / 2;
      const positionY = titleHeight + paddings;
      this.pdfDocument.addImage(contentDataURL, 'PNG', positionX, positionY + titleHeight / 2, imgWidth, imgHeight);
      this.pdfDocument.save('test.pdf');
    });
  }

  /**
   * Generates pdf document that contain table
   * @param columnTitles - column headers
   * @param tableData - data of table
   * @param orientation - page orientation of documnet
   * @param docTitle - title of document
   * @param fontSize - font size of table content
   */
  pdfFromTable(columnTitles: Array<string>, tableData: Array<any>, orientation: 'p'|'l', docTitle?: string, fontSize?: number) {
    const title = docTitle || document.title;
    const fSize = fontSize || 12;
    this.initPdfDocument(orientation, title);
    this.setFont();
    this.pdfDocument.setFontSize(48);
    this.pdfDocument.autoTable({
      head: [columnTitles],
      body: tableData,
      startY: this.paddings + 30,
      margin: {top: 25, bottom: 15},
      styles: {
        font: 'Roboto-Regular',
        overflow: 'linebreak',
        fontSize: `${fSize}`},
      headStyles: { fontStyle: 'Roboto-Regular' },
      });
    this.pdfDocument.save(this.setFilename(title));
  }

  /**
   * creates jsPdf object and sets title, header and footer texts with default font style
   * @param orientation - orientation of pdf document ('p'|'l')
   * @param docTitle - title of pdf document
   */
  initPdfDocument(orientation: 'p'|'l', docTitle: string): void {
    this.pdfDocument = new jsPDF(orientation, 'pt', 'a4', { filters: ['ASCIIHexEncode'] });
    this.pageWidth = this.pdfDocument.internal.pageSize.getWidth();
    this.pageHeight = this.pdfDocument.internal.pageSize.getHeight();
    this.paddings = 50;

    this.setFont();
    this.setTitle(docTitle, this.paddings);
    this.setHeaderFooter(this.paddings);
  }

  /**
   * Method that sets title in the top of document
   * @param pdfDocTitle - title of document
   * @param paddings - size of paddings in document
   */
  setTitle(pdfDocTitle: string, paddings: number): void {
    this.pdfDocument.setFontSize(18);
    const titleWidth = this.pdfDocument.getStringUnitWidth(pdfDocTitle) * this.pdfDocument.internal.getFontSize();
    const xOffset = (this.pageWidth / 2) - (titleWidth / 2);
    this.pdfDocument.text(pdfDocTitle.toUpperCase(), xOffset, paddings);
  }

  /**
   * Method that sets header and footer text into document
   */
  setHeaderFooter(paddings: number): void {
    this.pdfDocument.setFontSize(10);
    this.pdfDocument.setTextColor(100);
    this.pdfDocument.text('Католицька школа-гімназія', paddings - 25, paddings / 2);
    const stringWidth = this.pdfDocument.getStringUnitWidth(this.todayDate) * this.pdfDocument.internal.getFontSize();
    const xOffset = (this.pageWidth / 2) - ( stringWidth / 2);
    this.pdfDocument.text(this.todayDate, xOffset, this.pageHeight - paddings / 2);
  }

  /**
   * Sets the default font with cyrillic characters
   */
  setFont(): void {
    this.pdfDocument.addFileToVFS('Roboto-Regular-normal.ttf', robotoFont);
    this.pdfDocument.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
    this.pdfDocument.setFont('Roboto-Regular');
  }

  /**
   * Method that start process of saving pdf document
   * @param filename - filename of genarated document
   */
  savePdf(filename: string): void {
    this.pdfDocument.save(filename);
  }

  /**
   * Method return current data
   * @returns - current date (dd.mm.yyyy)
   */
  get todayDate(): string {
    const curDate = new Date();
    const dd = String(curDate.getDate()).padStart(2, '0');
    const mm = String(curDate.getMonth() + 1).padStart(2, '0');
    const yyyy = curDate.getFullYear();
    const todayDate = `${dd}.${mm}.${yyyy}`;
    return todayDate;
  }

  /**
   * Method return filename of document based on title and current date
   * @param pdfDocTitle - title of document
   */
  setFilename(pdfDocTitle: string): string {
    const filename = `${pdfDocTitle} (${this.todayDate}).pdf`;
    return filename;
  }
}
