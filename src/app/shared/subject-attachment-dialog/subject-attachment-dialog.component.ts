import { Component, OnInit, Inject, OnDestroy, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject} from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Homework } from '../../models/homework-data';

@Component({
  selector: 'app-subject-attachment-dialog',
  templateUrl: './subject-attachment-dialog.component.html',
  styleUrls: ['./subject-attachment-dialog.component.scss']
})
export class SubjectAttachmentDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('viewerContentElem') viewerContentElem;
  @ViewChild('imgViewer') imgViewer;
  @ViewChild('img') img;
  private page = 1;
  private onDestroy$ = new Subject<void>();
  public attachmentUrl: any;
  public pdfOptions: FormGroup;
  public attachmentZoom = 1;
  public pdfTotalPages: number;
  public attachmentRotationDegree = 0;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Homework,
    private renderer: Renderer2
  ) { }
  ngOnInit() {
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
        if (result && result > 0) {
          this.pdfCurrentPage = result;
        }
    });
  }
  ngAfterViewInit(): void {
    if (this.isPdf()) {
      this.viewerContentElem.nativeElement.style.overflow = 'auto';
    } else {
      this.viewerContentElem.nativeElement.style.overflow = 'hidden';
      this.viewerContentElem.nativeElement.style['justify-content'] = 'center';
      this.viewerContentElem.nativeElement.style['align-items'] = 'center';
    }
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
      this.attachmentZoom += 0.2;
    } else if (type === 'zoomOut') {
      if (this.attachmentZoom <= 0.4) {
        return;
      }
      this.attachmentZoom -= 0.2;
    } else if (type === 'zoomExit') {
      this.attachmentZoom = 1;
    }
    this.updateTransform();
   }
  public rotateAttachment(type: string): void {
    if (type === 'rotateLeft') {
      this.attachmentRotationDegree -= 90;
    } else if (type === 'rotateRight') {
      this.attachmentRotationDegree += 90;
    }
    this.updateTransform();
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
  public downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.attachmentUrl;
    link.download = this.data.fileName;
    link.click();
  }
  private updateTransform(): void {
    if (this.isImage()) {
      this.renderer.setStyle(
        this.img.nativeElement,
        'transform',
        `rotate(${this.attachmentRotationDegree}deg) scale(${this.attachmentZoom})`
      );
    }
  }
}

