import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { robotoFont } from '../../fonts/roboto.font';
import 'jspdf-autotable';

export interface TableStyle {
  styles: any;
  headStyles: any;
  theme: string;
}
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() {
  }
  private pageWidth: number;
  private pageHeight: number;
  private pdfDocument: jsPDF;
  private paddings: number;
  private yOffset: number;

  /**
   * Generated pdf document that contain image created from html content
   * @param htmlContent - content, that will be contained into documnent
   * @param orientation - orientation of the document (landscape or portrait)
   * @param docTitles - array that contain main title and subtitles
   * @param imgWidth - width of html content (px)
   * @param imgHeight - height of html content (px)
   */
  pdfFromCanvas(htmlContent: ElementRef, orientation: 'p'|'l', docTitles: string[], imgWidth?: number, imgHeight?: number) {
    const content = htmlContent.nativeElement;

    html2canvas(content, {logging: false}).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      this.initPdfDocument(orientation, docTitles);
      this.pageWidth = this.pdfDocument.internal.pageSize.getWidth();
      this.pageHeight = this.pdfDocument.internal.pageSize.getHeight();
      const paddings = 50;
      const titleHeight = 10;
      imgHeight = this.pageHeight - 2 * paddings - titleHeight - 10;
      imgWidth = this.pageWidth - 2 * paddings - 10;

      const positionX = this.pageWidth / 2 - imgWidth / 2;
      const positionY = titleHeight + paddings;
      this.pdfDocument.addImage(contentDataURL, 'PNG', positionX, positionY + titleHeight / 2, imgWidth, imgHeight);
      this.pdfDocument.save(this.setFilename(docTitles[0]));
    });
  }

  /**
   * Generates pdf document that contain table
   * @param columnTitles - column headers
   * @param tableData - data of table
   * @param orientation - page orientation of documnet
   * @param docTitles - array that contain main title and subtitles
   * @param customStyle - custom styles for table
   */
  pdfFromTable(columnTitles: Array<string>, tableData: Array<any>, orientation: 'p'|'l', docTitles: string[], customStyle?: TableStyle) {
    const tableStyle = this.getTableStyle(customStyle || null);
    this.initPdfDocument(orientation, docTitles);
    this.setFont();
    this.pdfDocument.setFontSize(48);
    this.pdfDocument.autoTable({
      head: [columnTitles],
      body: tableData,
      startY: this.yOffset + 5,
      margin: {top: 25, bottom: 15},
      styles: tableStyle.styles,
      headStyles: tableStyle.headStyles,
      theme: tableStyle.theme
      });
    this.pdfDocument.save(this.setFilename(docTitles[0]));
  }

  /**
   * creates jsPdf object and sets title, header and footer texts with default font style
   * @param orientation - orientation of pdf document ('p'|'l')
   * @param docTitles - array that contain main title and subtitles
   */
  private initPdfDocument(orientation: 'p'|'l', docTitles: string[]): void {
    let mainTitle: string;
    let subTitles: string[];
    [mainTitle, ...subTitles] = docTitles;
    this.pdfDocument = new jsPDF(orientation, 'px', 'a4', { filters: ['ASCIIHexEncode'] });
    this.pageWidth = this.pdfDocument.internal.pageSize.getWidth();
    this.pageHeight = this.pdfDocument.internal.pageSize.getHeight();
    this.paddings = 50;
    this.yOffset = this.paddings;

    this.setFont();
    this.setTitle(mainTitle.toUpperCase(), this.yOffset, 18);
    subTitles.forEach( subTitle => {
      this.setTitle(subTitle, this.yOffset, 14);
    } );
    this.setHeaderFooter(this.paddings);
  }

  /**
   * Method that sets title in the top of document
   * @param pdfDocTitle - title of document
   * @param paddingTop - coordinate against upper edge of the page
   * @param fontSize - size offont
   */
  private setTitle(pdfDocTitle: string, paddingTop: number, fontSize?: number): void {
    if (fontSize ) { this.pdfDocument.setFontSize(fontSize); }
    this.yOffset += this.pdfDocument.getTextDimensions(pdfDocTitle).h;
    const titleWidth = this.pdfDocument.getTextDimensions(pdfDocTitle).w;
    const xOffset = (this.pageWidth / 2) - (titleWidth / 2);
    this.pdfDocument.text(pdfDocTitle, xOffset, paddingTop);
  }

  /**
   * Method that sets header and footer text into document
   */
  private setHeaderFooter(paddings: number): void {
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
  private setFont(): void {
    this.pdfDocument.addFileToVFS('Roboto-Regular-normal.ttf', robotoFont);
    this.pdfDocument.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
    this.pdfDocument.setFont('Roboto-Regular');
  }

  /**
   * Method return current data
   * @returns - current date (dd.mm.yyyy)
   */
  private get todayDate(): string {
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
  private setFilename(pdfDocTitle: string): string {
    const filename = `${pdfDocTitle} (${this.todayDate}).pdf`;
    return filename;
  }

  /**
   * Method returns styles(custom or default) of table, that will be generated
   * @param customStyle - custom styles for table
   */
  private getTableStyle(customStyle?: TableStyle) {
    const defaultStyle = {
      styles: {
        halign: 'center',
        font: 'Roboto-Regular',
        overflow: 'linebreak',
        fontSize: 20},
      headStyles: {fontStyle: 'Roboto-Regular'},
      theme: 'striped'
      };

    if (customStyle) {
      for (const styleGroup in defaultStyle) {
        if (defaultStyle.hasOwnProperty(styleGroup)) {
          if (typeof defaultStyle[styleGroup] === 'object') {
            for (const style in defaultStyle[styleGroup]) {
              if (!customStyle[styleGroup].hasOwnProperty(style)) {
                customStyle[styleGroup][style] = defaultStyle[styleGroup][style];
              }
            }
          }
        }
      }
      return customStyle;
    } else { return defaultStyle; }
  }
}
