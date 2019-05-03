import { Component, OnInit, Inject, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-subject-attachment-dialog',
  templateUrl: './subject-attachment-dialog.component.html',
  styleUrls: ['./subject-attachment-dialog.component.scss']
})
export class SubjectAttachmentDialogComponent implements OnInit, OnDestroy {
  public pdfOptions: FormGroup;
  private pdfPageHeight: number;
  private onDestroy$ = new Subject();
  public attachmentZoom = 1;
  public pdfTotalPages: number;
  public attachmentRotationDegree = 0;
  @HostListener('window:scroll', ['$event']) scrollEvent(event) {
    if (this.data.info.fileType === 'application/pdf') {
      const viewer = event.target;
      this.pdfPageHeight = viewer.scrollHeight / this.pdfTotalPages;
      this.pdfOptions.patchValue({
        page: Math.trunc(viewer.scrollTop / this.pdfPageHeight) + 1
      });
    }
  }
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private element: ElementRef,
  ) { }
  ngOnInit() {
    this.pdfOptions = new FormGroup({
      page: new FormControl(1)
    });
/*    const viewer = this.element.nativeElement.querySelector('viewerContent');
    this.pdfPageHeight = viewer.scrollHeight / this.pdfTotalPages;*/
/*    this.pdfOptions.controls.page.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$))
      .subscribe(page => {
        viewer.scrollTo(0, this.pdfPageHeight * page);
      });*/
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  public closeDialog(): void {
    this.dialogRef.close();
  }
  public zoomAttachment(type: string): void {
    if (type === 'zoomIn') {
      this.attachmentZoom += 0.1;
    } else if (type === 'zoomOut') {
      this.attachmentZoom -= 0.1;
    }
  }
  public rotateAttachment(type: string): void {
    if (type === 'rotateLeft') {
      this.attachmentRotationDegree -= 90;
    } else if (type === 'rotateRight') {
      this.attachmentRotationDegree += 90;
    }
  }
  public pdfInfo(event): void {
    this.pdfTotalPages = event._pdfInfo.numPages;
  }
}

