import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HomeworkData } from '../../../models/homework-data';

@Component({
  selector: 'app-subject-attachment-dialog',
  templateUrl: './subject-attachment-dialog.component.html',
  styleUrls: ['./subject-attachment-dialog.component.scss']
})
export class SubjectAttachmentDialogComponent implements OnInit, OnDestroy {
  private page = 1;
  private onDestroy$ = new Subject<void>();
  public attachmentUrl: string;
  public pdfOptions: FormGroup;
  public attachmentZoom = 1;
  public pdfTotalPages: number;
  public attachmentRotationDegree = 0;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: HomeworkData
  ) { }
  ngOnInit() {
    console.log(this.data);
    this.pdfOptions = new FormGroup({
      page: new FormControl(1)
    });
    this.attachmentUrl = `data:${this.data.fileType};base64,${this.data.fileData}`;
    this.pdfOptions.controls.page.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(result => {
      this.pdfCurrentPage = result;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  set pdfCurrentPage(value: number) {
    if (value === this.page) {
      return;
    }
    this.pdfOptions.patchValue({
      page: value
    });
    this.page = value;
  }
  get pdfCurrentPage(): number {
    return this.page;
  }
  public closeDialog(): void {
    this.dialogRef.close();
  }
  public zoomAttachment(type: string): void {
    if (type === 'zoomIn') {
      if (this.attachmentZoom >= 2) {
        return;
      }
      this.attachmentZoom += 0.1;
    } else if (type === 'zoomOut') {
      if (this.attachmentZoom <= 0.2) {
        return;
      }
      this.attachmentZoom -= 0.1;
    } else if (type === 'zoomExit') {
      this.attachmentZoom = 1;
    }
   }
  public rotateAttachment(type: string): void {
    if (type === 'rotateLeft') {
      this.attachmentRotationDegree = this.attachmentRotationDegree === 0 ? 360 : this.attachmentRotationDegree;
      this.attachmentRotationDegree -= 90;
    } else if (type === 'rotateRight') {
      this.attachmentRotationDegree = this.attachmentRotationDegree === 360 ? 0 : this.attachmentRotationDegree;
      this.attachmentRotationDegree += 90;
    }
  }
  public pdfLoaded(event): void {
    this.pdfTotalPages = event._pdfInfo.numPages;
  }
  public isImage(): boolean {
    return this.data.fileType.includes('image');
  }
  public isPdf(): boolean {
    return this.data.fileType === 'application/pdf';
  }
  public isUnknownType(): boolean {
    return !this.isImage() && !this.isPdf();
  }
}

